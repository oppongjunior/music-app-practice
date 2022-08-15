import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import Colors from "../Colors/Colors";
import { useGlobalContext } from "../Context/AudioContext";

const OptionModal = () => {
  const { optionModalVisible, closeOptionModal,playAudio } = useGlobalContext();

  //play audio handler
  const playAudioHandler = ()=>{
    playAudio(optionModalVisible.trackInfo);
    closeOptionModal();
  }
  return (
    <Modal
      visible={optionModalVisible.visible}
      style={styles.mainContainer}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={2}>
          {optionModalVisible.trackInfo.filename}
        </Text>

        {/* Play button on option modal */}
        <TouchableWithoutFeedback onPress={playAudioHandler}> 
          <Text style={styles.option}>Play</Text>
        </TouchableWithoutFeedback>

        {/* add to Playlist button on option modal */}
        <TouchableWithoutFeedback onPress={()=>console.log("add to playlist")}>
          <Text style={{ ...styles.option,marginBottom:20 }}>Add to playList</Text>
        </TouchableWithoutFeedback>
      </View>

      {/* close Option Modal */}
      <TouchableWithoutFeedback onPress={() => closeOptionModal()}>
        <View style={styles.modalBG}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    paddingHorizontal: 20,
    height: "30%",
    position: "absolute",
    backgroundColor: Colors.AP_BG,
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    zIndex: 10000,
  },
  title: {
    fontSize: 18,
    color: Colors.FONT_MEDIUM,
    marginVertical: 10,
    letterSpacing: 1,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 20,
  },
  modalBG: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.MODAL_BG,
  },
});

export default OptionModal;
