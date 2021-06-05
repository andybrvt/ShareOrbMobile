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
          <View>
           <Text style = {styles.videoFooterUserName}> @pinghsu520</Text>
           <Text  style = {styles.videoFooter}>This is a test</Text>
          </View>
         </ImageBackground>
       </BackgroundContainer>

     )
   }
 }

 const styles = StyleSheet.create({
   albumLook:{
     borderRadius: 10,
     width: '90%',
     height: '80%',


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

     textShadowColor: 'black',
   textShadowOffset: {width: -1, height: 1},
   textShadowRadius: 10
     // fontWeight:'bold',

   },

 })

 export default DayAlbum;
