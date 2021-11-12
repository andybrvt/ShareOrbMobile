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
  ActivityIndicator,

 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Square, CheckSquare, ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus } from "react-native-feather";
import axios from "axios";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import pic from './default.png';



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
        showPassword: this.props.pw,
        loading: false

      }
      this._keyboardDidShow = this._keyboardDidShow.bind(this)
      this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }

  openPrivatePolicy = async () => {
    const result = await WebBrowser.openBrowserAsync('https://shareorb.notion.site/Privacy-Policy-9809f5f8a71343bbae98fb05a102d6d8');
  };

  openTermsOfConditions = async() => {
    const result = await WebBrowser.openBrowserAsync('https://shareorb.notion.site/ShareOrb-Terms-of-Service-8c737aea1ed1454da11fb08348743ff9');
  }


  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    if(this.props.visible){
      this.textInput.focus()
    }
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
    axios.get(`${global.IP_CHANGE}`+'/userprofile/validateUsername/'+username)
    .then(res => {
      if(res.data === true){
        Keyboard.dismiss()
        this.props.openModal(this.props.openNum)
      } else {
        Alert.alert(
          "Username already taken",
          "Someone else has the username already",
          [

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
    const email = this.props.value;
    axios.get(`${global.IP_CHANGE}`+'/userprofile/validateEmail', {
      params: {
        email: email
      }
    })
    .then(res => {
      if(res.data === true){
        Keyboard.dismiss()
        this.props.openModal(this.props.openNum)
      } else {
        Alert.alert(
          "Email already taken",
          "Email in use already",
          [

            { text: "OK",
              style:'destructive',
              onPress: () => console.log('ok')
            }
          ]

        )
      }


    })


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
      if(value.length < 10){
        // validate if the password is longer than 8 characters
        return false
      } else if(value.search(/[A-Z]/)< 0){
        // Validates if it has an uppercase
        return false
      } else if(value.search(/[0-9]/)< 0){
        // Validate if it has a number
        return false
      }
      if(!this.props.termCondition){
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
              {
                this.props.FBSignUp?
                <View style={{marginTop:'30%', marginBottom:'10%', alignItems:'center'}}>
                <Text style = {styles.fbText}>Welcome, {this.props.name} </Text>
                </View>
                :
                null
              }

              {(this.props.fb_profile_pic=='https://scontent-lax3-2.xx.fbcdn.net/v/t1.30497-1/s960x960/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=rwm2RFKAQyQAX8FZxMF&_nc_ht=scontent-lax3-2.xx&edm=AP4hL3IEAAAA&oh=3b573608a45801eaf1e3f1f284d40a81&oe=61B3A6BD')?
                <View  style={{alignItems:'center', marginTop:'10%', marginBottom:'10%'}}>>
                  <Avatar
                    size={125}
                    rounded
                    source = {pic}
                  />
                  <Text style = {styles.fbText}>Please enter a profile picture</Text>
              </View>
              :
              <View style={{alignItems:'center', top:'10%', marginBottom:'20%'}}>
                <Avatar
                  size={125}
                  rounded
                  source = {{
                    uri:this.props.fb_profile_pic,
                  }}
                />
              </View>
              }

              <Text style = {styles.fbText}>{this.props.prompt}</Text>

          </View>


            <TouchableWithoutFeedback
              onPress = {() => this.textInput.focus()}
              >
              <View
                style = {styles.textContainer}
                >
                {
                  this.props.loading ?

                  <ActivityIndicator
                    size = "large"
                    color = 'white'
                      />

                  :

                  <TextInput
                    style = {{
                      width: 'width'
                    }}
                    autoCapitalize="none"
                    selectionColor={'white'}
                    secureTextEntry={this.state.showPassword}
                    style = {styles.textInput}
                    ref={(input) => { this.textInput = input; }}
                    onChangeText = {this.props.onChange}
                    value = {this.props.value}
                    />
                }

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





            <View
              style = {styles.bottomContainer}
              >

              <View style = {styles.bottomLContainer}>
                {
                  this.props.loading ?

                  null

                  :

                  <TouchableOpacity
                    onPress = {() => this.props.closeModal(this.props.closeNum)}

                    >
                    <ArrowLeftCircle
                      width = {40}
                      height = {40}
                      stroke = "white"
                      />
                  </TouchableOpacity>


                }

              </View>

              {
                this.props.loading ?

                null

                :


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

            {
              this.props.pw ?

              <View style = {{
                  position: 'absolute',
                  top: '70%',
                  alignItems:'center'
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
                <View style = {{
                    flexDirection: 'row',
                    alignItems: 'center',
                    zIndex: 99,
                  }}>
                  {
                    this.props.termCondition ?


                    <TouchableOpacity
                      onPress = {() => this.props.acceptTerms()}
                      >
                      <CheckSquare
                        stroke = "white"
                         />

                    </TouchableOpacity>

                    :

                    <TouchableOpacity
                      onPress = {() => this.props.acceptTerms()}
                      >
                      <Square
                        stroke = "white"
                        />

                    </TouchableOpacity>

                  }

                  <Text style = {{
                      fontSize: 10,
                      color: 'white'
                    }}>Agree to
                    <Text style = {{
                        color: 'blue'
                      }}
                      onPress = {() => this.openTermsOfConditions()}
                      > terms of service</Text> and

                      <Text style = {{
                        color: 'blue'
                      }}
                      onPress = {() => this.openPrivatePolicy()}
                      > privacy policy</Text></Text>
                </View>





              </View>

              :

              null

            }





        </View>



    )
  }
}

const styles = StyleSheet.create({
  promptText: {
    color: 'white',
    fontSize: 26.5,
    fontFamily:'Nunito-Bold',
  },
  fbText: {
    color: 'white',
    fontSize: 22.5,
    fontFamily:'Nunito-Bold',
  },
  topContainer: {
    width: width,
    height:'10%',
    backgroundColor: '#1890ff'
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
    height: '40%',
    width: width,
    // backgroundColor:'red',
  },
  textInput: {
    color: 'white',
    fontSize: 32.5,
    fontFamily:'Nunito-SemiBold',
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
    paddingLeft: 30,
  },
  bottomRContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 30
  }


})

export default BasicSignUp;
