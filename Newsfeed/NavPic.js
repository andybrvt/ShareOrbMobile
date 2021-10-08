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
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
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

  render(){
    const screenWidth = Math.round(Dimensions.get('window').width);


    return (
      <BackgroundContainer>
        <View>
        <Image source={require('https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80')} style = {{height: 200, width: 250, resizeMode : 'stretch',}} />
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
