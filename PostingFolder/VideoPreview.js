import React from 'react';
import {
 ScrollView,
 StyleSheet,
 Text,
 View,
 Image,
 TextInput,
 Button,
 TouchableOpacity,
 Keyboard,
 TouchableWithoutFeedback,
 KeyboardAvoidingView,
 Dimensions,
 AsyncStorage,
 Modal,
 Constants
} from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';


class VideoPreview extends React.Component{

  render(){

    const{video} = this.props;
    const { height, width } = Dimensions.get('window');
    return(
      <View style = {styles.container}>
        <Video
          source={{ uri: video.uri }}
          style={[styles.image, { height, width }]}
          rate={1.0}
          isMuted={false}
          resizeMode="cover"
          volume={0.5}
          isLooping
          shouldPlay

           />
      </View>

    )
  }
}


const styles = StyleSheet.create({

  container: {
    position: 'absolute',
     top: 0,
     left: 0,
     width: '100%',
     height: '100%',
 },
 image: {
   flex: 1,
   transform: [{
     scaleX: -1
   }]
 }
})

export default VideoPreview;
