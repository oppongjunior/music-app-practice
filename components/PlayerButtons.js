import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Colors/Colors';
import {AntDesign} from "@expo/vector-icons";

const PlayerButtons = ({iconType, size=40, color=Colors.FONT, onPress, style}) => {

    const getIconType = (type)=>{
        switch (type) {
            case "play":
                return "pausecircle"
            case "pause":
                return 'playcircleo'
            case "next":
                return 'forward'
            case 'prev':
                return 'banckward'
            default:
                break;
        }
    }
    return (
        <AntDesign onPress={onPress} name={getIconType(iconType)} size={size} color={color} style={{ ...style }} />
    );
}

const styles = StyleSheet.create({
    text:{
        color:Colors.ACTIVE_BG,
        fontSize:40
    }
});
 

 
export default PlayerButtons;