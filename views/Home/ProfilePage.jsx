import { View, Text, Button, Image } from "react-native";
import React from "react";

export default function ProfilePage(props) {
	return (
		<View>
			<Text>Voici le profil !</Text>
			<Button
				title="Créer une game"
				onPress={() => props.navigation.navigate("game/host")}
			></Button>

			<Button
				title="Rejoindre une game"
				onPress={() => props.navigation.navigate("game/join")}
			></Button>
		</View>
	);
}
