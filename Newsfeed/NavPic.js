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
      index: 0,
      routes: [
        { key: 'first', title: 'Calendar' },
        { key: 'second', title: 'Goals' },
      ]
    }
  }





  componentDidMount(){
  }


  render(){
    const screenWidth = Math.round(Dimensions.get('window').width);


    return (
      <BackgroundContainer>
        <View>
        <Text>hi</Text>
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
