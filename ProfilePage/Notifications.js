import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  FlatList
 } from 'react-native';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import { Avatar } from 'react-native-elements';
import { MoreVertical} from "react-native-feather";
import { connect } from 'react-redux';
import * as dateFns from 'date-fns';
import * as authActions from '../store/actions/auth';
import authAxios from '../util';
import { Tag, Bookmark, Search, ChevronRight, Settings, Sliders
  ,MessageCircle, UserPlus, Users, Clock} from "react-native-feather";


class Notifications extends React.Component{

 onHomeNav = () => {
   // this function will be use to navigate back
   // to the home page
 }

 ViewProfile = (username) => {
   // This fucntion will be used to navigate to the post page
   // that you can use to post pictures and write caption
   this.props.navigation.navigate("ProfilePage", {
     username: username
   })
 }

 openDayAlbum = (itemId, postId) => {
  this.props.navigation.navigate("DayAlbum", {
    cellId: itemId,
    postId: postId
  })
 }

 componentDidMount(){

   authAxios.post(`${global.IP_CHANGE}/userprofile/resetNotificationSeen`, {
      curId: this.props.userId
    }).then(res => {

      // Now you will call the redux to reset the value of the notification
      this.props.resetNotificationSeen()

    })
}


 renderItem = ({item}) => {
   const timestamp = Math.round((new Date().getTime() - new Date(item.timestamp).getTime())/60000)
   let dataList=item.pendingEventDate.split("-")
   let getYear=dataList[0]
   let getMonth=dataList[1]-1
   let getDay=dataList[2]
   let albumDate = dateFns.format(new Date(getYear, getMonth, getDay), "MMMM dd")


   if(item.type === "comment_notification"){

     return(
       <TouchableOpacity>
          <View style={{
             flexDirection:'row',
             padding:15}}>
            <View style={{flex:1}}>
              <Avatar
                // onPress = {() => this.ViewProfile(item.actor.username)}
                size={40}
                rounded
                source = {{
                  uri: `${global.IMAGE_ENDPOINT}`+item.actor.profile_picture
                }}
              />
            </View>
          <View style={{
              flex:6,
              flexDirection:'column',
              }}>
            <View style = {{flexDirection: 'row'}}>
              <Text style = {{fontWeight: 'bold'}}>{global.NAMEMAKE(item.actor.first_name, item.actor.last_name, 20)}</Text>
              <Text>commented on your post. </Text>
            </View>
            <View style = {{marginTop: 10}}>
              <Text>
                {global.RENDER_TIMESTAMP(item.timestamp)}
              </Text>
            </View>
        </View>

          </View>
       </TouchableOpacity>
     )

   }

   if(item.type === "follow_notification"){
     return(
       <TouchableOpacity>
          <View style={styles.notiContainer}>
            <View style={styles.frontNotiSpace}>
              <Avatar
                onPress = {() => this.ViewProfile(item.actor.username)}
                size={40}
                rounded
                source = {{
                  uri: `${global.IMAGE_ENDPOINT}`+item.actor.profile_picture
                }}
              />
            </View>
          <View style={styles.midNotiSpace}>
            <View style={styles.wrapNoti}>
              <Text style = {{fontWeight: 'bold'}}>{item.actor.username}</Text>
              <Text> followed you</Text>
            </View>
          </View>
            <View style={{flex:0}}>
              <Text style={styles.notiTimeStamp}>
                {global.RENDER_TIMESTAMP(item.timestamp)}
              </Text>
            </View>
          </View>
       </TouchableOpacity>
     )
   }
   if(item.type === "send_social_cell_like"){
     return(
       <TouchableOpacity
         onPress = {() => this.openDayAlbum(
           item.eventId,
           item.itemId
         )}
         >
         <View style={styles.notiContainer}>
           <View style={styles.frontNotiSpace}>
             <Avatar
               onPress = {() => this.ViewProfile(item.actor.username)}
               size={40}
               rounded
               source = {{
                 uri: `${global.IMAGE_ENDPOINT}`+item.actor.profile_picture
               }}
             />
           </View>
           <View style={styles.midNotiSpace}>
               <View style={styles.wrapNoti}>
                 <Text style = {{fontWeight: 'bold'}}>{item.actor.username} </Text>
                 <Text>liked your
                   <Text style = {{fontWeight: 'bold'}}> {albumDate} </Text>
                   album
                </Text>
               </View>
           </View>
           <View style={{flex:0}}>
             <Text style={styles.notiTimeStamp}>
               {global.RENDER_TIMESTAMP(item.timestamp)}
             </Text>
           </View>
         </View>
       </TouchableOpacity>
     )
   }
   if(item.type === "send_social_cell_comment"){
     return(
       <TouchableOpacity
         onPress = {() => this.openDayAlbum(
           item.eventId,
           item.itemId
         )}
         >
         <View style={styles.notiContainer}>
           <View style={styles.frontNotiSpace}>
             <Avatar
               onPress = {() => this.ViewProfile(item.actor.username)}
               size={40}
               rounded
               source = {{
                 uri: `${global.IMAGE_ENDPOINT}`+item.actor.profile_picture
               }}
             />
           </View>
           <View style={styles.midNotiSpace}>
               <View style={styles.wrapNoti}>
                 <Text style = {{fontWeight: 'bold'}}>{item.actor.username} </Text>
                 <Text>commented on your album
                </Text>
               </View>
           </View>
           <View style={{flex:0}}>
             <Text style={styles.notiTimeStamp}>
               {global.RENDER_TIMESTAMP(item.timestamp)}
             </Text>
           </View>
         </View>
       </TouchableOpacity>
     )
   }
   if(item.type === "accept_follow_request"){
     return(
       <TouchableOpacity>
         <View style={styles.notiContainer}>
           <View style={styles.frontNotiSpace}>
             <Avatar
               onPress = {() => this.ViewProfile(item.actor.username)}
               size={40}
               rounded
               source = {{
                 uri: `${global.IMAGE_ENDPOINT}`+item.actor.profile_picture
               }}
             />
           </View>
           <View style={styles.midNotiSpace}>
               <View style={styles.wrapNoti}>
                 <Text style = {{fontWeight: 'bold'}}>{item.actor.username} </Text>
                 <Text>commented on your
                   <Text style = {{fontWeight: 'bold'}}> {albumDate} </Text>
                   album
                </Text>
               </View>
           </View>
           <View style={{flex:0}}>
             <Text style={styles.notiTimeStamp}>
               {global.RENDER_TIMESTAMP(item.timestamp)}
             </Text>
           </View>
           <View style={{paddingBottom:10}}>
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
         </View>
       </TouchableOpacity>
     )
   }


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
   let notifications = [];
   if(this.props.notifications){

     notifications = this.props.notifications
   }


   return (
     <BackgroundContainer>
       <View>
         <View style={{ flexDirection:'row', padding:15}}>
           <View style={{flexDirection:'row', width:'90%'}}>
             <Avatar

               onPress = {() => this.ViewProfile(item.actor.username)}
               size={30}
               rounded
               source = {{
                 uri: `${global.IMAGE_ENDPOINT}`+this.props.profilePic,
               }}
             />
           <Text style={{fontSize:20, fontWeight:'bold', marginLeft:20}}>Notifications</Text>
        </View>
        {/*
          <View>
            <Sliders
             // onPress = {() => this.ViewProfile()}
             stroke="#8c8c8c" strokeWidth={2} width={25} height={25}/>
         </View>
         */}
         </View>



         <View style = {{flex: 1}}>
           <FlatList
             data = {notifications}
             renderItem = {this.renderItem}
             keyExtractor={(item, index) => String(index)}

              />
         </View>
        </View>
     </BackgroundContainer>

   )
 }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.notifications,
    userId: state.auth.id,
    profilePic: state.auth.profilePic,

  }
}

const mapDispatchToProps = dispatch => {
  return{
    resetNotificationSeen: () => dispatch(authActions.resetNotificationSeen())
  }
}

const styles = StyleSheet.create({
  wrapNoti:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  notiContainer:{
    flexDirection:'row', padding:15
  },
  frontNotiSpace:{
    flex:1,
  },
  midNotiSpace:{
    flex:6,flexWrap:'wrap', left:5,
  },
  notiTimeStamp: {
    color:'#8c8c8c',
    fontSize:12,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
