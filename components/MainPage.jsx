import { ROUTE } from "../routes";
import { View, Text, Button } from "react-native-web";
import React from "react";
export default class MainPage extends React.Component {
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
                    <Text>Bienvenue sur ma super app !<br/></Text>
                    <Text>Cliquez sur le bouton ci-dessous pour s'authentifier :<br/></Text>
                </div>
                <Button title="S'authentifier" onPress={() => this.props.navigation.navigate(ROUTE.WELCOME_TAB.AUTH)}>
                </Button>
            </View>
        );
    }
}

