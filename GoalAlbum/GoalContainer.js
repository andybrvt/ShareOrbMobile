import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
 } from 'react-native';
import authAxios from '../util';


class GoalContainer extends React.Component{

  state = {
    goals: []
  }

  componentDidMount(){
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/goalList`)
    .then( res => {
      console.log(res.data)
    })
  }

  render(){

    return(
      <View>
        <Text>stuff here</Text>
      </View>
    )
  }
}

export default GoalContainer;
