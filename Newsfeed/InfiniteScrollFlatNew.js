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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import Header from './Header';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import NewsfeedButtonContainer from './NewsfeedButtonContainer';
import SocialNewsfeedPost from './SocialNewsfeedPost';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash/lib/module/v1';
import { User, Users,ChevronsLeft } from "react-native-feather";
import * as dateFns from 'date-fns';
import  authAxios from '../util';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import * as smallGroupsActions from '../store/actions/smallGroups';
import NoPosts from './noPosts.svg';
import FirstPost from './FirstPost';
import { PlusCircle, UserPlus, Info } from "react-native-feather";
import WebSocketSmallGroupInstance from '../Websockets/smallGroupWebsocket';
import NoPostsGroup from './noPostsGroup.svg';
import { Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
// this is used mostly for the new scroll newsfeed
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
const width=SCREEN_WIDTH;

const height = Dimensions.get('window').height

const coverScale = 1.7;
const col = 3;
const numColumns=2


const formatData = (data) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const data2=[
    {
        "firstName": "Miyah Myles",
        "lastName": "Myles",
        "itemImage": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
    },
    {
        "firstName":  "June",
        "lastName": "Cha",
        "itemImage": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
    },
    {
        "firstName": "Miyah Myles",
        "lastName": "Myles",
        "itemImage": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
    },
    {
        "firstName":  "June",
        "lastName": "Cha",
        "itemImage": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
    },
    {
        "firstName":  "June",
        "lastName": "Cha",
        "itemImage": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
    },
    {
        "firstName": "Miyah Myles",
        "lastName": "Myles",
        "itemImage": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
    },
    {
        "firstName":  "June",
        "lastName": "Cha",
        "itemImage": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
    },

    {
        "firstName": "Miyah Myles",
        "lastName": "Myles",
        "itemImage": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
    },
]

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
];



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

    const groupId = this.props.route.params.orbId
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

  onNavPicDirect = (postId, groupId) => {

    this.props.navigation.navigate("NavPic", {
      postId: postId,
      groupId:groupId,
      groupName:this.props.tabLabel.name,

    })
  }


  setName=(firstName, lastName)=>{
    let name=""
    let lastCut=""
    let total=0
    first = global.CAPITALIZE(firstName)
    last = global.CAPITALIZE(lastName)
    name=first+" "+last
    lastCut=lastName.substring(0,1)
    total=firstName.length+lastName.length
    if(total>10){
      name=first+" "+lastCut+"."
    }
    return name
  }


  ViewProfile = (username) => {

    if(username === this.props.username){
      this.props.navigation.navigate("Profile");
    } else {
      this.props.navigation.navigate("ProfilePage", {
        username: username
      })
    }
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

    let userUsername="";
    let firstName="";
    let lastName="";
    let profilePic="";
    let itemImage = "";
    let video = "";

    if(item) {
      if(item.creator.first_name){
        firstName = item.creator.first_name;
      }
      if(item.creator.last_name){
        lastName = item.creator.last_name;
      }
      if(item.creator.username){
        userUsername = item.creator.username
      }
      if(item.creator.profile_picture){
        profilePic = `${global.IMAGE_ENDPOINT}`+item.creator.profile_picture;
      }
    }
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        delayPressIn={750}
        onPress = {() => this.onNavPicDirect(item.id, item.smallGroup)}
        activeOpacity={0.8}
        style={styles.item}
      >

        <Image
          style ={{
            width: "100%",
            height: '100%'
          }}
          resizeMode = "cover"
          source = {{
            uri:  `${global.IMAGE_ENDPOINT}`+item.itemImage
          }}
           />

           <LinearGradient
             start={{x: 0, y: 0}} end={{x: 0, y:1.25}}
             style = {{
               position: 'absolute',
               width: '100%',
               bottom: '0%',
               height: "30%"
             }}
             colors = {['transparent', '#000000']}>
           </LinearGradient>

         <View style = {{
           position: 'absolute',
           width: '100%',
           bottom: '0%',
           height: "20%",
           flexDirection:'row',
           alignItems:'center',
           }}>
             <View style={{
               width: '15%',
               marginLeft:5,
               marginRight:7.5,
               }}>
               <Avatar
                 onPress = {() => this.ViewProfile(userUsername)}
                 size={20}
                 rounded
                 source = {{
                   uri: profilePic
                 }}
               />
           </View>


           <Text style = {styles.videoFooterUserName}>
             {this.setName(firstName, lastName)}
           </Text>

       </View>

      </TouchableOpacity>
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

  listHeader = () => {

    const groupPic = this.props.route.params.groupPic
    const groupName = this.props.route.params.groupName

    return(
      <View style = {styles.header}>
        <Avatar
          size={120}
          rounded
          source = {{
            uri: `${global.IMAGE_ENDPOINT}`+ groupPic
          }}
        />
      <Text style = {styles.groupName}>{groupName}</Text>
      </View>
    )
  }

  render(){

    // let post = [];
    // if(this.props.socialPosts){
    //   post = this.props.socialPosts
    // }
    let groupId = '';
    let groupPic = "";
    let groupName  = "";
    let groupPost = [];

    if(this.props.route.params.orbId){
      groupId = this.props.route.params.orbId
    }
    if(this.props.route.params.groupPic){
      groupPic = this.props.route.params.groupPic
    }
    if(this.props.route.params.groupName){
      groupName = this.props.route.params.groupName
    }



    if(this.props.groupPost){
      groupPost = this.props.groupPost
    }


    return(
      <SafeAreaView style = {{flex: 1}}>

        <TouchableOpacity
          onPress = {() => this.props.navigation.goBack()}
          style = {{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <ChevronsLeft />
          <Text>Back</Text>
        </TouchableOpacity>

        <View style={{zIndex: 999, position:'absolute', right:'10%', bottom:'7%',}}>
        <TouchableOpacity
          onPress={() => this.navGroupInfo()}
          style={styles.roundButton1}>

          <Users stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
        </TouchableOpacity>
        </View>
              <FlatList
                ListHeaderComponent = {this.listHeader}
                maxToRenderPerBatch={10}
                extraData={groupPost}
                windowSize={10}
                initialNumToRender={3}
                contentContainerStyle={{
                  paddingBottom: 75 }}
                 data={groupPost}
                 keyExtractor={(item, index) => String(index)}
                 onEndReachedThreshold={0.5}
                 onEndReached = {() => this.loadSocialPost()}
                 // onRefresh = {() => this.onRefresh()}
                 // refreshing = {this.state.refreshing}
                 scrollEventThrottle = {16} // important for animation
                 renderItem={this.renderItem}
                 numColumns={3}
             />

         </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  videoFooterUserName: {
    color:'white',
    fontSize:11,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },
  item: {
    // backgroundColor: '#4D243D',
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
  header: {
    height: height*0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  groupName: {
    marginTop: 10,
    fontSize: 25
  }
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
