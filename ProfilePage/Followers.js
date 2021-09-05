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
  ActivityIndicator
 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import authAxios from '../util';
import * as authActions from '../store/actions/auth';
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';

 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

 class Followers extends React.Component{


   constructor(props){
     super(props)

     this.state = {
       loading: false,
       itemLoading: 0,
     }

   }

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   selectItem(item) {

     this.props.navigation.navigate("ProfilePage", {
       username: item.username
     })
   }

   onUnfollow = (follower, following) => {
     this.setState({
       loading: true,
       itemLoading: following
     })

     authAxios.post(`${global.IP_CHANGE}/userprofile/onUnfollow`, {
       follower: follower,
       following: following
     })
     .then(res => {


       this.props.authAddUnaddFollowing(res.data)
       this.setState({
         loading: false,
         itemLoading: 0
       })

     })
   }

   onFollow = (follower, following, notiToken) => {

     console.log(follower, following, notiToken)
     this.setState({
       loading: true,
       itemLoading: following
     })

     authAxios.post(`${global.IP_CHANGE}/userprofile/onFollow`, {
       follower: follower,
       following: following
     })
     .then(res => {
       const notificationObject = {
         command: "send_follow_notification",
         actor: follower,
         recipient: following
       }
       NotificationWebSocketInstance.sendNotification(notificationObject);

       global.SEND_FOLLOW_NOTIFICAITON(
         notiToken,
         this.props.username,
         this.props.curId
       )

       this.props.authAddUnaddFollowing(res.data)

       this.setState({
         loading: false,
         itemLoading: 0
       })



     })
   }


   renderItem = ({item}) => {

     const following = [];

     if(this.props.following){
       for(let i = 0; i< this.props.following.length; i++){
         following.push(
           this.props.following[i].id
         )
       }
     }
     return (
       <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.selectItem(item)}>
         <View style = {styles.chatBox}>
           <View style={{flexDirection:'row'}}>
             <View style = {styles.chatInfoHolder} >
               <Avatar
               rounded
                 source = {{
                   uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture
                 }}
                 size = {55}
                  />
                <View style = {styles.chatInfo}>
                  <View style = {styles.chatNameContainer}>
                    <Text style = {styles.chatName}>{item.username}</Text>
                  </View>
                  <Text style = {styles.chatText}> {item.first_name+" "+item.last_name} </Text>
                </View>
             </View>
             {

               item.id === this.props.curId ?

               null

               :

               this.state.loading === true && this.state.itemLoading === item.id ?

               <View style={{flex:0.5, justifyContent:"center"}}>
                 <TouchableOpacity
                   style={styles.editButton}>
                   <ActivityIndicator />

                  </TouchableOpacity>
               </View>

               :


               following.includes(item.id) ?


               <View style={{flex:0.5, justifyContent:"center"}}>
                 <TouchableOpacity
                   onPress = {() => this.onUnfollow(this.props.curId, item.id)}
                   style={styles.editButton}>
                    <Text style={{color:'white', fontFamily:'Nunito-SemiBold'}}>Unfollow</Text>
                  </TouchableOpacity>
               </View>

               :

               <View style={{flex:0.5, justifyContent:"center"}}>
                 <TouchableOpacity
                   onPress ={() => this.onFollow(this.props.curId, item.id, item.notificationToken)}
                   style={styles.editButton}>
                    <Text style={{color:'white', fontFamily:'Nunito-SemiBold'}}>Follow</Text>
                  </TouchableOpacity>
               </View>


             }

          </View>
         </View>
       </TouchableHighlight>
     )
   }

   render(){

     let data = [];

     if(this.props.profile){
       if(this.props.profile.get_followers){
         data = this.props.profile.get_followers
       }
     }

     return (
       <BackgroundContainer>
         <View >
         <FlatList
           style = {{marginTop:5}}
           data = {data}
           renderItem = {this.renderItem}
           ItemSeparatorComponent = { this.FlatListItemSeparator }
           keyExtractor={(item, index) => String(index)}

           />
         </View>
       </BackgroundContainer>

     )
   }
 }

 const mapStateToProps = state => {

   return {
     following:state.auth.following,
     followers:state.auth.followers,
     profile: state.explore.profile,
     curId: state.auth.id,
     username: state.auth.username

   }
 }

 const mapDispatchToProps = dispatch => {
   return {
     authAddUnaddFollowing: (following) => dispatch(authActions.authAddUnaddFollowing(following))

   }
 }


  const styles = StyleSheet.create({

    editButton: {
      alignItems: 'center',
      paddingVertical: 7.5,
      paddingHorizontal: 20,
      borderRadius: 4,
      top:5,
      alignItems: "center",
      backgroundColor: "#1890ff",
      padding: 10
    },

    column:{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',       //THIS LINE HAS CHANGED
      paddingLeft: 35,
      justifyContent:'center',

  },

    container: {
      backgroundColor: "white",
      flex: 1,
    },
    chatBox: {
      flex: 1,
      height: 70,
      justifyContent: 'center',
      padding: 15,
      // backgroundColor:'green',
    },
    chatInfoHolder:{
      display: 'flex',
      flexDirection: 'row',
      flex:1,
    },
    chatInfo: {
      justifyContent: "center",
      marginLeft: 10,
      // backgroundColor:'red',
    },
    chatNameContainer: {
      flexDirection: "row"
    },
    chatName: {
      fontSize: 15,
      color: 'black',
      fontWeight:'bold',

      left:5,
    },

    chatText: {
      marginTop: 0,
      color: 'gray',
      fontWeight: '400'
    },

  })


 export default connect(mapStateToProps, mapDispatchToProps)(Followers);
