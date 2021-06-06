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
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

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
             size={40}
             rounded
             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+profilePic,
             }}
           />
         <Text style = {styles.DayAlbumUserName}>
           {userName}
        </Text>

         </ImageBackground>
         <View style={styles.DayCaption} >
           <Text style = {styles.videoFooterUserName}> {firstName+" "+lastName}</Text>
           <Text  style = {styles.videoFooter}>This is the test caption</Text>
          </View>
       </BackgroundContainer>

     )
   }
 }

 const styles = StyleSheet.create({

   DayCaption:{
     flexDirection:'row',
     left:'5%',
     bottom:'10%',
     position:'absolute',

   },
   DayAlbumUserName: {

     color:'white',
     fontSize:16,
     // textShadowColor: 'rgba(0, 0, 0, 0.75)',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 5,
     fontWeight:'bold',
     top:'9%',
     left:'20%',
     position: "absolute",
     // fontWeight:'bold',

   },
   videoFooter: {
     position:'absolute',


     // backgroundColor:'red',
     color:'white',

     top:15,

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
     left:'7.5%',
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
