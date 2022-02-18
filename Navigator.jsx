import { createStackNavigator } from '@react-navigation/stack';
import { ROUTE } from "routes.jsx";
import MainPage from "./components/MainPage";
import Auth from "./components/Auth";
import * as React from 'react'

const Stack = createStackNavigator();

export default function StackNavigatorProfil() {
    return (
        <Stack.Navigator initialRouteName={ROUTE.WELCOME_TAB.PRINCIPALE}>
            <Stack.Screen name={ROUTE.WELCOME_TAB.PRINCIPALE} component={MainPage} />
            <Stack.Screen name={ROUTE.WELCOME_TAB.AUTH} component={Auth} />
        </Stack.Navigator>
    )
}