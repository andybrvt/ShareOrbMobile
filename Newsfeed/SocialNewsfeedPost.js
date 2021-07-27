import React from "react";
import { Text, View, Button,StyleSheet, Image, Dimensions, TouchableOpacity,
   ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';
import { Card } from 'react-native-paper';
import NewsfeedSpecCarousel from './NewsfeedSpecCarousel';
import * as dateFns from 'date-fns';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faComment, faBookmark} from '@fortawesome/free-regular-svg-icons'
import { Avatar } from 'react-native-elements';
import styled from 'styled-components/native'

import FeatherIcon from 'feather-icons-react';
import { Tag } from 'react-feather';
import Animated from 'react-native-reanimated';
import {loop, withTimingTransition, mix} from 'react-native-redash/lib/module/v1';
import BottomSheet from 'reanimated-bottom-sheet';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import NotificationWebSocketInstance from  '../Websockets/notificationWebsocket';
import { Navigation2, Heart, MessageCircle } from "react-native-feather";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const { Clock, cond, sub,divide, eq, add, call, set, Value, event, or } = Animated;


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
    }

    this.showExtra = new Value(false);

  }

  handleDoubleTap = (postId, userId, contentTypeId,
  ownerId,
  cellDate) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.state.lastTap && (now - this.state.lastTap) < DOUBLE_PRESS_DELAY) {
      this.onLike(
        postId,
        userId,
        contentTypeId,
        ownerId,
        cellDate
      )
    } else {
      this.setState({
        lastTap: now
      })
    }
  }





  changeShowComments = (cellId) => {

    this.props.onCommentOpen(cellId)

  }


  onLike = (socialCalCellId, personLike, contentTypeId, ownerId, cellDate) => {
    // send it through the websocket
    // and then backend
    // then back to the redux
    const notificationObject = {
      command: 'social_like_notification',
      actor: personLike,
      recipient: ownerId,
      cellDate:cellDate,

    }

    WebSocketSocialNewsfeedInstance.sendOneLike(
      socialCalCellId,
      personLike,
      contentTypeId
    )

    if(personLike !== ownerId){
      NotificationWebSocketInstance.sendNotification(notificationObject)

    }

  }


  onUnlike = (socialCalCellId, personUnlike, contentTypeId) => {

    WebSocketSocialNewsfeedInstance.unSendOneUnlike(
      socialCalCellId,
      personUnlike,
      contentTypeId)


  }

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
            justifyContent: "center"
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

  onPostDirect = (cellId) => {

    this.props.navigation.navigate("DayAlbum", {
      cellId: cellId
    })
  }



  revealPhoto = () =>{
    // This function will be use to render the pictures
    // within thew newsfeed post. If there are only one photo
    // it iwill only show one photo, if there are more ti will
    // show a scrollable list
    let postId = "";
    let username = "";
    let cellYear = "";
    let cellMonth = "";
    let cellDay = "";
    let location = "";
    let userUsername = '';

    let post = {};

    let profilePic="";
    let caption="";
    let userPostImages = []
    let like_people = [];
    let commentList = [];
    let peopleLikeId = []

    let postCreatedAt="";
    let contentTypeId="";
    let ownerId = "";
    let cellDate = "";

    let firstName="";
    let lastName="";
    if(this.props.data) {

      contentTypeId = this.props.data.id

      if(this.props.data.owner.profile_picture){
        profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.owner.profile_picture

      }

      if(this.props.data.post) {

        post = this.props.data.post
        if(this.props.data.post.get_socialCalItems) {
          userPostImages = this.props.data.post.get_socialCalItems;
        }

        if(this.props.data.post.id){
          postId = this.props.data.post.id
        }


      }


      if(this.props.data.post) {
        userUsername = this.props.data.post.socialCalUser.username
        firstName = this.props.data.post.socialCalUser.first_name
        lastName = this.props.data.post.socialCalUser.last_name
        console.log(firstName, lastName)
      }

      if(this.props.data.post.socialCaldate) {
        cellDate = this.props.data.post.socialCaldate
        const date = this.props.data.post.socialCaldate.split("-")
        cellYear = date[0]
        cellMonth = date[1]
        cellDay = date[2]
      }
      if(this.props.data.post.dayCaption){
        caption = this.props.data.post.dayCaption
      }
      if(this.props.data.post.people_like){
        like_people = this.props.data.post.people_like
      }
      if(this.props.data.post.get_socialCalComment){
        commentList = this.props.data.post.get_socialCalComment
      }
      if(this.props.data.post_date){
        postCreatedAt = this.props.data.post_date
      }
      if(this.props.data.owner.id){
        ownerId = this.props.data.owner.id
      }

    }

    if(like_people.length > 0){
      for(let i = 0; i< like_people.length; i++){
        peopleLikeId.push(like_people[i].id)
      }
    }
    let timestamp=""
    let dayNum=""
    timestamp=postCreatedAt
    const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)

    if( timeDiff > 24*60){
      dayNum = `${dateFns.format(new Date(timestamp), "d")}`;
    }



      return (
        <Animated.View style = {{
            height: this.heightAnimation
          }}>
          <TouchableWithoutFeedback
            onPress = {() => this.onSlidePress(userPostImages.length, postId,
            this.props.userId,
            contentTypeId,
            ownerId,
            cellDate)}
            >
            <View style = {styles.container}>
              <GestureRecognizer
                onPress = {() => console.log("hiioi")}
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                config={{
                   velocityThreshold: 0.3,
                   directionalOffsetThreshold: 90,
                 }}>
                <Image
                  style={styles.cover}
                  resizeMode = "cover"
                  source={{ uri: `${global.IMAGE_ENDPOINT}${userPostImages[0].itemImage}` }}
                  />
              </GestureRecognizer>

                <Avatar
                  style={styles.close}
                  onPress = {() => this.props.ViewProfile(userUsername)}
                  size={40}
                  rounded
                  source = {{
                    uri: profilePic
                  }}
                />



              <View style = {styles.testWhere}>
                <Text style = {styles.videoFooterUserName}>
                  {global.NAMEMAKE(firstName, lastName)}
                </Text>
              </View>

              <View style = {styles.testWhere2}>
                  <Text style = {styles.videoFooterUserName}>
                    {global.RENDER_MONTH_DAY(postCreatedAt)}
                  </Text>
                  <Text style = {styles.dayNumTag}>
                    {dayNum}
                  </Text>

              </View>
                {/*
                <View style = {styles.picNumber}>
                  <Text style = {styles.picNumberText}> {userPostImages.length -1} </Text>
                </View>
                */}
                <View style = {styles.videoFooter}>
                  <Text >
                    <Text style = {styles.videoFooterUserName}> {userUsername+" "}</Text>
                    <Text numberofLines={1} style = {styles.videoFooter}>{caption.substring(0,140)}</Text>
                  </Text>
                </View>

                    {
                      peopleLikeId.includes(this.props.userId ) ?
                      <TouchableOpacity
                        onPress = {() => this.onUnlike(
                          postId,
                          this.props.userId,
                          contentTypeId
                        )}
                        style = {styles.tagCSS1}>
                        <View style = {styles.justifyCenter}>
                          <Heart
                            stroke = "red"
                            fill="red"
                            width ={30}
                            height = {30}
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
                          contentTypeId,
                          ownerId,
                          cellDate
                        )}
                        style = {styles.tagCSS1}>
                        <View style = {styles.justifyCenter}>
                          <Heart
                            stroke = "white"
                            fill="white"
                            width ={30}
                            height = {30}
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
                          {commentList.length}
                        </Text>
                      </View>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableOpacity
                  onPress = {() => this.onPostDirect(postId)}
                  style = {styles.tagCSS3}>
                  <View style = {styles.justifyCenter}>
                    <Navigation2
                      stroke = "white"
                      fill="white"
                      width ={30}
                      height = {30}
                      style={{left:5}}
                       />
                     <Text style = {styles.statNum}>  {userPostImages.length -1}</Text>
                  </View>
                </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>

          {
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
          }
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

         </Animated.View>
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
    let profilePic = ''
    let userUsername = ""
    let firstName=""
    let lastName=""
    let userId = ""
    let actionText = ""
    console.log(this.props.data.post)
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



      if(this.props.data.owner){
        if(this.props.data.owner.profile_picture){
          profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.owner.profile_picture
        }


        if(this.props.data.owner.id){
          userId = this.props.data.owner.id
        }

        if(this.props.data.owner.username){
          userUsername = this.props.data.owner.username
        }
      }
    }

    return (
      <View>
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
        <View style = {styles.imageContainer}>
            {this.revealPhoto()}
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
    margin: margin,
    backgroundColor: 'lightgray',
    height: 550,
    borderRadius: 5,
    position: 'relative',
    zIndex: 99,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5
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
    height: 550,
    shadowColor: '#000',

  },
  smallPic: {

  },

  testWhere:{
    position:'absolute',
    top:'1%',
    padding:10,
    left:40,
    width:'65%',
     // backgroundColor:'red',
  },
  testWhere2:{
    position:'absolute',
    top:'1%',
    padding:10,
    right:0,
    width:'17.5%',
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
    fontWeight:'bold',
    left:5,
    // fontWeight:'bold',
  },

  videoFooterUserName: {
    color:'white',
    fontSize:15,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    // fontWeight:'bold',
  },


  // const UserName = styled.Text`
	// font-size: 17px;
	// color: rgba(255, 255, 255, 1);
	// text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
	// font-weight: bold;
	// letter-spacing: -0.3px;

  // Example:
  // text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.75)
  //
  // {
  //   textShadowColor: 'rgba(0, 0, 0, 0.75)',
  //   textShadowOffset: {width: -1, height: 1},
  //   textShadowRadius: 10
  // }

  videoFooter: {
    position:'absolute',
    fontSize:14,
    padding:10,
    color:'white',
    bottom:25,
    width:'75%',
    padding:10,
    fontWeight:'600',
    // backgroundColor:'red',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
    // color: rgba(255, 255, 255, 0.8);

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
    padding:9,
    borderRadius:25,
    color:'white',
    bottom:'40%',
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
    padding:9,
    borderRadius:25,
    color:'white',
    bottom:'30%',
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
    bottom:'20%',
    fontSize:13,
    right:7.5,
    textAlign:'right',
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

  card: {
    width: Math.round(Dimensions.get('window').width)-10,
    borderRadius:20,
    left:5,
    position: 'relative',
    // height: 600,
    marginBottom: 20,
    borderColor: '#f0f0f0',
    borderWidth: 3,
  },

  imageContainer: {
    flex: 1,

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

  captionHolder: {
    flexDirection: "row",
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 6
  },

  captionUsername:{
    color:'black',
    fontSize:14,
    fontWeight:'bold',
  },

  likeCapHolder: {
    left:10,
  },

  bottomLikeCommentContainer: {
    padding:10,
  }
})
