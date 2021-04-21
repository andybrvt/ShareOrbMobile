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
import * as messageActions from './store/actions/messages';
import { connect } from 'react-redux';
import NewsfeedView from './Newsfeed/NewsfeedView';
import Explore from './Explore/Explore';
import Friends from './Friends';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Chats from './Chats/Chats';
import ExploreWebSocketInstance from './Websockets/exploreWebsocket';
import WebSocketSocialNewsfeedInstance from './Websockets/socialNewsfeedWebsocket';
import ChatSidePanelWebSocketInstance from './Websockets/newChatSidePanelWebsocket';
import Profile from './ProfilePage/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch,
   faUserCircle,
   faHome,
   faMapSigns,
   faPlusSquare,

 } from '@fortawesome/free-solid-svg-icons'
// import BottomNavigation from './BottomNavigation';
import { TabActions } from '@react-navigation/native';

import * as Font from 'expo-font';
import { faComments, faUser } from '@fortawesome/free-regular-svg-icons'

const Tab = createMaterialBottomTabNavigator();



class App extends Component{
    state = {
    fontsLoaded: true,
  };
  constructor(props){
    super(props)

    // Since you want to show chats at the beginning of your
    // login because people might have unread messages so you
    // wnat to render it along with notificaitons

    this.initialiseChats()


    WebSocketSocialNewsfeedInstance.addCallbacks(
      this.props.id,
      this.props.loadSocialPosts.bind(this),


    )

    ExploreWebSocketInstance.addCallbacks(
      // add the call backs here
      this.props.loadProfile.bind(this)
    )

    ChatSidePanelWebSocketInstance.addCallbacks(
      // These function is to set the chats in
      this.props.setChats.bind(this)
    )

  }

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Montserrat: require('./assets/fonts/Montserrat.ttf'),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      'Montserrat-SemiBold': {
        uri: require('./assets/fonts/Montserrat-SemiBold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount(){

    this.props.onTryAutoSignup();
    //this.loadFonts();
  }

  componentDidUpdate(prevProps){
    if(this.props.isAuthenticated){
      // This one is when you have an update of the props, especially whne you
      // login... check if you are authenticated and then
      // grab the userinfromation

      this.props.grabUserCredentials()
    }

  }

  initialiseChats(){
    this.waitForChatsSocketConnection(() => {
      console.log('initla chats')
      console.log(this.props.id)
      ChatSidePanelWebSocketInstance.fetchChats(
        this.props.id
      )

    })
    ChatSidePanelWebSocketInstance.connect(this.props.id)

  }

  waitForChatsSocketConnection(callback) {
    const component = this;
    setTimeout(
      function(){

        if (ChatSidePanelWebSocketInstance.state() === 1){

          callback();
          return;
        } else{

            component.waitForChatsSocketConnection(callback);
        }
      }, 100)

  }

  render(){
    // <View style={styles.container}>
    //       <Text style={{ fontSize: 20 }}>Default Font</Text>
    //       <Text style={{ fontFamily: 'Montserrat', fontSize: 20 }}>Montserrat</Text>
    //       <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20 }}>
    //         Montserrat-SemiBold
    //       </Text>
    //     </View>
    // pretty much how this works is that you will have a nativgation for the
    // login page and one for the other when authetnicated, when you are not auth
    // you will get a serpate navigation for the login and sign up but hwne you are
    // auth you get the bottom bar

    if (this.state.fontsLoaded) {
    return(

      <PaperProvider>
        <NavigationContainer>

          {
            !this.props.loading && this.props.username ?
              <Tab.Navigator
                initialRouteName = "Home"
                barStyle = {{
                  backgroundColor: "white",

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
                     name="Upload"
                     component={Explore}
                     options={{

                        tabBarIcon: ({ color }) => (
                          <FontAwesomeIcon
                            size = {35}
                            color = {'#1890ff'}
                            icon={faPlusSquare} />
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
                          icon={faComments} />
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
                          username: this.props.username
                        }}

                        listeners={{
                           tabPress: e => {
                             // Prevent default action
                             if(this.props.username === null){
                               e.preventDefault();


                             }
                           },
                         }}
                        />






              </Tab.Navigator>

              :

              <Routes {...this.props} />


          }

        </NavigationContainer>

      </PaperProvider>


    )
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    username: state.auth.username,
    id: state.auth.id,
    loading: state.auth.loading


  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
    grabUserCredentials: () => dispatch(authActions.grabUserCredentials()),

    loadSocialPosts: post => dispatch(socialNewsfeedActions.loadSocialPosts(post)),

    loadProfile: profile => dispatch(exploreActions.loadProfile(profile)),

    setChats: chats => dispatch(messageActions.setChats(chats)),

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
