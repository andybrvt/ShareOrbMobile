import React from "react";
import { StatusBar } from "expo-status-bar";
import MainLogo from '../logo.svg';


import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from './LoginStyle';
import SvgUri from 'react-native-svg-uri';
import { List, InputItem } from 'antd-mobile';



class Login extends React.Component{



  handleClick = () => {
  this.inputRef.focus();
}

  render(){


    return (
      <View style = {styles.background}>



         <StatusBar style="auto" />
         <View style = {styles.logo}>
           <MainLogo height = {100}  width = {200} />
           <Text
             style = {styles.titleText}
             >Connecting People Through Calendars</Text>

         </View>


        <View style = {styles.inputHolders}>
          <View style = {styles.inputHolder}>
            <TextInput
              style = {styles.inputBox}
              placeholder = "Username"
              />
          </View>

          <View style = {styles.inputHolder}>
            <TextInput
              style = {styles.inputBox}

              placeholder = "Password"

              />
          </View>



        </View>

        <TouchableOpacity style = {styles.loginBtn}>
          <Text style = {styles.loginText}> Login</Text>
        </TouchableOpacity>

        <View style= {{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"}}>

          <Button

             title = "Sign up" />
        </View>


      </View>
    )

  }
}

export default Login;
