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


 class FakeRoundedInput extends React.Component{


   render(){

     return (
       <TouchableHighlight
         onPress = {() => this.props.onPagePost()}
         style = {{
           borderRadius: 20
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
    borderRadius: 20,
    height: 40,
    justifyContent: "center"
  },
  postInputText: {
    marginLeft: 10,
  }
})


export default FakeRoundedInput;
