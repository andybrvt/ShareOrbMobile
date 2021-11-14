import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useVector, snapPoint } from "react-native-redash";
import { SharedElement } from "react-navigation-shared-element";
import { Video } from "expo-av";
import { ArrowLeft, Heart, MessageCircle, Flag  } from "react-native-feather";
import { Avatar } from 'react-native-elements';
import * as dateFns from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import WebSocketGlobeInstance from '../../Websockets/globeGroupWebsocket';
import FlagModal from './FlagModal';
import authAxios from '../../util';
import NotificationWebSocketInstance from  '../../Websockets/notificationWebsocket';
import { connect } from 'react-redux';



const { height } = Dimensions.get("window");
const AnimatedVideo = Animated.createAnimatedComponent(Video);





const ViewProfile = (navigation, username, creator) => {
  // usename will be the person clicking on it
  // the creator will be the creator of the post

  console.log(username, creator)

  if(username === creator){
    navigation.navigate("Profile");
  } else {
    navigation.navigate("ProfilePage", {
      username: creator
    })
  }
}

const ViewGroup = (navigation, creator, orbId, groupName, groupPic) => {
  // creator has to be the id

  navigation.navigate("groupOrb",{
    creator: creator,
    orbId: orbId,
    groupName: groupName,
    groupPic:groupPic
  })
}

const Story = ({ route, navigation,id, username }: StoryProps) => {

  const[showFlag, setFlag] = useState(false);



  const story=route.params.story

  const[likes, setLikes] = useState([])
  const[post, setPost] = useState({})
  const[comments, setComments] = useState([])

  let caption=""
  let creatorId = ""
  let creatorUsername = ""
  let creatorPic = ""
  let notificationToken=""

  let groupId=""
  let groupName=""
  let groupPic=""
  // `${global.IMAGE_ENDPOINT}`+route.params.groupPic
  let month= ""
  let day= ""

  if(post.smallGroup){
    groupPic = `${global.IMAGE_ENDPOINT}`+post.smallGroup.groupPic
    groupName = post.smallGroup.group_name
    groupId = post.smallGroup.id
  }
  if(post.creator){
    creatorId = post.creator.id
    if(post.creator.isOtherAccount){
      creatorUsername = post.creator.secondUsername
    } else {
      creatorUsername = post.creator.username
      
    }
    creatorPic = `${global.IMAGE_ENDPOINT}`+post.creator.profile_picture
    notificationToken = post.creator.notificationToken
  }
  if(post.caption){
    caption = post.caption
  }
  if(post.created_at){
    month = dateFns.format(new Date(post.created_at), "MMMM").substring(0,3)
    day = dateFns.format(new Date(post.created_at), "dd")
  }


  const isGestureActive = useSharedValue(false);
  const translation = useVector();


  useEffect(() => {

    navigation.addListener('focus', () =>{
      const postId = route.params.postId;
      authAxios.get(`${global.IP_CHANGE}`+'/mySocialCal/getSinglePost/'+postId)
      .then(res => {
        setPost(res.data)
        setLikes(res.data.people_like)
        setComments(res.data.get_socialCalItemComment)
      })

    })



  }, [])

  const onReport = () => {
    console.log('report this:', post.id)

    authAxios.post(`${global.IP_CHANGE}`+'/mySocialCal/flagPost/'+storyID)

    setFlag(false)
    alert("Post has been reported for further review")
  }

  const onLike = ( likerId, postId, notificationToken, creatorId) => {
    // console.log(likerId, groupID)

    // problly just gonna add a function here and change the linking in the hooks

    authAxios.post(`${global.IP_CHANGE}`+'/mySocialCal/socialCalItemLike/'+postId+"/"+likerId)
    .then(res => {
      setLikes(res.data)


      if(creatorId !== likerId){
        const notificationObject = {
          command: 'group_like_notification',
          actor: likerId,
          recipient: creatorId,
          postId: postId
        }

        NotificationWebSocketInstance.sendNotification(notificationObject)


        global.SEND_GROUP_LIKE_NOTIFICATION(
          notificationToken,
          username,
          postId,
        )

      }


    })

  }

  const onUnlike = (unlikerId, postId, notificationToken) =>{

    authAxios.post(`${global.IP_CHANGE}`+'/mySocialCal/socialCalItemUnlike/'+postId+"/"+unlikerId)
    .then(res => {
      setLikes(res.data)

    })
    // WebSocketGlobeInstance.sendGroupUnlike(
    //   groupID,
    //   unlikerId
    // )
  }


  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({ translationX, translationY }) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({ translationY, velocityY }) => {
      const snapBack =
        snapPoint(translationY, velocityY, [0, height]) === height;

      if (snapBack) {

        runOnJS(navigation.goBack)();
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, height],
      [1, 0.99], // THIS IS HOW SENSITIVE IT IS TO CLOSE!!! VERTICALLY LIKE SNAP
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      transform: [
        { translateX: translation.x.value * scale },
        { translateY: translation.y.value * scale },
        { scale },
      ],
    };
  });

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 75 : 0),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 0, y: 1}}
          style = {{
            position: 'absolute',
            width: '100%',
            bottom:0,
            height: "40%",
            zIndex:99
          }}
          colors = {['transparent', '#000000']}>
        </LinearGradient>
        {/*

          <TouchableOpacity
            onPress = {() => ViewProfile(navigation, "admin")}>
          */}


        <TouchableOpacity
          // REDO HERE
          onPress = {() => ViewGroup(navigation, creatorId, groupId, groupName, post.smallGroup.groupPic)}
          style={{position:'absolute', padding:20, color:'white', zIndex:99, flexDirection:'row',}}>
            <Animated.View style={{flexDirection:'row', alignItems:'center'}}>

              <Avatar
                size={32}
                rounded
                source = {{
                  uri:groupPic,
                }}
              />
            </Animated.View>
            <Animated.View style={{}}>
              <Animated.Text style={styles.videoFooterGroupName}>{groupName}</Animated.Text>
              <Animated.Text style={styles.videoFooterDate}>{month+" "+day}</Animated.Text>
            </Animated.View>
        </TouchableOpacity>

        {/* bottom caption*/}
        {caption.length?
          <Animated.View style={{position:'absolute',
            bottom:'12.5%', left:'5%', zIndex:99, }}>
            <Animated.View style={{ width:'90%',
              flexWrap:'wrap',flexDirection:'row',
               alignItems:'center'
               }}>
               <TouchableOpacity
                 onPress = {() => ViewProfile(navigation,username, creatorUsername)}

                 >
                 <Avatar
                   size={25}
                   rounded
                   source = {{
                     uri:creatorPic,
                   }}
                 />
               </TouchableOpacity>

              <Animated.Text style={styles.videoFooterUserName}> {creatorUsername} </Animated.Text>
              <Animated.Text style={{marginTop:10}}>
                  <Animated.Text style={styles.videoFooterCaption}>{caption}</Animated.Text>
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        :
        <Animated.View style={{position:'absolute',
          bottom:'10%', left:'5%', zIndex:99, }}>
          <Animated.View style={{
            flexWrap:'wrap',flexDirection:'row',
             alignItems:'center'
             }}>

             <TouchableOpacity
               onPress = {() => ViewProfile(navigation,username, creatorUsername)}
               >
               <Avatar
                 size={25}
                 rounded
                 source = {{
                   uri:creatorPic,
                 }}
               />
             </TouchableOpacity>

             <Animated.Text style={styles.videoFooterUserName}> {creatorUsername} </Animated.Text>
             </Animated.View>
           </Animated.View>
        }

        <Animated.View
          style = {{
            position: 'absolute',
            top: '5%',
            right: '3%',
            zIndex: 99,
            shadowColor:'black',
            shadowOffset:{width:0,height:2},
            shadowOpacity:0.2,
          }}
          >
          <TouchableOpacity
            onPress = {() => setFlag(true)}
            >
            <Flag
              stroke = "white"
              fill="white"
              width ={27.5}
              height = {27.5}
              />
          </TouchableOpacity>

        </Animated.View>


        <Animated.View style={{position:'absolute', top:'60%',
          alignItems:'center',
          shadowColor:'black',
          shadowOffset:{width:0,height:2},
          shadowOpacity:0.2,
          right:15, color:'white', zIndex:99, }}>
          <Animated.View>

          <Animated.View style={{alignItems:'center'}}>

            {
              likes.includes(id) ?


              <TouchableOpacity
                style={{marginTop:10,}}
                onPress = {() => onUnlike(
                  id,
                  post.id,
                  notificationToken,
                )}
                >

                 <Heart
                   stroke = "red"
                   fill="red"
                   width ={27.5}
                   height = {27.5}
                 />
               </TouchableOpacity>


               :

               <TouchableOpacity
                 style={{marginTop:10,}}
                 onPress = {() => onLike(
                   id,
                   post.id,
                   notificationToken,
                   creatorId
                 )}
                 >

                  <Heart
                    stroke = "white"
                    fill="white"
                    width ={27.5}
                    height = {27.5}
                  />
                </TouchableOpacity>


            }

             <Animated.Text style={styles.videoFooterNum}>
               {likes.length}
             </Animated.Text>

           </Animated.View>
             <Animated.View style={{
               shadowColor:'black',
               shadowOffset:{width:0,height:2},
               shadowOpacity:0.2,
                  alignItems:'center'}}>
              <Animated.Text style={{marginTop:10}}>
                <MessageCircle
                  onPress={() => navigation.navigate("Comments",{
                    postId: post.id,
                    type: 'group'
                  })}
                  stroke = "white"
                  fill="white"
                  width ={27.5}
                  height = {27.5}
                />
              </Animated.Text>
              <Animated.Text style={styles.videoFooterNum}>
                {comments.length}
              </Animated.Text>
              {/*
              <Animated.Text style={styles.videoFooterNum}>
                3
              </Animated.Text>
              */}
              </Animated.View>
            </Animated.View>
        </Animated.View>
        <SharedElement style={{ flex: 1 }}>
          {!post.video && (
            <Animated.Image
               source={{uri:post.itemImage}}
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  resizeMode: "cover",
                },
                borderStyle,
              ]}
            />
          )}
          {post.video && (

            <AnimatedVideo
               source={{
                 uri:`${global.IMAGE_ENDPOINT}`+post.video
                 // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"

               }}
              rate={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={[StyleSheet.absoluteFill, borderStyle]}
            >


          </AnimatedVideo>

          )}
        </SharedElement>

        <FlagModal
          onCancel = {() => setFlag(false)}
          onAction = {() => onReport()}
          visible = {showFlag}
          width = {300}
          title = {"Report Post"}
          information = {"Report content because it contains inappropriate content. Inappropriate content includes, but not limited to: nudity, violence, or drug usage."}
          acceptText = {"Report"}
          cancelText = {"Cancel"}
          />
      </Animated.View>



    </PanGestureHandler>



  );
};

const styles = StyleSheet.create({
  videoFooterDate: {
    marginLeft:5,
    color:'white',
    fontSize:10,
    fontFamily:'Nunito',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },
  videoFooterCaption: {
    marginLeft:5,
    color:'white',
    fontSize:14,
    fontFamily:'Nunito',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },
  videoFooterGroupName: {
    marginLeft:5,
    color:'white',
    fontSize:14,
    fontFamily:'Nunito-SemiBold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },
  videoFooterUserName: {
    marginLeft:5,
    color:'white',
    fontSize:13,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },
  videoFooterNum: {
    marginTop:2.5,
    marginBottom:10,

    color:'white',
    fontSize:13,
    fontFamily:'Nunito-Bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,

    // fontWeight:'bold',
  },
})

const mapStateToProps = state => {
  return{
      username: state.auth.username,
      id: state.auth.id
  }
}



export default connect(mapStateToProps, null)(Story);
