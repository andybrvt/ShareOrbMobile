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
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import ModalBackgroundContainer from '../RandomComponents/ModalBackgroundContainer';
import { connect } from 'react-redux'
import { Avatar, Divider } from 'react-native-paper';
import  authAxios from '../util';
import * as dateFns from 'date-fns';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import FlashMessage from '../RandomComponents/FlashMessage';
import FinalPostingPage from './FinalPostingPage';
import * as authActions from '../store/actions/auth';
import AdjModal from '../RandomComponents/AdjModal';
import * as ImagePicker from 'expo-image-picker';
import Animated, {Easing} from 'react-native-reanimated';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { ArrowUpCircle, Plus, Mail, UserPlus, X, XCircle, PlusCircle } from "react-native-feather";
import { SCREEN_HEIGHT, SCREEN_WIDTH} from "../Constants";
import {loop, withTimingTransition, timing, mix} from 'react-native-redash/lib/module/v1';


const width = Dimensions.get("window").width
const height = Dimensions.get('window').height
const margin = 0;
const col = 3;
const size = width/col + margin;

const { cond, sub,divide, eq, add, call, set, Value, event, or, Clock, useCode } = Animated;

const isHidden = true;


// class Test extends React.Component{
//
//   state = {
//     expanded: false
//   }
//
//   animation = new Value(this.state.expanded ? 1 : 0)
//   clock = new Clock()
//
//   componentDidMount(){
//     this.animation.setValue(
//       timing(this.clock,this.animation,{
//         toValue: this.state.expanded ? 0 : 1,
//         duration: 4000,
//         easing: Easing.inOut(Easing.ease)
//       }))
//   }
//
//   scale = mix(this.animation, 0.4, 1);
//   rotate = mix(this.animation, 0, 2*3.15 *5)
//
//   render(){
//     return(
//       <TouchableWithoutFeedback onPress = {() => expand(!expanded)}>
//         <Animated.View style = {{
//             height: 100,
//             width: 100,
//             backgroundColor: "black",
//             transform: [
//               {scale: this.scale}
//             ]
//           }}>
//
//
//         </Animated.View>
//
//       </TouchableWithoutFeedback>
//     )
//   }
// }
//
// export default Test;

export default function Test(){

  const [expanded, expand] = useState(false);

  const animation = new Value(expanded ? 1 : 0);
  const clock = new Clock()

  // useCode(set(animation, timing(clock,animation,{
  //         toValue: expanded ? 0 : 1,
  //         duration: 4000,
  //         easing: Easing.inOut(Easing.ease)
  //       })),[animation])

  useCode(set(animation, new Value(0)),[animation])


  const scale = mix(animation, 0, 1);
  const rotate = mix(animation, 0, 2 * Math.PI* 5);



  return (
    <TouchableWithoutFeedback onPress = {() => expand(!expanded)}>
           <Animated.View style = {{
               height: 100,
               width: 100,
               backgroundColor: "black",
             }}>


           </Animated.View>

         </TouchableWithoutFeedback>

  )



}
