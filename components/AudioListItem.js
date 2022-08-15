import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../Colors/Colors";
import { useGlobalContext } from "../Context/AudioContext";
import { MaterialIcons } from '@expo/vector-icons';
import AudioThumbnail from "./AudioThumbnail";

const AudioListItem = (props) => {
  const { filename, duration, id } = props;
  const {showOptionModal, playAudio, currentAudio, buttonDisabled } = useGlobalContext();
  //process song title
  let title = filename;
  let newTitle = title;
  if (title.length > 30) {
    newTitle = title.substring(0, 30) + "...";
  }

  //process song thumbnai
  let thumbnail = title.substring(0, 1);

  //work on duration
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }


  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={()=>playAudio(props)} disabled={buttonDisabled}>
        <View style={styles.leftContainer}>
          <AudioThumbnail title={thumbnail} id={id} />
          <View>
            <Text style={styles.title} numberOfLines={1}>{newTitle}</Text>
            <Text style={styles.timeText}>
              {minutes}:{seconds}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* Right container */}
      <View style={styles.rightContainer}>
        <Entypo
          name="dots-three-vertical"
          size={24}
          color={Colors.FONT_MEDIUM}
          onPress={() => showOptionModal(props)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
    marginVertical: 10,
  },
  leftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
  },
  rightContainer: {
    width: "10%",
  },
 
  title: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  timeText: {
    marginLeft: 10,
    color: Colors.FONT_LIGHT,
  },
});

export default AudioListItem;
