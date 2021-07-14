import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
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
         <View style={{flex:6,  flexDirection:'row', flexWrap:'wrap'}}>
           <Text style={{fontWeight:'bold'}}> {item.username} </Text>
           {(item.action&&(item.private=="true"))?
             <View style={{paddingBottom:10}}>
             <Text>{item.action}
             </Text>
             <View style={{flexDirection:'row'}}>
               <TouchableOpacity>
                 <View style={styles.editButton}>
                    <Text style={{color:'white'}}>Accept</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.declineButton}>
                     <Text style={{color:'white',}}>Decline</Text>
                   </View>
                </TouchableOpacity>
               </View>
              </View>
           :
           <Text>{item.action}</Text>
         }

           <Text style={{fontWeight:'bold'}}> {item.date}</Text>
          </View>
        <View style={{flex:0}}>
        <Text style={{color:'#8c8c8c'}}> {item.time}</Text>
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
       "action":"liked your album on",
       "date":"July 1",
       "time": "3d",
       },
     {"username":"andybrvt",
       "pic":"http://192.168.1.200:19002/media/PostPic/public/profile_pictures/2021/06/doggy.jpeg",
       "action":"commented on your album on",
       "date":"Jan 24",
       "time": "5d",
     },
      {"username":"heather838282828292aaaaaaaaaaa2",
        "pic":"https://images.unsplash.com/photo-1610555248279-adea4c523fb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
        "action":"sent a follow request",
        "private":"true",
        "time": "5d",
      },
       {"username":"romeo938",
         "pic":"https://images.unsplash.com/photo-1610490689129-26c48e3cb975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
         "action":"started following you",
         "time": "11d",
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

 const styles = StyleSheet.create({
   editButton: {
     alignItems: 'center',
     paddingVertical: 4,
     borderRadius: 3,
     top:10,
     alignItems: "center",
     backgroundColor: "#1890ff",
     padding: 10,

   },
   declineButton: {
     alignItems: 'center',
     paddingVertical: 5,
     borderRadius: 3,
     top:10,
     alignItems: "center",
     backgroundColor: "#ff4d4f",
     padding: 10,
     left:10,
   },
   });

 export default Notifications;
