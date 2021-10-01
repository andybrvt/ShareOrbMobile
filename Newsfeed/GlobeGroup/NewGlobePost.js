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
    let members = []

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
        if(this.props.data.group.members){
          members = this.props.data.group.members
        }

      }
    }

    return(
      <View style = {styles.totalHolderContainer}>


        <View style = {styles.topContainer}>

          <View style = {{
              backgroundColor: 'green',
              width: '70%'
            }}>

            <View style = {{
                flexDirection: 'row',

              }}>
              <Avatar
                size = {40}
                rounded
                source = {{
                  uri: groupPic
                }}
                 />
              <Text>{groupName}</Text>
            </View>

          </View>

          <View style = {{
              width: '30%',
              backgroundColor: 'purple'
            }}>
            <Text>{members.length} members</Text>
            <View>
              <Text>Join</Text>
            </View>

          </View>



        </View>


        <View style = {styles.bottomContainer}>
          <Text>Here is the pictures</Text>
        </View>


        {/*
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
    height: 500
    // flexDirection: 'row'
  },
  topContainer:{
    height: '20%',
    backgroundColor: 'pink',
    flexDirection:  'row'
  },
  bottomContainer: {
    height: '80%',
    backgroundColor: 'orange'
  },


})

export default NewGlobePost;
