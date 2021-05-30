import React from 'react';
import { Text, View, Button,StyleSheet,} from 'react-native';

import { Appbar } from 'react-native-paper';
import { Avatar } from 'react-native-elements';


class ProfileHeader extends React.Component{


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
    <View>

      <View style={styles.centerProfilePic}>
          <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
            <Avatar

              size={100}
              rounded
              source={{
                uri:
                  profileImage,
              }}
            />
          </View>
          <View style={{flex:1,alignItems: 'center', justifyContent:'center'}}>
            <Text style = {styles.name}>{name}</Text>
            <Text style = {styles.username}>@{username}</Text>
          </View>


      {/*
      <View style={styles.centerProfilePic}>
        <Avatar
          size={100}
          rounded
          source={{
            uri:
              profileImage,
          }}
        />
      {/*
       <View style = {styles.nameContainer}>
         <Text style = {styles.name}>{name}</Text>
         <Text style = {styles.username}>@{username}</Text>
           <View style={styles.profileInfoContainer}>

             <View style={styles.followerCount}>
               <Text style={styles.followerFollowingNum}>
                 {following.length}
               </Text>
               <Text style={styles.followerFollowingHeader}> Following </Text>
             </View>
             <View style={styles.followerCount}>
               <Text style={styles.followerFollowingNum}> {followers.length}</Text>
               <Text style={styles.followerFollowingHeader}> Followers</Text>
             </View>

           </View>


       </View>
       <View style = {styles.bioContainer}>
         <Text style = {styles.bio}> {bio}</Text>
        </View>


        */}
     </View>
     <View style = {styles.nameContainer}>

         <View style={styles.profileInfoContainer}>

           <View style={styles.followerCount}>
             <Text style={styles.followerFollowingNum}>
               {following.length}
             </Text>
             <Text style={styles.followerFollowingHeader}> Following </Text>
           </View>
           <View style={styles.followerCount}>
             <Text style={styles.followerFollowingNum}> {followers.length}</Text>
             <Text style={styles.followerFollowingHeader}> Followers</Text>
           </View>

         </View>


     </View>
     <View style = {styles.bioContainer}>
       <Text style = {styles.bio}> {bio}</Text>
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







        <View>
          {
            this.props.route.params.username === this.props.currentUser ?

            <View>

            </View>

            :

            <View>
              {
                this.state.followLoading ?

                <View>
                  <Text> Loading </Text>
                </View>

                :

                curRequested.includes(profileId) ?

                <View>
                  <Text> Accept</Text>
                </View>

                :

                followers.includes(this.props.currentUser.toString()) ?

                <View>
                  <View>
                    <Text> Unfollow </Text>
                  </View>

                  <View>
                    <Text> Message</Text>
                  </View>
                </View>

                :
                <View>
                  {
                    requested.includes(this.props.currentId) ?

                    <View>
                      <Text>Requested</Text>
                    </View>

                    :

                    <View>
                      <Text> Follow</Text>
                    </View>

                  }

                </View>

              }

            </View>

          }

        </View>

      </View>
    )
  }


}


export default ProfileHeader;

const styles = StyleSheet.create({
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


  centerProfilePic: {
    position:'relative',
    top:'10%',
    // backgroundColor:'blue',
    justifyContent: 'center',
    flexDirection:'row',
  },
  profileInfoContainer: {
    width:'80%',
    padding:7.5,
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
  nameContainer:{

    // backgroundColor:'red',
    top:'25%',
    width:'90%',
    alignItems: 'center'
  },
  bioContainer:{

    flex:1,
    // backgroundColor: "red",
    top:'35%',
    alignItems: 'center'
  },
  name:{
    fontSize: 25,
    color: "black",
  },
  bio: {
    width:'100%',
    // backgroundColor: "blue",
    fontSize: 15
  }
});
