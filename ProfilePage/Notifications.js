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
 import { Avatar } from 'react-native-elements';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { MoreVertical
} from "react-native-feather";
 class Notifications extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   renderItem = ({item}) => {
     // like notification
     // comment Notification
     // private -- accept/decline friend Notification
     // public -- somone follows you

     console.log("")
     return (
       <View style={{flexDirection:'row', padding:15}}>
         <View style={{flex:1}}>
           <Avatar
             // onPress = {() => this.props.ViewProfile(userUsername)}
             size={40}
             rounded
             source = {{
               uri: item.pic
             }}
           />
         </View>
         <View style={{flex:6,  flexDirection:'row'}}>
           <Text style={{fontWeight:'bold'}}> {item.username}</Text>
           <Text> liked your album on</Text>
           <Text style={{fontWeight:'bold'}}> July 1</Text>
          </View>
        <View style={{flex:0}}>
        <Text style={{}}> {item.time}</Text>
        {/*
        <MoreVertical
        style={{top:10}}
          stroke="gray"
          width ={25}
          height = {25}
        />
        */}

        </View>
       </View>
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
     const chatList=[
       {"username":"pinghsu520",
       "pic":"http://192.168.1.200:19002/media/PostPic/public/profile_pictures/2021/03/satsifying_2.png",
       "time": "3d",
       },
     {"username":"andybrvt",
       "pic":"http://192.168.1.200:19002/media/PostPic/public/profile_pictures/2021/06/doggy.jpeg",
       "time": "5d",
      }
   ]

     return (
       <BackgroundContainer>
         <View >
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
