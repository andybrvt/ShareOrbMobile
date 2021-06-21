import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
 } from 'react-native';

// use to fake an input

 class FakeSquaredInput extends React.Component{


   render(){

     return (
       <TouchableHighlight
         onPress = {() => this.props.onOpen()}
         style = {{
           width: "100%"
         }}
         underlayColor = "gray"
         >
         <View
            style = {styles.inputContainer}>

           <Text style = {styles.postInputText}> Write a post...</Text>
         </View>
       </TouchableHighlight>

     )
   }
 }

const styles = StyleSheet.create({
  inputContainer: {
    // borderWidth: 1,
    color: "gray",

    backgroundColor: "#f0f0f0",
    height: 55,
    justifyContent: "center"
  },
  postInputText: {
    marginLeft: 10,
  }
})


export default FakeSquaredInput;
