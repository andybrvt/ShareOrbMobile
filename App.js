import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Routes from './Routes'
import { NavigationContainer } from '@react-navigation/native';
import axios from "axios";
import { Provider as PaperProvider } from 'react-native-paper';


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

    if(this.props.isAuthenticated){
      // This one is when you have an update of the props, especially whne you
      // login... check if you are authenticated and then
      // grab the userinfromation

      this.props.grabUserCredentials()
    }

  }

  render(){

    return(
      <PaperProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>

      </PaperProvider>


    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    username: state.auth.username,
    id: state.auth.id,


  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
    grabUserCredentials: () => dispatch(authActions.grabUserCredentials()),

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
