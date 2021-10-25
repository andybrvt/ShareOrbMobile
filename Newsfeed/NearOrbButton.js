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
import Random from './randomPhoto.svg';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
import { Avatar } from 'react-native-elements';
import { Triangle } from "react-native-feather";


class NearOrbButton extends React.Component{

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
          height: '20%',
          shadowColor:'black',
          shadowOffset:{width:0,height:2},
          shadowOpacity:0.2,
          alignSelf: 'center'
        }}
        >


          <View style = {{
              // flex: 1,
              pointerEvents:"none",

              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <LottieView
             style={{
               width: 170,
               height: 170,
               position: 'absolute'
             }}
             autoPlay
             loop
             // ref={animation => {
             //    this.animation = animation;
             //  }}
             source={require('./data6.json')}
             progress={this.state.progress}
           />




         <View style = {{
           position: 'absolute',
           height: 95,
           width: 95,
           borderRadius: 55,
           alignSelf: 'center',
           backgroundColor: 'white'
           }}>

         </View>

         <View style = {{
           position: 'absolute',
           height: 90,
           width: 90,
           borderRadius: 50,
           alignSelf: 'center',
           overflow: 'hidden'
           }}>
           <TouchableOpacity
             onPress = {() => console.log('prss here')}
             >
             <Image
               style = {{
                 height: '100%'
               }}

               source = {{uri: 'https://cdn.5280.com/2020/12/Courtesy-Downtown-Fingers.jpg'}}
                />
           </TouchableOpacity>

         </View>

          </View>

          <Triangle
            height = {15}
            width = {15}
             style = {{
              position: 'absolute',
              bottom: 0,
            }}
            fill = 'black'
            stroke = "black"
             />



      </Animated.View>

    )
  }
}

export default NearOrbButton;
