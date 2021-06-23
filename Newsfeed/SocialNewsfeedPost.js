import React from "react";
import { Text, View, Button,StyleSheet, Image, Dimensions, TouchableOpacity, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import { Card } from 'react-native-paper';
import NewsfeedSpecCarousel from './NewsfeedSpecCarousel';
import * as dateFns from 'date-fns';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faComment, faBookmark} from '@fortawesome/free-regular-svg-icons'
import { Avatar } from 'react-native-elements';

import FeatherIcon from 'feather-icons-react';
import { Tag, Heart } from 'react-feather';
import Animated from 'react-native-reanimated';
import {loop, withTimingTransition, mix} from 'react-native-redash/lib/module/v1';
import BottomSheet from 'reanimated-bottom-sheet';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';


const { Clock, cond, sub,divide, eq, add, call, set, Value, event, or } = Animated;


const width = Dimensions.get("window").width
const margin = 3;
const col = 2;

class SocialNewsfeedPost extends React.Component{

  slide = new Value(-width);
  slideAnimation = withTimingTransition(this.slide, {duration: 300})

  height = new Value(550);
  heightAnimation = withTimingTransition(this.height, {duration: 200})
  constructor(props){
    super(props);
    this.state = {
      showComments: false,
      showLike: false,
      showSlide: false,
    }

    this.showExtra = new Value(false);

  }

  changeShowComments = (cellId) => {

    this.props.onCommentOpen(cellId)

  }

  changeShowLike = () => {
    this.setState({
      showLike:!this.state.showLike,
    });
  }

  onLike = (socialCalCellId, personLike, contentTypeId, ownerId, cellDate) => {
    // send it through the websocket
    // and then backend
    // then back to the redux
    WebSocketSocialNewsfeedInstance.sendOneLike(
      socialCalCellId,
      personLike,
      contentTypeId
    )

  }


  onUnlike = (socialCalCellId, personUnlike, contentTypeId) => {

    WebSocketSocialNewsfeedInstance.unSendOneUnlike(
      socialCalCellId,
      personUnlike,
      contentTypeId)


  }

  onSlidePress = () => {
    this.showExtra.setValue(!this.state.showSlide)
    this.setState({
      showSlide: !this.state.showSlide
    })
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

    return 553 + ((width/2) * numRows);

  }



  revealPhoto = () =>{
    // This function will be use to render the pictures
    // within thew newsfeed post. If there are only one photo
    // it iwill only show one photo, if there are more ti will
    // show a scrollable list
    let postId = ""
    let username = ""
    let cellYear = ""
    let cellMonth = ""
    let cellDay = ""
    let location = ""
    let userUsername = '';

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
    if(this.props.data) {

      contentTypeId = this.props.data.id

      if(this.props.data.owner.profile_picture){
        profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.owner.profile_picture

      }

      if(this.props.data.post) {
        if(this.props.data.post.get_socialCalItems) {
          userPostImages = this.props.data.post.get_socialCalItems;
        }

        if(this.props.data.post.id){
          postId = this.props.data.post.id
        }


      }
      if(this.props.data.owner.username) {
        userUsername = this.props.data.owner.username
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



      return (
        <Animated.View style = {{
            height: this.heightAnimation
          }}>
          <TouchableWithoutFeedback
            onPress = {() => this.onSlidePress()}
            >
            <View style = {styles.container}>
              <Image
                style={styles.cover}
                resizeMode = "cover"
                source={{ uri: `${global.IMAGE_ENDPOINT}${userPostImages[0].itemImage}` }}
                />

                <Avatar
                  style={styles.close}
                  onPress = {() => this.props.ViewProfile()}
                  size={40}
                  rounded
                  source = {{
                    uri: profilePic
                  }}
                />

                <View style = {styles.testWhere}>
                  <Text style = {styles.videoFooterUserName}>
                    Ping Hsu
                  </Text>
                </View>

                <View style = {styles.testWhere2}>
                  {/*
                    use the current date icon instead like June 14
                    or
                    June
                    14
                    with a circle around it
                    */}

                    <Text style = {styles.videoFooterUserName}>
                      {global.RENDER_TIMESTAMP(postCreatedAt)}
                    </Text>

                </View>

                <View style = {styles.videoFooter}>
                  <Text >
                    <Text style = {styles.videoFooterUserName}> {userUsername+" "}</Text>
                    <Text numberofLines={1} style = {styles.videoFooter}>{caption.substring(0,140)}</Text>
                  </Text>

                </View>

                <View style = {styles.tagCSS1}>
                  <View style = {styles.justifyCenter}>
                    {
                      peopleLikeId.includes(this.props.userId ) ?
                      <TouchableOpacity onPress = {() => this.onUnlike(
                          postId,
                          this.props.userId,
                          contentTypeId
                        )}>
                        <FontAwesomeIcon
                        style = {{
                          color:'red',
                          right:3,
                        }}
                        size = {20}
                        icon={faHeart} />
                      </TouchableOpacity>

                      :

                      <TouchableOpacity
                        onPress = {() => this.onLike(
                          postId,
                          this.props.userId,
                          contentTypeId,
                          ownerId,
                          cellDate
                        )}>
                        <FontAwesomeIcon
                          style = {{
                            color:'white',
                            right:3,
                          }}

                        size = {20}
                        icon={faHeart}>

                      </FontAwesomeIcon>

                      </TouchableOpacity>

                    }
                    <Text  style = {styles.justifyCenter1}>
                    {like_people.length}
                    </Text>
                  </View>
                </View>

                <View style = {styles.tagCSS2}>
                  <TouchableOpacity  onPress={() => this.changeShowComments(postId)}>
                    <View  style = {styles.justifyCenter}>
                      {
                        (this.state.showComments) ?
                        <FontAwesomeIcon
                        style = {{
                          color:'red',
                          right:3,
                        }}
                        size = {20}
                        icon={faComment} />
                        :

                        <FontAwesomeIcon
                        style = {{
                          color:'white',
                          right:3,
                        }}
                        size = {20}
                        icon={faComment} />
                      }
                      <Text  style = {styles.justifyCenter1}>
                      {commentList.length}
                    </Text>
                    </View>
                  </TouchableOpacity>
                </View>




              <Text style = {styles.tagCSS3}>
                <View>
                  <FontAwesomeIcon
                  style = {{
                    color:'white',
                  }}
                  size = {20}
                  icon={faBookmark} />
                </View>
              </Text>

            </View>

          </TouchableWithoutFeedback>

          {
            userPostImages.length > 1 ?

            <Animated.View style = {{
              margin: margin,
              height: width ,
              flexWrap: 'wrap',
              transform: [
                {translateY: this.slideAnimation}
              ]
              }}>

              {this.renderExtraPics(userPostImages)}
            </Animated.View>

            : <View></View>


          }

          <Button
            title = "slide"
            onPress = {() => this.onSlidePress()}
             />


         </Animated.View>
      )

  }



  render(){


    let like_people = []
    let profilePic = ''
    let userUsername = ""
    let userFirstName = ""
    let userLastName = ""
    let userId = ""


    let actionText = ""


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

        if(this.props.data.owner.first_name){
          userFirstName = this.props.data.owner.first_name
        }
        if(this.props.data.owner.last_name){
          userLastName = this.props.data.owner.last_name
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
  container: {
    margin: 3,
    backgroundColor: 'lightgray',
    height: 550,
    borderRadius: 5,
    position: 'relative',
    zIndex: 99
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
    width:'35%',
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

  videoFooterUserName: {

    color:'white',
    fontSize:14,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    // fontWeight:'bold',

  },
  videoFooter: {
    position:'absolute',
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
    // fontWeight:'bold',

  },
  tagCSS1: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    padding:9,
    borderRadius:25,
    color:'white',
    bottom:175,
    justifyContent: 'center',
    fontSize:13,
    right:10,
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

  tagCSS2: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    padding:9,
    borderRadius:25,
    color:'white',
    bottom:130,

    fontSize:13,
    right:10,
    textAlign:'right',
    // fontWeight:'bold',

  },

  tagCSS3: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    padding:7.5,
    borderRadius:25,
    color:'white',
    bottom:85,

    fontSize:13,
    right:15,
    textAlign:'right',
    // fontWeight:'bold',

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
    // backgroundColor: "red",
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
