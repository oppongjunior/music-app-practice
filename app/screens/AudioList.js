import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useGlobalContext } from "../../Context/AudioContext";
import AudioListItem from "../../components/AudioListItem";
import OptionModal from "../../components/OptionModal";

const AudioList = () => {
  const { audioFiles,closeOptionModal, showOptionModal } = useGlobalContext();

  return (
    <View>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <AudioListItem {...item} />;
        }}
      />
      {/* Option Modal */}
      <OptionModal visible={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioBox: {
    marginVertical: 20,
    marginHorizontal: 10,
    borderBottomColor: "red",
    fontSize: 20,
  },
});
export default AudioList;
