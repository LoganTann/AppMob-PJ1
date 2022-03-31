import { View, Text } from "react-native";

const colors = {
    "red": "#c92837",
    "blue": "#0064b3",
    "green": "#399d37",
    "yellow": "#ebce28",
    get(color) {
        if (color in this) {
            return this[color];
        }
        return "#000000";
    }
}

export function Carte(props) {
    const { color, value } = props.carte;

    const styleText = {
        color: "white",
        fontWeight: "bold",
        fontSize: 45,
    }
    const style = {
        // texte
        backgroundColor: colors.get(color),
        // centre
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // taille
        width: 66,
        height: 110,
        borderRadius: 8,
        borderColor: "white",
        borderSize: 2
    }

    return <View style={style}>
        <Text style={styleText}>{value}</Text>
    </View>;
}

