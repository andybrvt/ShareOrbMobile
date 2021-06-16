import React from 'react';
import { Text, View, Button,StyleSheet,TouchableOpacity, TouchableHighlight} from 'react-native';

import { Appbar } from 'react-native-paper';
import { Avatar } from 'react-native-elements';

import Followers from './Followers';
import Following from './Following';
class ProfileHeader extends React.Component{
  editPageClick() {
    this.props.navigation.navigate("EditProfile");

  }
  navigateFollowing() {
    this.props.navigation.navigate("FollowTab");

  }
  navigateFollowers() {
    this.props.navigation.navigate("Followers");

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

    if(this.props.profile){
      if(this.props.profile.profile_picture){
        profileImage = `${global.IMAGE_ENDPOINT}`+this.props.profile.profile_picture
      }
      if(this.props.profile.first_name && this.props.profile.last_name){
        const firstName = global.CAPITALIZE(this.props.profile.first_name)
        const lastName = global.CAPITALIZE(this.props.profile.last_name)
        name = firstName +' '+lastName
      }
      if(this.props.profile.username){
        username = this.props.profile.username
      }
      if(this.props.profile.bio){
        bio= this.props.profile.bio
      }
      if(this.props.profile.get_following){
        if(this.props.profile.id === this.props.currentId){
          // This one is to change the following list to be same as the auth if
          // you are on your own page

          following = this.props.following
        } else {
          // This is for everyone else
          following = this.props.profile.get_following
        }

      }
      if(this.props.profile.get_followers){
        if(this.props.profile.id === this.props.currentId){
          // Same deal as teh followers
          for(let i =0; i<this.props.followers.length; i++){
            followers.push(
              this.props.followers[i].username
            )
          }
        } else {
          for(let i =0; i<this.props.profile.get_followers.length; i++){
            followers.push(
              this.props.profile.get_followers[i].username
            )
          }
        }

      }

      if(this.props.profile.get_followers){
        if(this.props.profile.id === this.props.currentId){
          fulFollowers = this.props.followers
        } else {
          fulFollowers = this.props.profile.get_followers
        }
      }
    }

    return (
    <View style={{flexDirection:'column', top:'3%',}}>

        <View style={styles.profileInfoHeader}>
            <View style={{flex:1, alignItems: 'center',
               justifyContent:'center'}}>
              <Avatar
                size={95}
                rounded
                source={{
                  uri:
                    profileImage,
                }}
              />
            </View>
            <View style={{flex:2,justifyContent:'center', marginLeft:30}}>
              <Text style = {styles.name}>{name}</Text>
              <Text style = {styles.username}>@{username}</Text>
                <TouchableOpacity onPress={() => this.editPageClick()}>
                  <View style={styles.editButton}>
                     <Text style={{color:'white',}}>Edit Profile</Text>
                   </View>
               </TouchableOpacity>
            </View>
        </View>

     <View style={{flex:1, top:'15%',}}>
       <View style = {styles.profileMidContainer}>
         <View style={styles.profileInfoContainer}>
           <View style={styles.followerCount}>
              <TouchableOpacity onPress={() => this.navigateFollowing()}>
                <View style={{flexDirection:'column', alignItems:'center'}}>
                 <Text style={styles.followerFollowingNum}> 5</Text>
                 <Text style={styles.followerFollowingHeader}> Streak </Text>
               </View>
              </TouchableOpacity>
           </View>
           <View style={styles.followerCount}>
              <TouchableOpacity onPress={() => this.navigateFollowing()}>
                <View style={{flexDirection:'column', alignItems:'center'}}>
                 <Text style={styles.followerFollowingNum}> {following.length}</Text>
                 <Text style={styles.followerFollowingHeader}> Following </Text>
               </View>
              </TouchableOpacity>
           </View>

           <View style={styles.followerCount}>
             <TouchableOpacity onPress={() => this.navigateFollowing()}>
               <View style={{flexDirection:'column', alignItems:'center'}}>
                 <Text style={styles.followerFollowingNum}> {followers.length}</Text>

                <Text style={styles.followerFollowingHeader}> Followers</Text>
               </View>
            </TouchableOpacity>
           </View>

         </View>
     </View>
     </View>

     <View style={{flex:1, top:'17.5%',}}>
       <View style = {styles.bioContainer}>
         <Text style = {styles.bio}> {bio}</Text>
        </View>

      </View>


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
        if(this.props.profile.id === this.props.currentId){
          // This one is to change the following list to be same as the auth if
          // you are on your own page

          following = this.props.following
        } else {
          // This is for everyone else
          following = this.props.profile.get_following
        }

      }
      if(this.props.profile.get_posts){
        posts = this.props.profile.get_posts

      }
      if(this.props.profile.id){
        profileId = this.props.profile.id

      }
      if(this.props.profile.bio !== null){
        bio = this.props.profile.bio
      }

      if(this.props.profile.get_followers){
        if(this.props.profile.id === this.props.currentId){
          // Same deal as teh followers
          for(let i =0; i<this.props.followers.length; i++){
            followers.push(
              this.props.followers[i].username
            )
          }
        } else {
          for(let i =0; i<this.props.profile.get_followers.length; i++){
            followers.push(
              this.props.profile.get_followers[i].username
            )
          }
        }

      }

      if(this.props.profile.get_followers){
        if(this.props.profile.id === this.props.currentId){
          fulFollowers = this.props.followers
        } else {
          fulFollowers = this.props.profile.get_followers
        }
      }

      if(this.props.profile.private){
        if(this.props.profile.get_follow_request){
          for(let i= 0; i<this.props.profile.get_follow_request.length; i++){
              requested.push(
                this.props.profile.get_follow_request[i].id
              )
          }
        }
      }



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
  editButton: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    top:5,
    backgroundColor: '#1890ff',

    alignItems: "center",
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
    backgroundColor: "white",
    alignItems: 'center'
  },
  followerFollowingHeader: {
    color: "grey",
    alignItems: 'center',
    fontSize:14
  },

  followerFollowingNum: {
    color: "black",
    alignItems: 'center',
    fontSize:18,
    fontWeight: 'bold'
  },


  profileInfoHeader: {
    position:'relative',
    top:'5%',
    left:'5%',
    // backgroundColor:'red',
    justifyContent: 'center',
    flexDirection:'row',
  },
  profileMidContainer:{

    width:'125%',
    alignItems: 'center',
    // backgroundColor:'red'

  },
  bioContainer:{
    flex:1,
    // backgroundColor: "red",

    alignItems: 'center'
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
  },
  username:{
    fontSize: 14,
    color: "gray",
  },
  bio: {
    width:'100%',

    // backgroundColor: "blue",
    fontSize: 15
  }
});
