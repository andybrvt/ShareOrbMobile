import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
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
import { ArrowLeft, Heart, MessageCircle  } from "react-native-feather";
import { Avatar } from 'react-native-elements';
import * as dateFns from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';


const { height } = Dimensions.get("window");
const AnimatedVideo = Animated.createAnimatedComponent(Video);


const Story = ({ route, navigation }: StoryProps) => {
  console.log("STartttt")
  const story=route.params.story
  console.log(route.params.story)
  const firstName=story.creator.first_name
  const lastName=story.creator.last_name
  const username=story.creator.username
  const caption=story.caption
  const groupPic=`${global.IMAGE_ENDPOINT}`+route.params.groupPic
  const groupName=route.params.groupName
  const profilePic=`${global.IMAGE_ENDPOINT}`+story.creator.profile_picture
  const month=dateFns.format(new Date(story.created_at), "MMMM").substring(0,3)
  const day=dateFns.format(new Date(story.created_at), "dd")
  const isGestureActive = useSharedValue(false);
  const translation = useVector();
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
        <Animated.View style={{position:'absolute', padding:20, color:'white', zIndex:99, flexDirection:'row',}}>
            <Animated.View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar
                size={32}
                rounded
                source = {{
                  uri:groupPic,
                }}
              />
            </Animated.View>
            <Animated.View style={{marginLeft:5}}>
              <Animated.Text style={styles.videoFooterGroupName}>{groupName}</Animated.Text>
              <Animated.Text style={styles.videoFooterDate}>{month+" "+day}</Animated.Text>
            </Animated.View>
        </Animated.View>
        <Animated.View style={{position:'absolute',
          bottom:'11%', left:'5%', zIndex:99, }}>
          <Animated.View style={{ width:'90%',
            // backgroundColor:'red',
            flexWrap:'wrap',flexDirection:'row', alignItems:'center'
             }}>

             {/* bottom caption*/}

             <Avatar
               size={25}
               rounded
               source = {{
                 uri:profilePic,
               }}
             />
           <Animated.Text style={styles.videoFooterUserName}> {username} </Animated.Text>

            <Animated.Text style={{marginTop:10}}>
                <Animated.Text style={styles.videoFooterCaption}>{caption}</Animated.Text>
            </Animated.Text>
          </Animated.View>
        </Animated.View>


        <Animated.View style={{position:'absolute', top:'60%',
          alignItems:'center',
          right:15, color:'white', zIndex:99, }}>
          <Animated.View>

          <Animated.View style={{alignItems:'center'}}>
           <Animated.Text style={{marginTop:10}}>
             <Heart
               stroke = "red"
               fill="red"
               width ={27.5}
               height = {27.5}
             />
           </Animated.Text>
           <Animated.Text style={styles.videoFooterNum}>
             23
           </Animated.Text>
           </Animated.View>
             <Animated.View style={{alignItems:'center'}}>
              <Animated.Text style={{marginTop:10}}>
                <MessageCircle
                  stroke = "white"
                  fill="white"
                  width ={27.5}
                  height = {27.5}
                />
              </Animated.Text>
              <Animated.Text style={styles.videoFooterNum}>
                3
              </Animated.Text>
              </Animated.View>
            </Animated.View>
        </Animated.View>
        <SharedElement style={{ flex: 1 }}>
          {!story.video && (
            <Animated.Image
               source={{uri:story.image}}
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
          {story.video && (

            <AnimatedVideo
               source={{uri:`${global.IMAGE_ENDPOINT}`+story.video}}
              // source={story.video}
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
export default Story;
