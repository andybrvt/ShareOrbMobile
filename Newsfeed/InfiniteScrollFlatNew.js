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
  Alert,
  Dimensions,
  RefreshControl,
  TouchableWithoutFeedback,
  Pressable
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
import { Settings, User, Trash2, Users,ChevronsLeft, ArrowLeft, Edit2, CheckCircle} from "react-native-feather";
import { Video as Video1} from "react-native-feather";
import * as dateFns from 'date-fns';
import  authAxios from '../util';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import * as smallGroupsActions from '../store/actions/smallGroups';
import NoPosts from './noPosts.svg';
import FirstPost from './FirstPost';
import WebSocketSmallGroupInstance from '../Websockets/smallGroupWebsocket';
import NoPostsGroup from './noPostsGroup.svg';
import { Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Video, AVPlaybackStatus } from 'expo-av';
import { SharedElement } from "react-navigation-shared-element";
import NewGroupPost from './NewGroupPost';
import NoPostInOrb from './noPostInOrb.svg';

// this is used mostly for the new scroll newsfeed
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
const width=SCREEN_WIDTH;

import * as Progress from 'react-native-progress';


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

  navGroupInfo=(groupInfo)=> {
    this.props.navigation.navigate("GroupInfo",{
      groupId: groupInfo
    });
  }

  onOrbSettingDirect = (orbId) => {
    this.props.navigation.navigate("OrbSettings", {
      orbId: orbId
    })

  }

  // for this one here you will try to connect to the websocket
  // given the group id and then try to grab all the post of that
  // group
  constructor(props){
      super(props)

      if(this.props.isAuthenticated){
        // IF YOU WANT WEBSOCKET HERE JUST PUT THIS BACK
        // this.initialiseSmallGroup()
      }

      this.state = {
        deleteCondition:false,
        list: [],
        refreshing: false,
        start: 6,
        addMore: 5,
        hasMore: true,
        currentMonth: dateFns.format(new Date(), "MMMM"),
        currentDay: dateFns.format(new Date(), "d"),
        groupPosts: [],
        groupInfo: {}
      }
  }



  addToList = (vidId) => {
    // this function will be use to add to the list of videos you are trying to
    // delete

    this.setState({
      list:[...this.state.list, vidId]
    })
  }

  componentDidMount(){
    //add the most recents here
    const groupId = this.props.route.params.orbId
    const currentId = this.props.id
    // do an axios call here that checks if you are blocked or not
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/checkBlocked/`+currentId+"/"+groupId)
    .then(res => {

      if(res.data){
        // if true then that means you are blocked
        Alert.alert(
          "Blocked",
          "You are blocked from this orb",
          [
            {
              text: "Ok",
              style:'destructive',
              onPress: () => this.props.navigation.goBack()
            }
          ]


        )


      } else {

        // IF YOU ARE NOT BLOCKED THEN JUST GET THE INFO HERE

        authAxios.get(`${global.IP_CHANGE}/mySocialCal/fetchOrbPost/`+groupId)
        .then(res => {
          console.log(res.data, 'stuff hereh here')
          this.setState({
            groupPosts: res.data.posts,
            groupInfo: res.data.group
          })
        })
        // authAxios.get(`${global.IP_CHANGE}/userprofile/addRecentOrb/`+groupId)


      }





    })

    authAxios.get()

  }


  selectDelete = () => {
    this.setState({
      deleteCondition: !this.state.deleteCondition,
    })
  }



  componentDidUpdate(prevProps){


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

    // PUT THIS BACK IF YOU WANNA DO WEBSOCKETS
    // WebSocketSmallGroupInstance.disconnect()

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



  onRefresh = () => {
    this.setState({
      refreshing: true
    })
    const groupId = this.props.route.params.orbId
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

  changeVideo = e => {
    this.setState({
      video: e
    })

  }

  goBackMethod = e => {
    this.setState({
      video: ''
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
    const groupId = this.props.route.params.orbId

    if(this.state.hasMore){
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
      if(item.video){
        video = `${global.IMAGE_ENDPOINT}`+item.video
      }
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
    // console.log(`${global.IMAGE_ENDPOINT}`+item.itemImage)
    return (

      <NewGroupPost
        addTo = {this.addToList}
        triggerDelete={this.state.deleteCondition}
        changeVideo={this.changeVideo}
        value={this.state.video}
        groupInfo={this.props.route.params}
        navigation={this.props.navigation}
        item = {item}
        setName = {this.setName}
        username = {this.props.username}
        id = {this.props.id}
        />


    );
  };

  deleteSubmit = () => {
    const formData = new FormData();

    formData.append('posts', JSON.stringify(this.state.list))
    authAxios.post(`${global.IP_CHANGE}/mySocialCal/deletePostMultiple`,
      formData
    ).then( res => {
      this.onRefresh()
    })

  }

  confirmDelete = () => {

      Alert.alert(
        "Delete Posts",
        "Are you sure you want to delete these posts?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes",
            style:'destructive', onPress: () => this.deleteSubmit() }
        ]
      )

  }

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

  joinOrb = () => {
    const groupId = this.props.route.params.orbId

    authAxios.post(`${global.IP_CHANGE}/mySocialCal/joinSmallGroup/`+groupId+"/"+this.props.id)
    .then(res => {
      this.setState({
        groupInfo: res.data
      })
    })

  }

  listHeader = () => {
    const creatorId = this.props.route.params.creator
    const groupPic = this.props.route.params.groupPic
    const groupName = this.props.route.params.groupName
    const groupId = this.props.route.params.orbId


    return(
      <View style = {styles.header}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1, }}>
            <TouchableOpacity
              onPress = {() => this.props.navigation.goBack(0)}
              >
              <ArrowLeft
              stroke = "black"
              height = {25}
              width = {25} />
          </TouchableOpacity>
          </View>
          <View style={{flex:2, alignItems:'center'}}>
            <Text>
               <Avatar
                size={110}
                rounded
                source = {{
                  uri: `${global.IMAGE_ENDPOINT}`+ groupPic
                }}/>
            </Text>
            <Text style = {styles.groupName}>{groupName}</Text>

          </View>
          <View style={{flexDirection:'column', alignItems:'flex-end', flex:1, }}>
            <TouchableOpacity
              onPress={() => this.navGroupInfo(groupId)}
              style={styles.roundButton1}>
              <Users stroke="gray" strokeWidth={2.5} width={22.5} height={22.5} />
            </TouchableOpacity>


            {
              this.props.id === creatorId ?

              <TouchableOpacity
                style={{marginTop:50}}
                onPress={() => this.selectDelete()}
                >
                <Edit2 stroke="gray" strokeWidth={2.5} width={22.5} height={22.5} />
              </TouchableOpacity>

              :
              null

            }

            {
              this.props.id === creatorId ?

              <TouchableOpacity
                style={{marginTop:25}}
                onPress = {() => this.onOrbSettingDirect(groupId)}
                >
                <Settings stroke="gray" strokeWidth={2.5} width={22.5} height={22.5} />
              </TouchableOpacity>

              :
              null

            }


          </View>
        </View>
      </View>
    )
  }


  onCameraNav = () => {
    const groupPic = this.props.route.params.groupPic
    const groupName = this.props.route.params.groupName
    const groupId = this.props.route.params.orbId

    this.props.navigation.navigate("Camera", {
      groupPic: groupPic,
      groupName: groupName,
      groupId: groupId
    })
  }

  renderEmptyContainer(){

    return(
      <View style = {{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <NoPostInOrb width = {150} height = {150}/>
        <Text style = {{
            fontSize: 20,
          }}>No posts yet, let's show some love!</Text>
      </View>
    )
  }

  keyExtractor = (item, index) => String(index)

  render(){

    // let post = [];
    // if(this.props.socialPosts){
    //   post = this.props.socialPosts
    // }



    let groupId = '';
    let groupPic = "";
    let groupName  = "";
    let groupPosts = this.state.groupPosts;
    let showButton = false;
    let creatorId = ""
    let video=""
    let members = []


    if(this.props.route.params.orbId){
      groupId = this.props.route.params.orbId
    }
    if(this.props.route.params.groupPic){
      groupPic = this.props.route.params.groupPic
    }
    if(this.props.route.params.groupName){
      groupName = this.props.route.params.groupName
    }
    if(this.props.route.params.showButton){
      showButton = this.props.route.params.showButton
    }
    if(this.props.route.params.creator){
      creatorId = this.props.route.params.creator
    }

    if(this.state.groupInfo.members){
      members = this.state.groupInfo.members
    }





    return(
      <SafeAreaView style = {{flex: 1}}>

        {this.state.video?
          null
          :
          <Progress.Bar
            animationType = "timing"
            borderWidth = {0}
            style = {{
              position: 'relative',
              left: 0,
            }}
            progress = {this.props.curLoad}
            width = {width}

             />
        }












        {/*this.state.video?
          <View >
            <TouchableOpacity
              style = {{
                position:'absolute', top:'5%', left:'5%',
                zIndex:100,
              }}
              onPress = {() => this.goBackMethod()}
              >
              <ArrowLeft
                stroke = "white"
                height = {35}
                width = {35} />

            </TouchableOpacity>
          <Video
            style = {{
              width: '100%',
              height: '100%',
              zIndex:99,
            }}
              resizeMode = "cover"
              source = {{
                uri: this.state.video
                // uri: `${global.IMAGE_ENDPOINT}`+video
              }}
              rate={1.0}
              isMuted={false}
              volume={0.5}
              isLooping
              shouldPlay

             />

         </View>
        :
        <View></View>

      */}



          <FlatList
            ListHeaderComponent = {this.listHeader}
            maxToRenderPerBatch={12}
            windowSize={5}
            contentContainerStyle={{
              paddingBottom: 75 }}
             data={groupPosts}
             keyExtractor={this.keyExtractor}
             // onEndReachedThreshold={0.2}
             // onEndReached = {this.loadSocialPost}
             // onRefresh = {this.onRefresh}
             // refreshing = {this.state.refreshing}
             scrollEventThrottle = {16} // important for animation
             renderItem={this.renderItem}
             numColumns={3}
             ListEmptyComponent={this.renderEmptyContainer}

         />

         {this.state.deleteCondition?
           <TouchableOpacity
             onPress = {() => this.confirmDelete()}
             style = {styles.trashButton}>
             <Trash2
               stroke="white" strokeWidth={2.5} width={20} height={20} />
             <Text style = {{
                 color: 'white',
                 fontSize: 18,
                 fontFamily:'Nunito-SemiBold',
               }}>  Delete</Text>

           </TouchableOpacity>

           :
           <View style = {{
               position: 'absolute',
               bottom: '3%',
               alignSelf: 'center',
               width: '45%',
             }}>
         {

           members.includes(this.props.id) ?

           <TouchableOpacity
             style = {styles.videoButton}
             onPress = {() => this.onCameraNav()}

             >

             <View
               style={{flexDirection:'row', alignItems:'center'}}
               >
               <Video1
                 stroke="white" strokeWidth={2.5} width={20} height={20} />
               <Text style = {{
                   color: 'white',

                   fontSize: 18,
                   fontFamily:'Nunito-SemiBold',
                 }}>  Share</Text>

             </View>

           </TouchableOpacity>

           :

           <TouchableOpacity
             style = {styles.videoButton1}
             onPress = {() => this.joinOrb()}

             >

             <View
               style={{flexDirection:'row', alignItems:'center'}}
               >
               <Text style = {{
                 color: 'white',

                 fontSize: 18,
                 fontFamily:'Nunito-SemiBold',
               }}>  Join</Text>

             </View>

           </TouchableOpacity>




         }

  </View>
       }

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
    alignSelf: "flex-end",
    zIndex:99,
    elevation:15,
    top: '5%',
    right: '5%',
    position:'absolute'
  },
  header: {
    padding:20,

    justifyContent: 'center'
  },
  groupName: {
    marginTop: 5,
    fontSize: 20,
    fontFamily:'Nunito-Bold'
  },
  videoButton: {
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'limegreen',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 25,
    height: 40,
    shadowColor:'black',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.5,
    position:'relative'
  },
  videoButton1: {
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 25,
    height: 40,
    shadowColor:'black',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.5,
    position:'relative'
  },
  trashButton: {
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5222d',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    alignSelf: 'center',
    borderRadius: 25,
    height: 40,
    shadowColor:'black',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.5,
    position: 'absolute',
    bottom: '3%',
  },


  videoButtonD: {
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 25,
    height: 40,
    shadowColor:'black',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.5,
    position:'relative'

  },
  loginBtn1: {
    width: 150,
    borderRadius: 25,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "#40a9ff",
  },
  loginBtn: {
    width: 150,
    borderRadius: 25,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "lightgray",
  },
})

const mapStateToProps = state => {

  return{
    isAuthenticated: state.auth.token !== null,
    id: state.auth.id,
    userName: state.auth.username,
    following: state.auth.following,
    curLoad: state.auth.curLoad,
    groupPost: state.smallGroups.groupPosts,
    closeOrb: state.globeGroup.closeOrb
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
