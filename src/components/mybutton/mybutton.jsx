import { Text, TouchableOpacity } from "react-native";
import { styles } from "./mybutton.style.js";

export default function MyButton(props) {
    return <TouchableOpacity style={props.theme == "red" ? styles.btnRed : styles.btnYellow}
        onPress={() => props.onClick()}
    >
        <Text style={props.theme == "red" ?styles.textLigth :styles.textDark}>{props.text}</Text>
    </TouchableOpacity>
}