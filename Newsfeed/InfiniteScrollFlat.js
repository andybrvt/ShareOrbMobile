import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList
 } from 'react-native';
import axios from "axios";
import Header from './Header';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import NewsfeedButtonContainer from './NewsfeedButtonContainer';
import SocialNewsfeedPost from './SocialNewsfeedPost';


class InfiniteScrollFlat extends React.Component{




  renderPost = ({item}) => {

    return(

        <SocialNewsfeedPost
          navigation = {this.props.navigation}
          ViewProfile = {this.props.viewProfile}
          data = {item}
           />

    )
  }

  render(){

    let post = [];
    if(this.props.socialPosts){
      post = this.props.socialPosts
    }

    return(
      <View>
        <Text> this is the new newsfeed </Text>
        <FlatList
          data = {post}
          renderItem = {this.renderPost}
           />
      </View>
    )
  }



}

const mapStateToProps = state => {
  return{
    id: state.auth.id,
    userName: state.auth.username,
    socialPosts: state.socialNewsfeed.socialPosts
  }
}

export default connect(mapStateToProps, null)(InfiniteScrollFlat);
