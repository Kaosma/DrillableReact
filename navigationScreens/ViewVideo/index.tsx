import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
//import Video from 'react-native-video';
import { styles } from './styles';
import { Video, AVPlaybackStatus } from 'expo-av';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

// Returning a screen to view info of a single drill
export const ViewVideo = ({ route }: { route: any }) => {
  const video = React.useRef(null);

  return (
    <View style={styles.rootContainer}>
      <Video
        ref={video}
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/drillable.appspot.com/o/DrillVideos%2Fstretch.mp4?alt=media&token=66221277-d048-4d78-8065-3f67e72220ac',
        }} // Can be a URL or a local file.
        style={styles.backgroundVideo}
        useNativeControls
        resizeMode="contain"
        isLooping
        //onPlaybackStatusUpdate={(stat) => setStatus(() => stat)}
      />
      <StatusBar style="auto" />
    </View>
  );
};
