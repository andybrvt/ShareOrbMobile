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
 const width = Dimensions.get("window").width
 const height = Dimensions.get('window').height

 class InputModal extends React.Component{



   onCancel = () => {
     this.props.onCancel()
   }

   onAction = () => {
     this.props.onAction()
   }

   render(){
     return(
       <KeyboardAvoidingView
         style = {{
           padding: 20,
           backgroundColor: 'white',
           width: width*0.8,
           alignItems: 'center'
         }}
         behavior = "height"
         keyboardVerticalOffset = {100}
         >

        <Text>Write a caption here today</Text>
        <View
          style = {{
            backgroundColor: "whitesmoke",
            padding: 20,
            borderRadius:10,
            width: "100%"
          }}
          >

          <TextInput
            placeholder = "Write something here"
            multiline = {true}
             />
        </View>

      </KeyboardAvoidingView>
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

export default InputModal;
