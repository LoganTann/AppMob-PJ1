import { ROUTE } from "./routes";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "./components/MainPage";
import Auth from "./components/Auth";
import ProfilePage from "./components/ProfilePage";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={ROUTE.WELCOME_TAB.PRINCIPALE}
				styles={styles.container}
			>
				<Stack.Screen
					name={ROUTE.WELCOME_TAB.PRINCIPALE}
					component={MainPage}
				/>
				<Stack.Screen name={ROUTE.WELCOME_TAB.AUTH} component={Auth} />
				<Stack.Screen
					name={ROUTE.PROFIL_TAB.PROFIL}
					component={ProfilePage}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
