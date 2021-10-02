import React from "react";
import { Text, View, Button,StyleSheet, Image, Dimensions, TouchableOpacity,
ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, } from 'react-native';
import { Navigation2, Heart, MessageCircle, VolumeX, Volume2, UserCheck, UserPlus } from "react-native-feather";
import { LinearGradient } from 'expo-linear-gradient';
import * as dateFns from 'date-fns';
import WebSocketGlobeInstance from '../../Websockets/globeGroupWebsocket';

import { Avatar } from 'react-native-elements';


const width = Dimensions.get("window").width

class NewGlobePost extends React.Component{

  viewGroup = (item) => {


    this.props.navigation.navigate("JoinScreen", {
      item:item
    })

  }


  onLike = ( likerId, notificationToken) => {
    console.log(this.props.data.id)
    WebSocketGlobeInstance.sendGroupLike(
      this.props.data.id,
      likerId
    )
  }

  onUnlike = (unlikerId, notificationToken) =>{

    WebSocketGlobeInstance.sendGroupUnlike(
      this.props.data.id,
      unlikerId
    )
  }
  renderPostInfo=(data, like)=>{

    console.log(like, 'like like')
    let postId = "";
    let calCell = "";
    let username = "";
    let cellYear = "";
    let cellMonth = "";
    let cellDay = "";
    let location = "";
    let userUsername="";
    let post = {};
    let profilePic="";
    let userPostImages = []
    let like_people = [];
    let commentList = [];
    let peopleLikeId = []
    let postCreatedAt= new Date();
    let contentTypeId="";
    let ownerId = "";
    let cellDate = "";
    let firstName="";
    let lastName="";
    let likeAvatarList=[]
    let itemImage = "";
    let video = "";
    let calComment = 0;
    let caption="";
    let notificationToken = "";
    let goal = "";

    let utc3 = dateFns.format(new Date(), 'h:mma');

    if(data){
      if(data.caption){
        caption = data.caption
      }
      if(data.creator){
        if(data.creator.profile_picture){
          profilePic = `${global.IMAGE_ENDPOINT}`+data.creator.profile_picture
        }
        if(data.creator.first_name){
          firstName = data.creator.first_name;
        }
        if(data.creator.last_name){
          lastName = data.creator.last_name;
        }
        if(data.creator.id){
          ownerId = data.creator.id
        }
        if(data.creator.username){
          userUsername = data.creator.username
        }

        if(data.creator.notificationToken){
          notificationToken = data.creator.notificationToken
        }

        if(data.created_at) {
          postCreatedAt=data.created_at
          if(!isNaN(new Date(data.created_at).getTimezoneOffset()/60)){
            const dtDateOnly1 = dateFns.addHours(new Date(data.created_at), new Date(this.props.data.created_at).getTimezoneOffset()/60)
            utc3=dateFns.format(new Date(dtDateOnly1), 'M/dd');
          }
        }
      }
      if(data.calCell){
        calCell = data.calCell
      }
      if(data.id){
        postId = data.id
      }
      if(data.goal){
        goal = data.goal
      }

      if(data.itemImage){
        itemImage = `${global.IMAGE_ENDPOINT}`+data.itemImage;
      }
      if(data.video){
        if(data.video !== null){
          video = `${global.IMAGE_ENDPOINT}`+data.video;
          // video taken from the local site does not work but the videos
          // taken from pretty much any where else works (sounds good to me)
        }

      }
      if(data.people_like){
        like_people = data.people_like

        if(like_people.length > 0){
          for(let i = 0; i< like_people.length; i++){
            peopleLikeId.push(like_people[i].id)
          }
        }

        if(data.people_like.length>0)
        {
          likeAvatarList = data.people_like.map(item => {
           return {
             imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
           };
           });
        }

      }
      if(data.get_socialCalItemComment){
        calComment =data.get_socialCalItemComment.length
      }
    }

    let socialMonth=""
    let socialDay=""
    // timestamp=postCreatedAt
    // const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)
    // socialMonth = `${dateFns.format(new Date(timestamp), "MMMM")}`;
    // socialDay = `${dateFns.format(new Date(timestamp), "d")}`;
    timestamp=postCreatedAt
    // const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)
    //
    socialMonth = `${dateFns.format(new Date(timestamp), "MMMM")}`;
    socialDay = `${dateFns.format(new Date(timestamp), "d")}`;
    return(
      <View>
        <View style={{flexDirection:'row', zIndex:999}}>
          <View style = {{
              width: '15%',
              alignItems:'center'
            }}>
            <Avatar
              onPress = {() => this.props.ViewProfile(userUsername)}
              size={37.5}
              rounded
              source = {{
                uri: profilePic
              }}
            />
          </View>
        <View style={{
            flexDirection:'column',  width:'50%'}}>
            <Text style = {styles.videoFooterUserName}>
              {global.NAMEMAKE(firstName, lastName)}
            </Text>
            <View style={{flexDirection:'row'}}>
              <Text style = {styles.videoFooterUserName2}>
                {socialMonth.substring(0,3)}&nbsp;
              </Text>
              <Text style = {styles.videoFooterUserName2}>
                {socialDay}
              </Text>
            </View>
          </View>

          <View style = {{
             alignItems: 'center',
             justifyContent: 'center',
             width: '35%'
            }}>
            <View style = {{
                flexDirection: 'row'
              }}>
              {
                      like.includes(this.props.id) ?
                      <TouchableOpacity
                        onPress = {() => this.onUnlike(
                          this.props.id,
                          notificationToken,
                        )}
                    >
                        <View style = {styles.justifyCenter}>
                          <Heart
                            stroke = "red"
                            fill="red"
                            width = {27.5}
                            height = {27.5}
                             />
                          <Text  style = {styles.statNum}>
                            {like.length}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        onPress = {() => this.onLike(
                          this.props.id,
                          notificationToken,
                        )}
                        >
                        <View style = {styles.justifyCenter}>
                          <Heart
                            stroke = "white"
                            fill="white"
                            width = {27.5}
                            height = {27.5}
                          />
                         <Text style = {styles.statNum}>
                          {like.length}
                        </Text>
                        </View>
                      </TouchableOpacity>
                  }

                  <TouchableWithoutFeedback  onPress={() => this.changeShowComments(postId)}>
                    <View style={{marginLeft:20,}}>
                        <View style = {styles.justifyCenter}>
                          <MessageCircle
                            stroke = "white"
                            fill="white"
                            width ={27.5}
                            height = {27.5}
                          />
                          <Text style = {styles.statNum}>
                            {calComment}
                          </Text>
                        </View>
                    </View>
                  </TouchableWithoutFeedback>
            </View>
          </View>
         </View>
      </View>
    )
  }

  render(){

    let postId = ""
    let itemImage = ""
    let group = {}
    let groupPic = ""
    let groupName = ""
    let members = []
    let post = {}
    let groupLike = []


    let creatorPic = ""
    let username = ""
    let firstName = ""
    let lastName = ""

    let caption = ""
    let userUsername = ""

    if(this.props.data){

      if(this.props.data.people_like){
        groupLike = this.props.data.people_like
      }
      if(this.props.data.post){

        post = this.props.data.post
        if(this.props.data.post.itemImage){
          itemImage = `${global.IMAGE_ENDPOINT}` + this.props.data.post.itemImage
        }

        if(this.props.data.post.creator){
          creatorPic  = `${global.IMAGE_ENDPOINT}`+ this.props.data.post.creator.profile_picture
          username = this.props.data.post.creator.username
        }
        if(this.props.data.post.caption){
          caption = this.props.data.post.caption
        }



      }
      if(this.props.data.group){
        group = this.props.data.group
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
              width: '65%',
              justifyContent: 'center'
            }}>

            <View style = {{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10
              }}>
              <Avatar
                size = {40}
                rounded
                source = {{
                  uri: groupPic
                }}
                 />
               <View style = {{
                   marginLeft: 10
                 }}>
                 <Text style = {{
                    fontSize:16,
                    fontFamily:'Nunito-Bold'
                    }}>{global.CAPITALIZE(groupName)}</Text>
                  <View style = {{
                      // alignItems: 'center',
                      // justifyContent: 'center'
                    }}>
                    <Text style = {{
                       fontSize:12,
                       fontFamily:'Nunito-SemiBold'
                       }}>{members.length} members</Text>
                  </View>
               </View>
             </View>
          </View>

          <View style = {{
              width: '37.5%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {
              !members.includes(this.props.id) ?
              <TouchableOpacity
                onPress = {() => this.viewGroup(group)}
                activeOpacity={0.8} style={styles.inviteButton} >
                <UserPlus
                  style={{marginRight:5}}
                  stroke = "white"
                  strokeWidth = {2}
                  height = {15}
                  width = {15}
                   />
                 <Text style={{fontFamily:'Nunito-SemiBold', fontSize:13, color:'white' }}>Join</Text>
              </TouchableOpacity>

              :

              <TouchableOpacity
                style={styles.inviteButtonJ} >
                <UserCheck
                  style={{marginRight:5}}
                  stroke = "white"
                  strokeWidth = {2}
                  height = {15}
                  width = {15}
                   />
                 <Text style={{fontFamily:'Nunito-SemiBold', fontSize:13, color:'white' }}>Joined</Text>
              </TouchableOpacity>
            }
          </View>
        </View>

        <View style = {styles.bottomContainer}>
          <Image
            style={styles.cover}
            resizeMode = "cover"
            source={{ uri: itemImage }}
            // blurRadius = {15}
             />

             <LinearGradient
               start={{x: 0, y: 0}} end={{x: 0, y: 1}}
               style = {{
                 position: 'absolute',
                 width: '100%',
                 bottom: '0%',
                 height: "30%"
               }}
               colors = {['transparent', '#000000']}>
             </LinearGradient>

           {
             caption.length === 0 ?
             <View style={{position:'absolute', bottom:'5%', width:'100%', flexDirection:'row'}}>
               {this.renderPostInfo(post, groupLike)}
             </View>
             :
             <View style={{position:'absolute', bottom:'12.5%', width:'100%', flexDirection:'row'}}>
               {this.renderPostInfo(post, groupLike)}
             </View>
           }

           {
             (caption.length==0)?
             <View>

             </View>
             :
             <View>
               <View style={styles.testWhere4}>
                   <View style={styles.testWhere4}>
                     { (caption.length>30)?
                       <View style={{ width:'92.5%', flexWrap:'wrap', flexDirection:'row',}}>
                         <Text>
                           <Text style = {{fontSize:15, fontFamily:'Nunito-Bold', color:'white' }}>{username+" "}</Text>
                           <Text style={styles.captionText}>{caption.substring(0,75)}</Text>
                         </Text>
                       </View>
                       :
                       <View style={{ width:'92.5%', flexWrap:'wrap', flexDirection:'row', marginBottom:10}}>
                         <Text>
                           <Text style = {{fontSize:15, fontFamily:'Nunito-Bold', color:'white' }}>{username+" "}</Text>
                           <Text style={styles.captionText}>{caption.substring(0,75)}</Text>
                         </Text>
                       </View>
                     }
                   </View>
               </View>
             </View>
           }
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  inviteButton: {
    // padding:15,
    width:80,
    borderRadius: 20,
    height:35,
    elevation:5,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1890ff",
    flexDirection:'row'
  },
  inviteButtonJ: {
    // padding:15,
    width:80,
    borderRadius: 20,
    height:35,
    elevation:5,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gainsboro",
    flexDirection:'row'
  },
  totalHolderContainer: {
    position: 'relative',
    height: 500,
    // borderTopWidth:1, borderColor:'#F0F0F0'
    // flexDirection: 'row'
  },
  topContainer:{
    height: '12.5%',
    // backgroundColor:'red',
    flexDirection:  'row'
  },
  bottomContainer: {
    height: '85%',
    backgroundColor: 'gainsboro'
  },
  joinbtn: {
    padding:10,
    borderRadius: 20,
    height:25,
    elevation:5,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1890ff",
    flexDirection:'row'
  },
  joinedbtn: {
    height: 40,
    width: '80%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'gray',
    borderRadius: 20
  },
  cover: {
    width: '100%',
    height: '100%'
  },
  justifyCenter:{
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    color:'white',
    zIndex:1,
    // backgroundColor:'red',
  },
  videoFooterUserName: {
    color:'white',
    fontSize:15,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },

  videoFooterUserName2: {
    color:'white',
    fontSize:13,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    color:'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },
  statNum: {
    color:'white',
    fontSize:15,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontFamily:'Nunito-Bold',
    left:5,
    zIndex:1,
    // fontWeight:'bold',
  },
  testWhere4:{
    position:'absolute',
    bottom:7.5,

    zIndex:1,
    flexDirection:'row',
    padding:5,
    left:'1%',
    width:'100%',
  },

  captionText:{
    fontFamily:'Nunito-SemiBold',
      textShadowColor: 'black',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5,
      color:'white'
  },


})

export default NewGlobePost;
