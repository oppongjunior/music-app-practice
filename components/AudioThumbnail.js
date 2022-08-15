import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGlobalContext } from "../Context/AudioContext";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../Colors/Colors";

const AudioThumbnail = ({ id, title }) => {
  const { currentAudio } = useGlobalContext();
  if (currentAudio === null) {
    return (
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>{title}</Text>
      </View>
    );
  }

  if (currentAudio.id === id) {
    return (
      <View style={{...styles.thumbnail, backgroundColor:Colors.ACTIVE_BG}}>
        <MaterialIcons
          name="multitrack-audio"
          size={30}
          color={Colors.ACTIVE_FONT}
        />
      </View>
    );
  }
  return(
    <View style={styles.thumbnail}>
      <Text style={styles.thumbnailText}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: Colors.FONT_LIGHT,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailText: {
    textTransform: "uppercase",
    fontSize: 20,
    color: Colors.FONT_MEDIUM,
  },
});

export default AudioThumbnail;
