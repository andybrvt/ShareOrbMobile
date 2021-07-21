import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Switch,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,

 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { ArrowRight, XCircle, Unlock, Lock, Users, X, Search} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { moderateScale } from 'react-native-size-matters';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
const width=SCREEN_WIDTH;
const coverScale = 1.7;
const col = 3;
class PicAlbum extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }






   render(){

     const {firstName, lastName, username} = this.state
     return (
       <BackgroundContainer>
         <View>
          <Text> Add pictures</Text>
         </View>

       </BackgroundContainer>

     )
   }
 }
 const styles = StyleSheet.create({
   searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
},

 })

 export default PicAlbum;
