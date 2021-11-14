import React from "react";
import { ActivityIndicator, Text, View, Button,StyleSheet, Image, Dimensions, TouchableOpacity,
ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, } from 'react-native';
import { Navigation2, Heart, MessageCircle, VolumeX, Volume2, UserCheck, UserPlus, MapPin } from "react-native-feather";
import { LinearGradient } from 'expo-linear-gradient';
import * as dateFns from 'date-fns';
import WebSocketGlobeInstance from '../../Websockets/globeGroupWebsocket';
import InViewPort from "../../RandomComponents/InViewPort";
import { Video, AVPlaybackStatus } from 'expo-av';
import FastImage from 'react-native-fast-image'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers, faUserCircle, faMapPin } from '@fortawesome/free-solid-svg-icons'
import NotificationWebSocketInstance from  '../../Websockets/notificationWebsocket';


import { Avatar } from 'react-native-elements';


const width = Dimensions.get("window").width

class NewGlobePost extends React.Component{

  constructor(props){
      super(props)
      this.state = {
        isMuted: true,
        showMute: false,
        loading: false
      }
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

  viewGroup = (item) => {


    this.props.navigation.navigate("JoinScreen", {
      item:item
    })

  }

  viewOrb = (orb) => {

    this.props.navigation.navigate("groupOrb", {
      creator: orb.creator,
      orbId: orb.id,
      groupName: orb.group_name,
      groupPic: orb.groupPic
    })
  }


  onLike = ( likerId, notificationToken, ownerId) => {


    this.setState({
      loading: true
    })

    WebSocketGlobeInstance.sendGroupLike(
      this.props.data.id,
      likerId
    )

    const postId = this.props.data.post.id


    // if(ownerId !== likerId){

      const notificationObject = {
        command: 'group_like_notification',
        actor: likerId,
        recipient: ownerId,
        postId: postId
      }

      NotificationWebSocketInstance.sendNotification(notificationObject)


      global.SEND_GROUP_LIKE_NOTIFICATION(
        notificationToken,
        this.props.currentUser,
        postId,
      )



    // }




    setTimeout(() => this.setState({ loading: false}), 1000)


  }

  onUnlike = (unlikerId, notificationToken) =>{

    this.setState({
      loading: true
    })

    WebSocketGlobeInstance.sendGroupUnlike(
      this.props.data.id,
      unlikerId
    )

    setTimeout(() => this.setState({ loading: false}), 1000)
    // this.setState({
    //   loading: false
    // })

  }

  ViewProfile = (username) => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    if(username !== this.props.username){
      this.props.navigation.navigate("ProfilePage", {
        username: username
      })
    } else {
      this.props.navigation.navigate("Profile")
    }

  }

  changeShowComments = (postId) => {
    this.props.navigation.navigate("Comments",{
      postId: postId,
      type: 'group'
    })
  }


  renderPostInfo=(data, like, comment, created_at)=>{

    let userUsername="";
    let profilePic="";
    let firstName="";
    let lastName="";
    let notificationToken = "";
    let postId;


    let postCreatedAt= new Date();
    let ownerId = "";

    let utc3 = dateFns.format(new Date(), 'h:mma');

    if(data){
      postId = data.id;
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
        if(data.creator.isOtherAccount){
          if(data.creator.secondUsername){
            userUsername = data.creator.secondUsername
          }
        } else {
          if(data.creator.username){
            userUsername = data.creator.username
          }

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




    }

    let socialMonth=""
    let socialDay=""
    let timestamp=postCreatedAt

    socialMonth = `${dateFns.format(new Date(timestamp), "MMMM")}`;
    socialDay = `${dateFns.format(new Date(timestamp), "d")}`;
    return(
      <View>


        <View style={{flexDirection:'row', alignItems:'center', zIndex:999}}>
          <View style = {{
              width: '12.5%',
              marginLeft:5,
              // backgroundColor:'red',
              alignItems:'center'
            }}>
            <Avatar
              onPress = {() => this.ViewProfile(userUsername)}
              size={30}
              rounded
              source = {{
                uri: profilePic
              }}
            />
          </View>
        <View style={{
            flexDirection:'column',  width:'50%'}}>
            <Text style = {styles.videoFooterUserName}>
              {userUsername}
            </Text>
            {/*
            <View style={{flexDirection:'row'}}>
              <Text style = {styles.videoFooterUserName2}>
                {dateFns.format(new Date(created_at), "MMM")}&nbsp;
              </Text>
              <Text style = {styles.videoFooterUserName2}>
                {dateFns.format(new Date(created_at), "dd")}
              </Text>
            </View>
            */}
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
                  this.state.loading ?

                  <ActivityIndicator />

                  :

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
                      ownerId
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
                            {comment.length}
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

  render(){
    let group = {}
    let groupPic = ""
    let groupName = ""
    let members = []
    let itemImage = ""
    let video = ""
    let post = {}
    let groupLike = []
    let comment = []
    let created_at = new Date();
    let username = ""
    let caption = ""

    if(this.props.data){
      if(this.props.data.post){

        post = this.props.data.post
        if(this.props.data.post.people_like){
          groupLike = this.props.data.post.people_like
        }
        if(this.props.data.post.get_socialCalItemComment){
          comment = this.props.data.post.get_socialCalItemComment
        }
        if(this.props.data.post.created_at){
          created_at = new Date(this.props.data.post.created_at)
        }
        if(this.props.data.post.itemImage){
          itemImage = `${global.IMAGE_ENDPOINT}` + this.props.data.post.itemImage
        }
        if(this.props.data.post.video){
          video = `${global.IMAGE_ENDPOINT}` + this.props.data.video
        }

        if(this.props.data.post.creator.isOtherAccount){
          if(this.props.data.post.creator){
            username = this.props.data.post.creator.secondUsername
          }
        } else {
          if(this.props.data.post.creator){
            username = this.props.data.post.creator.username
          }
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
              left:'10%',
              // backgroundColor:'red',
              justifyContent: 'center'
            }}>

            <View style = {{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent:'center',
                marginLeft: 10
              }}>
              <TouchableOpacity
                onPress = {() => this.viewOrb(group)}
                >
                <Avatar
                  size = {35}
                  rounded
                  source = {{
                    uri: groupPic
                  }}
                   />
              </TouchableOpacity>
              <View style = {{

                   marginLeft: 10,
                   width:width-75,
                   flexDirection:'row',
                   alignItems:'flex-end',
                   // backgroundColor:'red',
                 }}>
                 <View style={{width:'62.5%',flexDirection:'column'}}>
                   <View>
                     <Text style = {{
                      fontSize:16,
                      fontFamily:'Nunito-Bold'
                      }}>{global.CAPITALIZE(groupName)}</Text>
                   </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontFamily:'Nunito', fontSize:11, color:'#8c8c8c',}} >
                      {dateFns.format(new Date(created_at), "MMM")}&nbsp;
                    </Text>
                    <Text style={{fontFamily:'Nunito', fontSize:11,color:'#8c8c8c',}}>
                      {dateFns.format(new Date(created_at), "dd")}
                    </Text>
                  </View>
                </View>
                <View style = {{
                    alignItems: 'center',
                    alignItems: 'flex-end',
                    flexDirection:'row',
                  }}>
                  <FontAwesomeIcon
                    size = {15}
                    style={{color:'gray', marginRight:5,marginBottom:1}}
                    icon={faMapPin} />

                  <Text style = {{
                     fontSize:14,
                     color:'#8c8c8c',
                     fontFamily:'Nunito-SemiBold'
                   }}>Tucson, AZ</Text>
                </View>
               </View>
             </View>
          </View>

          <View style = {{
              width: '37.5%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

          </View>
        </View>

        <View style = {styles.bottomContainer}>
          {/* FastImage */}
          {
            video === "" ?

            <Image
                style={styles.cover}
                resizeMode = "cover"
                source={{
                  uri: itemImage,
                  // priority: FastImage.priority.normal,

                }}
                 />

               :


               <InViewPort
                 onChange = {this.handlePlaying}
                 >
                 <Video
                   ref={ref => {this.video = ref}}
                   style = {styles.cover}
                   source={{
                     // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                     uri: video
                   }}
                   rate={1.0}
                   isMuted={false}
                   resizeMode="cover"
                   isLooping
                   shouldPlay
                   volume={0.5}


                    />

               </InViewPort>




          }


             <LinearGradient
               start={{x: 0, y: 0}} end={{x: 0, y: 1}}
               style = {{
                 position: 'absolute',
                 width: '100%',
                 bottom:0,
                 height: "30%"
               }}
               colors = {['transparent', '#000000']}>
             </LinearGradient>

           <View style={{position:'absolute', bottom:'3.5%', width:'100%', flexDirection:'row', }}>
             {this.renderPostInfo(post, groupLike, comment, created_at)}
           </View>



        </View>

        {
          caption.length === 0 ?

          <View>
          </View>

          :

            <View style={styles.testWhere4}>
                    <View style={{ width:'95.5%', flexWrap:'wrap', flexDirection:'row',}}>
                      <Text>
                        <Text style = {{
                              fontSize:15, fontFamily:'Nunito-Bold', color:'black' }}>{username+" "}</Text>
                        <Text style={styles.captionText}>{caption}</Text>
                      </Text>
                    </View>

            </View>


        }



      </View>

    )
  }
}

const styles = StyleSheet.create({
  inviteButton: {
    // padding:15,
    width:80,
    borderRadius: 20,
    height:32.5,
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
    height:32.5,
    elevation:5,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#bfbfbf',
    flexDirection:'row'
  },
  totalHolderContainer: {
    position: 'relative',
    marginBottom:30,
    // backgroundColor:'#fafafa',
    // height: 600,
    // borderTopWidth:1, borderColor:'#F0F0F0'
    // flexDirection: 'row'
  },
  topContainer:{

    height: 60,
    // backgroundColor:'red',
    flexDirection:  'row'
  },
  bottomContainer: {
    alignSelf: 'center',
    width: '92.5%',
    height:500,
    // height: '100%',
    borderRadius: 20,
    backgroundColor: 'gainsboro',
    marginBottom:5,
    overflow: 'hidden'
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
    fontSize:14,
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
    position:'relative',

    zIndex:1,
    flexDirection:'row',
    padding:5,
    marginLeft:'7.5%',
    width:'100%',
    alignSelf:'center'
  },

  captionText:{
    fontFamily:'Nunito-SemiBold',
    color:'black'
  },
  tagCSS4: {
    position:'absolute',
    // backgroundColor: 'rgba(0,0,0,.6)',
    padding:15,
    borderRadius:25,
    color:'white',
    bottom:'45%',
    justifyContent: 'center',
    fontSize:13,
    right:7.5,
    zIndex:1,
    flex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },


})

export default NewGlobePost;
