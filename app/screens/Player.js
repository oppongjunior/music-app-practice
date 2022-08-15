import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../Colors/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import PlayerButtons from "../../components/PlayerButtons";
import { useGlobalContext } from "../../Context/AudioContext";

const Playler = () => {
  const {
    currentAudio,
    audioFiles,
    isPlaying,
    playbackDuration,
    playbackPosition,
  } = useGlobalContext();

  //extract current audio count
  let audioCount = 0;
  let count = 0;
  if (currentAudio) {
    let audioIds = audioFiles.map((item) => item.id);
    count = audioIds.indexOf(currentAudio.id) + 1;
    audioCount = audioFiles.length;
  }

  //update slider
  const getsliderUpdate = () => {
    if (playbackDuration !== null && playbackPosition !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.audioCount}>
        {count}/{audioCount}
      </Text>
      {/* Track image or icon */}
      <View style={styles.mediaBannerContainer}>
        <MaterialCommunityIcons
          name="music-circle"
          size={300}
          color={isPlaying ? Colors.ACTIVE_BG : Colors.FONT_MEDIUM}
        />
      </View>
      <View style={styles.audioPlayercontainer}>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {currentAudio === null ? "Track Name" : currentAudio.filename}
        </Text>
        {/* Slider */}
        <Slider
          style={{ width: "100%", height: 20 }}
          minimumValue={0}
          maximumValue={1}
          value={getsliderUpdate()}
          minimumTrackTintColor={Colors.FONT_MEDIUM}
          maximumTrackTintColor={Colors.ACTIVE_BG}
          thumbTintColor={Colors.ACTIVE_BG}
        />
        {/* Player controllers */}
        <View style={styles.playerControllersContainer}>
          <PlayerButtons onPress={() => console.log("hello")} iconType="prev" />
          <PlayerButtons
            onPress={() => console.log("hello")}
            iconType={isPlaying ? "play" : "pause"}
            style={{ marginHorizontal: 25 }}
          />
          <PlayerButtons onPress={() => console.log("hello")} iconType="next" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  audioCount: {
    textAlign: "right",
    padding: 15,
    color: Colors.FONT_LIGHT,
    fontSize: 20,
  },
  mediaBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  trackTitle: {
    fontSize: 16,
    color: Colors.FONT,
    padding: 15,
    letterSpacing: 1,
  },
  playerControllersContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});
export default Playler;
