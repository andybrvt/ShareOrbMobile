import React from "react";
import { Text, View, Button,StyleSheet, Image, Dimensions, TouchableOpacity,
ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';
import { Navigation2, Heart, MessageCircle, VolumeX, Volume2 } from "react-native-feather";

import { Avatar } from 'react-native-elements';


const width = Dimensions.get("window").width

class NewGlobePost extends React.Component{


  render(){

    console.log(this.props.data, 'data here')

    let postId = ""
    let itemImage = ""
    let groupPic = ""
    let groupName = ""

    let creatorPic = ""
    let username = ""
    let firstName = ""
    let lastName = ""

    if(this.props.data){
      if(this.props.data.post){

        if(this.props.data.post.itemImage){
          itemImage = `${global.IMAGE_ENDPOINT}` + this.props.data.post.itemImage
        }

        if(this.props.data.post.creator){
          creatorPic  = `${global.IMAGE_ENDPOINT}`+ this.props.data.post.creator.profile_picture
          username = this.props.data.post.creator.username
        }



      }
      if(this.props.data.group){
        if(this.props.data.group.groupPic){
          groupPic = `${global.IMAGE_ENDPOINT}` + this.props.data.group.groupPic
        }
        if(this.props.data.group.group_name){
          groupName = this.props.data.group.group_name
        }

      }
    }

    return(
      <View style = {styles.totalHolderContainer}>


        <View>
          <Text>put the group stuff here</Text>
        </View>

        <View style = {styles.container}>


            <Image
              style={styles.cover}
              resizeMode = "cover"
              source={{ uri: itemImage }}
              // blurRadius = {15}
               />

             <View style = {styles.ownerHolder}>
               <View >
                 <Avatar
                   size = {40}
                   rounded
                   source = {{
                     uri: groupPic
                   }}
                    />
               </View>

               <View style = {{
                   marginLeft: 7
                 }}>
                 <Text style = {{
                     color: 'white',
                     fontSize: 17}}> {global.CAPITALIZE(username)}</Text>
               </View>


             </View>



           {/*
             <View style = {styles.avatarHolder}>
               <View style={{zIndex:99, borderWidth: 5, borderColor: '#1890ff', borderRadius:250,}}>
                 <Avatar

                   size={250}
                   rounded
                   source = {{
                     uri: itemImage
                   }}
                    />
               </View>
             </View>

             */}


           {/*


             <View style = {styles.heartHolder}>
               <Heart
                 stroke = "red"
                 fill = "red"
                 width = {35}
                 height = {35}
                  />
             </View>


             */}

        </View>

        {/*
          <View style = {styles.sideContainer}>
            <View style = {styles.sideAvatarContainer}>
              <Avatar
                size = {50}
                rounded
                source = {{
                  uri: creatorPic
                }}
                 />
            </View>

            <View style = {styles.sideHeartContainer}>
              <Heart
                stroke = "red"
                fill = "red"
                width = {35}
                height = {35}
                 />
            </View>

          </View>



          */}

      </View>

    )
  }
}

const styles = StyleSheet.create({
  totalHolderContainer: {
    position: 'relative',
    // backgroundColor: 'red',
    marginBottom: 80,
    // flexDirection: 'row'
  },
  container: {

    backgroundColor: 'lightgray',
    height: 500,
    position: 'relative',
    zIndex: 99,
    // shadowOffset: { width: 1, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    elevation: 5,
    width: '100%',
  },
  ownerHolder: {

    flexDirection: 'row',
    position:'absolute',
    bottom: '5%',
    left: '3%',
    alignItems: 'center',
    justifyContent:'center'
  },
  sideContainer: {
    // backgroundColor: 'yellow',
    width: '20%',
    height: 500,
    alignItems: 'center'
  },
  sideAvatarContainer:{
    position: 'absolute',
    bottom: '25%'
  },
  sideHeartContainer:{
    position: 'absolute',
    bottom: '10%'
  },
  cover: {
    // flex: 1,
    // borderRadius: 5,
    position: "relative",
    height: 500,
    shadowColor: '#000',
    width:"100%",
    // transform: [{ scale: 0.9 }]
  },
  avatarHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    height: 350,
    width: '100%'
  },
  groupAvatar: {
    position: 'absolute',
    left: '2%',
    top: '3%'
  },
  groupName: {
    left: '16%',
    top: '5%',
    position: 'absolute',
  },
  heartHolder: {
    position: 'absolute',
    right: '7%',
    bottom: '10%'
  }

})

export default NewGlobePost;
