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
import { authLogin, authInvited, authSuccess } from "../store/actions/auth";
import * as ImagePicker from 'expo-image-picker';
import { ArrowRightCircle, Instagram } from "react-native-feather";
import axios from "axios";
import { WebView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import InstagramLogin from 'react-native-instagram-login';
import authAxios from '../util';
import * as dateFns from 'date-fns';



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

      console.log(res.data)

      axios.request(
      {
        method: 'GET',
        url: 'https://instagram-growth.p.rapidapi.com/v2/profile',
        params: {username: res.data.username},
        headers: {
          'x-rapidapi-host': 'instagram-growth.p.rapidapi.com',
          'x-rapidapi-key': '1e025a4798msh54c2561d9a1a213p1cb936jsn57712b6587f8'
        }
      }
    ).then(res => {

      const data = res.data
      console.log(res.data.id, 'second function call')
      console.log(res.data.profile_pic_url, 'second function call')
      console.log(res.data.full_name, 'second function call')
      console.log(res.data.username, 'second function call')



      const tempUsername = res.data.id
      const tempPassword = res.data.id+"ShareOrb123"

      // Now try login here

      axios.post(`${global.IP_CHANGE}/rest-auth/login/`, {
        username: tempUsername,
        password: tempPassword
      })
      .then(res => {

        const token = res.data.key
        AsyncStorage.setItem('token', token)
        this.props.authSuccess(token)

      })
      .catch(err => {

        console.log('no account here')
        //if there is no account you will go through sign up

        this.onSignupSubmit(data.id, data.full_name, data.username,data.profile_pic_url)


      })


      }).catch(function (error) {



      });



    })
  }


  onSignupSubmit = (id, firstName, username, profilePic) => {

    const lastName = "";
    const email = "a"+id+"@gmail.com"
    const password = id+"ShareOrb123"

    console.log(id, firstName, username, email, password)
    return axios.post(`${global.IP_CHANGE}/rest-auth/registration/`, {
      username: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      dob: dateFns.format(new Date(), "yyyy-MM-dd"),
      password1: password,
      password2: password
    }).then(res => {

      console.log(res.data)
      const token = res.data.key;
      const formData = new FormData();
      const newPic = profilePic
      console.log(newPic)

      formData.append("profilePic", newPic)


      AsyncStorage.setItem('token', token)

      authAxios.post(`${global.IP_CHANGE}/userprofile/changeProfilePic`,
        formData
      ).then( res => {
        this.setState({
          loading:false
        })
        this.props.authSuccess(token);
        this.props.navigation.navigate("")
      })


    })
    .catch( err => {
      alert('Check email or use a different one')
      this.setState({
        loading:false
      })
    })
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
    if(this.state.instaInfo){
      console.log(this.state.instaInfo.id)
      console.log(this.state.token)
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>

        <View
          style = {styles.background}>
           <StatusBar style="auto" />

             <TouchableOpacity
               onPress = {() => this.handleSignupDirect()}
               style = {styles.regSignup}>
               <Text style={{color:'white', fontSize:12}} >Sign up</Text>
             </TouchableOpacity>

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
              style={styles.loginBtn1}
              onPress={() => this.instagramLogin.show()}>
              <Instagram
                style={{right:5}}
                stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
              <Text style={{ color: 'white', textAlign: 'center', fontSize:16 }}> Use Instagram</Text>
            </TouchableOpacity>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          {/*
            <Text style={{ margin: 10 }}>Token: {this.state.token}</Text>
          */}
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
    invited: (token) => dispatch(authInvited(token)),
    authSuccess:(token) => dispatch(authSuccess(token))
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(Login);
