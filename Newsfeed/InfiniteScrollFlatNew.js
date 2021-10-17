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
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
const width=SCREEN_WIDTH;
const coverScale = 1.7;
const col = 3;



const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
];

const numColumns=3;


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
    console.log('why it keep updatinging')

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

  componentWillUnmount(){
    WebSocketSmallGroupInstance.disconnect()
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




  renderItem = ({ item, index }) => {
    {/*
    renderItem = ({ item, index }) => {

      // if (item.empty === true) {
      //   return <View style={[styles.item, styles.itemInvisible]} />;
      // }
      if(item.itemImage){
        return (
          <View
            style={styles.item}
          >
            <Image
              style ={{
                width: "100%",
                height: '100%'
              }}
              resizeMode = "cover"
              source = {{
                uri: `${global.IMAGE_ENDPOINT}` + item.itemImage
              }}
               />

          </View>
        );
      } else {
        return (
          <View
            style={styles.item}
          >
            <Image
              style ={{
                width: "100%",
                height: '100%'
              }}
              resizeMode = "cover"
              source = {{
                uri: item
              }}
               />

          </View>
        );
      }

    };
    */}
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Image
          style ={{
            width: "100%",
            height: '100%'
          }}
          resizeMode = "cover"
          source = {{
            uri: `${global.IMAGE_ENDPOINT}` + item.itemImage
          }}
           />

      </View>
    );
  };


  renderEmptyContainer(){
    return(
      <View
        style = {{
            alignItems: 'center',
            height:'100%',
            flex: 1}}>
          <View style={{top:'25%',}}>
            <Text style={{fontSize:28, fontFamily:'Nunito-Bold'}}>No post in group</Text>
              <View style ={{
                  top: '15%',
                  alignItems: 'center'
                }}>
                <NoPosts width = {150} height = {150} />

              </View>
          </View>

      </View>
    )
  }

  render(){

    // let post = [];
    // if(this.props.socialPosts){
    //   post = this.props.socialPosts
    // }
    let test=0
    let groupPost = [];
    if(this.props.groupPost){
      const groupId = this.props.groupId.toString()
      groupPost = this.props.groupPost[groupId]

    }
    console.log("BBBB")
    // console.log(groupPost)
    test=formatData(groupPost, 2)
    groupPost.map(item => {
      console.log(item.itemImage)
    })
    console.log(groupPost)

    return(
      <View style = {{flex: 1}} >



        <View style={{zIndex: 999, position:'absolute', right:'10%', bottom:'15%',}}>
        <TouchableOpacity
          onPress={() => this.navGroupInfo()}
          style={styles.roundButton1}>

          <Users stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
        </TouchableOpacity>
        </View>
        {/*
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
            */}

            

            <ScrollView>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 75 }}
               data={test}
               keyExtractor={(item, index) => String(index)}
               onEndReachedThreshold={0.5}
               onEndReached = {() => this.loadSocialPost()}
               onRefresh = {() => this.onRefresh()}
               refreshing = {this.state.refreshing}
               scrollEventThrottle = {16} // important for animation
               renderItem={this.renderItem}
               numColumns={3}
             />
           </ScrollView>



      </View>
    )
  }
}

const styles = StyleSheet.create({


  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 2, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  roundButton1: {

    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 100,
    left:10,
    bottom:10,
    backgroundColor: '#2f54eb',
    elevation:15,
  },

})

const mapStateToProps = state => {

  return{
    isAuthenticated: state.auth.token !== null,
    id: state.auth.id,
    userName: state.auth.username,
    // socialPosts: state.socialNewsfeed.socialPosts,
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
