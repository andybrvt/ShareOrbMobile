import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
 } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import FacePile from 'react-native-face-pile';
import { faHeart, faComment, faBookmark} from '@fortawesome/free-regular-svg-icons';
import SocialCalCellPageWebSocketInstance from '../Websockets/socialCalCellWebsocket';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 const FACES = [
   {
     id: 0,
     imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {
     id: 1,
     imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {
     id: 2,
     imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
   },
   {
     id: 3,
     imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {
     id: 4,
     imageUrl: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
   },
   {
     id: 5,
     imageUrl: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
   }
 ];

 class DayAlbum extends React.Component{

   constructor(props){
     super(props);
     this.state = {
       showComments: false,
       showLike: false,

     }
     this.initializeDayAlbum()
   }

   initializeDayAlbum(){
     // used to connect to the websocket
     const cellId = this.props.route.params.cellId
     this.waitForDayAlbumSocketConnection(() => {
       SocialCalCellPageWebSocketInstance.fetchSocialCalCellInfo(
         cellId
       )
     })

     SocialCalCellPageWebSocketInstance.connect(cellId)

   }

   waitForDayAlbumSocketConnection(callback){
     const component = this;
     setTimeout(
       function(){

         if (SocialCalCellPageWebSocketInstance.state() === 1){

           callback();
           return;
         } else{
             component.waitForDayAlbumSocketConnection(callback);
         }
       }, 100)
   }


   changeShowComments = () => {
     // let entireDay= (this.props.route.params.entireDay)
     // let dayCaption=entireDay[0].dayCaption
     // let socialComments=entireDay[0].get_socialCalComment
     // let profilePic=entireDay[0].socialCalUser.profile_picture
     // this.props.navigation.navigate("Comments",
     // {
     //     comments: socialComments,
     //     caption: dayCaption,
     //     profilePic:profilePic,
     // }
     // )
   }

   sendLike = (cellId, personLike) => {

     SocialCalCellPageWebSocketInstance.sendSocialCalCellLike(cellId, personLike)

   }

   sendUnLike = (cellId, personLike) => {
     console.log('send unlike')
   }

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   renderItem({item,index}){
     console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCC")
     console.log(item)
     return (
       <View style={{flex:1}}>
         <ImageBackground
         blurRadius={80}
         source={{ uri: `${global.IMAGE_ENDPOINT}`+item.itemImage,}}
        style={styles.albumOuterContainer}>

           <Image
             key={'blurryImage'}

             style={styles.albumLook}
             // blurRadius={10}
             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+item.itemImage,
             }}
           />
           <Avatar
             style={styles.close}
             onPress = {() => this.props.ViewProfile()}
             size={35}
             rounded
             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+item.creator.profile_picture,
             }}
           />


             <View style = {styles.tagCSS1}>
               <TouchableOpacity onPress={() => this.sendLike(postId, this.props.userId)}>
               <View style = {styles.justifyCenter}>


                   <FontAwesomeIcon
                   style = {{
                     color:'white',
                     right:3,
                   }}
                   size = {20}
                   icon={faHeart} />


                 <Text  style = {styles.justifyCenter1}>
                 4
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
           <Text style = {styles.DayAlbumUserName}>
             {item.creator.first_name+" "+item.creator.last_name}
          </Text>
          <View  style={styles.openContainer}>
            <View style={styles.firstContainer}>
              <View>
                <Text  style = {styles.DayCaption}>
                  <Text style = {styles.bottomDayAlbumName}>{item.creator.username}</Text>
                  &nbsp; {item.dayCaption}</Text>
              </View>
            </View>
            <View style={styles.secondContainer}>
              <FacePile size={3} numFaces={3} faces={FACES} circleSize={17.5}
                containerStyle={{height:40}}
                 overlap={0.1} />
            </View>
          </View>
        </ImageBackground>
      </View>
     )
   }

   render(){

     let {
       profilePic,
       firstName,
       lastName,
       userName,
       dayCaption,
       coverPic
     } = ""


     let likePost = [];
     let peopleLikeId = [];
     let socialComments = [];
     let postId = "";
     console.log('here is the props')


     console.log(this.props)
     if(this.props.socialCalCell){
       const cell = this.props.socialCalCell

       if(this.props.socialCalCell.id){
         postId = this.props.socialCalCell.id;
       }
       if(this.props.socialCalCell.socialCalUser){

         const user = this.props.socialCalCell.socialCalUser
          profilePic = user.profile_picture

          firstName = user.first_name
          lastName = user.last_name
          userName = user.username
       }

       dayCaption = cell.dayCaption
       coverPic = cell.coverPic

       console.log('here are teh comments')
       if(this.props.socialCalCell.get_socialCalComment){
         socialComments = this.props.socialCalCell.get_socialCalComment
       }

       if(this.props.socialCalCell.people_like){
         likePost = this.props.socialCalCell.people_like
       }


     }

     if(likePost.length > 0){
       for(let i = 0; i< likePost.length; i++){
         peopleLikeId.push(likePost[i].id);
       }
     }


     const width = Dimensions.get('window').width;
     return (
       <View style={{width:'100%', height:'100%'}}>



           <Carousel
             layout='stack'
             removeClippedSubviews={false}
             sliderWidth={width}
            itemWidth={width}
            inactiveSlideScale={1}
            slideStyle={{  flex:1 }}
            ref={ref => this.carousel = ref}
            data={this.props.socialCalCell.get_socialCalItems}
            sliderWidth={width}
            itemWidth={width}
            renderItem={this.renderItem}
             />

       </View>


     )
   }
 }

 const styles = StyleSheet.create({
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
     backgroundColor: 'rgba(0,0,0,.6)',
     padding:9,
     borderRadius:25,
     color:'white',
     bottom:225,
     justifyContent: 'center',
     fontSize:13,
     right:10,
     // fontWeight:'bold',

   },
   tagCSS2: {
     position:'absolute',
     backgroundColor: 'rgba(0,0,0,.6)',
     padding:9,
     borderRadius:25,
     color:'white',
     bottom:180,
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
     bottom:135,
     fontSize:13,
     right:15,
     textAlign:'right',
     // fontWeight:'bold',

   },

   openContainer:{
     flexDirection:'row',
     bottom:'6.5%',
     position:'absolute',
     left:'5%',
   },
   firstContainer:{
     flex:1.5,

     // backgroundColor:'red',
   },
   secondContainer:{
     flex:1,

     // backgroundColor:'blue',
   },
   DayCaptionContainer:{
     width:'70%',
     left:'5%',
     bottom:'12.5%',
     position:'absolute',
     // backgroundColor:'red',

   },
   DayAlbumUserName: {

     color:'white',
     fontSize:14,
     // textShadowColor: 'rgba(0, 0, 0, 0.75)',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 5,
     fontWeight:'bold',
     top:'9%',
     left:'17.5%',
     position: "absolute",
     // fontWeight:'bold',

   },
   bottomDayAlbumName: {

     color:'white',
     fontSize:15,
     // textShadowColor: 'rgba(0, 0, 0, 0.75)',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 5,
     fontWeight:'bold',
     bottom:'100%',
     padding:10,
     position: "absolute",
     // fontWeight:'bold',

   },
   DayCaption: {
     position:'absolute',


     // backgroundColor:'red',
     color:'white',


     fontWeight:'600',
     fontSize:15,
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10
     // fontWeight:'bold',

   },
   close: {
     margin: 5,
     position: "absolute",
     top:'7.5%',
     left:'5%',
     width: 35,
     height: 35,
     color: "tomato"
   },
   albumLook:{
     borderRadius: 10,
     width: '97.5%',
     height: '80%',
     position:'absolute',
     top:'5%',

   },
   albumLook2:{
     borderRadius: 10,
     width: '100%',
     height: '100%',

   },
   albumOuterContainer:{
     justifyContent: "center",
     alignItems: 'center',
     height:'100%',
     flexDirection:'column',


   },



 })

 const mapStateToProps = state => {
   return {
     socialCalCell: state.socialCal.socialCalCellInfo,
     userId: state.auth.id
   }
 }

 export default connect(mapStateToProps, null)(DayAlbum)
