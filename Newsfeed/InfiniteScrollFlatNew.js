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
import { User, Users } from "react-native-feather";
import * as dateFns from 'date-fns';
import  authAxios from '../util';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import * as smallGroupsActions from '../store/actions/smallGroups';
import NoPosts from './noPosts.svg';
import FirstPost from './FirstPost';
import { PlusCircle, UserPlus, Info } from "react-native-feather";
import WebSocketSmallGroupInstance from '../Websockets/smallGroupWebsocket';
import NoPostsGroup from './noPostsGroup.svg';
// this is used mostly for the new scroll newsfeed
class InfiniteScrollFlatNew extends React.Component{

  navGroupInfo=()=> {
    const groupId = this.props.groupId
    this.props.navigation.navigate("GroupInfo",{
      groupId: groupId
    });
  }

  // for this one here you will try to connect to the websocket
  // given the group id and then try to grab all the post of that
  // group
  constructor(props){
      super(props)

      if(this.props.isAuthenticated){


        // initialize the websocket here
        this.initialiseSmallGroup()
      }
  }


  componentDidUpdate(prevProps){


  }
  componentWillUnmount(){

  }


  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#f0f0f0",
          marginBottom:15,
        }}
      />
    );
  }

  initialiseSmallGroup(){
    // used to connect to the websocket and then pull the intial
    // group info

    const groupId = this.props.groupId
    this.waitForSmallGroupsSocketConnection(() => {
      //fetch the stuff here
      WebSocketSmallGroupInstance.fetchGroupPost(groupId)
    })

    // connect there now
    WebSocketSmallGroupInstance.connect(groupId)

  }

  waitForSmallGroupsSocketConnection(callback){
    const component = this
    setTimeout(
      function(){
        if(WebSocketSmallGroupInstance.state() === 1){
          callback()
          return;
        } else {
          component.waitForSmallGroupsSocketConnection(callback);
        }
      }, 100)
  }


  state = {
    list: [1,2,3],
    refreshing: false,
    start: 6,
    addMore: 5,
    hasMore: true,
    currentMonth: dateFns.format(new Date(), "MMMM"),
    currentDay: dateFns.format(new Date(), "d")
  }

  // loadSocialPost = () => {
  //   const {start, addMore} = this.state;
  //   const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
  //   authAxios.get(`${global.IP_CHANGE}/mySocialCal/infiniteSocial/`+curDate+"/"+start+'/'+addMore)
  //   .then( res => {
  //     this.props.loadMoreSocialPost(res.data.socialPost)
  //     const hasMore = res.data.has_more;
  //     this.setState({
  //       hasMore:hasMore,
  //       loading: false,
  //       start: start+addMore
  //     })
  //
  //   })
  //   .catch( err => {
  //     this.setState({
  //       error: err.message
  //     })
  //   })
  // }

  // onRefresh = () => {
  //   this.setState({refreshing: true})
  //   const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
  //   WebSocketSocialNewsfeedInstance.fetchSocialPost(
  //     this.props.id,
  //     curDate,
  //     6
  //   )
  //   this.setState({refreshing: false});
  // }

  onRefresh = () => {
    this.setState({
      refreshing: true
    })
    const groupId = this.props.groupId

    WebSocketSmallGroupInstance.fetchGroupPost(groupId)

    this.setState({
      refreshing: false
    })
  }

  loadSocialPost = () => {
    const {start, addMore} = this.state;
    const groupId = this.props.groupId

    authAxios.get(`${global.IP_CHANGE}/mySocialCal/infiniteSmallGroup/`+groupId+"/"+start+"/"+addMore)
    .then( res => {
      console.log(res.data)
      const serializedPost = res.data.serializedPost;
      const groupId = res.data.groupId;
      const hasMore = res.data.has_more;

      const loadObj = {
        serializedPost,
        groupId
      }

      this.props.loadMoreSmallGroupPost(loadObj)

      this.setState({
        hasMore:hasMore,
        loading: false,
        start: start+addMore
      })

    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })

  }

  renderPost = ({item}) => {
    return(
        <SocialNewsfeedPost
          y = {this.props.y}
          navigation = {this.props.navigation}
          ViewProfile = {this.props.ViewProfile}
          data = {item}
          onCommentOpen = {this.props.onCommentOpen}
          groupId = {this.props.groupId}
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

  renderEmptyContainer(){
    return(
      <View
        style = {{
            alignItems: 'center',
            height:'100%',
            backgroundColor:'red',
            flex: 1}}>
        <Text>No post in group</Text>
          <View style ={{
              top: '15%',
              alignItems: 'center'
            }}>
            <NoPostsGroup width = {150} height = {150} />

          </View>
      </View>
    )
  }

  render(){

    let post = [];
    if(this.props.socialPosts){
      post = this.props.socialPosts
    }

    let groupPost = [];
    if(this.props.groupPost){
      const groupId = this.props.groupId.toString()

      groupPost = this.props.groupPost[groupId]
      // groupPost = this.props.groupPost
      // console.log(this.props.groupPost, 'stuff here')
    }



    return(
      <View style = {{flex: 1}} >



        <View style={{zIndex: 999, position:'absolute', right:'10%', bottom:'15%',}}>
        <TouchableOpacity
          onPress={() => this.navGroupInfo()}
          style={styles.roundButton1}>

          <Users stroke="white" strokeWidth={2.5} width={20} height={20} />
        </TouchableOpacity>
        </View>

          <FlatList
            ItemSeparatorComponent = { this.FlatListItemSeparator }
            // onViewableItemsChanged={this.onViewableItemsChanged }
            contentContainerStyle={{
              paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle = {16} // important for animation
            // onScroll = {onScrollEvent({y})}
            data = {groupPost}
            renderItem = {this.renderPost}
            keyExtractor={(item, index) => String(index)}
            onEndReachedThreshold={0.5}
            onEndReached = {() => this.loadSocialPost()}
            onRefresh = {() => this.onRefresh()}
            refreshing = {this.state.refreshing}
            // style={{top:130,}}
            style={{paddingBottom:10,}}
            ListEmptyComponent={this.renderEmptyContainer()}

            />



      </View>
    )
  }
}

const styles = StyleSheet.create({
  roundButton1: {

    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 100,
    left:10,
    bottom:10,
    backgroundColor: '#1890ff',
    elevation:15,
  },

})

const mapStateToProps = state => {

  return{
    isAuthenticated: state.auth.token !== null,
    id: state.auth.id,
    userName: state.auth.username,
    socialPosts: state.socialNewsfeed.socialPosts,
    following: state.auth.following,
    curLoad: state.auth.curLoad,
    groupPost: state.smallGroups.groupPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMoreSmallGroupPost: (posts) => dispatch(smallGroupsActions.loadMoreSmallGroupPost(posts)),
    loadMoreSocialPost: (post) => dispatch(socialNewsfeedActions.loadMoreSocialPost(post)),
    openShowCamera: () => dispatch(authActions.openShowCamera()),
    authAddUnaddFollowing: (following) => dispatch(authActions.authAddUnaddFollowing(following))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollFlatNew);
