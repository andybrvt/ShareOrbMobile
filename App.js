import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createStackNavigator, TransitionPresets} from '@react-navigation/stack';

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
import * as socialActions from './store/actions/socialCalendar';
import * as notificationsActions from './store/actions/notifications';

import { connect } from 'react-redux';
import NewsfeedView from './Newsfeed/NewsfeedView';
import InfiniteScrollFlat from './Newsfeed/InfiniteScrollFlat';
import Explore from './Explore/Explore';
import Friends from './Friends';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Chats from './Chats/Chats';
import ExploreWebSocketInstance from './Websockets/exploreWebsocket';
import WebSocketSocialNewsfeedInstance from './Websockets/socialNewsfeedWebsocket';
import ChatSidePanelWebSocketInstance from './Websockets/newChatSidePanelWebsocket';
import SocialCommentsWebsocketInstance from './Websockets/commentsCellWebsocket';
import SocialCalCellPageWebSocketInstance from './Websockets/socialCalCellWebsocket';
import NotificationWebSocketInstance from './Websockets/notificationWebsocket';

// import BottomNavigation from './BottomNavigation';
import { TabActions } from '@react-navigation/native';
import Constant from 'expo-constants';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import * as Font from 'expo-font';
import { faComments, faUser } from '@fortawesome/free-regular-svg-icons'
import PostingPage from './PostingFolder/PostingPage';
import CameraScreen from './PostingFolder/CameraScreen';
import NewPostingPage from './PostingFolder/NewPostingPage';
import TestDrag from './PostingFolder/TestDrag';
import Profile from './ProfilePage/Profile';
import UserProfile from './ProfilePage/UserProfile';
import ViewProfile from './ProfilePage/ViewProfile';
import EditProfile from './ProfilePage/EditProfile';
import Notifications from './ProfilePage/Notifications';
import EditBio from './ProfilePage/EditBio';
import Followers from './ProfilePage/Followers';
import Following from './ProfilePage/Following';
import PersonalFollowers from './ProfilePage/PersonalFollowers';
import PersonalFollowing from './ProfilePage/PersonalFollowing';
import ImageBrowserScreen from './Newsfeed/ImageBrowserScreen';
import MessageFriend from './Chats/MessageFriend';
import ChatSearch from './Chats/ChatSearch';
import Comments from './Newsfeed/Comments.js';

import Settings from './Settings/Settings';
import Privacy from './Settings/Privacy';
import UserInfo from './Settings/UserInfo';

import AlbumHome from './CollabAlbum/AlbumHome';
import CreateAlbum from './CollabAlbum/CreateAlbum';
import PicAlbum from './CollaCollabAlbumbAlbum/PicAlbum';
import InviteFriends from './CollabAlbum/InviteFriends';

import { Ionicons } from '@expo/vector-icons';
import { ArrowUpCircle, Search, Home, Disc, Aperture, BookOpen, User, MessageCircle, FolderPlus} from "react-native-feather";
import TestReanimated from './PostingFolder/TestReanimated';
import DayAlbum from './SocialCalendar/DayAlbum.js';
import Test from './PostingFolder/Test';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useScrollToTop } from '@react-navigation/native';

import * as dateFns from 'date-fns';


const TopTab = createMaterialTopTabNavigator();
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
    this.initialiseNotification()
    WebSocketSocialNewsfeedInstance.addCallbacks(
      this.props.id,
      this.props.loadSocialPosts.bind(this),
      this.props.addSocialPostLike.bind(this),
      this.props.loadCurSocialCell.bind(this),
      this.props.addFirstSocialCellPost.bind(this),
      this.props.updateSocialCellPost.bind(this)
    )

    ExploreWebSocketInstance.addCallbacks(
      // add the call backs here
      this.props.loadProfile.bind(this),
      this.props.addFollowerUnfollower.bind(this),

    )

    ChatSidePanelWebSocketInstance.addCallbacks(
      // These function is to set the chats in
      this.props.setChats.bind(this)
    )

    SocialCommentsWebsocketInstance.addCallbacks(
      this.props.loadSocialComments.bind(this),
      this.props.sendSocialComment.bind(this)
    )

    SocialCalCellPageWebSocketInstance.addCallbacks(
      this.props.fetchSocialCalCellPage.bind(this)
    )

    NotificationWebSocketInstance.addCallbacks(
      this.props.setNotifications.bind(this),
      this.props.newNotification.bind(this),
      // this.props.updateRequestList.bind(this),
      // this.props.newUpRequestList.bind(this),
      // this.props.authAddFollower.bind(this),
      // this.props.authUpdateFollowers.bind(this),
      // this.props.addOneNotificationSeen.bind(this)
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
      if(parseInt(this.props.id) !== parseInt(prevProps.id) && this.props.id !== null && this.props.username !== null){
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

        NotificationWebSocketInstance.disconnect()

        this.waitForNotificationSocketConnection(() => {
            NotificationWebSocketInstance.fetchFriendRequests(
              this.props.id
            )
          })
        NotificationWebSocketInstance.connect(this.props.username)


      }
    }
  }

  initialiseNotification(){
    this.waitForNotificationSocketConnection(() => {
      NotificationWebSocketInstance.fetchFriendRequests(
        this.props.id
      )
    })
    NotificationWebSocketInstance.connect(this.props.username)

  }

  waitForNotificationSocketConnection (callback) {
    const component = this;
    setTimeout(
      function(){

        if (NotificationWebSocketInstance.state() === 1){

          callback();
          return;
        } else{

            component.waitForNotificationSocketConnection(callback);
        }
      }, 100)

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
  createHomeStack = () =>{
    return (
      <Stack.Navigator screenOptions={{headerShown: false,}} >
        <Stack.Screen name = "newsfeed" component= {NewsfeedView}/>
        <Stack.Screen name = 'ProfilePage' component = {UserProfile}/>
      </Stack.Navigator>

    )
  }
  followerFollowingTab=(props)=>{

    return(

      <TopTab.Navigator
        swipeEnabled={true}
        tabBarPosition="top"
        backBehavior = "history"
        barStyle = {{
          backgroundColor: "white",

        }}>

        <TopTab.Screen
          initialParams = {props.route.params.following}
          name="Following"
          component={Following} />
        <TopTab.Screen name="Followers" component={Followers} />
      </TopTab.Navigator>


    )
  }

  pFollowerFollowingTab=(props)=>{

    return(

      <TopTab.Navigator
        swipeEnabled={true}
        tabBarPosition="top"
        backBehavior = "history"
        barStyle = {{
          backgroundColor: "white",

        }}>

        <TopTab.Screen
          initialParams = {props.route.params.following}
          name="Following"
          component={PersonalFollowing} />
        <TopTab.Screen name="Followers" component={PersonalFollowers} />
      </TopTab.Navigator>


    )
  }

  // This function will be used as the tab navigator, because there are certain
  // pages you dont wnat to have the bottom bar on  so you would wnat to render
  // the home page first and then start rendering the tab stack seperatly
  createTabStack = () =>{
    const curDate = dateFns.format(new Date(), "yyyy-MM-dd");


    return (
      <Tab.Navigator
        initialRouteName = "Home"
        barStyle = {{
          backgroundColor: "white",
          height:50,
        }}
        shifting={false}
        labeled={true}
        backBehavior = "history"

        >
        <Tab.Screen
          name="Home"
          // component={NewsfeedView}
          children = {this.createHomeStack}
          options={{
             tabBarLabel: false,
             tabBarIcon: ({ color }) => (
               <Home stroke={color} strokeWidth={2} width={25} height={25} />
             ),
           }}
           listeners = {({navigation}) => ({
             tabPress: event => {
               // useScrollToTop(ref)
               // WebSocketSocialNewsfeedInstance.fetchSocialPost(
               //   this.props.id,
               //   curDate,
               //   this.state.upperStart)

             }
           })}


           />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
             tabBarLabel: false,
             tabBarIcon: ({ color }) => (
                <Search stroke={color} strokeWidth={2} width={25} height={25} />
             ),
           }}
           />

           <Tab.Screen
             name="Upload"
             component={CameraScreen}
             options={{
               tabBarLabel: false,
                tabBarIcon: ({ color }) => (
                  <Aperture style={{bottom:5}} stroke="white" fill="#1890ff" strokeWidth={2} width={40} height={40}  />
                ),
                // ...TransitionPresets.ModalSlideFromBottomIOS,
              }}

            listeners = {({navigation}) => ({
              tabPress: event => {
                // event.preventDefault();
                this.props.openShowCamera()
              }
            })}
              />
         <Tab.Screen
           name="AlbumHome"
           component={AlbumHome}
           options={{
              tabBarLabel: 'AlbumHome',
              tabBarLabel: false,
              tabBarIcon: ({ color }) => (
                  <BookOpen stroke={color} strokeWidth={2} width={25} height={25} />
              ),
            }}
            />


            <Tab.Screen
               name="Profile"
               component={Profile}

               options={{

                 tabBarLabel: false,
                  tabBarIcon: ({ color }) => (
                    <User stroke={color} strokeWidth={2} width={25} height={25} />
                  ),
                }}
                initialParams = {{
                  username: this.props.username
                }}

                listeners={{
                   tabPress: e => {
                     // Prevent default action
                     if(this.props.username === null){
                       // e.preventDefault();
                       this.props.grabUserCredentials()


                     }
                   },
                 }}
                />

      </Tab.Navigator>
    )
  }

  render(){

    const showPostModal = this.props.showFinalModal
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
                  //keep this here, its important
                  // headerMode ="none"
                  initialRouteName = "tabs"
                  screenOptions={{
                    gestureEnabled: true
                    // headerShown: false,
                  }}
                    >

                    <Stack.Screen
                      options={{headerShown: false, }}
                      name = "tabs" component= {this.createTabStack}/>
                    <Stack.Screen

                      name = "FollowTab" component= {this.followerFollowingTab}
                      options={{
                        headerStyle:{
                          shadowColor:'#fff', //ios
                          elevation:0,        // android

                        },

                         ...TransitionPresets.SlideFromRightIOS,
                                        }}
                      />

                    <Stack.Screen

                      name = "PFollowTab" component= {this.pFollowerFollowingTab}
                      options={{
                        headerStyle:{
                          shadowColor:'#fff', //ios
                          elevation:0,        // android

                        },

                         ...TransitionPresets.SlideFromRightIOS,
                                        }}
                      />

                  <Stack.Screen
                    options={{
                      headerShown: true,
                      gestureEnabled: true,
                      gestureDirection: showPostModal ? "vertical-inverted" : "vertical",
                    }}
                    name = 'PostingPage' component = {PostingPage}/>
                  <Stack.Screen
                    options={{
                      headerShown: true,
                      gestureEnabled: true,
                      gestureDirection: showPostModal ? "vertical-inverted" : "vertical",
                    }}
                    name = 'CameraScreenTrue' component = {CameraScreen}/>

                  <Stack.Screen
                      name = 'Comments'
                      options={{
                        headerShown: false,
                        cardStyle: { backgroundColor: 'transparent' },
                        cardOverlayEnabled: true,
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                          cardStyle: {
                            opacity: progress.interpolate({
                              inputRange: [0, 0.5, 0.9, 1],
                              outputRange: [0, 0.25, 0.7, 1],
                            }),
                          },
                          overlayStyle: {
                            opacity: progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 0.5],
                              extrapolate: 'clamp',
                            }),
                          },
                        }),
                      }}
                      mode="modal"
                      component = {Comments}/>
                  <Stack.Screen
                    options={{
                      headerStyle:{
                        shadowColor:'#fff', //ios
                        elevation:0,        // android

                      },
                       ...TransitionPresets.SlideFromRightIOS,
                                      }}
                     name = 'MessageFriend' component = {MessageFriend}/>
                     <Stack.Screen
                       options={{
                         headerStyle:{
                           shadowColor:'#fff', //ios
                           elevation:0,        // android
                         },
                         title: 'Chats',
                          ...TransitionPresets.SlideFromRightIOS,
                        }}
                     name = 'Chats' component = {Chats}/>

                     <Stack.Screen
                       options={{
                         headerStyle:{
                           shadowColor:'#fff', //ios
                           elevation:0,        // android
                         },
                         title: 'Notifications',
                          ...TransitionPresets.SlideFromRightIOS,
                        }}
                        name = 'Notifications' component = {Notifications}/>
                   <Stack.Screen
                     options={{
                       headerStyle:{
                         shadowColor:'#fff', //ios
                         elevation:0,        // android
                       },
                       title: 'Edit Profile',
                        ...TransitionPresets.SlideFromRightIOS,
                      }}

                      name = 'EditProfile' component = {EditProfile}/>
                  <Stack.Screen
                    options={{
                      headerStyle:{
                        shadowColor:'#fff', //ios
                        elevation:0,        // android
                      },
                      title: 'Followers',
                       ...TransitionPresets.SlideFromRightIOS,
                     }}

                     name = 'Followers' component = {Followers}/>
                 <Stack.Screen
                   options={{
                     headerStyle:{
                       shadowColor:'#fff', //ios
                       elevation:0,        // android
                     },
                     title: 'Following',
                      ...TransitionPresets.SlideFromRightIOS,
                    }}
                    name = 'Following' component = {Following}/>
                 <Stack.Screen
                   options={{
                     headerShown: false,
                     title: 'Show Day',
                      ...TransitionPresets.SlideFromRightIOS,
                                     }}
                    name = 'DayAlbum' component = {DayAlbum}/>
                    <Stack.Screen
                      options={{
                        headerStyle:{
                          shadowColor:'#fff', //ios
                          elevation:0,        // android

                        },
                        title: 'Create Album',
                        ...TransitionPresets.SlideFromRightIOS,
                                        }}
                       name = 'CreateAlbum' component = {CreateAlbum}/>
                       <Stack.Screen
                         options={{
                           headerStyle:{
                             shadowColor:'#fff', //ios
                             elevation:0,        // android

                           },
                           title: 'PicAlbum',
                           ...TransitionPresets.SlideFromRightIOS,
                                           }}
                          name = 'PicAlbum' component = {PicAlbum}/>
                       <Stack.Screen
                         options={{
                           headerStyle:{
                             shadowColor:'#fff', //ios
                             elevation:0,        // android

                           },
                           title: 'Invite Friends',
                           ...TransitionPresets.ModalSlideFromBottomIOS,
                                           }}
                          name = 'InviteFriends' component = {InviteFriends}/>
                 <Stack.Screen
                   options={{
                     title: 'Search Friends',
                                     }}
                    name = 'ChatSearch' component = {ChatSearch}/>
                  <Stack.Screen
                    options={{
                      title: 'Your Name',
                    }}
                    name = 'ViewProfile' component = {ViewProfile}/>
                  <Stack.Screen
                    options={{
                      headerStyle:{
                        shadowColor:'#fff', //ios
                        elevation:0,        // android
                      },
                      title: 'Settings',
                       ...TransitionPresets.SlideFromRightIOS,
                     }}
                     name = 'Settings' component = {Settings}/>
                   <Stack.Screen
                     options={{
                       headerStyle:{
                         shadowColor:'#fff', //ios
                         elevation:0,        // android
                       },
                       title: 'Privacy',
                        ...TransitionPresets.SlideFromRightIOS,
                      }}
                      name = 'Privacy' component = {Privacy}/>
                    <Stack.Screen
                      options={{
                        headerStyle:{
                          shadowColor:'#fff', //ios
                          elevation:0,        // android
                        },
                        title: 'User Info',
                         ...TransitionPresets.SlideFromRightIOS,
                       }}
                       name = 'UserInfo' component = {UserInfo}/>
                  <Stack.Screen
                    options={{
                      headerStyle:{
                        shadowColor:'#fff', //ios
                        elevation:0,        // android
                      },
                      title: 'Bio',
                       ...TransitionPresets.SlideFromRightIOS,
                                      }}


                      name = 'EditBio' component = {EditBio}/>
                  <Stack.Screen
                    name = "ImageBrowserScreen"
                    options={{
                      title: 'Selected 0 files',
                    }}
                    component = {ImageBrowserScreen} />

                  <Stack.Screen
                    name = "otherProfile"
                    component = {Profile}
                     />

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
    loading: state.auth.loading,
    showFinalModal: state.socialNewsfeed.showFinalModal,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
    grabUserCredentials: () => dispatch(authActions.grabUserCredentials()),

    loadSocialPosts: post => dispatch(socialNewsfeedActions.loadSocialPosts(post)),
    addSocialPostLike: postObj => dispatch(socialNewsfeedActions.addSocialPostLike(postObj)),
    loadCurSocialCell: socialCell => dispatch(socialNewsfeedActions.loadCurSocialCell(socialCell)),
    addFirstSocialCellPost: socialCell => dispatch(socialNewsfeedActions.addFirstSocialCellPost(socialCell)),
    updateSocialCellPost: socialCell => dispatch(socialNewsfeedActions.updateSocialCellPost(socialCell)),

    loadSocialComments: socialComments => dispatch(socialNewsfeedActions.loadSocialComments(socialComments)),
    sendSocialComment: socialComment => dispatch(socialNewsfeedActions.sendSocialComment(socialComment)),

    loadProfile: profile => dispatch(exploreActions.loadProfile(profile)),
    addFollowerUnfollower: followObject => dispatch(exploreActions.addFollowerUnfollower(followObject)),


    setChats: chats => dispatch(messageActions.setChats(chats)),
    fetchSocialCalCellPage:socialCalCellObj => dispatch(socialActions.fetchSocialCalCellPage(socialCalCellObj)),

    openShowCamera: () => dispatch(authActions.openShowCamera()),

    setNotifications: notifications => dispatch(notificationsActions.setNotifications(notifications)),
    newNotification: notification => dispatch(notificationsActions.newNotification(notification)),


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
