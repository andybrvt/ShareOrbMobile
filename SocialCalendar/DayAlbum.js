import React from 'react';
import * as dateFns from 'date-fns';
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
  TouchableWithoutFeedback
 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import FacePile from 'react-native-face-pile';
import SocialCalCellPageWebSocketInstance from '../Websockets/socialCalCellWebsocket';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { parseISO } from 'date-fns'
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import { Navigation2, Heart, MessageCircle, ArrowLeft,
ArrowLeftCircle,Bookmark, ChevronsUp, ChevronsDown, Edit2,
} from "react-native-feather";
import * as Animatable from 'react-native-animatable';
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

 const FACES = [
   {
     imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {

     imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {

     imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
   },
   {

     imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {

     imageUrl: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
   },
   {

     imageUrl: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
   }
 ];

 class DayAlbum extends React.Component{

   constructor(props){
     super(props);
     this.state = {
       showComments: false,
       showLike: false,
       curBackgroundPic: '',
       coverPicDay:'',
     }
     this.initializeDayAlbum()
     // this.handleClick = this.renderItem.bind(this);
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

   componentDidMount(){

     if(this.props.socialCalCell){
       if(this.props.socialCalCell.get_socialCalItems){
         this.setState({
           curBackgroundPic: this.props.socialCalCell.get_socialCalItems[0].itemImage,
           coverPicDay:this.props.socialCalCell.get_socialCalItems[0].itemImage,
         })
       }

     }
   }


   componentDidUpdate(prevProps){

     if(this.props.socialCalCell !== prevProps.socialCalCell){
       if(this.props.socialCalCell){
         if(this.props.socialCalCell.get_socialCalItems){
           this.setState({
             curBackgroundPic: this.props.socialCalCell.get_socialCalItems[0].itemImage
           })
         }

       }

     }
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

   editAlbum = () => {
     this.props.navigation.navigate("PostingPage",

     );
   }



   renderItem = ({item,index}) =>{


     return (
       <View style = {styles.carouselImageHolder}>
         {/*
         <View style={{alignItems:'center', flexDirection:'row', height:30, top:10}}>
           <View style={{}}>
             <ChevronsUp
               fill="white"
               width={30}
               height={30}
              />
           </View>
           <View>
             <Animatable.Text animation="fadeIn" iterationCount={"infinite"} direction="alternate" delay={10}>
                <Text style={{color:'white', fontSize:18, top:0}}>July 16</Text>
              </Animatable.Text>
            </View>
         </View>
         */}

         <Image
           key={'blurryImage'}
           style={styles.albumLook}
           source = {{
             uri: `${global.IMAGE_ENDPOINT}`+item.itemImage,
           }}/>

         <Avatar
           style={styles.close}
           onPress = {() => this.viewProfile(item.creator.username)}
           size={35}
           rounded
           source = {{
             uri: `${global.IMAGE_ENDPOINT}`+item.creator.profile_picture,
           }}
         />
        {/*
         <View style={{alignItems:'center', flexDirection:'row', height:'11%', bottom:0}}>
           <ChevronsDown
             fill="white"
             width={30}
             height={30}
            />

           <Animatable.Text animation="fadeIn" iterationCount={"infinite"} direction="alternate" delay={10}>
              <Text style={{color:'white', fontSize:18, bottom:10}}>
                October 2
              </Text>
          </Animatable.Text>
          </View>
          */}
         </View>


     )
   }

   viewProfile = (username) => {

     if(username === this.props.username){
       this.props.navigation.navigate("Profile");
     } else {
       this.props.navigation.navigate("ProfilePage", {
         username: username
       })
     }

   }

   changeBackground = e =>{
     console.log(e)

     this.setState({
       curBackgroundPic: this.props.socialCalCell.get_socialCalItems[e].itemImage

     })
   }

   render(){

     console.log(' here in the day album')
     console.log(this.props)
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
     let socialMonth=""
     let socialDay=""
     let today=""
     let utc=""

    // const test = new Date(parseISO(socialDate));
    // const format = require('date-fns/format');
    // const test1=format(test, 'dd');
    // const test2=format(test, 'MMMM');


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

       if(this.props.socialCalCell.socialCaldate){
         let today=new Date(this.props.socialCalCell.socialCaldate)
         let utc = dateFns.addHours(today, today.getTimezoneOffset()/60)
         console.log(today, utc)
         console.log(dateFns.isSameDay(utc, new Date()))
         let dataList=this.props.socialCalCell.socialCaldate.split("-")
         let getYear=dataList[0]
         let getMonth=dataList[1]-1
         let getDay=dataList[2]

         socialMonth = dateFns.format(new Date(getYear, getMonth, getDay), "MMMM")
         socialDay = dateFns.format(new Date(getYear, getMonth, getDay), "d")
       }


     }

     if(likePost.length > 0){
       for(let i = 0; i< likePost.length; i++){
         peopleLikeId.push(likePost[i].id);
       }
     }
     return (
       <View style={{width:'100%', height:'100%'}}>


         <ImageBackground
           blurRadius={80}
           style={styles.albumOuterContainer}
           source={{ uri: `${global.IMAGE_ENDPOINT}`+this.state.coverPicDay}}

           >


             <Carousel
              layout='stack'
              removeClippedSubviews={false}
              inactiveSlideScale={1}
              slideStyle={{ }}
              ref={ref => this.carousel = ref}
              loop={false}
              data={this.props.socialCalCell.get_socialCalItems}
              sliderWidth={width}
              itemWidth={width}
              renderItem={this.renderItem}
              onBeforeSnapToItem = {e => this.changeBackground(e)}
               />

               <View style = {styles.testWhere2}>
                   <Text style = {styles.videoFooterUserName}>
                     {socialMonth}
                   </Text>
                   <Text style = {styles.dayNumTag}>
                     {socialDay}
                   </Text>
               </View>
               <TouchableWithoutFeedback
                 onPress = {() => this.props.navigation.goBack(0)}>
                   <ArrowLeft
                         style={styles.close2}
                         stroke='white'
                         width ={30}
                         height = {30}
                    />
              </TouchableWithoutFeedback>
               <View style = {styles.tagCSS1}>
                 <TouchableOpacity onPress={() => this.sendLike(postId, this.props.userId)}>
                 <View style = {styles.justifyCenter}>
                   <Heart
                     stroke = "red"
                     fill="red"
                     width ={32.5}
                     height = {32.5}
                     style={{right:5}}
                      />
                   <Text  style = {styles.justifyCenter1}>
                     {likePost.length}
                   </Text>
                 </View>
                 </TouchableOpacity>
               </View>
               <View style = {styles.tagCSS2}>
                 <TouchableOpacity  onPress={this.changeShowComments}>
                   <View  style = {styles.justifyCenter}>
                     <MessageCircle
                       stroke = "white"
                       fill="white"
                       width ={32.5}
                       height = {32.5}
                       style={{right:5}}
                     />
                     <Text  style = {styles.justifyCenter1}>
                     {socialComments.length}
                   </Text>
                   </View>
                 </TouchableOpacity>
               </View>
               {/* only on current day,
                 MUST CHECK IF USER ID IS SAME AS USER
                 this.props.id== ... */}
               {
                 dateFns.isSameDay(utc, today)?
               <View style={styles.tagCSS3}>
                 <Edit2
                   onPress={() => this.editAlbum()}
                   stroke = "white"
                   fill="white"
                   width ={30}
                   height = {30}
                    />
               </View>
               :
               <Text></Text>
               }
             <Text style = {styles.DayAlbumUserName}>
               {firstName+" "+lastName}
            </Text>
            <View  style={styles.openContainer}>
              <View style={styles.firstContainer}>
                <View>
                  <Text  style = {styles.DayCaption}>
                    <Text style = {styles.bottomDayAlbumName}>{userName}</Text>
                    &nbsp; {dayCaption}</Text>
                </View>
              </View>
              <View style={styles.secondContainer}>
                <FacePile size={2} numFaces={3} faces={FACES} circleSize={17.5}
                  containerStyle={{height:40}}
                   overlap={0.1} />
              </View>
            </View>
         </ImageBackground>
       </View>
     )
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
   testWhere2:{
     position:'absolute',
     top:'5.5%',
     padding:10,
     right:'1%',
     width:'20%',
     flexDirection:'column',
     alignItems:'center',
      // backgroundColor:'red',
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
   backArrow: {
     position:'absolute',
     backgroundColor: 'rgba(0,0,0,.6)',
     padding:10,
     borderRadius:25,
     color:'white',
     top:'15%',
     left:'1%',
     justifyContent: 'center',
     fontSize:13,
     right:10,
     // fontWeight:'bold',

   },
   tagCSS1: {
     position:'absolute',
     // backgroundColor: 'rgba(0,0,0,.6)',
     padding:10,
     borderRadius:25,
     color:'white',
     bottom:'35%',
     justifyContent: 'center',
     fontSize:13,
     right:10,
     // fontWeight:'bold',

   },
   tagCSS2: {
     position:'absolute',
     // backgroundColor: 'rgba(0,0,0,.6)',
     padding:10,
     borderRadius:25,
     color:'white',
     bottom:'28%',
     fontSize:13,
     right:10,
     textAlign:'right',
     // fontWeight:'bold',
   },

   tagCSS3: {
     position:'absolute',
     // backgroundColor: 'rgba(0,0,0,.6)',
     padding:7.5,
     borderRadius:25,
     color:'white',
     bottom:'21%',
     fontSize:13,
     right:20,
     textAlign:'right',
     // fontWeight:'bold',
   },


   tagCSS10: {
     position:'absolute',
     backgroundColor: 'rgba(0,0,0,.6)',
     padding:15,
     borderRadius:25,
     color:'white',

     fontSize:13,
     right:15,
     top:50,
     textAlign:'right',
     // fontWeight:'bold',

   },

   openContainer:{
     flexDirection:'row',
     bottom:'7%',
     position:'absolute',
     left:'5%',
     justifyContent:'center',
   },
   firstContainer:{
     flex:1.5,
     // backgroundColor:'red',
   },
   secondContainer:{
     flex:1,
     // backgroundColor:'blue',
   },

   DayAlbumUserName: {
     color:'white',
     fontSize:16,
     // textShadowColor: 'rgba(0, 0, 0, 0.75)',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 5,
     fontWeight:'bold',
     top:'7.5%',
     left:'28%',
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
     bottom:'90%',
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

   close2: {
     margin: 5,
     position: "absolute",
     top:'5.5%',
     left:'2.5%',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 5,
     fontWeight:'bold',
     backgroundColor: 'rgba(0,0,0,.6)',
     padding:20,
     borderRadius:25,
   },
   close: {
     margin: 5,
     position: "absolute",
     top:'6%',
     left:'15%',
     width: 35,
     height: 35,
   },
   albumLook:{
     borderRadius: 10,
     width: SCREEN_WIDTH-10,
     height: '90%',
     top:'3.5%',
     alignItems:'center',

     // flex: 1,
     // resizeMode: 'contain'
   },
   albumLook2:{
     borderRadius: 10,
     width: '100%',
     height: '100%',

   },
   albumOuterContainer:{
     justifyContent: "center",
     // alignItems: 'center',
     height:'100%',
     flexDirection:'column',
   },
   carouselImageHolder: {
     width: width,
     height: height,
     alignItems: 'center',

   }



 })

 const mapStateToProps = state => {
   return {
     socialCalCell: state.socialCal.socialCalCellInfo,
     userId: state.auth.id,
     username: state.auth.username
   }
 }

 export default connect(mapStateToProps, null)(DayAlbum)
