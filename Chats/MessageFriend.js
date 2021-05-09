import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

 class MessageFriend extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){
     return (
         <View >
           <Text> Chat with Person</Text>
         </View>

     )
   }
 }

 export default MessageFriend;
