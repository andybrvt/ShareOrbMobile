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

   onSubmit = () => {
     console.log('you hit here')
     this.props.onCommentSubmit()
   }

   onCommentFocus = () => {
     this.props.onCommentFocus()
   }


   render(){

     return (
       <TouchableHighlight
         // onPress = {() => this.props.onPagePost()}
         style = {{
           // backgroundColor: 'red',
           position: 'relative',
           width: "100%",
           height: 60,
           alignItems: "center",
           justifyContent: 'center',
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
                  onFocus = {() => this.onCommentFocus()}
                  placeholder = "Write a post..."
                  value = {this.props.value}
                  onChangeText = {(e) => this.props.onChange(e)}
                 />


              </View>

           </View>
           {/*
             <Button
               disabled = {this.props.value.length > 0 ? false : true}
               onPress = {() => this.onSubmit()}
               title = "send"
                />

             */}

            {
             this.props.value.length > 0 ?

             <TouchableOpacity
               onPress = {() => this.onSubmit()}
               style = {styles.rightContainer}>

               <ArrowRightCircle fill = "#1890ff" stroke = "white" width = {45} height = {45}/>

             </TouchableOpacity>

             :

             <View
               style = {styles.rightContainer}>

               <ArrowRightCircle fill = "gray" stroke = "white" width = {45} height = {45}/>

             </View>





           }

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
