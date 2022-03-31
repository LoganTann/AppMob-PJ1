import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Carte } from "../../components/jeu/carte";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import {createCard} from "../../utils/game";

let unsubscribe = null;

export default function PlayGame(props) {
	if (!props.route.params?.user?.getLobbyId()) {
		return <View>Erreur : utilisateur non fourni</View>;
	}
	const user = props.route.params.user;
	const [lobbyData, setLobbyData] = useState(null);
	const [docRef, setDocRef] = useState(null);
	const [customMessage, setCustomMessage] = useState("");

	useEffect(function () {
		const _docRef = doc(db, "appmob_lobby", user.getLobbyId());
		unsubscribe = onSnapshot(_docRef, function (doc) {
			if (!doc.exists()) {
				leaveGame(true);
				return;
			}
			setLobbyData(doc.data());
		});
		setDocRef(_docRef);
	}, []);

	function getMyself() {
		for (const utilisateur of lobbyData.users) {
			if (user.getName() === utilisateur.name) {
				return utilisateur;
			}
		}
		throw "Utilisateur non trouvé";
	}

	if (!lobbyData) {
		return (
			<View>
				<Text>Chargement...</Text>
			</View>
		);
	}

	async function defausser(indiceCarte) {
		const myself = getMyself();
		const carte = myself.cards[indiceCarte];
		if (lobbyData.pioche.value !== carte.value && lobbyData.pioche.color !== carte.color) {
			const msg = "La carte n'a rien en commun avec la défausse, vous pouvez pas la poser";
			setCustomMessage(msg);
			setTimeout(() => {
				if (customMessage === msg) {
					setCustomMessage("");
				}
			}, 3000);
			return;
		}

		lobbyData.pioche = carte;
		myself.cards.splice(indiceCarte, 1);
		if (myself.cards.length <= 0) {
			setCustomMessage("Vous avez gagné !!");
			myself.winner = 1;
		}
		await setDoc(docRef, lobbyData);
	}

	async function piocherNouvelleCarte() {
		const myself = getMyself();
		myself.cards.push(createCard());
		await setDoc(docRef, lobbyData);
	}

	let lesCartes = null;
	if (getMyself().winner < 0) {
		lesCartes = (
			<View>
				<Text>Vos cartes :</Text>
				<View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
					{getMyself().cards.map(function (card, i) {
						return (
							<TouchableOpacity
								key={i}
								onPress={() => defausser(i)}
								style={{ margin: 10, width: "fit-content" }}
							>
								<Carte carte={card} />
							</TouchableOpacity>
						);
					})}
				</View>
				<Button title="piocher" onPress={piocherNouvelleCarte}></Button>
			</View>
		);
	}

	return (
		<View>
			<Text>
				{user.getLobbyId()} &gt; {user.getName()}
			</Text>
			<Text>{lobbyData.name}</Text>

			<View>
				<Text>La défausse :</Text>
				<Carte carte={lobbyData.pioche} />
				<Text>{customMessage}</Text>
			</View>

			{lesCartes}
		</View>
	);
}
