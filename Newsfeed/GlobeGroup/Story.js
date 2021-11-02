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
import { ArrowLeft } from "react-native-feather";
import { Avatar } from 'react-native-elements';




const { height } = Dimensions.get("window");
const AnimatedVideo = Animated.createAnimatedComponent(Video);

const Story = ({ route, navigation }: StoryProps) => {
  const story=route.params
  const firstName=story.firstName
  const lastName=story.lastName
  const profilePic=story.profilePic
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
        <Animated.View style={{position:'absolute', padding:20, color:'white', zIndex:99}}>
            <Animated.View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar
                onPress = {() => this.ViewProfile(userUsername)}
                size={30}

                rounded
                source = {{
                  uri:profilePic,
                }}
              />
            <Animated.Text style={styles.videoFooterUserName}>{firstName+" "+lastName}</Animated.Text>
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
               source={{uri:story.video}}
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
videoFooterUserName: {
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
})
export default Story;
