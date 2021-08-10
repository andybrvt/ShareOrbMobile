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
import { Navigation2, MoreVertical, Heart, MessageCircle, ArrowLeft,
ArrowLeftCircle,Bookmark, ChevronsUp, ChevronsDown, Edit2,
} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import * as Animatable from 'react-native-animatable';
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

 const FACES = [
   {
     "imageUrl": 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {

     "imageUrl": 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {

     "imageUrl": 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
   },
   {

     "imageUrl": 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
   },
   {

     "imageUrl": 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
   },

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
     console.log('cellid here')

     // used to connect to the websocket
     const cellId = this.props.route.params.cellId
     console.log(cellId)
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

   viewLikeList=(likePeople)=>{
     this.props.navigation.navigate("DisplayLikeList",
     {
       likePeople:likePeople,
         // comments: socialComments,
         // caption: dayCaption,
         // profilePic:profilePic,
     }
    )
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

   renderItem = ({item}) => {
     const month = dateFns.format(new Date(item.created_at), 'MMMM yyyy');
     return(
       <View style={{
           // backgroundColor: 'red',
           width:'100%',
           height:300,
           marginBottom:25, // change to
           padding:10,

         }}>

        <TouchableOpacity
          activeOpacity={0.6}
          // onPress = {() => this.navAlbum(item.id)}
          >
          <Image
            resizeMode="cover"
            style={{width:'100%', height:'90%', borderRadius:5, }}
            source = {{
              uri: `${global.IP_CHANGE}`+item.itemImage
            }}>
          </Image>

          <View style={{bottom:'15%', left:'4%', position:'absolute'}}>
            <FacePile
              size={2.5} numFaces={3} faces={FACES} circleSize={14}
              containerStyle={{height:40}}
               overlap={0.1} />
          </View>
          <View style={{top:'7.5%', right:'4.5%', position:'absolute'}}>
            <Text style={styles.videoFooterUserName}>
              <MoreVertical
               stroke = "white"
               // fill="red"
               width ={27.5}
               height = {27.5}
               style={{right:5}}
                />
            </Text>
          </View>
          <View style={{bottom:'40%', right:'4%', position:'absolute'}}>
            <Heart
             stroke = "white"
             // fill="red"
             width ={27.5}
             height = {27.5}
             style={{right:5}}
              />
          </View>
          <View style={{bottom:'25%', right:'4%', position:'absolute'}}>
            <MessageCircle
             stroke = "white"
             // fill="red"
             width ={27.5}
             height = {27.5}
             style={{right:5}}
              />
          </View>

          <Text style={styles.albumTitle}>
            {item.title}
          </Text>
        </TouchableOpacity>

        <View style={{top:'100%',position:'absolute', flexDirection:'row', padding:20}}>
          <Text style={{fontWeight:'bold', color:'white', fontSize:15}}>8:32PM </Text>
        <Text style={{color:'white'}}>Going out with the boys</Text></View>


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

   onRedirect = () => {
     this.props.navigation.goBack();
   }

   FlatListItemSeparator = () => {
     return (
       // change to 50 if caption exists
       <View
         style={{
           height: 50,

           width:'97.5%',
           backgroundColor: "white",
           padding:20,
           marginBottom:20,

         }}
       >
       <View style={{flexDirection:'row'}}>
       <Text style={{fontWeight:'bold'}}>admin </Text>
       <Text style={{color:'black'}}>swimmign in the lake</Text>
       </View>
     </View>
     );
   }
   render(){

     console.log(' here in the day album')




     let {
       profilePic,
       firstName,
       lastName,
       userName,
       dayCaption,
       coverPic
     } = ""
     let temp=[]
     let likePost = [];
     let peopleLikeId = [];
     let socialComments = [];
     let postId = "";
     let socialMonth=""
     let socialDay=""
     let today=""
     let utc=""
     let sameDay = false
    // const test = new Date(parseISO(socialDate));
    // const format = require('date-fns/format');
    // const test1=format(test, 'dd');
    // const test2=format(test, 'MMMM');
    let user=""

     if(this.props.socialCalCell){
       const cell = this.props.socialCalCell

       if(this.props.socialCalCell.id){
         postId = this.props.socialCalCell.id;
       }
       if(this.props.socialCalCell.socialCalUser){

          user = this.props.socialCalCell.socialCalUser
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
         // console.log(utc, new Date())
         // console.log(dateFns.isSameDay(utc, new Date() ))
         sameDay = dateFns.isSameDay(utc, new Date());
         let dataList=this.props.socialCalCell.socialCaldate.split("-")
         let getYear=dataList[0]
         let getMonth=dataList[1]-1
         let getDay=dataList[2]
         socialMonth = dateFns.format(new Date(getYear, getMonth, getDay), "MMMM")
         socialDay = dateFns.format(new Date(getYear, getMonth, getDay), "d")
       }

       if(this.props.socialCalCell.people_like)
       {
         temp = this.props.socialCalCell.people_like.map(item => {
          return {
            imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
          };
          });
       }
     }

     if(likePost.length > 0){
       for(let i = 0; i< likePost.length; i++){
         peopleLikeId.push(likePost[i].id);
       }
     }

     return (
       <View style={{width:'100%', height:'100%', backgroundColor: 'rgba(0, 0, 0, 0.85)'}}>
         <View style={{padding:15, flexDirection:'row', alignItems:'center', borderBottomColor:'#434343', borderBottomWidth:1}}>

           <TouchableOpacity

             onPress = {() => this.onRedirect()}>
           <ArrowLeft
             stroke='white'
             width ={35}
             height = {35}
            />

          </TouchableOpacity>
          <View style = {styles.chatInfoHolder} >
            <Avatar
            rounded
              source = {{
                uri: `${global.IMAGE_ENDPOINT}`+user.profile_picture,
              }}
              size = {40}
               />
             <View style = {styles.chatInfo}>
               <View style = {styles.chatNameContainer}>
                 <Text style = {styles.chatName}>{userName}</Text>
               </View>
               <Text style = {styles.chatText}> {firstName+" "+lastName} </Text>
             </View>
          </View>
          {/*
           <Avatar
             style={styles.close}
            onPress = {() => this.viewProfile(this.props.socialCalCell.socialCalUser.username)}
             size={40}
             rounded
             source = {{
             uri: `${global.IMAGE_ENDPOINT}`+this.props.socialCalCell.socialCalUser.profile_picture,
           }}
           />
         <View>
             <Text style = {styles.DayAlbumUserName}>
               {firstName+" "+lastName}
              </Text>
              <Text style = {styles.DayAlbumUserName}>
                {userName}
              </Text>
            </View>
            */}
            <View style = {styles.testWhere2}>
                   <Text style = {styles.videoFooterUserName}>
                     {socialMonth}
                   </Text>
                   <Text style = {styles.dayNumTag}>
                     {socialDay}
                   </Text>
               </View>
         </View>
         <FlatList

            contentContainerStyle={{paddingBottom:40}}
            showsVerticalScrollIndicator={false}
            data = {this.props.socialCalCell.get_socialCalItems}
            renderItem ={(item) => this.renderItem(item)}
            keyExtractor={(item, index) => String(index)}
            // ItemSeparatorComponent = { this.FlatListItemSeparator }
          />




            <View  style={styles.openContainer}>
              {/* day caption
              <View style={styles.firstContainer}>
                <View>
                  <Text  style = {styles.DayCaption}>
                    <Text style = {styles.bottomDayAlbumName}>{userName}</Text>
                    &nbsp; {dayCaption}</Text>
                </View>
              </View>
              */}
              {/* day container like
              <TouchableOpacity style={styles.secondContainer} onPress={()=> this.viewLikeList(this.props.socialCalCell.people_like)}>
                  <FacePile size={2} numFaces={3} faces={temp} circleSize={17.5}
                    containerStyle={{height:40}}
                     overlap={0.1} />
              </TouchableOpacity>
              */}
            </View>
       </View>
     )
   }
 }

 const styles = StyleSheet.create({
   expiringImageLook:{

     height:'100%',
     width:'100%',
     borderRadius: 5,
   },
   child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
   // {bottom:'17.5%', color:'white', fontSize:17, padding:10}
   albumTitle2:{
     bottom:'25%',
     color:'white',
     fontSize:15,

     padding:10,
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10
   },
   albumTitle:{

     color:'white',
     // backgroundColor:'red',
     fontSize:15,
     padding:20,
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10
   },
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

     padding:10,
     right:0,
     width:'30%',
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
     padding: 10,
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
     left:'3%',
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



     width: 35,
     height: 35,
   },
   albumLook:{
     borderRadius: 10,
     width: SCREEN_WIDTH-5,
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

   },

   chatInfoHolder:{
     left:10,
     display: 'flex',
     flexDirection: 'row',
     alignItems:'center',
     flex:1,
   },

   chatInfo: {
     justifyContent: "center",
     marginLeft: 10,
     // backgroundColor:'red',
   },
   chatNameContainer: {
     flexDirection: "row"
   },
   chatName: {
     fontSize: 18,
     color: 'white',
     fontWeight:'bold',

     left:5,
   },

   chatText: {
     marginTop: 0,
     color: 'white',
     fontWeight: '400'
   },



 })

 const mapStateToProps = state => {
   return {
     socialCalCell: state.socialCal.socialCalCellInfo,
     userId: state.auth.id,
     username: state.auth.username
   }
 }

 export default connect(mapStateToProps, null)(DayAlbum)
