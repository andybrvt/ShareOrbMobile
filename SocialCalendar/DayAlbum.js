import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
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
         <View >
           <Text> Search Friends</Text>
           <Avatar
             size={300}

             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+entireDay[0].coverPic,
             }}
           />
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default DayAlbum;
