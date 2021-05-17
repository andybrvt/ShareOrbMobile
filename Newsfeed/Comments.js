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
import { Avatar, BottomNavigation } from 'react-native-paper';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

 class Comments extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){
     this.props.navigation.setOptions({headerTitle:

       this.props.route.params.chatPersonName+" @"+this.props.route.params.chatUserName})
     return (
         <View >
           <Text> Chat with {this.props.route.params.chatPersonName}</Text>

           <Avatar.Image
             source = {{
               uri: this.props.route.params.chatPersonProfilePic
             }}
             size = {50}
              />
         </View>

     )
   }
 }

 export default Comments;
