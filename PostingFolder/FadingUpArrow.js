import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback
 } from 'react-native';
 import Animated, {Easing} from 'react-native-reanimated';
 import { ChevronsUp } from "react-native-feather";
 import {loop, withTimingTransition, timing, mix} from 'react-native-redash/lib/module/v1';
 import { useMemoOne } from "use-memo-one";


 const { cond, sub,divide, eq, add, call, set, Value, event, or, Clock, useCode, block, and, not, clockRunning,
   startClock,
   stopClock } = Animated;

 export default function FadingUpArrow(){

   const [play, setPlay] = useState(false);

   // use memoone is to memoization of the function
   const { isPlaying, animation, clock } = useMemoOne(
     () => ({
       isPlaying: new Value(0),
       animation: new Value(0),
       clock: new Clock()
     }),
     []
   )

   useCode(
     block([
       cond(and(not(clockRunning(clock)), isPlaying), startClock(clock)),
       cond(and(clockRunning(clock), not(isPlaying)), stopClock(clock)),
       set(
         animation,
         loop({
           clock,
           duration: 1000,
           easing: Easing.inOut(Easing.ease),
           boomerang: true,
           autoStart: true
         })
       )
     ]),
     []
   );

   const opacity = mix(animation, 0, 1.2);

   return (
     <TouchableOpacity
       onPress = {() => {
         setPlay(!play);
         isPlaying.setValue(play ? 0 : 1);
       }}
       >
       <Animated.View style = {{
           alignItems: "center",
           margin: 20,
           opacity: opacity
         }}>
         <ChevronsUp height = {50} width = {50} />
         <Text style = {{fontSize: 20}}> Swipe up to save</Text>

       </Animated.View>

     </TouchableOpacity>
        )
 }
