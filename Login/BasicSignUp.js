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

  state = {

  }

  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow(e) {
      console.log(e.endCoordinates.height)
  }

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

        <View style = {{
            height: height-271,
            width: width,
            backgroundColor: '#1890ff',
            alignItems: 'center'
          }}>

            <View
              style = {styles.topContainer}
              >


            </View>

            <View
              style = {styles.midContainer}
              >
              <Text style = {styles.promptText}>{this.props.prompt}</Text>
            </View>

            <View
              style = {styles.textContainer}
              >
              <TextInput
                style = {{
                  backgroundColor: 'red',
                  color: 'white'}}
                ref={(input) => { this.textInput = input; }}
                onChangeText = {this.props.onChange}
                value = {this.props.value}
                />
            </View>

            <View
              style = {styles.bottomContainer}

              >
              <Button
                title = "back"
                onPress = {() => this.props.closeModal(this.props.closeNum)}
                 />

              <TouchableOpacity
                onPress = {() => this.next()}
                >
                <ArrowRightCircle
                  stroke = "white"
                  />
              </TouchableOpacity>

            </View>





        </View>



    )
  }
}

const styles = StyleSheet.create({
  promptText: {
    color: 'white',
    fontSize: 30,
  },
  topContainer: {
    width: width,
    backgroundColor: 'pink'
  },
  midContainer: {
    height: '20%',
    alignItems: 'center',
    width: width,
    backgroundColor: 'yellow'
  },
  textContainer: {
    height: '50%',
    width: width,
    backgroundColor: 'purple'
  },
  bottomContainer: {
    width: width,
    backgroundColor: 'green'
  }


})

export default BasicSignUp;
