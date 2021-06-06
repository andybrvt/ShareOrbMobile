import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import FacePile from 'react-native-face-pile'
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 const FACES = [
   {
     id: 0,
     imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
   },
   {
     id: 1,
     imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
   },
   {
     id: 2,
     imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
   },
   {
     id: 3,
     imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
   },
   {
     id: 4,
     imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
   }
 ];

 class DayAlbum extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){

      let entireDay= (this.props.route.params.entireDay)
      console.log(entireDay[0])
      let profilePic=entireDay[0].socialCalUser.profile_picture
      let firstName=entireDay[0].socialCalUser.first_name
      let lastName=entireDay[0].socialCalUser.last_name
      let userName=entireDay[0].socialCalUser.username

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
         <Text style = {styles.DayAlbumUserName}>
           {userName}
        </Text>




        <View  style={styles.openContainer}>


          <View style={styles.firstContainer}>
              <Text style = {styles.bottomDayAlbumName}> {firstName+" "+lastName}</Text>
              <Text  style = {styles.DayCaption}>This is the test caption this is the test1
              caption this is the test caption</Text>
          </View>
          <View style={styles.secondContainer}>
            <FacePile numFaces={3} faces={FACES} />
          </View>
        </View>
         </ImageBackground>





       </BackgroundContainer>

     )
   }
 }

 const styles = StyleSheet.create({
   openContainer:{
     flexDirection:'row',
     bottom:'5.5%',
     position:'absolute',
     left:'5%',
   },
   firstContainer:{
     flex:2,
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
     fontSize:14,
     // textShadowColor: 'rgba(0, 0, 0, 0.75)',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 5,
     fontWeight:'bold',
     bottom:'100%',

     position: "absolute",
     // fontWeight:'bold',

   },
   DayCaption: {
     position:'absolute',


     // backgroundColor:'red',
     color:'white',


     fontWeight:'600',

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
