import React, { useEffect, useContext, createContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import AudioError from "../components/AudioError";
import { Audio } from "expo-av";

const AudioProvider = createContext();

const AudioContext = ({ children }) => {
  const [audioFiles, setaudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState({
    error: false,
    msg: "",
  });
  const [optionModalVisible, setOptionModalVisible] = useState({
    visible: false,
    trackInfo: "",
  });
  const [audioPlayStatus, setAudioPlayStatus] = useState(null);
  const [audioPlaybackObj, setAudioPlaybackObj] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(null);
  const [playbackDuration, setPlaybackDuration] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //option Modal
  const showOptionModal = (trackInfo) => {
    setOptionModalVisible({
      visible: true,
      trackInfo: trackInfo,
    });
  };

  //closeOptionModal
  const closeOptionModal = () => {
    setOptionModalVisible({ ...optionModalVisible, visible: false });
  };


  //slide bar function
   const onPlaybackStatusUpdate = (playbackstatus)=>{
     if(playbackstatus.didJustFinish){
       if(currentAudio){
        let audioIds = audioFiles.map((item) => item.id);
        let index = audioIds.indexOf(currentAudio.id);
        let newsong = audioFiles[index+1];
        playAudio(newsong);
        
       }
     }
   }

  //play audio
  const playAudio = async (trackInfo) => {
    setButtonDisabled(true);
    //playing a song for the first time
    if (audioPlayStatus === null) {
      const playbackObj = new Audio.Sound();

      try {
        const playStatus = await playbackObj.loadAsync(
          {
            uri: trackInfo.uri,
          },
          { shouldPlay: true }
        );
        
        setCurrentAudio(trackInfo);
        setIsPlaying(true);
        setAudioPlayStatus(playStatus);
        setAudioPlaybackObj(playbackObj);
        playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        //console.log(audioPlayStatus);
      } catch (error) {
        //catch any error that will occur
        //display cannot play song error
        console.log("cant play song");
      }
      setButtonDisabled(false);
      return;
    }
    //play another song by ending the old song
    if (audioPlayStatus.isLoaded) {
      setButtonDisabled(true);

      try {
        await audioPlaybackObj.stopAsync();
        await audioPlaybackObj.unloadAsync();
        const playbackObj = new Audio.Sound();
        const playStatus = await playbackObj.loadAsync(
          {
            uri: trackInfo.uri,
          },
          { shouldPlay: true }
        );

        setCurrentAudio(trackInfo);
        setIsPlaying(true);
        setAudioPlayStatus(playStatus);
        setAudioPlaybackObj(playbackObj);
        playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      } catch (error) {
        //catch any error that will occur
        //display cannot play song error
        setCurrentAudio(null);
        setIsPlaying(false);
        setAudioPlayStatus(null);
        setAudioPlaybackObj(null);
        console.log(error)
        console.log("new cant play song");
      }
      setButtonDisabled(false);
      return;
    }
  };

  //get permssion function
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      getAudioFiles();
    }
    if (!permission.granted && permission.canAskAgain) {
      //request for permission
      const { status, canAskAgain } = MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        //get the audio files
        getAudioFiles();
      }
      if (status === "denied" && canAskAgain) {
        //display alert
        permissionAlert();
      }
      if (status === "denied" && !canAskAgain) {
        //display error
        displayPermissionError();
      }
    }
  };

  //get Audio files function
  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    setaudioFiles([...media.assets]);
  };
  //alert function
  const permissionAlert = () => {
    Alert.alert(
      "Permission required",
      "This app needs to access your audio files!",
      [
        {
          text: "Ok",
          onPress: () => getPermission(),
        },
        {
          text: "Cancel",
          onPress: () => permissionAlert(),
        },
      ]
    );
  };

  //permission error function
  const displayPermissionError = () => {
    setPermissionError({
      error: true,
      msg: "Opps! you didn't allow this app to access your audio files",
    });
  };

  //use effect to call functions
  useEffect(() => {
    getPermission();
  }, []);
  //display error if user doesn't allow app to read audio files
  if (permissionError.error) {
    return <AudioError msg={permissionError.msg} />;
  }

  return (
    <AudioProvider.Provider
      value={{
        audioFiles,
        showOptionModal,
        closeOptionModal,
        optionModalVisible,
        playAudio,
        currentAudio,
        isPlaying,
        playbackDuration,
        playbackPosition,
        buttonDisabled,
      }}
    >
      {children}
    </AudioProvider.Provider>
  );
};

//global use Context
export const useGlobalContext = () => {
  return useContext(AudioProvider);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AudioContext;
