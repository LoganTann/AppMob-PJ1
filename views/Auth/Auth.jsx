import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../utils/firebase";
import { convertAuthMessage } from "../../utils/auth";
import styles from "./authStyles";
import MailPasswordForm from "./MailPasswordForm";

export default function Auth(props) {
	const [loginForm, setLoginForm] = useState(true);
	const [message, setMessage] = useState("");
	const [messageColor, setMessageColor] = useState("red");

	function onSubmit(mail, password) {
		const execute = loginForm
			? signInWithEmailAndPassword
			: createUserWithEmailAndPassword;

		execute(auth, mail, password)
			.then(function (data) {
				setMessageColor("green");
				setMessage(
					`Bienvenue, ${data.user.email} ! Nous vous connectons...`
				);
				setTimeout(
					() => props.navigation.navigate("home/profile"),
					1000
				);
			})
			.catch(function (error) {
				setMessageColor("red");
				setMessage(convertAuthMessage(error));
			});
	}

	return (
		<View>
			<Text style={styles.pageTitle}>
				{loginForm ? "Se connecter" : "Créer un compte"}
			</Text>

			<Text style={{ color: messageColor, padding: "1em" }}>
				{message}
			</Text>

			<MailPasswordForm onSubmit={onSubmit}>
				<TouchableOpacity
					style={styles.switchFormBtn}
					onPress={() => setLoginForm(!loginForm)}
				>
					<Text style={{ color: "#555" }}>
						{loginForm
							? "Pas encore de compte ? Cliquez ici pour en créer un !"
							: "Vous avez déjà un compte ? Cliquez ici pour vous connecter !"}
					</Text>
				</TouchableOpacity>
			</MailPasswordForm>
		</View>
	);
}
