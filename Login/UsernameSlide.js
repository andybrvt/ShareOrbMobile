import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal
 } from 'react-native';
import { Avatar } from 'react-native-elements';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


class UsernameSlide extends React.Component{

  render(){
    return(
      <View>
        <Avatar />
      </View>

    )
  }
}

export default UsernameSlide;
