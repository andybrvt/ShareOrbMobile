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
import * as authActions from './store/actions/auth';
import { connect } from 'react-redux';




class App extends Component{
  constructor(props){
    super(props)
  }


  componentDidMount(){
    this.props.onTryAutoSignup();

  }

  componentDidUpdate(prevProps){
    
  }

  render(){

    console.log(this.props)
    return(
      <NavigationContainer>
        <Routes />
      </NavigationContainer>


    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    username: state.auth.username,
    id: state.auth.id,


  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
