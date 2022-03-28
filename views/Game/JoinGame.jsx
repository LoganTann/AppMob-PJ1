import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useEffect } from "react";
import { searchLobby, joinLobby, leaveLobby } from "../../utils/game";
import { auth, db } from "../../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import UseExitPrompt from "../../components/helpers/UseExitPrompt";

let unsubscribe = null;

export default function JoinGame(props) {
	const [gameName, setGameName] = React.useState("");
	const [cooldown, setCooldown] = React.useState(false);
	const [results, setResults] = React.useState([]);

	const [lobbyId, setLobbyId] = React.useState(null);
	const [lobbyData, setLobbyData] = React.useState(null);

	/**
	 *
	 * @param {Event | true} fromHost
	 */
	async function leaveGame(fromHost) {
		unsubscribe();
		if (fromHost !== true) {
			leaveLobby(lobbyId, auth.currentUser.email);
		}
		setLobbyData(null);
		setResults([]);
		setGameName("");
	}

	async function joinGame(document) {
		await joinLobby(document);
		setLobbyId(document.id);
		const docRef = doc(db, "appmob_lobby", document.id);
		unsubscribe = onSnapshot(docRef, function (doc) {
			if (!doc.exists()) {
				leaveGame(true);
				return;
			}
			setLobbyData(doc.data());
		});
	}

	async function search() {
		const docs = await searchLobby(gameName);
		const _results = [];
		docs.forEach((doc) => {
			const data = doc.data();
			_results.push(
				<TouchableOpacity key={doc.id} onPress={() => joinGame(doc)}>
					<Text>
						{data.name} ({data.users.length} joueurs)
					</Text>
					<Text>{doc.id}</Text>
				</TouchableOpacity>
			);
		});
		setResults(_results);
	}

	useEffect(
		function () {
			if (gameName.length > 0) {
				clearTimeout(cooldown);
				setCooldown(setTimeout(search, 200));
			}
		},
		[gameName]
	);

	useEffect(
		function () {
			if (!lobbyData) {
				return;
			}
			if (lobbyData.started) {
				unsubscribe();
				props.navigation.navigate("game/play");
			}
		},
		[lobbyData]
	);

	if (lobbyData === null) {
		return (
			<View>
				<TextInput
					placeholder="Rechercher..."
					onChangeText={setGameName}
				/>
				{results}
			</View>
		);
	}
	return (
		<View>
			<UseExitPrompt />
			<Text>En attente de l'hôte pour commencer la partie</Text>
			{lobbyData.users.map((player, i) => (
				<Text key={player.name}>{player.name}</Text>
			))}
			<Button title="Quitter la room" onPress={leaveGame} />
		</View>
	);
}
