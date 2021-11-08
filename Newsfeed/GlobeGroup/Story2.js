import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
 import { Video, AVPlaybackStatus } from 'expo-av';

 import { ChevronLeft, ArrowLeft } from "react-native-feather";

 class Story2 extends React.Component{


   constructor(props){
       super(props)
       this.state = {
       }
    }
   render(){
     let video=this.props.route.params.video
     console.log(this.props.navigation.navigate)
     console.log(video)
     return (

         <View style={{flex:1}}>
         <View>
         <TouchableOpacity
           style = {{
             marginRight:10,
           }}
           onPress = {() => this.props.navigation.navigate("groupOrb")}
           >
           <ArrowLeft
             stroke = "black"
             height = {35}
             width = {35} />

         </TouchableOpacity>

         </View>
         <Video
           style = {{
             width: '100%',
             height: '100%'
           }}
             resizeMode = "cover"
             source = {{
               // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
               uri: `${global.IMAGE_ENDPOINT}`+video
             }}
             rate={1.0}
             isMuted={false}
             volume={0.5}
             isLooping
             shouldPlay

            />
         </View>


     )
   }
 }

 export default Story2;
