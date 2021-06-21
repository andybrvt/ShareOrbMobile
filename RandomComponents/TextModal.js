import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView
 } from 'react-native';

// This file will be used for modales when dealing with
// text inputs
 class TextModal extends React.Component{

   onCancel = () => {
     this.props.onCancel()
   }

   onAction = () => {
     console.log('start this')
   }

   render(){

     return (


       <View>

         <Modal
           transparent = {true}
           visible = {this.props.visible}
           >
           <KeyboardAvoidingView style = {{flex: 1}} behavior = "padding" >
             <TouchableWithoutFeedback
                onPress = {() =>this.onCancel()}
                >


                  <View
                    style = {{
                      backgroundColor: "#000000aa",
                      flex: "1",
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <View style = {{flex:1}}/>
                    <TextInput
                      placeholder = "Write a comment"
                      // value = {this.state.comment}
                      // onChangeText = {this.onCommentChange}
                      style = {{
                        width: "100%",
                        zIndex: 9999,
                        backgroundColor: 'red',
                        height: 40}}
                      />
                  </View>


             </TouchableWithoutFeedback>



           </KeyboardAvoidingView>



         </Modal>

       </View>


     )

   }
 }

 const styles = StyleSheet.create({
   button: {
     position: "relative",
     width: "90%",
     borderRadius: 25,
     height: 50,
     alignItems: "center",
     justifyContent: "center",
     marginTop: 30,
     backgroundColor: "#1890ff",

   },
   buttonText: {
     color: 'white',
     fontSize: 14
   },
   cancelText: {
     marginTop: 20,
   }
 })

 export default TextModal;
