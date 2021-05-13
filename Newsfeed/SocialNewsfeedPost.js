import React from "react";
import { Text, View, Button,StyleSheet, Image, Dimensions, ImageBackground} from 'react-native';
import { Card } from 'react-native-paper';
import NewsfeedSpecCarousel from './NewsfeedSpecCarousel';
import * as dateFns from 'date-fns';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faComment, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { Avatar } from 'react-native-elements';

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
    let profilePic="";
    let caption="";
    // IF IT IS SOCIAL CAL CELL THEN IT WILL HOLD PHOTOS
    let userPostImages = []
    let like_people = [];
    let commentList = [];

    if(this.props.data) {
      if(this.props.data.owner.profile_picture){
        profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.owner.profile_picture

      }

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
      if(this.props.data.post.dayCaption){
        caption = this.props.data.post.dayCaption
      }
      if(this.props.data.post.people_like){
        like_people = this.props.data.post.people_like
      }
      if(this.props.data.post.get_socialCalComment){
        commentList = this.props.data.post.get_socialCalComment
      }
      // location = this.props.history.location.pathname

    }

    if(userPostImages.length === 1){
      return (
        <View style = {styles.container}>
          <Image
            style={styles.cover}
            resizeMode = "cover"
            source={{ uri: `${global.IMAGE_ENDPOINT}${userPostImages[0].itemImage}` }}
            />

              <Avatar
                style={styles.close}
                onPress = {() => this.props.ViewProfile()}
                size={40}
                rounded
                source = {{
                  uri: profilePic
                }}
              />

            {/*
            <View style = {styles.videoFooter}>
              <Text  style = {styles.videoFooterUserName}>@{userUsername+" "}
                <Text  style = {styles.videoFooter}>{caption.substring(0,140)}</Text>
              </Text>

            </View>
            */}
            <Text style = {styles.tagCSS1}>

              <FontAwesomeIcon
              style = {{
                color:'white',
              }}
              size = {20}
              icon={faHeart} /> {like_people.length}</Text>

            <Text style = {styles.tagCSS2}>

              <FontAwesomeIcon
              style = {{
                color:'white',
              }}
              size = {20}
              icon={faComment} />  {commentList.length}
            </Text>
            <Text style = {styles.tagCSS3}>

              <FontAwesomeIcon
              style = {{
                color:'white',
              }}
              size = {20}
              icon={faBookmark} />  0
            </Text>

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

  bottomLikeCommentPost = () => {
    // This function will be use to use to show the buttons
    // and captions in the bottom of the newsfeed post
    // It will include liking, commeting and cliping

    let like_people = [];
    let profilePic = '';
    let peopleLikeId = [];
    let postId = 0;
    let userUsername = '';
    let ownerId = "";
    let caption = "";
    let commentList = [];
    let cellDate = "";
    let cellYear = ""
    let cellMonth = ""
    let cellDay = ""
    let location = ""
    let contentTypeId = ""


    if(this.props.data){

      contentTypeId = this.props.data.id

      if(this.props.data.post){

        if(this.props.data.post.people_like){
          like_people = this.props.data.post.people_like
        }

        if(this.props.data.post.get_socialCalComment){
          commentList = this.props.data.post.get_socialCalComment
        }

        if(this.props.data.post.id){
          postId = this.props.data.post.id
        }

        if(this.props.data.post.dayCaption){
          caption = this.props.data.post.dayCaption
        }

        if(this.props.data.post.socialCaldate){
          cellDate = this.props.data.post.socialCaldate
          const date = this.props.data.post.socialCaldate.split("-")
          cellYear = date[0]
          cellMonth = date[1]
          cellDay = date[2]
        }

      }
      if(this.props.data.owner){
        if(this.props.data.owner.username){
          userUsername = this.props.data.owner.username
        }
        if(this.props.data.owner.id){
          ownerId = this.props.data.owner.id
        }

        if(this.props.data.owner.profile_picture){
          profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.owner.profile_picture
          console.log(profilePic)
        }


      }

    }



    if(like_people.length > 0){
      for(let i = 0; i< like_people.length; i++){
        peopleLikeId.push(like_people[i].id)
      }
    }

    return (

      <View>

        <View style = {styles.likeCapHolder}>
          <View style = {styles.miniLikeCommCon}>

            <Text style = {styles.taggedNames}>#food #music</Text>

          </View>

          <View style = {styles.captionHolder}>
            <Text style = {styles.captionUsername}> @{userUsername+" "}</Text>
            <Text> {caption.substring(0,140)}</Text>

          </View>

        </View>

        <View style = {styles.bottomButtons}>
          <View style = {styles.buttons}>
            <FontAwesomeIcon
              style = {{
                marginRight: 10
              }}
              size = {15}
              icon={faHeart} />
            <Text>Like</Text>
          </View>

          <View style = {styles.buttons}>
            <FontAwesomeIcon
              style = {{
                marginRight: 10
              }}
              size = {15}
              icon={faComment} />
            <Text>Comment</Text>
          </View>

          <View style = {styles.buttons}>

            <FontAwesomeIcon
              style = {{
                marginRight: 10
              }}
              size = {15}
              icon={faBookmark} />
            <Text>Clip</Text>
          </View>

        </View>
      </View>
    )
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

          profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.owner.profile_picture


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

        <View style = {styles.header}>



           <View style = {styles.name}>
             <Text> {global.CAPITALIZE(userFirstName) +" "+ global.CAPITALIZE(userLastName) } </Text>

             <Text style = {{
                 fontSize: 15
               }}> @{userUsername}</Text>

           </View>

           <View style = {styles.date}>
             <Text> {global.RENDER_TIMESTAMP(postCreatedAt)}</Text>
           </View>

        </View>

        <View style = {styles.imageContainer}>
            {this.revealPhoto()}

        </View>

        <View>
          {this.bottomLikeCommentPost()}
        </View>

      </Card>
    )
  }
}



const mapStateToProps = state => {
  return {
    userId: state.auth.id,
    currentUser: state.auth.username,
    profilepic: state.auth.profilePic
  }
}


export default connect(mapStateToProps)(SocialNewsfeedPost);

const styles = StyleSheet.create({

  videoFooterUserName: {

    color:'white',
    fontSize:13,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',

    textShadowRadius: 5

    // fontWeight:'bold',

  },
  videoFooter: {
    position:'absolute',

    padding:10,

    color:'white',
    bottom:25,
    width:'75%',
    padding:10,


    // fontWeight:'bold',

  },
  tagCSS1: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    padding:7.5,
    borderRadius:25,
    color:'white',
    bottom:175,

    fontSize:13,
    right:10,
    // fontWeight:'bold',

  },
  tagCSS2: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    padding:7.5,
    borderRadius:25,
    color:'white',
    bottom:130,

    fontSize:13,
    right:10,
    textAlign:'right',
    // fontWeight:'bold',

  },

  tagCSS3: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    padding:7.5,
    borderRadius:25,
    color:'white',
    bottom:85,

    fontSize:13,
    right:10,
    textAlign:'right',
    // fontWeight:'bold',

  },

  close2: {
    margin: 10,
    position: "absolute",
    bottom: 15,
    right: 5,
    width: 35,
    height: 35,

  },

  videoText: {
    flex:1,
  },
  container: {
    // backgroundColor:'red',
    margin: 5,
    width: Math.round(Dimensions.get('window').width-10),
    height: 450
  },
  cover: {
    flex: 1,
    borderRadius: 5,
    position: "relative"
  },
  close: {
    margin: 5,
    position: "absolute",
    top: 5,
    left: 5,
    width: 35,
    height: 35,
    color: "tomato"
  },

  imageHolder: {
    width: Math.round(Dimensions.get('window').width),
    // height: 400,
    position: "relative"
    // backgroundColor: 'blue'
  },

  card: {
    // backgroundColor: "red"
    position: 'relative',
    // height: 600,
    marginBottom: 5
  },
  imageContainer: {
    flex: 1,

    // backgroundColor: 'red',
    position: "relative",
  },

  header: {
    // backgroundColor: "red",
    flexDirection: "row",
    padding:10,
    paddingTop: 20,


  },
  name: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: "center",

  },
  date: {
    justifyContent: "center",
    // backgroundColor: 'pink'
  },
  miniLikeCommCon: {
    // backgroundColor:'red'
    flexDirection: "row",

  },

  taggedNames: {
    color:'blue',
  },
  bottomButtons: {

    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: "gainsboro"
  },
  buttons: {
    height: 40,
    flex: 1,
    // backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderColor: 'gainsboro',
    flexDirection: "row"
  },
  captionHolder: {
    flexDirection: "row",

  },
  captionUsername:{
    color:'black',
    fontSize:14,
    fontWeight:'bold',
  },


  likeCapHolder: {
    left:10,
  }


})
