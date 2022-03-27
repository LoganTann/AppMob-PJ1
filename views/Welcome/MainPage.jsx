import { View, Text, Button } from "react-native";
import React from "react";

export default function MainPage(props) {
	const boxStyle = {
		backgroundColor: "#f0f0f0",
		padding: 20,
		margin: 20,
		borderRadius: 10,
	};

	return (
		<View>
			<View style={boxStyle}>
				<Text>Bienvenue sur ma super app</Text>
				<Text>
					Cliquez sur le bouton ci-dessous pour s'authentifier :
				</Text>
			</View>
			<Button
				title="S'authentifier"
				onPress={() => props.navigation.navigate("auth/auth")}
			></Button>
		</View>
	);
}
