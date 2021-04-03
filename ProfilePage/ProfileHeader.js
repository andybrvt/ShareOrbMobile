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
      <View>

        <Avatar.Image
          size = {35}
          source = {{
            url: `${global.IMAGE_ENDPOINT}`+profileImage
          }}
         />

     </View>

    )
  }



  render(){


    return (
      <View>
        {this.renderProfilePic()}

        <Text> This will be the profile header </Text>
      </View>
    )
  }


}


export default ProfileHeader;
