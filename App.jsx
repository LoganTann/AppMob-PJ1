import { routes } from "./views/routes";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
	const pages = [];
	for (const groupName in routes) {
		for (const routeName in routes[groupName]) {
			const route = routes[groupName][routeName];
			pages.push(
				<Stack.Screen name={route.name} component={route.component} />
			);
		}
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={routes.welcome.main.name}
				styles={styles.container}
			>
				{pages}
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
