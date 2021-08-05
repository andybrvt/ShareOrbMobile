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
  Keyboard
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import SocialCommentsWebsocketInstance from '../Websockets/commentsCellWebsocket';
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';
import TextModal from '../RandomComponents/TextModal';
import FakeSquaredInput from '../RandomComponents/FakeSquaredInput';
import RealRoundedInput from '../RandomComponents/RealRoundedInput';
import SingleComment from './SingleComment';


 class Comments extends React.Component{


   state = {
     comment: '',
     showTextInput: false,
   }

   constructor(props){
     super(props)
     this.initialiseComments()
     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);


   }


   onCommentChange = e =>{
     const tempVal = e;
     this.setState({
       comment: tempVal
     })
   }

   onCommentSubmit = () => {
     // use to submit the comments into the websocket

     const comment = this.state.comment
     if(this.state.comment.length > 0){
       const cellId = this.props.route.params.cellId
       const userId = this.props.userId
       const commentHost = this.props.commentHost
       const cellDate = this.props.cellDate
       const notificationObject = {
         command: "social_comment_notification",
         actor: userId,
         recipient:commentHost,
         cellDate: cellDate
       }
       // Now do the websocket here
       SocialCommentsWebsocketInstance.sendComment(
         cellId,
         userId,
         comment,
       )

       if(userId !== commentHost){
         NotificationWebSocketInstance.sendNotification(notificationObject)

       }

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
    const cellId = this.props.route.params.cellId
    this.waitForCommentsSocketConnection(() => {
      SocialCommentsWebsocketInstance.fetchComments(
        cellId
      )
    })

    SocialCommentsWebsocketInstance.connect(cellId)
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

  onPress = () => {
    this.props.navigation.goBack(0)
  }

  componentDidMount = () => {
    this.scrollRef.snapTo(0);
  }

  _keyboardDidShow(e) {
   // console.log( e.endCoordinates.height )
  }

   onBackNav = () => {
     // this function will be use to navigate back
     // to the home page
     this.scrollRef.snapTo(1);
     setTimeout(() => {this.props.navigation.goBack(0)}, 100);
   }

   componentDidUpdate(prevProps){

     if(prevProps.socialComments.length !== this.props.socialComments.length){

       this.flatListRef.scrollToEnd({animating: true})

     }
   }

   componentWillUnmount = () => {
     SocialCommentsWebsocketInstance.disconnect()
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
     // let profilePic = ""
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

            {/*
              <Button
                onPress = {() => this.pressToScroll()}
                title = "scroll" />

              */}


           </View>

         </KeyboardAvoidingView>


            )
   }



   render(){

     return (

         <SafeAreaView
           style = {{
             // backgroundColor: 'red',
             flex: 1
           }}>
             <TouchableWithoutFeedback onPress = {() => this.onBackNav()}>

               <View style = {{
                   flex: 1,
                   backgroundColor: 'transparent'}}>


                     <BottomSheet
                       ref = {node => {this.scrollRef = node}}
                       snapPoints = {["90%","0%"]}
                       initialSnap = {1}
                       renderHeader ={this.renderHeader}
                       renderContent = {this.renderContent}
                       // enabledContentGestureInteraction = {false}
                       callbackThreshold = {0.6}
                       enabledInnerScrolling = {true}
                       // onCloseEnd = {() => console.log('closer here ')}
                       // onOpenEnd = {() => console.log('opener here')}
                       onCloseStart = {() => this.onPress()}
                        />



               </View>


             </TouchableWithoutFeedback>










            {/*
              <TextModal
                {...this.props}
                onCommentChange = {this.onCommentChange}
                onCommentValue = {this.state.comment}
                onCancel = {this.closeTextInput}
                visible = {this.state.showTextInput}/>

              */}



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
     cellDate: state.socialNewsfeed.cellDate
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



 export default connect(mapStateToProps)(Comments);
