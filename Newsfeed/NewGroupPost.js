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
  Dimensions,
  RefreshControl
 } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-elements';


class NewGlobePost extends React.PureComponent{

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
    let video = "";

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
      <TouchableOpacity
        delayPressIn={750}
        onPress = {() => this.onNavPicDirect(this.props.item.id, this.props.item.smallGroup)}
        activeOpacity={0.8}
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

      </TouchableOpacity>
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
