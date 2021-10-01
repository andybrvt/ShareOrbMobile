import React from "react";
import { StatusBar } from "expo-status-bar";
import MainLogo from '../logo.svg';


import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
 TouchableWithoutFeedback,
 ActivityIndicator,

} from "react-native";
import styles from './LoginStyle';
import SvgUri from 'react-native-svg-uri';
import { connect } from "react-redux";
import { authLogin, authInvited } from "../store/actions/auth";
import * as ImagePicker from 'expo-image-picker';
import { ArrowRightCircle } from "react-native-feather";
import axios from "axios";



class Login extends React.Component{

  state = {
    username: "",
    paassword: "",
    login: false,
    inviteCode: "",
    loginLoading: false,
    inviteLoading: false,
  }

  handleClick = () => {
  this.inputRef.focus();
  }

  handleUserName = e => {
    const tempVal = e
    this.setState({
      username: tempVal
    })
  }

  handlePasword = e => {
    const tempVal = e;
    this.setState({
      password: tempVal
    });
  };

  handleCode = e => {
    this.setState({
      inviteCode: e
    })
  }

  handleSubmit = () => {
    // This function will be used to submit for the login
    const {username, password} = this.state;
    this.setState({
      loginLoading: true
    })
    this.props.login(username, password)
    // Now clearn out the login
    if(!this.props.error){
      this.setState({
        username: "",
        password: "",
        loginLoading: false
      })
    }

  }

  handleSignupDirect = () => {
    this.props.navigation.navigate('AppIntro')
  }

  handleInviteSubmit = () => {
    const code = this.state.inviteCode;
    this.setState({
      inviteLoading: true
    })
    axios.get(`${global.IP_CHANGE}`+'/userprofile/checkInviteCode/'+code)
    .then(res => {

      this.setState({
        inviteLoading: false
      })

      if(res.data){
        // if true then you will move into the tutorial
        this.props.invited(code)

      } else {
        // return an invalid error
        alert("Invalid invite code")
      }

    })


  }



  render(){
    const { error, loading, token } = this.props;

    if(token){
      this.props.navigation.navigate("LoadingScreen")
    }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <View
          style = {styles.background}>
           <StatusBar style="auto" />
           <View style = {styles.logo}>
             <MainLogo height = {100}  width = {200} />
           </View>
          <View style = {styles.inputHolders}>
            <View style = {styles.inputHolder}>
              <TextInput
                autoCapitalize="none"
                onChangeText = {this.handleUserName}
                style = {styles.inputBox}
                placeholder = "Username"
                value = {this.state.username}
                />
            </View>
            <View style = {styles.inputHolder}>
              <TextInput
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText = {this.handlePasword}
                style = {styles.inputBox}
                placeholder = "Password"
                value = {this.state.password}
                />
            </View>
          </View>

          {
            error ?
            <Text>
              Username or Password Incorrect
            </Text>

            :

            null


          }
          <View style ={{
              flex: 1,
              width: "100%",
              alignItems: "center"
            }}>
            <TouchableOpacity
              onPress = {() => this.handleSubmit()}
               style = {styles.loginBtn}>
               {
                 this.state.loginLoading ?

                 <ActivityIndicator
                   color = "white"
                    />

                 :

                <Text style = {styles.loginText}> Login</Text>
               }

            </TouchableOpacity>

            <Text>
              or
            </Text>
            {/*
              <TouchableOpacity
                  onPress = {() =>this.props.navigation.navigate('Signup')}
                 style = {styles.signUpBtn}>
                <Text style = {{color:'black'}}> Sign Up</Text>
              </TouchableOpacity>

              */}
            <TouchableOpacity
              onPress = {() => this.handleSignupDirect()}
              style = {styles.signUpBtn}>

              <Text >Sign up</Text>
               {/*
                 <TextInput
                   autoCapitalize="none"
                   onChangeText = {this.handleCode}
                   style = {styles.inviteInput}
                   placeholder = "Enter invite code"
                   value = {this.state.inviteCode}
                   />



                   {
                     this.state.inviteLoading ?

                     <TouchableOpacity style = {{
                         width: "25%",
                         alignItems: 'center'
                       }}>
                      <ActivityIndicator />

                      </TouchableOpacity>

                   :

                   <TouchableOpacity
                     onPress = {() => this.handleInviteSubmit()}
                      style = {{
                       width: "25%",
                       alignItems: 'center'
                     }}>
                    <ArrowRightCircle />

                    </TouchableOpacity>

                   }


                 */}

            </TouchableOpacity>




          </View>

        </View>
      </TouchableWithoutFeedback>
    )
  }
}


const mapStateToProps = state => {
  // you get the token here
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  // the actual login in function is in here and this is from redux (store)
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
    invited: (token) => dispatch(authInvited(token))
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(Login);
