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
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash/lib/module/v1';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const {interpolate, Extrapolate} = Animated;


class InfiniteScrollFlat extends React.Component{




  renderPost = ({item}) => {



    return(

        <SocialNewsfeedPost
          navigation = {this.props.navigation}
          ViewProfile = {this.props.viewProfile}
          data = {item}
          onCommentOpen = {this.props.onCommentOpen}
           />

    )
  }

  render(){

    let post = [];
    if(this.props.socialPosts){
      post = this.props.socialPosts
    }


    const y = this.props.y;
    const top = interpolate(y,{
      inputRange: [0, 50],
      outputRange: [50, 0],
      extrapolate: Extrapolate.CLAMP
    })

    return(
      <Animated.View
        style = {{
          top: top,
        }}
        >

        <AnimatedFlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle = {16} // important for animation
          onScroll = {onScrollEvent({y})}
          data = {post}
          renderItem = {this.renderPost}
          keyExtractor={item => item.id.toString()}

           />
       </Animated.View>
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
