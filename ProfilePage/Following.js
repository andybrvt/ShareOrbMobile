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
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

 class Following extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){

     return (
       <BackgroundContainer>
         <View >
           <Text> following page</Text>
         </View>
       </BackgroundContainer>

     )
   }
 }

 const mapStateToProps = state => {
   return {
     firstName:state.auth.firstName,
     lastName:state.auth.lastName,
     username:state.auth.username,
     userId: state.auth.id,
     currentUser: state.auth.username,
     profile_picture: state.auth.profilePic
   }
 }


 export default connect(mapStateToProps, null)(Following);
