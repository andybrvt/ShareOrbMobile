import React from "react";
import { Text, View, Button,StyleSheet, Image, Dimensions } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import NewsfeedSpecCarousel from './NewsfeedSpecCarousel';


class SocialNewsfeedPost extends React.Component{

  constructor(props){
    super(props);
  }

  revealPhoto = () =>{
    // This function will be use to render the pictures
    // within thew newsfeed post. If there are only one photo
    // it iwill only show one photo, if there are more ti will
    // show a scrollable list
    let postId = ""
    let username = ""
    let cellYear = ""
    let cellMonth = ""
    let cellDay = ""
    let location = ""
    let userUsername = '';
    // THESE ARE FOR THE SOCIAL CAL PICTURES
    // YOU ARE GONNA NEED THE CONTENT TYPE ID
    // THE USER WITH USER NAME

    // IF IT IS SOCIAL CAL CELL THEN IT WILL HOLD PHOTOS
    let userPostImages = []

    if(this.props.data) {
      if(this.props.data.post) {
        if(this.props.data.post.get_socialCalItems) {
          userPostImages = this.props.data.post.get_socialCalItems;
        }
      }
      if(this.props.data.owner.username) {
        userUsername = this.props.data.owner.username
      }
      if(this.props.data.post.socialCaldate) {
        const date = this.props.data.post.socialCaldate.split("-")
        cellYear = date[0]
        cellMonth = date[1]
        cellDay = date[2]
      }
      // location = this.props.history.location.pathname

    }

    console.log(userPostImages.length)
    if(userPostImages.length === 1){

      return (
        <View style = {styles.imageHolder}>
          <Image
            style = {{ flex: 1, height: 400}}
            resizeMode = "cover"
            source = {{
              url: `${global.IMAGE_ENDPOINT}`+userPostImages[0].itemImage
            }}

            />



        </View>
      )
    } else {
    return(
      <View>
        <NewsfeedSpecCarousel
          items = {userPostImages}

          />

      </View>

    )

    }

  }

  render(){


    let like_people = []
    let profilePic = ''
    let userUsername = ""
    let userFirstName = ""
    let userLastName = ""
    let userId = ""
    let postCreatedAt = ""

    let actionText = ""

    if(this.props.data) {
      if(this.props.data.post){
        const post = this.props.data.post
        if(post.actionText === "new"){
          actionText = ' added new pictures to day'
        }
        if(post.actionText === "updated"){
          actionText = " updated current day"
        }
        if(post.actionText === "clipped"){
          actionText = " clipped picture to day"
        }


      }

      if(this.props.data.owner){
        if(this.props.data.owner.profile_picture){
          profilePic = this.props.data.owner.profile_picture
        }

        if(this.props.data.owner.first_name){
          userFirstName = this.props.data.owner.first_name
        }
        if(this.props.data.owner.last_name){
          userLastName = this.props.data.owner.last_name
        }

        if(this.props.data.owner.id){
          userId = this.props.data.owner.id
        }

        if(this.props.data.owner.username){
          userUsername = this.props.data.owner.username
        }

      }

      if(this.props.data.post_date){
        postCreatedAt = this.props.data.post_date
      }

    }
    return (
      <Card style = {styles.card}>

        <View>
          <Avatar.Image
            source = {{
              url: `${global.IMAGE_ENDPOINT}`+profilePic
            }}
            size = {40}
             />
           <Text> {global.CAPITALIZE(userFirstName) +" "+ global.CAPITALIZE(userLastName) } </Text>
           <Text>{actionText} </Text>

           <Text> @{userUsername}</Text>
           <Text> {global.RENDER_TIMESTAMP(postCreatedAt)}</Text>
        </View>

        <View style = {styles.imageContainer}>
            {this.revealPhoto()}

        </View>

        <View>

        </View>

      </Card>
    )
  }
}

export default SocialNewsfeedPost;

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "red"
    position: 'relative',

    marginBottom: 5
  },
  imageContainer: {
    flex: 1,

    // backgroundColor: 'red',
    position: "relative",
  },
  imageHolder: {
    width: Math.round(Dimensions.get('window').width),
    // height: 400,
    position: "relative"
    // backgroundColor: 'blue'
  }

})
