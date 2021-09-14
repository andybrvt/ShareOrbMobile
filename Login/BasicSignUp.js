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
  TouchableWithoutFeedback,
  Share,
  Alert,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,

 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus } from "react-native-feather";
import axios from "axios";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

// used for general 1 line text input
class BasicSignUp extends React.Component{

  constructor(props){
      super(props)
      this.state = {
        pageHeight: 0,
        showPassword: this.props.pw

      }
      this._keyboardDidShow = this._keyboardDidShow.bind(this)
      this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }


  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow(e){
    this.setState({
      pageHeight: e.endCoordinates.height
    })
  }

  _keyboardDidHide(e){
    this.setState({
      pageHeight: 0
    })
  }

  componentDidUpdate(prevProps){

    if(prevProps.visible !== this.props.visible){
      if(this.props.visible){
        if(this.textInput){
          this.textInput.focus()
        }
      } else {
        Keyboard.dismiss()
        this.setState({
          pageHeight: 0
        })
      }

    }

  }

  userSubmit = () => {

    this.props.signup()
    // Keyboard.dismiss()
    // this.props.openModal(this.props.openNum)
  }

  checkUsername = () => {
    const username = this.props.value
    console.log('checkuser')
    axios.get(`${global.IP_CHANGE}`+'/userprofile/validateUsername/'+username)
    .then(res => {
      console.log(res.data)
      if(res.data === true){
        Keyboard.dismiss()
        this.props.openModal(this.props.openNum)
      } else {
        Alert.alert(
          "Username already taken",
          "Someone else has the username already",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK",
              style:'destructive',
              onPress: () => console.log('ok')
            }
          ]

        )
      }
    })
  }

  checkEmail = () => {
    console.log('email here')
    const email = this.props.value;
  }

  next = () => {
    if(this.props.pw){
      Alert.alert(
        "Are you sure?",
        "You cannot go back after this, but you will still be able to edit later in the future",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes",
            style:'destructive', onPress: () => this.userSubmit() }
        ]

      )

    }

    else if(this.props.un){
      // if username
      this.checkUsername()
    } else if(this.props.em){
      this.checkEmail()

    }
    else {
      Keyboard.dismiss()
      this.props.openModal(this.props.openNum)
    }

  }

  validate = () => {

    if(this.props.value === ""){
      return false
    }
    if(this.props.pw){
      const value = this.props.value

      if(value.length < 9){
        // validate if the password is longer than 8 characters
        return false
      } else if(value.search(/[A-Z]/)< 0){
        // Validates if it has an uppercase
        return false
      } else if(value.search(/[0-9]/)< 0){
        // Validate if it has a number
        return false
      }
    }

    if(this.props.em){
      const value = this.props.value
      if(email(value)){
        return false
      }
    }

    return true

  }

  render(){

    return(

        <View style = {{
            height: height-this.state.pageHeight,
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

            <TouchableWithoutFeedback
              onPress = {() => this.textInput.focus()}
              >
              <View
                style = {styles.textContainer}
                >
                <TextInput
                  style = {{
                    width: 'width'
                  }}
                  selectionColor={'white'}
                  secureTextEntry={this.state.showPassword}
                  style = {styles.textInput}
                  ref={(input) => { this.textInput = input; }}
                  onChangeText = {this.props.onChange}
                  value = {this.props.value}
                  />
                {
                  this.props.pw ?

                  <Button
                    title = "show password"
                    onPress = {() =>{
                      this.setState({
                        showPassword: !this.state.showPassword
                      })
                    }}
                     />
                   :

                   null
                }

                </View>

            </TouchableWithoutFeedback>


            {
              this.props.pw ?

              <View style = {{
                  position: 'absolute',
                  top: '70%',
                }}>
                <Text style = {{
                  color: 'white'
                  }}>At least 10 characters</Text>
                <Text style = {{
                  color: 'white'
                  }}>At least 1 uppercase</Text>
                <Text style = {{
                  color: 'white'
                  }}>At least 1 number</Text>
              </View>

              :

              null

            }


            <View
              style = {styles.bottomContainer}
              >

              <View style = {styles.bottomLContainer}>
                <TouchableOpacity
                  onPress = {() => this.props.closeModal(this.props.closeNum)}

                  >
                  <ArrowLeftCircle
                    width = {40}
                    height = {40}
                    stroke = "white"
                    />
                </TouchableOpacity>

              </View>

              {
                this.validate() ?

                <View style = {styles.bottomRContainer}>
                  <TouchableOpacity
                    onPress = {() => this.next()}
                    >
                    <ArrowRightCircle
                      width = {40}
                      height = {40}
                      stroke = "white"
                      />
                  </TouchableOpacity>

                </View>

                : null

              }


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
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,

  },
  textContainer: {
    alignItems:'center',
    justifyContent: 'center',
    height: '50%',
    width: width,
  },
  textInput: {
    color: 'white',
    fontSize: 25
  },
  bottomContainer: {
    height: '25%',
    width: width,
    flexDirection:'row'
  },
  bottomLContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30
  },
  bottomRContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 30
  }


})

export default BasicSignUp;
