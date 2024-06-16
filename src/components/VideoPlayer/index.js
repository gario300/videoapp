import React, {useState, useRef} from "react"
import { View, StyleSheet } from 'react-native';
import { Button, IconButton } from "react-native-paper";
import Slider from "@react-native-community/slider";
import YoutubePlayer from 'react-native-youtube-iframe';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from "react-native-view-shot";

import PropTypes from "prop-types"

// Redux
import { changeAlertStatus } from "../../app/features/alert/alertChange";
import { useDispatch } from "react-redux";

function VideoPlayer({ videoId }){  
  const dispatch = useDispatch()
  const playerRef = useRef(null);
  const viewShotRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [statusPermissions, requestPermission] = MediaLibrary.usePermissions();

  if (statusPermissions === null) {
    requestPermission();
  }

  const togglePlaying = () => {
    setPlaying(prev => !prev);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  const captureScreenshot = async() => {
    try {
      let localUri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      
      dispatch(changeAlertStatus("Captura tomada")) 
    
    } catch (e) {
      console.log(e)
    }
  };
  
  return(
    <View style={styles.container}>
      <View
        style={styles.videoCover}
      >
      </View>
      <View
        style={styles.videoContainer}
        ref={viewShotRef} collapsable={false}
      >
      <YoutubePlayer
        ref={playerRef}
        height={260}
        width={'100%'}
        play={playing}
        videoId={videoId}
        volume={volume}
        initialPlayerParams={{controls: false}}
      />
      </View>
      <View style={styles.controls}>
        {
          statusPermissions &&
            <IconButton icon="camera" mode="contained" onPress={() => captureScreenshot()}/>
        }
        <Button
          mode="outlined"
          onPress={togglePlaying}
        >
          {playing ? "Pause" : "Play"}
        </Button>
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={100}
          value={volume}
          onValueChange={handleVolumeChange}
        />
      </View>
    </View>
  )
}

VideoPlayer.propTypes = {
  videoId: PropTypes.string
}


const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    top: 235
  },
  volumeSlider: {
    width: 200,
    height: 20,
  },
  videoCover: {
    height: 260,
    width: "100%",
    zIndex: 2,
    position: "absolute"
  },
  videoContainer: {
    height: 260,
    width: "100%",
    zIndex: 1,
    position: "absolute"
  }
});

export default VideoPlayer;
