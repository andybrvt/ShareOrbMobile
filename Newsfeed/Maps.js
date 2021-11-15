import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Image
} from 'react-native';
import {ArrowRight }  from "react-native-feather";
import { captureRef } from 'react-native-view-shot';
// import Share from 'react-native-share';

class Maps extends React.Component{
  constructor(props){
    super(props)
    this.bs = React.createRef()
  }
  render(){
    return(
      <View>
        <TouchableOpacity
         onPress = {() => this.props.navigation.goBack()}
         >
          <ArrowRight
            width = {40}
            height = {40}
            stroke = "black"
             />
        </TouchableOpacity>
      </View>
    )
  }
}


export default Maps;
