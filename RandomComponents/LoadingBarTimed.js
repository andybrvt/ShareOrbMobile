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
import { connect } from 'react-redux'
import Animated, {Easing} from 'react-native-reanimated';



class LoadingBarTimed extends React.Component{


  render(){

    return(
      <View>
        <Text>this here will be the loading bar</Text>
      </View>
    )
  }
}


export default LoadingBarTimed;
