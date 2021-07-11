import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions
 } from 'react-native';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import { FlatList } from "react-native-bidirectional-infinite-scroll";
 class Notifications extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   renderItem = ({item}) => {
     console.log("")
     return (
       <View><Text>{item.username} liked your post on</Text></View>
     )
   }
   FlatListItemSeparator = () => {
     return (
       <View
         style={{
           height: 1,
           width: "100%",
           backgroundColor: "#f0f0f0",
         }}
       />
     );
   }

   render(){
     const chatList=[{"username":"pinghsu520"
     , "second":1}, {"username":"andybrvt"}]

     return (
       <BackgroundContainer>
         <View >
           <Text> noti gang</Text>
           <FlatList
             style = {{marginTop:5}}
             data = {chatList}
             renderItem = {this.renderItem}
             ItemSeparatorComponent = { this.FlatListItemSeparator }

           />
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default Notifications;
