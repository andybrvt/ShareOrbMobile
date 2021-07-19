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

   console.log(item)
   if(item.type === "like_notification"){

     return(
       <TouchableOpacity>
          <View style={{
             flexDirection:'row',
             padding:15}}>
            <View style={{flex:1}}>
              <Avatar
                // onPress = {() => this.props.ViewProfile(userUsername)}
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
              <Text style = {{fontWeight: 'bold'}}>{global.NAMEMAKE(item.actor.first_name, item.actor.last_name, 20)} </Text>
              <Text> liked your post. </Text>
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

   if(item.type === "comment_notification"){

     return(
       <TouchableOpacity>
          <View style={{
             flexDirection:'row',
             padding:15}}>
            <View style={{flex:1}}>
              <Avatar
                // onPress = {() => this.props.ViewProfile(userUsername)}
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
              <Text style = {{fontWeight: 'bold'}}>{global.NAMEMAKE(item.actor.first_name, item.actor.last_name, 20)} </Text>
              <Text> commented on your post. </Text>
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
          <View style={{
             flexDirection:'row',
             padding:15}}>
            <View style={{flex:1}}>
              <Avatar
                // onPress = {() => this.props.ViewProfile(userUsername)}
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
              <Text style = {{fontWeight: 'bold'}}>{global.NAMEMAKE(item.actor.first_name, item.actor.last_name, 20)} </Text>
              <Text> followed you. </Text>
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
   if(item.type === "send_social_cell_like"){

     return(
       <TouchableOpacity>
          <View style={{
             flexDirection:'row',
             padding:15}}>
            <View style={{flex:1}}>
              <Avatar
                // onPress = {() => this.props.ViewProfile(userUsername)}
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
              <Text style = {{fontWeight: 'bold'}}>{global.NAMEMAKE(item.actor.first_name, item.actor.last_name, 20)} </Text>
              <Text> liked your social cell on {item.pendingEventDate}. </Text>
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
   if(item.type === "send_social_cell_comment"){

     return(
       <TouchableOpacity>
          <View style={{
             flexDirection:'row',
             padding:15}}>
            <View style={{flex:1}}>
              <Avatar
                // onPress = {() => this.props.ViewProfile(userUsername)}
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
              <Text style = {{fontWeight: 'bold'}}>{global.NAMEMAKE(item.actor.first_name, item.actor.last_name, 20)} </Text>
              <Text> commented your social cell on {item.pendingEventDate}. </Text>
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
   // return (


   //   <View style={{flexDirection:'row', padding:15}}>
   //     <View style={{flex:1}}>
   //       <Avatar
   //         // onPress = {() => this.props.ViewProfile(userUsername)}
   //         size={40}
   //         rounded
   //         source = {{
   //           uri: item.pic
   //         }}
   //       />
   //     </View>
   //     <View style={{flex:6,  flexDirection:'row', flexWrap:'wrap'}}>
   //       <Text style={{fontWeight:'bold'}}> {item.username} </Text>
   //       {(item.action&&(item.private=="true"))?
   //         <View style={{paddingBottom:10}}>
   //         <Text>{item.action}
   //         </Text>
   //         <View style={{flexDirection:'row'}}>
   //           <TouchableOpacity>
   //             <View style={styles.editButton}>
   //                <Text style={{color:'white'}}>Accept</Text>
   //              </View>
   //            </TouchableOpacity>
   //            <TouchableOpacity>
   //              <View style={styles.declineButton}>
   //                 <Text style={{color:'white',}}>Decline</Text>
   //               </View>
   //            </TouchableOpacity>
   //           </View>
   //          </View>
   //       :
   //       <Text>{item.action}</Text>
   //     }
   //
   //       <Text style={{fontWeight:'bold'}}> {item.date}</Text>
   //      </View>
   //    <View style={{flex:0}}>
   //    <Text style={{color:'#8c8c8c'}}> {item.time}</Text>
   //    {/*
   //    <MoreVertical
   //    style={{top:10}}
   //      stroke="gray"
   //      width ={25}
   //      height = {25}
   //    />
   //    */}
   //
   //    </View>
   //   </View>
   // )
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
   console.log('here in notifications')
   console.log(this.props)
   if(this.props.notifications){

     notifications = this.props.notifications
   }

   return (
     <BackgroundContainer>
       <View style = {{flex: 1}}>
         <FlatList
           data = {notifications}
           renderItem = {this.renderItem}
           keyExtractor={(item, index) => String(index)}
            />
       </View>
     </BackgroundContainer>

   )
 }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.notifications,
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

export default connect(mapStateToProps, null)(Notifications);
