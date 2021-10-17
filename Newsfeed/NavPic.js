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
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  Modal
 } from 'react-native';
import * as dateFns from 'date-fns';
import { connect } from "react-redux";
import SinglePostWebsocketInstance from '../Websockets/singlePostWebsocket';
import Constant from 'expo-constants';
import { Appbar } from 'react-native-paper';
import BackgroundContainer from "../RandomComponents/BackgroundContainer";
import authAxios from '../util';
import { LinearGradient } from 'expo-linear-gradient';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Tag, Bookmark,  Heart, Search, ChevronRight, Settings
  ,MessageCircle, UserPlus, Users, Clock, Grid, Calendar, Clipboard} from "react-native-feather";
import { TabView, SceneMap } from 'react-native-tab-view';
import GoalContainer from '../GoalAlbum/GoalContainer';
import * as authActions from '../store/actions/auth';
import { Avatar } from 'react-native-elements';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import NotificationWebSocketInstance from  '../Websockets/notificationWebsocket';
import WebSocketSmallGroupInstance from '../Websockets/smallGroupWebsocket';
import SingleComment from './SingleComment';
import DisplayLikeList from './DisplayLikeList';
import FastImage from 'react-native-fast-image'

// This will be the bulk of the profile page
// this will be used for current user
class NavPic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      post:{},
      showLike: false
    }

    // this.initialiseSinglePost()
  }

  onShowLike = () => {
    this.props.navigation.navigate("DisplayLikeList", {
      likePeople: this.state.post.people_like
    })
  }

  renderComment = ({item}) => {
    const profilePic = `${global.IMAGE_ENDPOINT}`+item.commentUser.profile_picture
    const user = item.commentUser
    return(
       <SingleComment item = {item} />
    )
  }

  ViewProfile = (username) => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    if(username === this.props.username){
      this.props.navigation.navigate("Profile");

    } else {
      this.props.navigation.navigate("ProfilePage", {
        username: username
      })
    }

  }


  renderPostInfo=(data)=>{


    let postId = "";
    let calCell = "";
    let username = "";
    let cellYear = "";
    let cellMonth = "";
    let cellDay = "";
    let location = "";
    let userUsername="";
    let post = {};
    let profilePic="";
    let userPostImages = []
    let like_people = [];
    let commentList = [];
    let peopleLikeId = []
    let postCreatedAt= new Date();
    let contentTypeId="";
    let ownerId = "";
    let cellDate = "";
    let firstName="";
    let lastName="";
    let likeAvatarList=[]
    let itemImage = "";
    let video = "";
    let calComment = 0;
    let caption="";
    let notificationToken = "";
    let goal = "";

    let utc3 = dateFns.format(new Date(), 'h:mma');

    if(data){
      if(data.caption){
        caption = data.caption
      }
      if(data.creator){
        if(data.creator.profile_picture){
          profilePic = `${global.IMAGE_ENDPOINT}`+data.creator.profile_picture
        }
        if(data.creator.first_name){
          firstName = data.creator.first_name;
        }
        if(data.creator.last_name){
          lastName = data.creator.last_name;
        }
        if(data.creator.id){
          ownerId = data.creator.id
        }
        if(data.creator.username){
          userUsername = data.creator.username
        }
        if(data.creator.notificationToken){
          notificationToken = data.creator.notificationToken
        }

        if(data.created_at) {
          postCreatedAt=data.created_at
          if(!isNaN(new Date(data.created_at).getTimezoneOffset()/60)){
            const dtDateOnly1 = dateFns.addHours(new Date(data.created_at), new Date(data.created_at).getTimezoneOffset()/60)
            utc3=dateFns.format(new Date(dtDateOnly1), 'M/dd');
          }
        }
      }
      if(data.calCell){
        calCell = data.calCell
      }
      if(data.id){
        postId = data.id
      }
      if(data.goal){
        goal = data.goal
      }

      if(data.itemImage){
        itemImage = `${global.IMAGE_ENDPOINT}`+data.itemImage;
      }
      if(data.video){
        if(data.video !== null){
          video = `${global.IMAGE_ENDPOINT}`+data.video;
          // video taken from the local site does not work but the videos
          // taken from pretty much any where else works (sounds good to me)
        }

      }
      if(data.people_like){
        like_people = data.people_like
      }
      if(data.get_socialCalItemComment){
        calComment =data.get_socialCalItemComment.length
      }
    }
    if(like_people.length > 0){
      for(let i = 0; i< like_people.length; i++){
        peopleLikeId.push(like_people[i].id)
      }
    }

    // if(data.people_like.length>0)
    // {
    //   likeAvatarList = data.people_like.map(item => {
    //    return {
    //      imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
    //    };
    //    });
    // }

    let socialMonth=""
    let socialDay=""
    // timestamp=postCreatedAt
    // const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)
    // socialMonth = `${dateFns.format(new Date(timestamp), "MMMM")}`;
    // socialDay = `${dateFns.format(new Date(timestamp), "d")}`;

    timestamp=postCreatedAt
    // const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)
    //
    socialMonth = `${dateFns.format(new Date(timestamp), "MMMM")}`;
    socialDay = `${dateFns.format(new Date(timestamp), "d")}`;
    return(
      <View>
        <View style={{flexDirection:'row', zIndex:999}}>

          <View style = {{

              width: '15%',
              alignItems:'center'
            }}>
            <Avatar
              onPress = {() => this.ViewProfile(userUsername)}
              size={37.5}
              rounded
              source = {{
                uri: profilePic
              }}
            />
          </View>

        <View style={{
            flexDirection:'column',  width:'50%'}}>
            <Text style = {styles.videoFooterUserName}>
              {global.NAMEMAKE(firstName, lastName)}
            </Text>
            <View style={{flexDirection:'row'}}>
              <Text style = {styles.videoFooterUserName2}>
                {socialMonth.substring(0,3)}&nbsp;
              </Text>
              <Text style = {styles.videoFooterUserName2}>
                {socialDay}
              </Text>
            </View>
          </View>


          <View style = {{
             alignItems: 'center',
             justifyContent: 'center',
             width: '35%'
            }}>
            <View style = {{
                flexDirection: 'row'
              }}>
              <TouchableOpacity
                onPress = {() => this.onShowLike()}
                >
                <View style = {styles.justifyCenter}>
                    <Text style = {{color: 'white'}}>Likes</Text>

                  <Text  style = {styles.statNum}>
                    {like_people.length}
                  </Text>
                </View>
              </TouchableOpacity>

              {/*
              {
                      peopleLikeId.includes(this.props.userId ) ?
                      <TouchableOpacity
                        onPress = {() => this.onUnlike(
                          postId,
                          this.props.userId,
                        )}
                        >
                        <View style = {styles.justifyCenter}>
                            <Heart
                              stroke = "red"
                              fill="red"
                              width = {27.5}
                              height = {27.5}
                               />

                          <Text  style = {styles.statNum}>
                            {like_people.length}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        onPress = {() => this.onLike(
                          postId,
                          this.props.userId,
                          ownerId,
                          notificationToken,
                        )}
                        >
                        <View style = {styles.justifyCenter}>
                            <Heart
                              stroke = "white"
                              fill="white"
                              width = {27.5}
                              height = {27.5}
                            />

                         <Text style = {styles.statNum}>
                          {like_people.length}
                        </Text>
                        </View>
                      </TouchableOpacity>
                  }

                  <TouchableWithoutFeedback>
                    <View style={{marginLeft:20,}}>
                        <View style = {styles.justifyCenter}>

                          <MessageCircle
                            stroke = "white"
                            fill="white"
                            width ={27.5}
                            height = {27.5}
                          />
                          <Text style = {styles.statNum}>
                            {calComment}
                          </Text>
                        </View>
                    </View>
                  </TouchableWithoutFeedback>
              */}
            </View>

          </View>



         </View>
      </View>

    )
  }

  componentDidMount(){

      const postId = this.props.route.params.postId
      // put a function where you pull the social post
      authAxios.get(`${global.IP_CHANGE}`+'/mySocialCal/getSinglePost/'+postId)
      .then(res => {
        console.log(res.data, 'stuffhre')
        this.setState({
          post: res.data
        })
      })

  }

  onLike = (
     postId,
     likerId,
     ownerId,
     notificationToken
   ) => {



     WebSocketSmallGroupInstance.onGroupPostLike(
       postId,
       likerId,
       this.props.groupId
     )



    const notificationObject = {
      command: 'group_like_notifcation',
      actor: likerId,
      recipient: ownerId,
      groupId: this.props.groupId
    }
    //  const notificationObject = {
    //    command: 'social_like_notification',
    //    actor: personLike,
    //    recipient: ownerId,
    //    socialItemId: socialItemId,
    //  }
    //
    NotificationWebSocketInstance.sendNotification(notificationObject)
    //
    //
    // WebSocketSocialNewsfeedInstance.sendSinglePostLike(
    //   socialItemId,
    //   personLike,
    // )
    global.SEND_GROUP_LIKE_NOTIFICATION(
      notificationToken,
      this.props.currentUser,
      this.props.groupId,
    )


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
    let post=this.state.post
    let postId=this.props.route.params.postId

    let peopleLikeId = []
    let like_people = [];
    let calComment = 0;
    let ownerId = "";
    let notificationToken = "";
    let caption="";
    let video = "";
    let comments=[];
    let userUsername="";
    if(post){
      if(post.people_like){
        like_people = post.people_like
      }
      if(post.caption){
        caption = post.caption
      }
      if(post.get_socialCalItemComment){
        calComment =post.get_socialCalItemComment.length
      }
      if(post.creator){
        userUsername =post.creator.username
      }
      if(post.get_socialCalItemComment){
        comments =post.get_socialCalItemComment
      }
      if(post.video){
        if(data.post !== null){
          video = `${global.IMAGE_ENDPOINT}`+post.video;
          // video taken from the local site does not work but the videos
          // taken from pretty much any where else works (sounds good to me)
        }

      }
      if(post.notificationToken){
        notificationToken = post.creator.notificationToken;
      }

    }
    if(like_people.length > 0){
      for(let i = 0; i< like_people.length; i++){
        peopleLikeId.push(like_people[i].id)
      }
    }
    return (
      <BackgroundContainer>
        <View style = {styles.container}>

           <TouchableOpacity
             activeOpacity={0.8}
            >
            <View >

           </View>
             {/* fastimage*/}
             {
               video === "" ?
               <TouchableWithoutFeedback
                 >
               <Image
                 style={styles.cover}
                 resizeMode = "cover"
                 source={{
                   uri:`${global.IMAGE_ENDPOINT}`+ post.itemImage,
                   // priority: FastImage.priority.normal,

                 }}
                 // resizeMode={FastImage.resizeMode.contain}

                 />
               </TouchableWithoutFeedback>
               :
               <TouchableWithoutFeedback
                 >
               <InViewPort
                 onChange = {this.handlePlaying}
                 >
                 <Video
                   ref={ref => {this.video = ref}}
                   style = {styles.cover}
                   source={{
                     // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                     uri: video
                   }}
                   rate={1.0}
                   isMuted={this.state.isMuted}
                   resizeMode="cover"
                   isLooping
                   // shouldPlay
                   volume={0.5}


                    />

                  {
                    !this.state.showMute ?

                    null

                    :

                    this.state.isMuted ?

                    <TouchableOpacity
                      onPress = {() => this.unMute()}
                      style = {styles.tagCSS4}>
                      <View style = {styles.justifyCenter}>
                        <VolumeX
                          stroke = "white"
                          width = {27.5}
                          height = {27.5}
                           />

                      </View>
                    </TouchableOpacity>

                    :


                    <TouchableOpacity
                      onPress = {()=> this.mute()}
                      style = {styles.tagCSS4}>
                      <View style = {styles.justifyCenter}>
                        <Volume2
                          stroke = "white"
                          width = {27.5}
                          height = {27.5}
                           />

                      </View>
                    </TouchableOpacity>

                  }




               </InViewPort>
               </TouchableWithoutFeedback>
             }

          </TouchableOpacity>


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
         {
           (caption.length==0)?
         <View style={{position:'absolute', marginTop:295, width:'100%', flexDirection:'row'}}>
           {this.renderPostInfo(post)}
         </View>
         :


         <View style={{position:'absolute', marginTop:250, width:'100%', flexDirection:'row'}}>
           {this.renderPostInfo(post)}
         </View>

       }
       {
         (caption.length==0)?
         <View>

         </View>
         :
         <View>

           <View style={styles.testWhere4}>
               <View style={styles.testWhere4}>
                 { (caption.length>30)?
                   <View style={{ width:'92.5%', flexWrap:'wrap', flexDirection:'row', }}>
                     <Text>
                       <Text style = {{fontSize:15, fontFamily:'Nunito-Bold', color:'white' }}>{userUsername+" "}</Text>
                       <Text style={styles.captionText}>{caption.substring(0,75)}</Text>
                     </Text>
                   </View>
                   :
                   <View style={{ width:'92.5%', flexWrap:'wrap', flexDirection:'row', marginBottom:20}}>
                     <Text style={{}}>
                       <Text style = {{fontSize:15, fontFamily:'Nunito-Bold', color:'white' }}>{userUsername+" "}</Text>
                       <Text style={styles.captionText}>{caption.substring(0,75)}</Text>
                     </Text>
                   </View>

                 }

               </View>
           </View>
         </View>
       }



        </View>


        <FlatList
          ref = {ref => this.flatListRef = ref}
          data = {comments}
          style={{height:'42.5%', flexGrow:0,}}
          renderItem = {this.renderComment}
          keyExtractor={(item, index) => String(index)}
          // removeClippedSubviews={false}
           />
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
  dayNumTag: {
    color:'white',
    fontSize:30,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    // fontWeight:'bold',
  },

  miniContainer: {
    margin: 6,
    // backgroundColor: 'blue',
    height: Dimensions.get("window").width ,
    flexWrap: 'wrap'
  },

  extraPicBox: {

  },

  container: {

    backgroundColor: 'lightgray',
    height: 350,
    borderRadius: 5,
    position: 'relative',
    zIndex: 99,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    width: '100%',
  },


  cover: {
    // flex: 1,

    position: "relative",
    height: 350,
    shadowColor: '#000',
    width:"100%",
    // transform: [{ scale: 0.9 }]
  },
  smallPic: {

  },

  testWhere:{
    position:'absolute',
    bottom:'15%',
    padding:10,
    left:'12%',
    width:'50%',
     // backgroundColor:'red',
  },
  testWhere2:{
    position:'absolute',
    bottom:'11%',
    flexDirection:'row',
    padding:10,
    left:'12%',
    width:'100%',
     // backgroundColor:'red',
  },
  testWhere3:{
    position:'absolute',
    top:'1%',
    padding:10,
    right:0,
    width:'20%',
    flexDirection:'column',
    alignItems:'center',
     // backgroundColor:'red',
  },
  testWhere4:{
    position:'absolute',
    bottom:7.5,

    zIndex:1,
    flexDirection:'row',
    padding:5,
    left:'1%',
    width:'100%',
  },
  timeStampPost: {

    color:'white',
    fontSize:14,
    alignSelf:'flex-end',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    // fontWeight:'bold',
  },

  statNum: {
    color:'white',
    fontSize:15,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontFamily:'Nunito-Bold',
    left:5,
    zIndex:1,
    // fontWeight:'bold',
  },

  videoFooterUserName: {
    color:'white',
    fontSize:15,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },

  videoFooterUserName2: {
    color:'white',
    fontSize:13,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    color:'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },


  // Example:
  // text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.75)
  //
  // {
  //   textShadowColor: 'rgba(0, 0, 0, 0.75)',
  //   textShadowOffset: {width: -1, height: 1},
  //   textShadowRadius: 10
  // }
  captionText:{
    fontFamily:'Nunito-SemiBold',
      textShadowColor: 'black',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5,
      color:'white'
  },
  videoFooter: {

    fontSize:14,

    color:'white',
    top:10,
    width:'25%',
    padding:10,
    fontWeight:'600',

    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    // color: rgba(255, 255, 255, 0.8);
    flex:3,
    // backgroundColor:'red',
    // fontWeight:'bold',
  },

  justifyCenter:{
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    color:'white',
    zIndex:1,
    // backgroundColor:'red',
  },
  justifyCenter1:{
    color:'white',
    // top:2,
    // flex: 1, flexDirection: 'row',
    // justifyContent: 'center', alignItems: 'center',
    // backgroundColor:'blue',
  },

  tagCSS1: {
    position:'absolute',
    // backgroundColor: 'rgba(0,0,0,.6)',
    padding:15,
    borderRadius:25,

    bottom:'12.5%',
    justifyContent: 'center',
    fontSize:13,
    right:'17.5%',
    zIndex:1,
    color:'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },
  tagCSStest: {
    position:'absolute',
    // backgroundColor: 'rgba(0,0,0,.6)',
    padding:15,
    borderRadius:25,

    bottom:'12.5%',
    justifyContent: 'center',
    fontSize:13,
    right:7.5,
    zIndex:1,
    color:'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },


  tagCSS2: {
    position:'absolute',
    // backgroundColor: 'rgba(0,0,0,.6)',
    padding:15,
    borderRadius:25,
    color:'white',
    bottom:'7.5%',
    fontSize:13,
    right:7.5,
    color:'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },

  tagCSS3: {
    position:'absolute',
    // backgroundColor: 'rgba(0,0,0,.6)',
    padding:9,
    borderRadius:25,
    color:'white',
    bottom:'5%',
    fontSize:13,
    right:7.5,
    textAlign:'right',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },

  tagCSS4: {
    position:'absolute',
    // backgroundColor: 'rgba(0,0,0,.6)',
    padding:15,
    borderRadius:25,
    color:'white',
    bottom:'45%',
    justifyContent: 'center',
    fontSize:13,
    right:7.5,
    zIndex:1,
    flex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },
  picNumber:{
    position:'absolute',
    top:100,
    right: 0,
    padding:10,
    fontWeight:'600',
    // backgroundColor:'#1890ffaa',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },

  picNumberText:{
    color:'white',
    fontSize:25,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },

  close2: {
    margin: 10,
    position: "absolute",
    bottom: 15,
    right: 5,
    width: 35,
    height: 35,
  },

  videoText: {
    flex:1,
  },
  close: {
    margin: 5,
    zIndex:1,
    position: "absolute",
    bottom:'12%',
    left: 5,
    width: 35,
    height: 40,
    color: "tomato"
  },

  imageHolder: {
    width: Math.round(Dimensions.get('window').width),
    // height: 400,
    position: "relative"
    // backgroundColor: 'blue'
  },

  imageContainer: {
    flex: 1,
    minHeight:300,
    // backgroundColor: 'red',

  },

  header: {
    // backgroundColor: "blue",
    flexDirection: "row",
    padding:10,
  },

  name: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: "center",

  },

  date: {
    justifyContent: "center",
    // backgroundColor: 'pink'
  },

  miniLikeCommCon: {
    // backgroundColor:'red'
    flexDirection: "row",
  },

  taggedNames: {
    color:'blue',
  },

  bottomButtons: {

    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: "gainsboro"
  },

  buttons: {
    height: 40,
    flex: 1,
    // backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderColor: 'gainsboro',
    flexDirection: "row"
  },



  likeCapHolder: {
    left:10,
  },

  bottomLikeCommentContainer: {
    padding:10,
  },
  goalContainer: {
    position: 'absolute',
    padding: 12,
    borderRadius: 30,
    backgroundColor: "#000000aa",
    top: "3%",
    alignSelf: 'flex-end',
    right: '3%'
  },
  goalText: {
    textAlign: 'right',
    color:'white',
    fontFamily:'Nunito-SemiBold',
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(NavPic);
