import React from 'react';
import {
  Text,
  Platform,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
 } from 'react-native';

import { connect } from "react-redux";
import SinglePostWebsocketInstance from '../Websockets/singlePostWebsocket';
import Constant from 'expo-constants';
import { Appbar } from 'react-native-paper';
import BackgroundContainer from "../RandomComponents/BackgroundContainer";
import authAxios from '../util';

import { Tag, Bookmark, Search, ChevronRight, Settings
  ,MessageCircle, UserPlus, Users, Clock, Grid, Calendar, Clipboard} from "react-native-feather";
import { TabView, SceneMap } from 'react-native-tab-view';
import GoalContainer from '../GoalAlbum/GoalContainer';
import * as authActions from '../store/actions/auth';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { Avatar } from 'react-native-elements';
// This will be the bulk of the profile page
// this will be used for current user
class NavPic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      post:{}
    }

    // this.initialiseSinglePost()
  }


  componentDidMount(){

      const postId = this.props.route.params.postId
      // put a function where you pull the social post
      authAxios.get(`${global.IP_CHANGE}`+'/mySocialCal/getSinglePost/'+postId)
      .then(res => {
        console.log(res.data)
        this.setState({
          post: res.data
        })
      })
  }

  initialiseSinglePost(){
    const postId = this.props.route.params.postId

    this.waitForSinglePostSocketConnection(() => {
      // fetch info here
      SinglePostWebsocketInstance.fetchSinglePost(postId)
    })

    SinglePostWebsocketInstance.connect(postId)


  }

  waitForSinglePostSocketConnection(callback){
    const component = this;
    setTimeout(
      function(){
        if (SinglePostWebsocketInstance.state() === 1){
          callback();
          return;
        } else{
            component.waitForSinglePostSocketConnection(callback);
        }
      }, 100)
  }

  render(){
    const screenWidth = Math.round(Dimensions.get('window').width);


    return (
      <BackgroundContainer>
        <View>
        </View>
      </BackgroundContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentId: state.auth.id,
    currentUser: state.auth.username,
    curUserFriend: state.auth.friends,
    curRequested: state.auth.requestList,
    followers: state.auth.followers,
    following: state.auth.following,
    username: state.auth.username,
    profilePic: state.auth.profilePic,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    bio: state.auth.bio,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openShowCamera: () => dispatch(authActions.openShowCamera()),

  }
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps, mapDispatchToProps)(NavPic);
