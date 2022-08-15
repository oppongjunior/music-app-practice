  //play audio
  const playAudio = async (trackInfo) => {
    //playing audio for the first time
    if (audioPlayStatus === null) {
      try {
        const playbackObj = new Audio.Sound();
        setCurrentAudio(trackInfo);
        const status = await playbackObj.loadAsync(
          { uri: trackInfo.uri },
          { shouldPlay: true }
        );
        setIsPlaying(true);
        setAudioPlayStatus(status);
        setAudioPlaybackObj(playbackObj);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
      
    }

    //stop already playing song and start a another one
    if (audioPlayStatus.isLoaded && audioPlayStatus.isPlaying) {
      try {
        //end the audio that is playing
        await audioPlaybackObj.stopAsync();
        await audioPlaybackObj.unloadAsync();

        //play the new audio
        const playbackObj = new Audio.Sound();
        setCurrentAudio(trackInfo);
        const status = await playbackObj.loadAsync(
          { uri: trackInfo.uri },
          { shouldPlay: true }
        );
        setIsPlaying(true);
        setAudioPlayStatus(status);
        setAudioPlaybackObj(playbackObj);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
      
    }
  };