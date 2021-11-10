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
 AsyncStorage,

} from "react-native";
import styles from './LoginStyle';
import SvgUri from 'react-native-svg-uri';
import { connect } from "react-redux";
import { authLogin, authInvited } from "../store/actions/auth";
import * as ImagePicker from 'expo-image-picker';
import { ArrowRightCircle } from "react-native-feather";
import axios from "axios";
import { WebView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import InstagramLogin from 'react-native-instagram-login';
import authAxios from '../util';



// import CookieManager from '@react-native-community/cookies';
WebBrowser.maybeCompleteAuthSession(); // <-- will close web window after authentication




class Login extends React.Component{

  state = {
    username: "",
    paassword: "",
    login: false,
    inviteCode: "",
    loginLoading: false,
    inviteLoading: false,

    token: '',
    instaInfo:null,
    test:null,
  }


  setIgToken = (data) => {
    this.setState({ token: data.access_token })

    // example of async storage
    // AsyncStorage.setItem('foo', 'bar');
    // AsyncStorage.getItem('foo').then(console.log); // 'bar'





    // grab username of user
    authAxios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${data.access_token}`)
    .then( res => {
      this.setState({
        instaInfo: res.data
      })
        AsyncStorage.setItem('instaToken', res.data);
    })
    // AsyncStorage.getItem("instaToken").then(console.log);

    console.log("Test Instagram")
    console.log(this.state.instaInfo.username)


    if(this.state.instaInfo){
      //grab instagram info
      axios.request(
      {
        method: 'GET',
        url: 'https://instagram-growth.p.rapidapi.com/v2/profile',
        params: {username: 'pinghsu521'},
        headers: {
          'x-rapidapi-host': 'instagram-growth.p.rapidapi.com',
          'x-rapidapi-key': '1e025a4798msh54c2561d9a1a213p1cb936jsn57712b6587f8'
        }
      }
      ).then(function (response) {
        console.log("BIG ISNTAGRAM INFO")
      	console.log(response.data);
        console.log(response.data.profile_pic_url)
        console.log(response.data.full_name)
        console.log(response.data.username)
        this.setState({
          instaInfo: res.data
        })
      }).catch(function (error) {
      	console.error(error);
      });
    }

    console.log(this.state.instaInfo)


  }


  onClear() {
    // CookieManager.clearAll(true)
    //   .then((res) => {
    //     this.setState({ token: null })
    //   });
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
    console.log("MADE IT")
    if(this.state.instaInfo){
      console.log(this.state.instaInfo.id)
      console.log(this.state.token)
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
            <TouchableOpacity
              onPress = {() => this.handleSignupDirect()}
              style = {styles.signUpBtn}>
              <Text >Sign up</Text>
            </TouchableOpacity>


              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.instagramLogin.show()}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Login/SignUp with Instagram</Text>
          </TouchableOpacity>

          <Text style={{ margin: 10 }}>Token: {this.state.token}</Text>

          {this.state.failure && (
            <View>
              <Text style={{ margin: 10 }}>
                failure: {JSON.stringify(this.state.failure)}
              </Text>
            </View>
          )}
          <InstagramLogin
            ref={ref => (this.instagramLogin = ref)}
            appId='414116966915736'
            appSecret='55fb4d3e5ca2a04146a8ba4b95debb9e'
            redirectUrl='https://shareorb.com/'
            scopes={['user_profile', 'user_media']}
            onLoginSuccess={this.setIgToken}
            onLoginFailure={(data) => console.log(data)}
          />
        </View>
        

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
