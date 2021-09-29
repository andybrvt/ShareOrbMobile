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

    if(this.props.data){
      if(this.props.data.post){

        if(this.props.data.post.itemImage){
          itemImage = `${global.IMAGE_ENDPOINT}` + this.props.data.post.itemImage
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
      <View style = {styles.container}>

        <Image
          style={styles.cover}
          resizeMode = "cover"
          source={{ uri: itemImage }}
          blurRadius = {15}
           />

         <View style = {styles.avatarHolder}>
           <View style={{zIndex:99, borderWidth: 5, borderColor: 'white', borderRadius:250,}}>
             <Avatar

               size={250}
               rounded
               source = {{
                 uri: itemImage
               }}
                />
           </View>
         </View>

         <View style = {styles.groupAvatar}>
           <Avatar
             size = {50}
             rounded
             source = {{
               uri: groupPic
             }}
              />
         </View>

         <View style = {styles.groupName}>
           <Text style = {{color: 'white'}}>{groupName}</Text>
         </View>

         <View style = {styles.heartHolder}>
           <Heart
             stroke = "red"
             fill = "red"
             width = {35}
             height = {35}
              />
         </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({

  container: {

    backgroundColor: 'lightgray',
    height: 350,
    borderRadius: 5,
    position: 'relative',
    zIndex: 99,
    // shadowOffset: { width: 1, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    elevation: 5,
    width: '100%',
  },
  cover: {
    // flex: 1,
    borderRadius: 5,
    position: "relative",
    height: 350,
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
