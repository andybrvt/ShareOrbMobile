import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Modal,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRightCircle, Plus, Mail, UserPlus } from "react-native-feather";
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

// used for general 1 line text input
class BasicSignUp extends React.Component{

  componentDidUpdate(prevProps){

    if(prevProps.visible !== this.props.visible){
      if(this.props.visible){
        if(this.textInput){
          this.textInput.focus()
        }
      } else {
        Keyboard.dismiss()

      }

    }

  }

  next = () => {
    Keyboard.dismiss()
    this.props.openModal(this.props.openNum)
  }

  render(){

    return(

      <KeyboardAvoidingView
        behavior = "padding"
        enabled
        >
        <View style = {{
            height: height,
            width: width,
            backgroundColor: '#1890ff'
          }}>

            <View>
              <Button
                title = "back"
                onPress = {() => this.props.closeModal(this.props.closeNum)}
                 />

            </View>

            <View>
              <Text style = {{
                  color: 'white'
                }}>{this.props.prompt}</Text>
            </View>

            <View>
              <TextInput
                style = {{color: 'white'}}
                ref={(input) => { this.textInput = input; }}
                onChangeText = {this.props.onChange}
                value = {this.props.value}
                />
            </View>

            <View>

              <TouchableOpacity
                onPress = {() => this.next()}
                >
                <ArrowRightCircle
                  stroke = "white"
                  />
              </TouchableOpacity>

            </View>





        </View>

      </KeyboardAvoidingView>


    )
  }
}

export default BasicSignUp;
