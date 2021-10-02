import React from 'react';
import { Text, View, Button,StyleSheet,TouchableOpacity, TouchableHighlight} from 'react-native';

import { Appbar } from 'react-native-paper';
import { Avatar } from 'react-native-elements';

import Followers from './Followers';
import Following from './Following';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faComment, faBookmark} from '@fortawesome/free-regular-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import * as dateFns from 'date-fns';
import { Tag, Bookmark, Search, ChevronRight, Settings
  ,MessageCircle, UserPlus, Users, Clock} from "react-native-feather";

class ProfileHeader extends React.Component{


  editPageClick() {
    this.props.navigation.navigate("EditProfile",
    {

      bio:this.props.profile.bio,

      }

  );

  }
  navigateFollowing() {

    const followers = this.props.profile.get_followers;
    const following = this.props.profile.get_following;

    if(this.props.currentId === this.props.profile.id){
      this.props.navigation.navigate("PFollowTab", {
        following: following,
        followers: followers
      });

    } else {
      this.props.navigation.navigate("FollowTab", {
        following: following,
        followers: followers
      });

    }

  }
  // navigateFollowers() {
  //   this.props.navigation.navigate("Followers");
  //
  // }

  onFollow = (follower, following, notiToken) => {
    const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
    const followingLength = this.props.following.length
    ExploreWebSocketInstance.sendFollowing(follower,following);
    //update user credentials and then send out notifications
    if(followingLength === 0){
        // if the person doesn't have any followers already
        //  you wanna rerun so that newsfeed shows up
        WebSocketSocialNewsfeedInstance.fetchSocialPost(
          this.props.currentId,
          curDate,
          6)
    }
    const notificationObject = {
      command: "send_follow_notification",
      actor: follower,
      recipient: following
    }
    NotificationWebSocketInstance.sendNotification(notificationObject);

    global.SEND_FOLLOW_NOTIFICAITON(
      notiToken,
      this.props.currentUser,
      this.props.currentId
    )
  }

  onUnfollow = (follower, following) => {
    ExploreWebSocketInstance.sendUnFollowing(follower, following);
  }
  renderProfilePic = () => {

    let profileImage = null
    let username = ''
    let name = ''
    let bio = ""
    let followers = []
    let fulFollowers = []
    let following = []
    let fulfollowing = []
    let profileId = 0
    let notiToken = ""

    if(this.props.profile){
      console.log(this.props.profile, 'here')
      if(this.props.profile.notificationToken){
        notiToken = this.props.profile.notificationToken
      }
      if(this.props.profile.profile_picture){
        profileImage = `${global.IMAGE_ENDPOINT}`+this.props.profile.profile_picture
      }
      if(this.props.profile.first_name){
        const firstName = global.CAPITALIZE(this.props.profile.first_name)
        name = firstName
      }
      if(this.props.profile.username){
        username = this.props.profile.username
      }
      if(this.props.profile.bio){
        bio = this.props.profile.bio
      }
      if(this.props.profile.id){
        profileId = this.props.profile.id

      }
      if(this.props.profile.get_following){
          // This is for everyone else
          following = this.props.profile.get_following

      }
      if(this.props.profile.get_followers){
        for(let i =0; i<this.props.profile.get_followers.length; i++){
          followers.push(
            this.props.profile.get_followers[i].username
          )
        }

      }

      if(this.props.profile.get_followers){

          fulFollowers = this.props.profile.get_followers

      }
    }


    return (
    <View>
        <View>
          <View style={styles.profileInfoHeader}>
              <View style={{
                 flexDirection:'column',
                  alignItems: 'center',
                 justifyContent:'center',}}>
                 <View style={{zIndex:99, borderWidth: 2, borderColor: '#2f54eb', borderRadius:75,}}>
                  <Avatar
                    size={110}
                    rounded
                    source={{
                      uri:
                        profileImage,
                    }}
                  />
                </View>
                <Text style = {styles.name}>{name}</Text>
                <Text style = {styles.username}>@{username}</Text>
              </View>
          </View>
        </View>

       <View style={{justifyContent:'center', alignItems:'center'  }}>


         {
           this.props.currentId === profileId ?

           <TouchableOpacity onPress={() => this.editPageClick()}>
             <View style={styles.editButton}>
                <Text style={{color:'white', fontFamily:'Nunito-SemiBold',}}>Edit Profile</Text>
              </View>
          </TouchableOpacity>

          :

          followers.includes(this.props.currentUser.toString()) ?

          <TouchableOpacity
            onPress={() => this.onUnfollow(
              this.props.currentId,
              profileId
            )}>
            <View style={styles.editButton}>
               <Text style={{color:'white', fontFamily:'Nunito-SemiBold',}}>Unfollow</Text>
             </View>
         </TouchableOpacity>

         :

         <TouchableOpacity
           onPress={() => this.onFollow(
             this.props.currentId,
             profileId,
             notiToken
           )}>
           <View style={styles.editButton}>
              <Text style={{color:'white', fontFamily:'Nunito-SemiBold',}}>Follow</Text>
            </View>
        </TouchableOpacity>

         }

       </View>

       <View style = {styles.bioContainer}>
         <Text style = {styles.bio}> {bio}</Text>
       </View>

              {/*
        <View style = {styles.streakBubble}>
          <FontAwesomeIcon
                           style = {{
                             color:'#fa541c',
                             right:1,
                           }}
                           size = {20}
                           icon={faFire} />
          <Text style = {{color:'white'}}> 5</Text>
         </View>
         */}

   </View>

    )
  }



  render(){


    let username = ''
    let firstName = ''
    let lastName = ''
    let followers = []
    let fulFollowers = []
    let following = []
    let fulfollowing = []
    let posts = ''
    let profileId = ''
    let friends = []
    let curId = ''
    let bio=''
    let profilePic = ""

    // Requested will be froe the other user so you can know if you reqested them
    let requested = []

    // curRequested is your requst to show whether or not you can accept
    let curRequested = []

    let curCurRequested = []
    // userObj will be the object used tos end into teh auth in order to update
    // the follower and following
    let userObj = {}

    if(this.props.currentId){
      curId = this.props.currentId
    }
    if(this.props.curRequested){
      curCurRequested = this.props.curRequested
    }
    if(this.props.curRequested){
      for(let i = 0; i< this.props.curRequested.length; i++){
        curRequested.push(
          this.props.curRequested[i].id
        )
      }
    }

    if (this.props.profile){
      if(this.props.profile.username){
        username = this.props.profile.username
      }
      if(this.props.profile.profile_picture){
        profilePic = this.props.profile.profile_picture
      }

      if(this.props.profile.first_name){
        firstName = this.props.profile.first_name
      }
      if(this.props.profile.last_name){
        lastName = this.props.profile.last_name
      }
      if(this.props.profile.get_following){

          // This is for everyone else
        following = this.props.profile.get_following


      }

      if(this.props.profile.id){
        profileId = this.props.profile.id

      }
      if(this.props.profile.bio !== null){
        bio = this.props.profile.bio
      }

      if(this.props.profile.get_followers){
          for(let i =0; i<this.props.profile.get_followers.length; i++){
            followers.push(
              this.props.profile.get_followers[i].username
            )
          }


      }

      if(this.props.profile.get_followers){
          fulFollowers = this.props.profile.get_followers
      }

      // if(this.props.profile.private){
      //   if(this.props.profile.get_follow_request){
      //     for(let i= 0; i<this.props.profile.get_follow_request.length; i++){
      //         requested.push(
      //           this.props.profile.get_follow_request[i].id
      //         )
      //     }
      //   }
      // }



    }


    return (

      <View style = {styles.container} >
        {this.renderProfilePic()}


      </View>
    )
  }


}


export default ProfileHeader;

const styles = StyleSheet.create({
  streakBubble: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,.75)',
    padding:6,
    borderRadius:20,
    color:'white',
    bottom:'45%',
    justifyContent: 'center',
    fontSize:13,
    left:'25%',
    zIndex:1,
    flex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    flexDirection:'row',
    alignItems:'center',
  },
  editButton: {
    paddingVertical: 5,
    width:'100%',
    borderRadius: 5,
    top:7.5,
    backgroundColor: '#1890ff',
    backgroundColor: "#1890ff",
    padding: 10
  },

  shadowAvatar:{
    shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 1,
  },

  container: {
    alignItems: 'center',
    width: '100%',
    padding: 25,
    paddingLeft: 30,
    paddingRight: 30,

  },
  followerFollowingHeader: {
    color: "grey",
    alignItems: 'center',
    fontSize:14,
    fontFamily:'Nunito-SemiBold',
  },

  followerFollowingNum: {
    color: "black",
    alignItems: 'center',
    fontSize:18,
    fontFamily:'Nunito-Bold',
  },


  profileInfoHeader: {
    justifyContent: 'center',
    width: '100%',
  },
  profileMidContainer:{
    width:'100%',
    alignItems: 'center',
    marginTop: 15
  },
  bioContainer:{
    marginTop: 20,
    alignItems: 'center',
  },
  profileInfoContainer: {
    width:'100%',
    padding:10,
    // backgroundColor: "blue",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gainsboro",
    flexDirection: "row",


  },
  followerCount: {
    flex:1,
    alignItems: "center"
  },
  followingCount: {
    flex:1,
    alignItems: "center"
  },


  name:{
    fontSize: 20,
    color: "black",
    fontFamily:'Nunito-SemiBold',
  },
  username:{
    fontSize: 14,
    color: "gray",
    fontFamily:'Nunito-SemiBold',
  },
  bio: {
    fontSize: 15,
    fontFamily:'Nunito-SemiBold',
  }
});
