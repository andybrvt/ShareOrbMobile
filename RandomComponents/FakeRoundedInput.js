import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions
 } from 'react-native';


 class FakeRoundedInput extends React.Component{


   render(){


     return (
       <View style = {styles.inputContainer}>
         <Text style = {styles.postInputText}> Write a post...</Text>
       </View>
     )
   }
 }

const styles = StyleSheet.create({
  inputContainer: {
    // borderWidth: 1,
    color: "gray",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    height: 40,
    justifyContent: "center"
  },
  postInputText: {
    marginLeft: 10,
  }
})


export default FakeRoundedInput;
