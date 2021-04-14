import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';


class ProfileHeader extends React.Component{


  renderProfilePic = () => {

    let profileImage = null


    if(this.props.profile){
      if(this.props.profile.profile_picture){
        profileImage = this.props.profile.profile_picture
      }
    }

    return (
      <View style={styles.centerProfilePic}>

        <Avatar.Image
          size = {100}
          source = {{
            url: `${global.IMAGE_ENDPOINT}`+profileImage
          }}
         />

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
      <View>
        {this.renderProfilePic()}

        <Text> Followers</Text>
        <Text> {followers.length}</Text>

        <Text> Following </Text>
        <Text> {following.length}</Text>


        <Text> {global.CAPITALIZE(firstName)} {global.CAPITALIZE(lastName)}</Text>
        <Text> @{username}</Text>
        <Text> {bio}</Text>

        <View>
          {
            this.props.route.params.username === this.props.currentUser ?

            <View>
              <Text> Edit Profile</Text>
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
                    <Text> Message </Text>
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
  centerProfilePic: {
    position:'relative',
    top:'5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoContainer: {
    flexDirection: "row",
  },
  followerCount: {
    flex: 1,
  },
});
