import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  processColor
 } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import { connect } from 'react-redux';
import Header from './Header';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import InfiniteScroll from './InfiniteScroll';
import { Avatar, BottomNavigation } from 'react-native-paper';
import * as dateFns from 'date-fns';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import LoadingBar from '../RandomComponents/LoadingBar';
import AppIntro from '../Login/AppIntro';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import InfiniteScrollFlat from './InfiniteScrollFlat';
import NewsfeedComment from './NewsfeedComment';
import { LinearGradient } from 'expo-linear-gradient';
import PersonalNewsFeed from './PersonalNewsFeed';
import authAxios from '../util';
import * as Progress from 'react-native-progress';
import FirstPost from './FirstPost';
import SwipeInfiniteScrollHolder from './SwipeInfiniteScrollHolder';

const { Clock, interpolateColors, Extrapolate, cond, sub,divide, eq, add, call, set, Value, event, or } = Animated;
const height = Dimensions.get('window').height
class NewsfeedView extends React.Component{
  y = new Value(0);
  color = new Value(0);
  handleLogOut = () => {
  this.props.logout()
    // this.props.navigation.navigate("Login")
  }

  changeFeed = () => {
    this.setState({
      newsFeedCondition: !this.state.newsFeedCondition,
    });

  }



  componentDidMount = () => {
  }

  ViewProfile = (username) => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    if(username !== this.props.username){
      this.props.navigation.navigate("ProfilePage", {
        username: username
      })
    } else {
      this.props.navigation.navigate("Profile")
    }

  }

  constructor(props){
    super(props)
    this.state={
      username: '',
      id: '',
      postShow:false,
      eventShow:false,
      upperStart: 6,
      newsFeedCondition:true,
    }
    this.myRef = React.createRef();
    this.commentRef = React.createRef();
    if(this.props.isAuthenticated){

      // this only hits once
      this.initialiseSocialNewsfeed()
    }
  }

  initialiseSocialNewsfeed(){

    const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
    // use to initialize the social newsfeed
    this.waitForSocialNewsfeedSocketConnection(() => {
      // You will fetch the social cotnent type here
      WebSocketSocialNewsfeedInstance.fetchSocialPost(
        this.props.id,
        curDate,
        this.state.upperStart
      )
    })
    WebSocketSocialNewsfeedInstance.connect()

  }

  waitForSocialNewsfeedSocketConnection(callback){
  const component = this
  setTimeout(
    function(){
      if(WebSocketSocialNewsfeedInstance.state() === 1){
        callback()
        return;
      } else {
        component.waitForSocialNewsfeedSocketConnection(callback);
      }
    }, 100)
}

  componentDidUpdate(prevProps){

    if(prevProps !== this.props){
      const curDate = dateFns.format(new Date(), "yyyy-MM-dd")

      // WebSocketSocialNewsfeedInstance.disconnect()
      if(this.props.isAuthenticated){
        // this.waitForSocialNewsfeedSocketConnection(() => {
        //       // Fetch stuff here
        //   WebSocketSocialNewsfeedInstance.fetchSocialPost(
        //     this.props.id,
        //     curDate,
        //     this.state.upperStart)
        // })
        // WebSocketSocialNewsfeedInstance.connect()
      }


    if(this.props.curLoad >= this.props.totalLoad && this.props.totalLoad > 0){
      setTimeout(() => {
        this.props.authZeroTotalLoad()
        this.props.authZeroCurLoad()
      }, 2000)
      }


    }

  }

  ComponentWillUnmount(){
    // WebSocketSocialNewsfeedInstance.disconnect()
  }

  onCommentOpen = (postId) => {
    this.props.navigation.navigate("Comments", {
      postId: postId
    })
  }

  unShow = () => {
    authAxios.post(`${global.IP_CHANGE}`+'/userprofile/unShowIntialInstructions/'+this.props.id)
    .then(res => {
      this.props.unShowIntialInstructions(false)
    })
    .catch(err => {
      alert(err)
    })

  }



  render(){
    let curLoading = this.props.curLoad
    let totalLoading = this.props.totalLoad
    let showComments = this.props.showNewsfeedComments
    const backgroundGradient = interpolateColors(this.y, {
      inputRange: [0, 600],
      outputColorRange: ["black","#e6f7ff"],
    })

    const backgroundStyle = {
      backgroundColor: backgroundGradient
    }

    {/*
      <InfiniteScrollFlat
        style={{marginBottom:400}}
        y = {this.y}
        navigation = {this.props.navigation}
        onPagePost = {this.onPagePost}
        ViewProfile = {this.ViewProfile}
        onCommentOpen = {this.onCommentOpen}/>

      */}


    return(
      <BackgroundContainer>
        {/*
          // You can put the mini invite and video here
          <AppIntro
            {...this.props}
            visible = {this.props.showIntialInstructions}
            unShow = {this.unShow}
            />
          */}

        {
          this.props.showFirstPostModal ?
          <FirstPost
            visible = {this.props.showFirstPostModal}
            unShow = {this.props.authUnshowFirstPostModal}
            show = {this.props.authShowFirstPostModal}
             />
           :
           null
        }
          <Animated.View
            style = {{
              // backgroundColor: backgroundGradient
            }}
            >

            {this.state.newsFeedCondition?

                <SwipeInfiniteScrollHolder
                  smallGroups = {this.props.smallGroups}
                   />


              :
                <PersonalNewsFeed
                  navigation = {this.props.navigation}
                  />
            }



          </Animated.View>



      </BackgroundContainer>



    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"whitesmoke"
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#1890ff"
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },

})

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    username: state.auth.username,
    id: state.auth.id,
    profilePic: state.auth.profilePic,
    following: state.auth.following,
    curLoad: state.auth.curLoad,
    totalLoad: state.auth.totalLoad,
    showNewsfeedComments: state.socialNewsfeed.showNewsfeedComments,
    showIntialInstructions: state.auth.showIntialInstructions,
    notificationSeen: state.auth.notificationSeen,
    showFirstPostModal: state.auth.showFirstPostModal,
    smallGroups: state.auth.smallGroups
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout()),
    authZeroCurLoad: () => dispatch(authActions.authZeroCurLoad()),
    authZeroTotalLoad: () => dispatch(authActions.authZeroTotalLoad()),
    newsFeedCommentSec: () => dispatch(socialNewsfeedActions.newsFeedCommentSec()),
    unShowIntialInstructions: (bool) => dispatch(authActions.unShowIntialInstructions(bool)),
    authShowFirstPostModal: () => dispatch(authActions.authShowFirstPostModal()),
    authUnshowFirstPostModal: () => dispatch(authActions.authUnshowFirstPostModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedView);
