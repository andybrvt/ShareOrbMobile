import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
 } from 'react-native';
import WebSocketGlobeInstance from '../../Websockets/globeGroupWebsocket';
import { connect } from 'react-redux';
import NewGlobePost from './NewGlobePost';
import CountDown from 'react-native-countdown-component';
import NoPosts from '../noPosts.svg';
import authAxios from '../../util';


// this will pull information depending on location, so probally gotta make
// a websocket specifically for this
class LocalGlobe extends React.Component{


  render(){

    return(
      <View>
        Here will be the new globe group
      </View>
    )
  }
}
