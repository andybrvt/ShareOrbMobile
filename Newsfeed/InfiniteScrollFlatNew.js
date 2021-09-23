import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
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
import { User } from "react-native-feather";
import * as dateFns from 'date-fns';
import  authAxios from '../util';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import NoPosts from './noPosts.svg';
import FirstPost from './FirstPost';
import { PlusCircle, UserPlus, Info } from "react-native-feather";
class InfiniteScrollFlatNew extends React.Component{

  state = {
    list: [1,2,3],
    refreshing: false,
    start: 6,
    addMore: 5,
    hasMore: true,
    currentMonth: dateFns.format(new Date(), "MMMM"),
    currentDay: dateFns.format(new Date(), "d")
  }

  loadSocialPost = () => {
    const {start, addMore} = this.state;
    const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/infiniteSocial/`+curDate+"/"+start+'/'+addMore)
    .then( res => {
      this.props.loadMoreSocialPost(res.data.socialPost)
      const hasMore = res.data.has_more;
      this.setState({
        hasMore:hasMore,
        loading: false,
        start: start+addMore
      })

    })
    .catch( err => {
      this.setState({
        error: err.message
      })
    })
  }

  onRefresh = () => {
    this.setState({refreshing: true})
    const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
    WebSocketSocialNewsfeedInstance.fetchSocialPost(
      this.props.id,
      curDate,
      6
    )
    this.setState({refreshing: false});
  }

  renderPost = ({item}) => {
    return(
        <SocialNewsfeedPost
          y = {this.props.y}
          navigation = {this.props.navigation}
          ViewProfile = {this.props.ViewProfile}
          data = {item}
          onCommentOpen = {this.props.onCommentOpen}

           />

    )
  }



  renderItem = ({item}) => {

    return(
      <View>
        <Text>Hi</Text>
      </View>
    )

  }

  render(){

    let post = [];
    if(this.props.socialPosts){
      post = this.props.socialPosts
    }

    return(
      <View>

        <FlatList
          // onViewableItemsChanged={this.onViewableItemsChanged }
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle = {16} // important for animation
          // onScroll = {onScrollEvent({y})}
          data = {post}
          renderItem = {this.renderPost}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={0.5}
          onEndReached = {() => this.loadSocialPost()}
          onRefresh = {() => this.onRefresh()}
          refreshing = {this.state.refreshing}
          // style={{top:130,}}
          style={{top:20,}}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  

})

const mapStateToProps = state => {

  return{
    id: state.auth.id,
    userName: state.auth.username,
    socialPosts: state.socialNewsfeed.socialPosts,
    following: state.auth.following,
    curLoad: state.auth.curLoad
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMoreSocialPost: (post) => dispatch(socialNewsfeedActions.loadMoreSocialPost(post)),
    openShowCamera: () => dispatch(authActions.openShowCamera()),
    authAddUnaddFollowing: (following) => dispatch(authActions.authAddUnaddFollowing(following))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollFlatNew);
