import { ROUTE } from "../routes";
import { View, Text, Button, Image } from "react-native";
import React from "react";

export default function ProfilePage(props) {
	const boxStyle = {
		backgroundColor: "#f0f0f0",
		padding: 20,
		margin: 20,
		borderRadius: 10,
	};

	return (
		<View>
			<View style={boxStyle}>
				<Text>Voici le profil !</Text>
				<Text>
					Cliquez sur le bouton ci-dessous pour s'authentifier :
				</Text>
				<Image source={require("../assets/icon.png")} />
			</View>
			<Button
				title="Retour menu"
				onPress={() =>
					props.navigation.navigate(ROUTE.WELCOME_TAB.PRINCIPALE)
				}
			></Button>
		</View>
	);
}
