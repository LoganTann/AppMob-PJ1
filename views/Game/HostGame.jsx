import { View, Text, Button, TextInput } from "react-native";
import React, { useEffect } from "react";
import { deleteLobby, newLobby, startLobby } from "../../utils/game";
import { onSnapshot } from "firebase/firestore";
import { auth } from "../../utils/firebase";
import UseExitPrompt from "../../components/helpers/UseExitPrompt";

let unsubscribe = null;

export default function HostGame(props) {
	const [gameName, setGameName] = React.useState("");
	const [message, setMessage] = React.useState("");

	/**
	 * @type {[import('../../utils/game.js').lobbyData, function]}
	 */
	const [lobbyData, setLobbyData] = React.useState(null);
	const [user, setUser] = React.useState(null);

	async function removeGame() {
		unsubscribe();
		await deleteLobby(user.getLobbyId());
		setLobbyData(null);
		setUser(null);
	}

	async function createGame() {
		try {
			const lobbyData = await newLobby(gameName);
			const docRef = lobbyData.docRef;
			setUser(lobbyData.user);
			unsubscribe = onSnapshot(docRef, function (doc) {
				if (!doc.exists()) return;
				setLobbyData(doc.data());
			});
		} catch (error) {
			console.error(error);
			setMessage(error.message);
		}
	}

	// assume lobbyData a été créé
	async function startGame() {
		try {
			await startLobby(user.getLobbyId());
		} catch (error) {
			console.error(error);
			setMessage(error.message);
		}
	}

	useEffect(
		function () {
			if (lobbyData && lobbyData.started) {
				unsubscribe();
				props.navigation.navigate("game/play", {user});
			}
		},
		[lobbyData]
	);

	if (lobbyData === null) {
		return (
			<View>
				<TextInput
					placeholder="Nom de la room"
					onChangeText={setGameName}
				/>
				<Text style={{ color: "red" }}>{message}</Text>
				<Button title="Créer une game" onPress={createGame} />
			</View>
		);
	}
	return (
		<View>
			<UseExitPrompt />
			<Text>Partie : {lobbyData.name}</Text>
			<Text>Id : {user.getLobbyId()}</Text>
			<Text>En attente de nouvelles personnes</Text>
			{lobbyData.users.map((player, i) => (
				<Text key={player.name}>{player.name}</Text>
			))}
			<Button title="Démarrer la partie" onPress={startGame} />
			<Button title="Supprimer la room" onPress={removeGame} />
		</View>
	);
}
