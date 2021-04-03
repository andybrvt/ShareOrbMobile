import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';

class SocialCalendar extends React.Component{


  render(){
    return(
      <View>
        <Text> This will be the social calendar</Text>
      </View>
    )
  }
}

export default SocialCalendar;
