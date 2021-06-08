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
   }

   changeShowComments = () => {
     let entireDay= (this.props.route.params.entireDay)
     let dayCaption=entireDay[0].dayCaption
     let socialComments=entireDay[0].get_socialCalComment
     let profilePic=entireDay[0].socialCalUser.profile_picture
     this.props.navigation.navigate("Comments",
     {
         comments: socialComments,
         caption: dayCaption,
         profilePic:profilePic,
     }
     )
   }

   changeShowLike = () => {
     this.setState({
       showLike:!this.state.showLike,
     });
   }

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){

      let entireDay= (this.props.route.params.entireDay)
      console.log("hoho")
      console.log(entireDay[0])
      let profilePic=entireDay[0].socialCalUser.profile_picture

      let firstName=entireDay[0].socialCalUser.first_name
      let lastName=entireDay[0].socialCalUser.last_name
      let userName=entireDay[0].socialCalUser.username
      let dayCaption=entireDay[0].dayCaption
      let socialComments=entireDay[0].get_socialCalComment
      let likePost=entireDay[0].people_like

     return (
       <BackgroundContainer>
         <ImageBackground
           blurRadius={80}
           source={{ uri: `${global.IMAGE_ENDPOINT}`+entireDay[0].coverPic,}}
            style={styles.albumOuterContainer}>

           <Image
             key={'blurryImage'}
             size={300}
             style={styles.albumLook}
             // blurRadius={10}
             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+entireDay[0].coverPic,
             }}
           />
           <Avatar
             style={styles.close}
             onPress = {() => this.props.ViewProfile()}
             size={35}
             rounded
             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+profilePic,
             }}
           />
           <View style = {styles.tagCSS1}>
             <TouchableOpacity onPress={this.changeShowLike}>
             <View style = {styles.justifyCenter}>
               {
                 (this.state.showLike==true) ?
                 <FontAwesomeIcon
                 style = {{
                   color:'red',
                   right:3,
                 }}
                 size = {20}
                 icon={faHeart} />
                 :
                 <FontAwesomeIcon
                   style = {{
                     color:'white',
                     right:3,
                   }}

                 size = {20}
                 icon={faHeart}>

               </FontAwesomeIcon>

               }
               <Text  style = {styles.justifyCenter1}>
               {likePost.length}
               </Text>
             </View>
             </TouchableOpacity>
           </View>
           <View style = {styles.tagCSS2}>
             <TouchableOpacity  onPress={this.changeShowComments}>
               <View  style = {styles.justifyCenter}>
                 {
                   (socialComments) ?
                   <FontAwesomeIcon
                   style = {{
                     color:'white',
                     right:3,
                   }}
                   size = {20}
                   icon={faComment} />
                   :

                   <FontAwesomeIcon
                   style = {{
                     color:'red',
                     right:3,
                   }}
                   size = {20}
                   icon={faComment} />
                 }
                 <Text  style = {styles.justifyCenter1}>
                 {socialComments.length}
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
           {firstName+" "+lastName}

        </Text>




        <View  style={styles.openContainer}>


          <View style={styles.firstContainer}>
            <View>
              {/*<Text style = {styles.bottomDayAlbumName}> {firstName+" "+lastName}</Text>*/}
              <Text  style = {styles.DayCaption}>
                <Text style = {styles.bottomDayAlbumName}>{userName}</Text>
                &nbsp; {dayCaption}</Text>
            </View>
          </View>
          <View style={styles.secondContainer}>
            {/* https://openbase.com/js/react-native-face-pile*/}
            <FacePile size={3} numFaces={3} faces={FACES} circleSize={17.5}
              containerStyle={{height:40}}
               overlap={0.1} />
          </View>
        </View>
         </ImageBackground>





       </BackgroundContainer>

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
     width: '95%',
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

 export default DayAlbum;
