import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  RefreshControl,

 } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-elements';

import { Video, AVPlaybackStatus } from 'expo-av';

class NewGlobePost extends React.PureComponent{
  constructor(props){
      super(props)
      this.state = {

      }
   }
   ViewProfile = (username) => {

     if(username === this.props.username){
       this.props.navigation.navigate("Profile");
     } else {
       this.props.navigation.navigate("ProfilePage", {
         username: username
       })
     }
   }
  setName=(firstName, lastName)=>{
    let name=""
    let lastCut=""
    let total=0
    first = global.CAPITALIZE(firstName)
    last = global.CAPITALIZE(lastName)
    name=first+" "+last
    lastCut=lastName.substring(0,1)
    total=firstName.length+lastName.length
    if(total>10){
      name=first+" "+lastCut+"."
    }
    return name
  }

  render(){

    let userUsername="";
    let firstName="";
    let lastName="";
    let profilePic="";
    let itemImage = "";
    let vid=""
    let groupInfo=this.props.groupInfo
    vid = this.props.vid
    let groupName=groupInfo.groupName
    let groupPic=groupInfo.groupPic
    console.log(this.props.item.video)
    if(this.props.item) {

      if(this.props.item.video){
        video = `${global.IMAGE_ENDPOINT}`+this.props.item.video
      }
      if(this.props.item.creator.first_name){
        firstName = this.props.item.creator.first_name;
      }
      if(this.props.item.creator.last_name){
        lastName = this.props.item.creator.last_name;
      }
      if(this.props.item.creator.username){
        userUsername = this.props.item.creator.username
      }
      if(this.props.item.creator.profile_picture){
        profilePic = `${global.IMAGE_ENDPOINT}`+this.props.item.creator.profile_picture;
      }
    }
    if (this.props.item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return(
      <View

        style={styles.item}
      >


      {/*
        <Video
          ref={ref => {this.video = ref}}
          style = {{
            width: '100%',
            height: '100%'
          }}
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
            // uri: video
          }}
          rate={1.0}
          isMuted={this.state.isMuted}
          resizeMode="cover"
          isLooping
          // shouldPlay
          volume={0.5}
           />
        */}
        {/*creator: orb.creator,
        orbId: orb.id,
        groupName: orb.group_name,
        groupPic: orb.groupPic
        creator: 4
        orbId: 20
        groupName: test1
        groupPic: /media/post_pictures/2021/10/f5dcd008-8fd2-4891-bc49-aa2866656f72.jpg
        */}




          <TouchableWithoutFeedback
           onPress={() => {
             this.props.navigation.navigate("Story",
             {'video':`${global.IMAGE_ENDPOINT}`+this.props.item.video,
             firstName:firstName, lastName:lastName,
             profilePic:profilePic
              }
              );
             }}>
           <Image
             style ={{
               width: "100%",
               height: '100%'
             }}
             resizeMode = "cover"
             source = {{
               uri:  `${global.IMAGE_ENDPOINT}`+this.props.item.itemImage
               // uri:  "https://compote.slate.com/images/697b023b-64a5-49a0-8059-27b963453fb1.gif"
             }}
            />
          </TouchableWithoutFeedback>






           <LinearGradient
             start={{x: 0, y: 0}} end={{x: 0, y:1.25}}
             style = {{
               position: 'absolute',
               width: '100%',
               bottom: '0%',
               height: "30%"
             }}
             colors = {['transparent', '#000000']}>
           </LinearGradient>

         <View style = {{
           position: 'absolute',
           width: '100%',
           bottom: '0%',
           height: "20%",
           flexDirection:'row',
           alignItems:'center',
           }}>
             <View style={{
               width: '15%',
               marginLeft:5,
               marginRight:7.5,
               }}>
               <Avatar
                 onPress = {() => this.ViewProfile(userUsername)}
                 size={20}
                 rounded
                 source = {{
                   uri: profilePic
                 }}
               />
           </View>


           <Text style = {styles.videoFooterUserName}>
             {this.setName(firstName, lastName)}
           </Text>

       </View>

     </View>
    )
  }
}


const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 2, // approximate a square
  },
  videoFooterUserName: {
    color:'white',
    fontSize:11,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },
})

export default NewGlobePost;
