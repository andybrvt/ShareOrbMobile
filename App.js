import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Routes from './Routes'
import { NavigationContainer, createAppContainer } from '@react-navigation/native';
import axios from "axios";
import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// import * as dateFns from 'date-fns';
// import './global.js';
import * as authActions from './store/actions/auth';
import { connect } from 'react-redux';
import NewsfeedView from './Newsfeed/NewsfeedView';
import Explore from './Explore/Explore';
import SocialCalendar from './SocialCalendar/SocialCalendar';
import Friends from './Friends';
import Login from './Login/Login';
import Signup from './Signup/Signup';
// import BottomNavigation from './BottomNavigation';

const Tab = createMaterialBottomTabNavigator();



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
          <Tab.Navigator>
            <Tab.Screen name="NewsfeedView" component={NewsfeedView} />
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen name="SocialCalendar" component={SocialCalendar} />
            <Tab.Screen name="Friends" component={Friends} />

          </Tab.Navigator>
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
