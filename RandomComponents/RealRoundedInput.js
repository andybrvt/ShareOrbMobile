import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableHighlight
 } from 'react-native';
 import { ArrowRightCircle, Plus } from "react-native-feather";


 class RealRoundedInput extends React.Component{


   render(){

     return (
       <TouchableHighlight
         // onPress = {() => this.props.onPagePost()}
         style = {{
           borderRadius: 15,
           width: "100%",
           height: 60,
           alignItems: "center",
           justifyContent: 'center'
         }}
         underlayColor = "gray"
         >

         <View style = {styles.wholeContainer}>

           <View style = {styles.leftContainer}>
             <Plus width = {25} height = {25} />
           </View>

           <View style = {styles.midContainer}>


             <View
                style = {styles.inputContainer}>

                <TextInput
                  style = {{
                    height: 55,
                  }}
                  placeholder = "Write a post..."
                  value = {this.props.value}
                  onChangeText = {(e) => this.props.onChange(e)}
                 />


              </View>

           </View>

            <TouchableOpacity style = {styles.rightContainer}>
              <ArrowRightCircle width = {35} height = {35}/>

            </TouchableOpacity>

         </View>

       </TouchableHighlight>

     )
   }
 }

const styles = StyleSheet.create({
  wholeContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    // backgroundColor: "pink",
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  midContainer: {
    // backgroundColor: "blue",
    width: "80%",

  },
  rightContainer: {
    // backgroundColor: "yellow",
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    // borderWidth: 1,
    color: "gray",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    height: 50,
    justifyContent: "center",
    paddingLeft: 10
  },
  postInputText: {
    marginLeft: 10,
  },
})


export default RealRoundedInput;
