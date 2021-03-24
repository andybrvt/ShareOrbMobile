import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Routes from './Routes'
import { NavigationContainer } from '@react-navigation/native';
import axios from "axios";
// import * as dateFns from 'date-fns';
// import './global.js';



class App extends Component{
  constructor(props){
    super(props)
  }


  componentDidMount(){
      axios.get(`${global.IP_CHANGE}/userprofile/all-users`)
      .then(res => {
        console.log(res)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  render(){

    return(
      <NavigationContainer>
        <Routes />
      </NavigationContainer>


    )
  }
}



export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
