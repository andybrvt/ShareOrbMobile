import React from 'react';
import * as dateFns from 'date-fns';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
 } from 'react-native';
 import { Video, AVPlaybackStatus } from 'expo-av';
 import FacePile from 'react-native-face-pile';
 import { Navigation2, MoreVertical, Heart, MessageCircle, ArrowLeft,
 ArrowLeftCircle,Bookmark, ChevronsUp, ChevronsDown, Edit2, VolumeX, Volume2
 } from "react-native-feather";
 import InViewPort from "../RandomComponents/InViewPort";
 import FastImage from 'react-native-fast-image'

 let likeAvatarList=[]

 class DayAlbumPost extends React.Component{

   state = {
     isMuted: true,
     showMute: false,
   }

   playVideo = () => {
     this.setState({
       showMute: true
     })
     if(this.video){
       this.video.playAsync();
     }
   }

   pauseVideo = () => {
     this.setState({
       showMute: false
     })
     if(this.video){
       this.video.pauseAsync();
     }
   }

   handlePlaying = (isVisible) => {
     isVisible ? this.playVideo() : this.pauseVideo();
   }

   unMute = () => {
     this.setState({
       isMuted: false
     })
   }


   mute = () => {
     this.setState({
       isMuted: true
     })
   }

   render(){

     const item = this.props.item
     let peopleLikeId = [];
     if(item.people_like.length>0)
     {
       likeAvatarList = item.people_like.map(item => {
        return {
          imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
        };
        });
        for(let i = 0; i< item.people_like.length; i++){
          peopleLikeId.push(item.people_like[i].id)
        }
     }
     let dt=new Date(item.created_at)
     let dtDateOnly1 = dateFns.addHours(new Date(item.created_at), new Date(item.created_at).getTimezoneOffset()/60)
     let utc2=dateFns.format(dtDateOnly1, 'h:mma');
     const month = dateFns.format(new Date(item.created_at), 'MMMM yyyy');


     return(
       <View style={{minHeight:150, marginBottom:0}}>
       <View style={{
           // backgroundColor: 'red',
           width:'100%',
           padding:10,
         }}>
         {
           item.video !== null ?

           <TouchableOpacity >

             <InViewPort
               onChange = {this.handlePlaying}
               >
               <Video
                 ref={ref => {this.video = ref}}
                 resizeMode="cover"
                 style={{width:'100%', height:250, borderRadius:5, backgroundColor:'gray' }}
                 source = {{
                   uri: `${global.IMAGE_ENDPOINT}`+item.video
                   // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                 }}
                 rate={1.0}
                 isMuted={this.state.isMuted}
                 volume={0.5}
                 isLooping
                 shouldPlay
                 >


             </Video>
             </InViewPort>

            </TouchableOpacity>

            :

            <TouchableOpacity onPress ={() => this.props.navFullImage(item)} >

              {/* fast image*/}

               <Image
                 resizeMode="cover"
                 style={{width:'100%', height:250, borderRadius:5, backgroundColor:'gray' }}
                 source = {{
                   uri: `${global.IMAGE_ENDPOINT}`+item.itemImage
                 }}>

               {/* fast image*/}

             </Image>
             </TouchableOpacity>

         }

          <View style={{top: 210, left:'2.5%', position:'absolute', width:50, height:50}}>
            <TouchableOpacity
              onPress={() => this.props.navLikePeople(item.people_like)}>
            <FacePile
              size={2.5} numFaces={3} faces={likeAvatarList} circleSize={14}
              containerStyle={{height:40}}
               overlap={0.1} />
           </TouchableOpacity>
          </View>
          {/*
          <View style={{top:'7.5%', right:'4.5%', position:'absolute'}}>
            <Text style={styles.videoFooterUserName}>
              <MoreVertical
               stroke = "white"
               // fill="red"
               width ={27.5}
               height = {27.5}
               style={{right:5}}
                />
            </Text>
          </View>
          */}
          {
            !this.state.showMute ?

            null

            :

            this.state.isMuted ?

            <View style={{top: 140, right:'6%', position:'absolute'}}>
              <TouchableOpacity
                onPress = {() => this.unMute()}
                >
                <View style = {styles.justifyCenter}>
                  <VolumeX
                    fill="white"
                   stroke = "white"
                   // fill="red"
                   width ={27.5}
                   height = {27.5}
                   style={{right:5}}
                    />

                </View>
              </TouchableOpacity>
            </View>

            :

            <View style={{top: 140, right:'6%', position:'absolute'}}>
              <TouchableOpacity
                onPress = {() => this.mute()}
                >
                <View style = {styles.justifyCenter}>
                  <Volume2
                    fill="white"
                   stroke = "white"
                   // fill="red"
                   width ={27.5}
                   height = {27.5}
                   style={{right:5}}
                    />

                </View>
              </TouchableOpacity>
            </View>


          }


          <View style={{top: 180, right:'6%', position:'absolute'}}>
            {
              peopleLikeId.includes(this.props.userId) ?
              <TouchableOpacity
                onPress ={() => this.props.sendUnLike(item.id, this.props.userId)}
                >
                <View style = {styles.justifyCenter}>
                  <Heart
                    fill="red"
                     stroke = "red"
                     width ={25}
                     height = {25}
                     style={{right:5}}
                  />
                  <Text  style = {styles.statNum}>
                    {item.people_like.length}
                  </Text>
                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress ={() => this.props.sendLike(item.id, this.props.userId)}>
                <View style = {styles.justifyCenter}>
                  <Heart
                    fill="white"
                     stroke = "white"
                     width ={25}
                     height = {25}
                     style={{right:5}}
                  />
                  <Text  style = {styles.statNum}>
                    {item.people_like.length}
                  </Text>
                </View>
              </TouchableOpacity>
            }
          </View>
          <View style={{top: 215, right:'6%', position:'absolute'}}>
            <TouchableOpacity
              onPress = {() => this.props.onCommentOpen(item.id)}
              >
              <View style = {styles.justifyCenter}>
                <MessageCircle
                  fill="white"
                 stroke = "white"
                 // fill="red"
                 width ={27.5}
                 height = {27.5}
                 style={{right:5}}
                  />
                  <Text  style = {styles.statNum}>
                    {item.get_socialCalItemComment.length}
                  </Text>
              </View>
            </TouchableOpacity>
          </View>

        <View style={{flexDirection:'row', padding:15, flexWrap: 'wrap', }}>
          <Text style={{fontFamily:'Nunito-Bold', color:'white', fontSize:15}}>
            {utc2+" "}
           </Text>
          <Text style={{color:'white', fontFamily:'Nunito-SemiBold'}}>{item.caption}</Text>
        </View>
      </View>
    </View>
     )
   }
 }


export default DayAlbumPost;

const styles = StyleSheet.create({
  justifyCenter:{
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    color:'white',

    // backgroundColor:'red',
  },
  statNum: {
    color:'white',
    fontSize:15,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    left:5,
    // fontWeight:'bold',
  },

})
