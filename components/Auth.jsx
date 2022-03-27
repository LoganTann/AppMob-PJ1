import { ROUTE } from "../routes";
import { View, Text, Button } from "react-native";
import React from "react";
import app from "../utils/firebase";
export default function Auth(props) {
    const boxStyle = {
        backgroundColor: '#f0f0f0',
        padding: 20,
        margin: 20,
        borderRadius: 10
    };

    return (
        <View>
            <View style={boxStyle}>
                <Text>Bienvenue sur la page d'authentification !</Text>
                <Text>Cliquez sur le bouton ci-dessous pour retourner en arrière :</Text>
            </View>
            <Button title="Profil" onPress={() => props.navigation.navigate(ROUTE.PROFIL_TAB.PROFIL)}>
            </Button>
        </View>
    );
}