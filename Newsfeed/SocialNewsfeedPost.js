import React from "react";
import { Text, View, Button,StyleSheet, Image, Dimensions, TouchableOpacity,
ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';
import NewsfeedSpecCarousel from './NewsfeedSpecCarousel';
import * as dateFns from 'date-fns';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Avatar } from 'react-native-elements';
import styled from 'styled-components/native'
import FacePile from 'react-native-face-pile';
import FeatherIcon from 'feather-icons-react';
import { Tag } from 'react-feather';
import Animated from 'react-native-reanimated';
import {loop, withTimingTransition, mix} from 'react-native-redash/lib/module/v1';
import BottomSheet from 'reanimated-bottom-sheet';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import NotificationWebSocketInstance from  '../Websockets/notificationWebsocket';
import { Navigation2, Heart, MessageCircle, VolumeX, Volume2 } from "react-native-feather";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import authAxios from '../util';
import FastImage from 'react-native-fast-image'
import { Video, AVPlaybackStatus } from 'expo-av';
import InViewPort from "../RandomComponents/InViewPort";

const { Clock, cond, sub,divide, eq, add, call, set, Value, event, or } = Animated;

const {interpolate, Extrapolate, interpolateColors} = Animated;

const FACES = [

  {
    id: 2,
    imageUrl: 'https://media3.giphy.com/media/yV7jSbydbbkSRzgrn7/giphy.gif?cid=790b761116d91445dcf0e4c8ec2b80856514d631e1e976b6&rid=giphy.gif&ct=g',
  },
];
const width = Dimensions.get("window").width
const margin = 6;
const col = 2;
const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  const figureHorizontalDirection = (delta) =>
    delta > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
  const figureVerticalDirection = (delta) =>
    delta > 0 ? SWIPE_DOWN : SWIPE_UP;

  const detectSwipeDirection = ({dx, dy}) => {
    return Math.abs(dx) > Math.abs(dy)
      ? figureHorizontalDirection(dx)
      : figureVerticalDirection(dy);
  };

class SocialNewsfeedPost extends React.Component{
  slide = new Value(-width);
  slideAnimation = withTimingTransition(this.slide, {duration: 300})
  height = new Value(550);
  heightAnimation = withTimingTransition(this.height, {duration: 200})
  constructor(props){
    super(props);
    this.state = {
      showComments: false,
      showSlide: false,
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff',
      swipeDirection:'',
      lastTap:null,
      isMuted: true,
      showMute: false,
    }
    this.showExtra = new Value(false);
  }

  handleDoubleTap = (postId, userId, ownerId, notificationToken) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.state.lastTap && (now - this.state.lastTap) < DOUBLE_PRESS_DELAY) {
      this.onLike(
        postId,
        userId,
        ownerId,
        notificationToken
      )
    } else {
      this.setState({
        lastTap: now
      })
    }
  }

  navLikePeople(people_like) {
    this.props.navigation.navigate("DisplayLikeList",
      {
        likePeople:people_like,
        }
    );
  }

  changeShowComments = (postId) => {
    this.props.onCommentOpen(postId)
  }

  // New like that likes the single day post
  onLike = (
     socialItemId,
     personLike,
     ownerId,
     notificationToken,
     calCell,
   ) => {

     const notificationObject = {
       command: 'social_like_notification',
       actor: personLike,
       recipient: ownerId,
       socialItemId: socialItemId,
     }

    NotificationWebSocketInstance.sendNotification(notificationObject)


    WebSocketSocialNewsfeedInstance.sendSinglePostLike(
      socialItemId,
      personLike,
    )
    global.SEND_LIKE_NOTIFICATION(
      notificationToken,
      this.props.currentUser,
      socialItemId,
      calCell
    )


  }

  // New unlike for the single day post
  onUnlike = (socialItemId, personUnlike) => {
    WebSocketSocialNewsfeedInstance.sendSinglePostUnlike(
      socialItemId,
      personUnlike
    )

  }
  // Old like that likes the whole day album
  // onLike = (socialCalCellId, personLike, contentTypeId, ownerId, cellDate) => {
  //   // send it through the websocket
  //   // and then backend
  //   // then back to the redux
  //   const notificationObject = {
  //     command: 'social_like_notification',
  //     actor: personLike,
  //     recipient: ownerId,
  //     cellDate:cellDate,
  //
  //   }
  //
  //   WebSocketSocialNewsfeedInstance.sendOneLike(
  //     socialCalCellId,
  //     personLike,
  //     contentTypeId
  //   )
  //
  //   if(personLike !== ownerId){
  //     NotificationWebSocketInstance.sendNotification(notificationObject)
  //
  //   }
  //
  // }

  // onUnlike = (socialCalCellId, personUnlike, contentTypeId) => {
  //
  //   WebSocketSocialNewsfeedInstance.unSendOneUnlike(
  //     socialCalCellId,
  //     personUnlike,
  //     contentTypeId)
  //
  //
  // }

  onSlidePress = (num, postId,
  userId,
  contentTypeId,
  ownerId,
  cellDate) => {
    if(num > 1){
      this.showExtra.setValue(!this.state.showSlide)
      this.setState({
        showSlide: !this.state.showSlide
      })
    }
    this.handleDoubleTap
        (postId,
        userId,
        contentTypeId,
        ownerId,
        cellDate)


  }

  renderExtraPics = (items) => {
    // this function will render the extra pics

    let extraCards = []
    for(let i= 1; i < items.length; i++){
      extraCards.push(
        <View
          key = {i}
          style = {{
            height: width/2- margin ,
            width: width/2 - margin,
            alignItems: "center",
            justifyContent: "center",

          }}
          >
          <View style = {{
              width: "97%",
              height: "97%",
              backgroundColor: 'lightgray',
              borderRadius: 5
            }}>
            <Image
              style = {{
                height:"100%",
                borderRadius: 5,
              }}
              resizeMode = "cover"
              source={{ uri: `${global.IMAGE_ENDPOINT}${items[i].itemImage}` }}
               />
          </View>
        </View>
      )
    }

    return extraCards
  }

  renderContainerHeight = () => {
    // This function will calculate the extra height to add

    let userPostImages = []
    if(this.props.data){
      if(this.props.data.post) {
        if(this.props.data.post.get_socialCalItems) {
          userPostImages = this.props.data.post.get_socialCalItems;
          }
        }
    }
    const numRows = Math.ceil((userPostImages.length-1)/col)
    const finalHeight = 553 + ((width/2) * numRows);
    return finalHeight
  }

  onPostDirect = (cellId, postId) => {

    this.props.navigation.navigate("DayAlbum", {
      cellId,
      postId
    })
  }

  playVideo = () => {
    this.setState({
      showMute: true
    })
    if(this.video){
      this.video.playAsync();
    }
  }

  pauseVideo = () => {
    this.setState({
      showMute: false
    })
    if(this.video){
      this.video.pauseAsync();
    }
  }

  handlePlaying = (isVisible) => {
    isVisible ? this.playVideo() : this.pauseVideo();
  }

  unMute = () => {
    this.setState({
      isMuted: false
    })
  }


  mute = () => {
    this.setState({
      isMuted: true
    })
  }

  revealPhoto = () =>{

    // This function will be use to render the pictures
    // within thew newsfeed post. If there are only one photo
    // it iwill only show one photo, if there are more ti will
    // show a scrollable list
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

    let notificationToken = "";
    let goal = "";

    let utc3 = dateFns.format(new Date(), 'h:mma');

    if(this.props.data){
      if(this.props.data.creator){
        if(this.props.data.creator.profile_picture){
          profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.creator.profile_picture
        }
        if(this.props.data.creator.first_name){
          firstName = this.props.data.creator.first_name;
        }
        if(this.props.data.creator.last_name){
          lastName = this.props.data.creator.last_name;
        }
        if(this.props.data.creator.id){
          ownerId = this.props.data.creator.id
        }
        if(this.props.data.creator.username){
          userUsername = this.props.data.creator.username
        }
        if(this.props.data.creator.notificationToken){
          notificationToken = this.props.data.creator.notificationToken;
        }
        if(this.props.data.created_at) {
          postCreatedAt=this.props.data.created_at
          if(!isNaN(new Date(this.props.data.created_at).getTimezoneOffset()/60)){
            const dtDateOnly1 = dateFns.addHours(new Date(this.props.data.created_at), new Date(this.props.data.created_at).getTimezoneOffset()/60)
            utc3=dateFns.format(new Date(dtDateOnly1), 'M/dd');
          }
        }
      }
      if(this.props.data.calCell){
        calCell = this.props.data.calCell
      }
      if(this.props.data.id){
        postId = this.props.data.id
      }
      if(this.props.data.goal){
        goal = this.props.data.goal
      }

      if(this.props.data.itemImage){
        itemImage = `${global.IMAGE_ENDPOINT}`+this.props.data.itemImage;
      }
      if(this.props.data.video){
        if(this.props.data.video !== null){
          video = `${global.IMAGE_ENDPOINT}`+this.props.data.video;
          // video taken from the local site does not work but the videos
          // taken from pretty much any where else works (sounds good to me)
        }

      }
      if(this.props.data.people_like){
        like_people = this.props.data.people_like
      }
      if(this.props.data.get_socialCalItemComment){
        calComment =this.props.data.get_socialCalItemComment.length
      }
    }
    if(like_people.length > 0){
      for(let i = 0; i< like_people.length; i++){
        peopleLikeId.push(like_people[i].id)
      }
    }

    if(this.props.data.people_like.length>0)
    {
      likeAvatarList = this.props.data.people_like.map(item => {
       return {
         imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
       };
       });
    }
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
      return (
        <View>
        {/*
        <Animated.View style = {{
            height: this.heightAnimation
          }}>
          */}
          {/*
          <TouchableWithoutFeedback
            onPress = {() => this.onSlidePress(userPostImages.length, postId,
            this.props.userId,
            contentTypeId,
            ownerId,
            cellDate)}
            >
            */}
            <View style = {styles.container}>
              <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                config={{
                   velocityThreshold: 0.3,
                   directionalOffsetThreshold: 90,
                 }}>
                 <TouchableOpacity
                   activeOpacity={0.8}
                  >

                   {/* fast image*/}
                   {
                     video === "" ?

                     <Image
                       style={styles.cover}
                       resizeMode = "cover"
                       source={{ uri: itemImage }}
                       />

                     :

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

                   }

                </TouchableOpacity>
              </GestureRecognizer>
                <Avatar
                  style={styles.close}
                  onPress = {() => this.props.ViewProfile(userUsername)}
                  size={37.5}
                  rounded
                  source = {{
                    uri: profilePic
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                ></TouchableOpacity>
              <View style = {styles.testWhere}>
                <Text style = {styles.videoFooterUserName}>
                  {global.NAMEMAKE(firstName, lastName)}
                </Text>
              </View>

              <View style = {styles.testWhere2}>
                  <Text style = {styles.videoFooterUserName}>
                    {socialMonth.substring(0,3)}
                  </Text>
                  <Text style = {styles.dayNumTag}>
                    {socialDay}
                  </Text>
              </View>

              {

                (like_people.length>3)?
                <View style={{left:'4%', bottom:'0%', position:'absolute', width:50, height:50}}>
                  <TouchableOpacity
                    onPress={() => this.navLikePeople(like_people)}>
                    <FacePile numFaces={3} faces={likeAvatarList} overlap={1}
                       circleSize={15} />
                  </TouchableOpacity>
                </View>
                :

                <View style={{left:'0%', bottom:'0%', position:'absolute', width:50, height:50, }}>
                  <TouchableOpacity
                    onPress={() => this.navLikePeople(like_people)}>
                      <FacePile numFaces={3} faces={likeAvatarList} overlap={1}
                         circleSize={15} />
                  </TouchableOpacity>
                </View>

              }



              {/*
                goal.goal ?

                <View style = {styles.goalContainer}>
                  {goal.goal.length<25?
                      <Text style = {styles.goalText}>{(goal.goal)}</Text>
                    :
                    <Text style={styles.goalText}>{ (goal.goal).substring(0,25)}...</Text>
                  }

                </View>

                :

                null
                */
              }
                    {
                      peopleLikeId.includes(this.props.userId ) ?
                      <TouchableOpacity
                        onPress = {() => this.onUnlike(
                          postId,
                          this.props.userId,
                        )}
                        style = {styles.tagCSS1}>
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
                          calCell
                        )}
                        style = {styles.tagCSS1}>
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

                <TouchableWithoutFeedback  onPress={() => this.changeShowComments(postId)}>
                  <View style = {styles.tagCSS2}>
                      <View style = {styles.justifyCenter}>
                        <MessageCircle
                          stroke = "white"
                          fill="white"
                          width ={30}
                          height = {30}
                        />
                        <Text style = {styles.statNum}>
                          {calComment}
                        </Text>
                      </View>
                  </View>
                </TouchableWithoutFeedback>

                {/*
                <View style = {styles.tagCSS3}>
                    <View style = {styles.justifyCenter}>
                      <Text style={styles.videoFooterUserName}>{utc3}</Text>
                    </View>
                </View>
                */}
            </View>
            {/*
          </TouchableWithoutFeedback>
          */}
          {/*
            userPostImages.length > 1 ?
            <Animated.View style = {{
              height: width ,
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 6,
              marginRight: 3,
              transform: [
                {translateY: this.slideAnimation}
              ]
              }}>
                {this.renderExtraPics(userPostImages)}
            </Animated.View>
            : <View></View>
          */}
          {/*
            <Button
              title = "slide"
              onPress = {() => this.onSlidePress(userPostImages.length, postId,
              this.props.userId,
              contentTypeId,
              ownerId,
              cellDate)}
               />
            */}
          {/*
         </Animated.View>
         */}

       </View>
      )
  }



  onSwipe(gestureName, gestureState) {
    const {dx, dy} = gestureState;
    let direction = detectSwipeDirection({dx, dy});
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case direction == SWIPE_UP:
        this.setState({swipeDirection: 'up'});
        break;
      case direction == SWIPE_DOWN:
        this.setState({swipeDirection: 'down'});
        break;
      case direction == SWIPE_LEFT:
      this.setState({swipeDirection: 'right'});
        // this.onPostDirect(postId)
        break;
      case direction == SWIPE_RIGHT:
      this.setState({swipeDirection: 'left'});
      // this.onPostDirect(postId)
    }
  }

  onSwipeLeft =(postId) =>{
  }

  onSwipeRight= (postId) =>{
    // this.onPostDirect(postId)
  }



  render(){
    let like_people = []
    let profilePic = ""
    let userUsername = ""
    let firstName=""
    let lastName=""
    let userId = ""
    let actionText = ""
    let caption=""
    let calCell=""
    let postId=""


    if(this.props.data) {
      if(this.props.data.post){
        const post = this.props.data.post
        if(post.actionText === "new"){
          actionText = ' added new pictures to day'
        }
        if(post.actionText === "updated"){
          actionText = " updated current day"
        }
        if(post.actionText === "clipped"){
          actionText = " clipped picture to day"
        }
      }
      if(this.props.data.creator.profile_picture){
        profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.creator.profile_picture
      }
      if(this.props.data.creator.id){
        userId = this.props.data.creator.id
      }
      if(this.props.data.creator.username){
        userUsername = this.props.data.creator.username
      }
      if(this.props.data.caption){
        caption = this.props.data.caption
      }
      if(this.props.data.calCell){
        calCell = this.props.data.calCell
      }
      if(this.props.data.id){
        postId = this.props.data.id
      }
    }

    const y = this.props.y;
    const backgroundGradient = interpolateColors(y, {
      inputRange: [0, 100],
      outputColorRange: ["white", "black"],
    })


    return (
      <View
        style = {{
          width: '100%',
          alignItems: 'center'
        }}
        >
        <View
          style = {{
            width: "95%"
          }}>
          {/*
          <Animated.Code>
            {() => cond(
              this.showExtra,
              [
                set(this.height, this.renderContainerHeight()),
                set(this.slide, 0),
              ]
              ,
              [
                set(this.slide, -width),
                set(this.height, 550 +margin)
              ]
            )}
          </Animated.Code>
          */}
          <View style = {styles.imageContainer}>
              {this.revealPhoto()}
          </View>
          {
            (caption.length==0)?
            <View style={{minHeight:10, }}>
              <Text></Text>
            </View>
            :
            <View>
              {caption.length>140?
                <View style={{  minHeight:10, marginBottom:20, marginTop:10, paddingLeft:5}}>
                  <TouchableOpacity onPress = {() => this.onPostDirect(calCell, postId)}>
                    <View style={{flexDirection:'row', width:'92.5%', flexWrap:'wrap',}}>
                      <Text>
                        <Text style = {{fontFamily:'Nunito-Bold'}}>{userUsername}</Text>
                        <Text style={{fontFamily:'Nunito-SemiBold'}}> {caption.substring(0,140)}</Text>
                        <Text style={{color:'#bfbfbf'}}> ... see more </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                :
                <View style={{minHeight:10, marginBottom:20, marginTop:10,paddingLeft:5,}}>
                  <View style={{ width:'92.5%', flexWrap:'wrap', flexDirection:'row', }}>
                    <Text>
                      <Text style = {{fontSize:15, fontFamily:'Nunito-Bold', }}>{userUsername+" "}</Text>
                      <Text style={{fontFamily:'Nunito-SemiBold'}}>{caption.substring(0,140)}</Text>
                    </Text>
                  </View>
                </View>
              }
            </View>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.id,
    currentUser: state.auth.username,
    profilepic: state.auth.profilePic
  }
}

export default connect(mapStateToProps)(SocialNewsfeedPost);
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

  miniContainer: {
    margin: margin,
    // backgroundColor: 'blue',
    height: width ,
    flexWrap: 'wrap'
  },

  extraPicBox: {

  },

  cover: {
    // flex: 1,
    borderRadius: 5,
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
    top:'1%',
    padding:10,
    left:'12%',
    width:'50%',
     // backgroundColor:'red',
  },
  testWhere2:{
    position:'absolute',
    top:'1%',
    padding:10,
    right:0,
    width:'20%',
    flexDirection:'column',
    alignItems:'center',
     // backgroundColor:'red',
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
    // fontWeight:'bold',
  },

  videoFooterUserName: {
    color:'white',
    fontSize:15,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
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
    color:'white',
    bottom:'30%',
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


  tagCSS2: {
    position:'absolute',
    // backgroundColor: 'rgba(0,0,0,.6)',
    padding:15,
    borderRadius:25,
    color:'white',
    bottom:'17.5%',
    fontSize:13,
    right:7.5,
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
    position: "absolute",
    top: 5,
    left: 5,
    width: 35,
    height: 35,
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
    position: "relative",
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
