import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

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
import Constant from 'expo-constants';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import * as Font from 'expo-font';
import { faComments, faUser } from '@fortawesome/free-regular-svg-icons'
import PostingPage from './Newsfeed/PostingPage';
import ViewProfile from './ProfilePage/ViewProfile';
import ImageBrowserScreen from './Newsfeed/ImageBrowserScreen';
import MessageFriend from './Chats/MessageFriend';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


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
      if(parseInt(this.props.id) !== parseInt(prevProps.id) && this.props.id !== null){
        // Now this will see if there is a person logged in
        // Now if you want to connect to the chat,
        // since there is an inital connection you have to disconnect it
        ChatSidePanelWebSocketInstance.disconnect();
        this.waitForChatsSocketConnection(() =>{
          ChatSidePanelWebSocketInstance.fetchChats(
            this.props.id
          )
        })


        // Now you can try to connect
        ChatSidePanelWebSocketInstance.connect(this.props.id)

      }
    }
  }

  initialiseChats(){
    this.waitForChatsSocketConnection(() => {
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

  // // This will be the navigation inside the home component ,
  // // you are pretty much making a stack navigation in side a tab navigation
  // createHomeStack = () =>{
  //   return (
  //     <Stack.Navigator screenOptions={{headerShown: false,}} >
  //       <Stack.Screen name = "newsfeed" component= {NewsfeedView}/>
  //       <Stack.Screen name = 'PostingPage' component = {PostingPage}/>
  //     </Stack.Navigator>
  //
  //   )
  // }


  // This function will be used as the tab navigator, because there are certain
  // pages you dont wnat to have the bottom bar on  so you would wnat to render
  // the home page first and then start rendering the tab stack seperatly
  createTabStack = () =>{
    return (
      <Tab.Navigator
        initialRouteName = "Home"
        barStyle = {{
          backgroundColor: "white",

        }}
        >
        <Tab.Screen
          name="Home"
          component={NewsfeedView}
          // children = {this.createHomeStack}
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
    )
  }

  render(){
    // <View style={styles.container}>
    //       <Text style={{ fontSize: 200 }}>Default Font</Text>
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
        <SafeAreaProvider>
          <NavigationContainer>
            {
              !this.props.loading && this.props.username ?
                <Stack.Navigator
                  mode = "modal"
                  // headerMode ="none"
                  initialRouteName = "newsfeed"
                  // screenOptions={{headerShown: false, }}
                    >
                  <Stack.Screen
                    options={{headerShown: false, }}
                    name = "newsfeed" component= {this.createTabStack}/>
                  <Stack.Screen
                    name = 'PostingPage' component = {PostingPage}/>

                    <Stack.Screen
                      options={{
                        title: 'Friend Name',
                      }}
                       name = 'MessageFriend' component = {MessageFriend}/>
                  <Stack.Screen
                    options={{
                      title: 'Your Name',
                    }}
                     name = 'ViewProfile' component = {ViewProfile}/>
                  <Stack.Screen
                    name = "ImageBrowserScreen"
                    options={{
                      title: 'Selected 0 files',
                    }}
                    component = {ImageBrowserScreen} />

                </Stack.Navigator>
                :
                <Routes {...this.props} />
            }
          </NavigationContainer>
        </SafeAreaProvider>
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
