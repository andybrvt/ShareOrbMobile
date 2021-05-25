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
import { connect } from 'react-redux';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

 class Comments extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){

     this.props.navigation.setOptions({
        comments:this.props.route.params.comments
     })
     console.log("BLAHBLAHBLAH")
     console.log(this.props.route.params.comments)
     let commentList = [];

     return (
         <View >
           <Text> Comments {this.props.route.params.comments.length}</Text>


         </View>

     )
   }
 }
 const mapStateToProps = state => {
   return {
     userId: state.auth.id,
     currentUser: state.auth.username,
     profilepic: state.auth.profilePic,
   }
 }


 export default connect(mapStateToProps)(Comments);
