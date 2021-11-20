import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Image,
  TouchableOpacity
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
import { Avatar } from 'react-native-elements';
import { Triangle } from "react-native-feather";


class RecordingAnimationBtn extends React.Component{

  constructor(props) {
     super(props);
     this.state = {
       progress: new Animated.Value(0),
     };
   }




  render(){


    return(
      <Animated.View

        style = {{
          zIndex: 9999,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '10%',
          height: '100%',
          shadowColor:'black',
          shadowOffset:{width:0,height:2},
          shadowOpacity:0.2,
          alignSelf: 'center',

        }}
        >


          <View style = {{
              // flex: 1,
              pointerEvents:"none",
              backgroundColor:'red',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <LottieView
             style={{
               width: 170,
               height: 170,
               borderRadius:100,
               position: 'absolute'
             }}
             autoPlay
             loop
             // ref={animation => {
             //    this.animation = animation;
             //  }}
             source={require('./data2.json')}
             progress={this.state.progress}
           />








          </View>





      </Animated.View>

    )
  }
}

export default RecordingAnimationBtn;
