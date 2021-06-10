import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Keyboard,
  TouchableWithoutFeedback
 } from 'react-native';


// This function will be used for managing and posting pictures for
// the national day

class CurrentPicPost extends React.Component{


  render(){
    return(
      <View style = {styles.container}>
        <Text> This porition will be for the national day</Text>

      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    height: 200
  }
})

export default CurrentPicPost;
