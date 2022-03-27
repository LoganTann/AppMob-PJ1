import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import styles from "./authStyles";

/**
 * Composant affichant un formulaire de connexion ou de création de compte
 * @param {{onSubmit: function}} props
 */
export default function MailPasswordForm(props) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	function onSubmit() {
		props.onSubmit(email, password);
	}

	return (
		<View style={styles.connectForm}>
			<Text style={styles.label}>Adresse mail</Text>
			<TextInput
				style={styles.input}
				onChangeText={setEmail}
				textContentType="emailAddress"
			></TextInput>

			<Text style={styles.label}>Mot de passe</Text>
			<TextInput
				style={styles.input}
				onChangeText={setPassword}
				textContentType="password"
				secureTextEntry={true}
				onSubmitEditing={onSubmit}
			></TextInput>

			{props.children}

			<View style={styles.submit}>
				<Button onPress={onSubmit} title="Envoyer" />
			</View>
		</View>
	);
}
