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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as authActions from './store/actions/auth';
import * as socialNewsfeedActions from './store/actions/socialNewsfeed';
import * as exploreActions from './store/actions/explore';
import { connect } from 'react-redux';
import NewsfeedView from './Newsfeed/NewsfeedView';
import Explore from './Explore/Explore';
import Friends from './Friends';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Chats from './Chats/Chats';
import ExploreWebSocketInstance from './Websockets/exploreWebsocket';
import WebSocketSocialNewsfeedInstance from './Websockets/socialNewsfeedWebsocket';
import Profile from './ProfilePage/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch,
   faBell,
   faUserCircle,
   faHome,
   faMapSigns,
   faUser,
   faComment } from '@fortawesome/free-solid-svg-icons'
// import BottomNavigation from './BottomNavigation';



const Tab = createMaterialBottomTabNavigator();



class App extends Component{
  constructor(props){
    super(props)

    WebSocketSocialNewsfeedInstance.addCallbacks(
      this.props.id,
      this.props.loadSocialPosts.bind(this),


    )

    ExploreWebSocketInstance.addCallbacks(
      // add the call backs here
      this.props.loadProfile.bind(this)
    )

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


    // pretty much how this works is that you will have a nativgation for the
    // login page and one for the other when authetnicated, when you are not auth
    // you will get a serpate navigation for the login and sign up but hwne you are
    // auth you get the bottom bar

    const username = this.props.username
    console.log(username)

    return(
      <PaperProvider>
        <NavigationContainer>

          {
            this.props.isAuthenticated ?
              <Tab.Navigator
                initialRouteName = "Home"
                barStyle = {{
                  backgroundColor: "#1890ff",

                }}
                >
                <Tab.Screen
                  name="Home"
                  component={NewsfeedView}
                  options={{
                     tabBarLabel: 'Home',
                     tabBarIcon: ({ color }) => (
                       <FontAwesomeIcon
                         size = {25}
                         color = {color}
                         icon={faHome} />
                     ),
                   }}
                   />
                <Tab.Screen
                  name="Explore"
                  component={Explore}
                  options={{
                     tabBarLabel: 'Explore',
                     tabBarIcon: ({ color }) => (
                       <FontAwesomeIcon
                         size = {25}
                         color = {color}
                         icon={faMapSigns} />
                     ),
                   }}
                   />
                 <Tab.Screen
                   name="Chats"
                   component={Chats}
                   options={{
                      tabBarLabel: 'Messages',
                      tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon
                          size = {25}
                          color = {color}
                          icon={faComment} />
                      ),
                    }}
                    />


              <Tab.Screen
                 name="Profile"
                 component={Profile}
                 options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                      <FontAwesomeIcon
                        size = {25}
                        color = {color}
                        icon={faUser} />
                    ),
                  }}
                  initialParams = {{
                    username: username
                  }}
                  />


              </Tab.Navigator>

              :

              <Routes />


          }

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

    loadSocialPosts: post => dispatch(socialNewsfeedActions.loadSocialPosts(post)),

    loadProfile: profile => dispatch(exploreActions.loadProfile(profile)),

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
