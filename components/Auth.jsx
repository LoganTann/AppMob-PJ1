import { ROUTE } from "../routes";
import { View, Text, Button } from "react-native-web";
import React from "react";
export default class Auth extends React.Component {
    constructor(props) {
        super(props)
    };

    boxStyle = {
        backgroundColor: '#f0f0f0',
        padding: 20,
        margin: 20,
        borderRadius: 10
    };

    render() {
        return (
            <View>
                <div style={this.boxStyle}>
                    <Text>Bienvenue sur la page d'authentification !<br/></Text>
                    <Text>Cliquez sur le bouton ci-dessous pour retourner en arrière :<br/></Text>
                </div>
                <Button title="Menu Principal" onPress={() => this.props.navigation.navigate(ROUTE.WELCOME_TAB.PRINCIPALE)}>
                </Button>
            </View>
        );
    }
}