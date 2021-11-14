import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import SocialCommentsWebsocketInstance from '../Websockets/commentsCellWebsocket';
import GlobeCommentWebsocketInstance from '../Websockets/globeCommentWebsocket';
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import WebSocketGlobeInstance from '../Websockets/globeGroupWebsocket';
import WebSocketSmallGroupInstance from '../Websockets/smallGroupWebsocket';
import TextModal from '../RandomComponents/TextModal';
import FakeSquaredInput from '../RandomComponents/FakeSquaredInput';
import RealRoundedInput from '../RandomComponents/RealRoundedInput';
import SingleComment from './SingleComment';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import { ChevronLeft, ArrowLeft } from "react-native-feather";

 class CommentPage extends React.Component{
   state = {
     comment: '',
     showTextInput: false,
   }
   constructor(props){
     super(props)

     if(this.props.route.params.type === "group"){
        this.initialiseComments()
     } else {
       this.initialiseGlobeComments()
     }

     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
   }

   onCommentChange = e =>{
     const tempVal = e;
     this.setState({
       comment: tempVal
     })
   }

   onEmojiChange = e =>{
     let temp=e.emoji
     this.setState({
       comment: this.state.comment+temp,
     })
   }

   onGlobeCommentSubmit = () => {
     const comment = this.state.comment
     console.log('globe')
     if(this.state.comment.length > 0){

       const globeItem = this.props.route.params.postId
       const userId = this.props.userId
       const commentHost = this.props.commentHost


       // now this is where you put the websocket to send
       // to the back end

       GlobeCommentWebsocketInstance.sendGlobeComment(
         globeItem,
         userId,
         comment
       )

       // update the globe stuff here

      setTimeout(() =>  WebSocketGlobeInstance.updateSingleGlobeItem(
         globeItem
       ), 1000)



       // send the notifications to the whole group


       // COME BACK TO THIS LATER


       this.setState({
         comment: ""
       })
       Keyboard.dismiss()

     }

   }

   onCommentSubmit = () => {
     // USE THIS ONE HERE


    // use to submit the comments into the websocket
     const comment = this.state.comment
     if(this.state.comment.length > 0){
       const cellId = this.props.route.params.postId
       const userId = this.props.userId
       const commentHost = this.props.commentHost
       const cellDate = this.props.cellDate
       const notificationObject = {
         command: "group_comment_notification",
         actor: userId,
         recipient:commentHost,
         postId: cellId // this will be used mostly to get the groupId
       }

       if(userId !== commentHost){
         NotificationWebSocketInstance.sendNotification(notificationObject)

         if(this.props.isOtherAccount){
           global.SEND_GROUP_COMMENT_NOTIFICATION(
             this.props.commentHostNotiToken,
             this.props.secondUsername,
             cellId
           )
         } else {
           global.SEND_GROUP_COMMENT_NOTIFICATION(
             this.props.commentHostNotiToken,
             this.props.currentUser,
             cellId
           )
         }



       }



       // Now do the websocket here
       SocialCommentsWebsocketInstance.sendComment(
         cellId,
         userId,
         comment,
       )



      setTimeout(() => WebSocketSmallGroupInstance.updateSingleGroupPost(
        cellId
      ), 1000)

      // update the group here
      // similar to that on top


       // if(userId !== commentHost){
         // NotificationWebSocketInstance.sendNotification(notificationObject)


       // }

       this.setState({
         comment: ""
       })
       Keyboard.dismiss()
     }
   }

   renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
        <Text> Comments </Text>
      </View>
    </View>
  );

  initialiseComments(){
    const postId = this.props.route.params.postId
    this.waitForCommentsSocketConnection(() => {
      SocialCommentsWebsocketInstance.fetchComments(
        postId
      )
    })
    SocialCommentsWebsocketInstance.connect(postId)
  }

  initialiseGlobeComments(){
    const postId = this.props.route.params.postId
    this.waitForGlobeCommentsSocketConnection(() => {
      GlobeCommentWebsocketInstance.fetchComments(
        postId
      )
    })

    GlobeCommentWebsocketInstance.connect(postId)

  }

  waitForCommentsSocketConnection(callback) {
    const component = this;
    setTimeout(
      function(){
        if (SocialCommentsWebsocketInstance.state() === 1){
          callback();
          return;
        } else{
            component.waitForCommentsSocketConnection(callback);
        }
      }, 100)
  }

  waitForGlobeCommentsSocketConnection(callback) {
    const component = this;
    setTimeout(
      function(){
        if (GlobeCommentWebsocketInstance.state() === 1){
          callback();
          return;
        } else{
            component.waitForGlobeCommentsSocketConnection(callback);
        }
      }, 100)
  }

  onPress = () => {
    this.props.navigation.goBack(0)
  }

  componentDidMount = () => {

  }

  _keyboardDidShow(e) {
   // console.log( e.endCoordinates.height )
  }

   onBackNav = () => {
     // this function will be use to navigate back
     // to the home page
     setTimeout(() => {this.props.navigation.goBack(0)}, 100);
   }

   componentDidUpdate(prevProps){

     if(prevProps.socialComments.length !== this.props.socialComments.length){

       this.flatListRef.scrollToEnd({animating: true})

     }
   }

   componentWillUnmount = () => {


     if(this.props.route.params.type === "group"){
       SocialCommentsWebsocketInstance.disconnect()
       this.props.unloadSocialComments()
     } else {
       GlobeCommentWebsocketInstance.disconnect()
     }

   }

   showTextInput = () => {
     this.setState({
       showTextInput: true
     })
   }

   closeTextInput = () => {
     this.setState({
       showTextInput: false
     })
   }

   onOpenTextInput = () => {
     this.scrollRef.snapTo(1);
   }

   pressToScroll = () => {
     this.flatListRef.scrollToEnd({animating: true})

   }

   renderComment = ({item}) => {
     const profilePic = `${global.IMAGE_ENDPOINT}`+item.commentUser.profile_picture
     const user = item.commentUser
     return(
        <SingleComment item = {item} />
     )
   }

   renderContent = () => {
     const comments = this.props.socialComments
     return (
       <KeyboardAvoidingView
         keyboardVerticalOffset = {185}
         behavior = "height" >
         <View
            style = {{
             backgroundColor: 'white',
             height: "100%",
           }}>
           <FlatList
             ref = {ref => this.flatListRef = ref}
             data = {comments}
             renderItem = {this.renderComment}
             keyExtractor={(item, index) => String(index)}
              />
            <RealRoundedInput
              onCommentSubmit = {this.onCommentSubmit}
              onChange = {this.onCommentChange}
              value = {this.state.comment}
              onCommentFocus = {this.pressToScroll}
              />
           </View>
         </KeyboardAvoidingView>
          )
   }

   render(){


     let comments = []
     if(this.props.route.params.type === "group"){

       if(this.props.socialComments){
         comments = this.props.socialComments
       }

     } else {
       if(this.props.globeComments){
         comments = this.props.globeComments
       }
     }

     return (
       <SafeAreaView
         style ={{flex: 1, backgroundColor:'white'}}>
         <KeyboardAvoidingView
           style = {{
             flex: 1,
             backgroundColor:'white',
           }}
           keyboardVerticalOffset = {Platform.OS === "ios" ? 25 : 70}
           behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style ={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor:'#f0f0f0',
                borderBottomWidth:1,
              }}>
              <View style ={{
                  position: 'absolute',
                  left: 10
                }}>
                <TouchableOpacity
                onPress = {() => this.onBackNav()}>
                  <ArrowLeft stroke="black" height = {30} width = {30}/>
                </TouchableOpacity>
              </View>
              <Text style={{fontFamily:'Nunito-SemiBold',}}> {comments.length} Comments </Text>
            </View>
            <View style={{height:'85%',}}>
             <FlatList
               ref = {ref => this.flatListRef = ref}
               data = {comments}
               style={{height:'98.5%', flexGrow:0}}
               renderItem = {this.renderComment}
               keyExtractor={(item, index) => String(index)}
               // removeClippedSubviews={false}
                />
              </View>
              <RealRoundedInput
                onCommentSubmit = {this.props.route.params.type === "group" ? this.onCommentSubmit : this.onGlobeCommentSubmit}
                onChange = {this.onCommentChange}
                onEmojiChange = {this.onEmojiChange}
                value = {this.state.comment}
                onCommentFocus = {this.pressToScroll}
                />
           </KeyboardAvoidingView>
       </SafeAreaView>
     )
   }
 }
 const mapStateToProps = state => {
   return {
     userId: state.auth.id,
     currentUser: state.auth.username,
     profilepic: state.auth.profilePic,
     socialComments: state.socialNewsfeed.socialComments,
     commentHost: state.socialNewsfeed.commentHost,
     cellDate: state.socialNewsfeed.cellDate,
     commentHostNotiToken: state.socialNewsfeed.commentHostNotiToken,
     globeComments: state.globeGroup.globeComments,
     secondUsername: state.auth.secondUsername,
     isOtherAccount: state.auth.isOtherAccount
   }
 }

const mapDispatchToProps = dispatch => {
  return {
    unloadSocialComments: () => dispatch(socialNewsfeedActions.unloadSocialComments())
  }
}

 const styles = StyleSheet.create({
   header: {
   backgroundColor: '#FFFFFF',
   shadowColor: '#333333',
   shadowOffset: {width: -1, height: -3},
   shadowRadius: 2,
   shadowOpacity: 0.4,
   // elevation: 5,
   paddingTop: 20,
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
 },
 panelHeader: {
   alignItems: 'center',
 },
 panelHandle: {
   width: 40,
   height: 8,
   borderRadius: 4,
   backgroundColor: '#00000040',
   marginBottom: 10,
 },
   container: {

   paddingLeft: 15,
   paddingRight: 16,
   paddingVertical: 14,
   flexDirection: 'row',
   alignItems: 'flex-start',
   // backgroundColor:'red',
 },
 captionBody: {
   fontSize:20,
 },
 commentBody: {
   fontSize:12,
 },
 content: {
   marginLeft: 16,
   flex: 1,
 },
 contentHeader: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   // backgroundColor:'red',
 },
 separator: {
   height: 1,
   backgroundColor: "#CCCCCC"
 },
 image:{
   marginLeft:1
 },
 time:{
   fontSize:11,
   color:"#808080",
 },
 name:{
   fontSize:16,
   fontWeight:"bold",
 },
 })



 export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);
