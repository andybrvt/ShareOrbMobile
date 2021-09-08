import { Animated } from 'react-native';
import Animation from 'lottie-react-native';
import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import Random from './randomPhoto.svg';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


 class FirstPost extends React.Component{

   opacity = new Animated.Value(1);

   constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }
   componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 3000,
    }).start();
    this.fadeAway();
  }


  fadeAway = () => {
    Animated.timing(this.opacity,{
      toValue: 0,
      duration:3200,
      useNativeDriver: true
    }).start();
  }

   render(){


     return (

       <Animated.View
         pointerEvents ="none"

         style = {{
           zIndex: 9999,
           alignItems: 'center',
           justifyContent: 'center',
           position: 'absolute',
           width: width,
           height: height,
           opacity: this.opacity
         }}
         >


           <View style = {{
               // flex: 1,
               pointerEvents:"none",

               alignItems: 'center',
               justifyContent: 'center'
             }}>
             <Animation
              style={{
                width: width,
                height: height,
                position: 'absolute'
              }}
              // loop={true}
              // autoPlay={true}
              source={require('./data3.json')}
              progress={this.state.progress}
            />


             <View style={{
               shadowColor:'black',
               shadowOffset:{width:0,height:2},
               shadowOpacity:0.2,
               padding: 20,
               height: height *0.25,
               width: width *0.5,
               borderRadius: 25,
               alignItems:'center', textAlign:'center',
               backgroundColor:'#1890ff'}}>
               <Text style = {{
                   fontSize: 20,
                   fontWeight: 'bold',
                   color: 'white'
                 }}>First Post of the Day!</Text>
               <Random
                 width = {100}
                 height = {100}
                 />



             </View>
           </View>



       </Animated.View>



     )
   }
 }

 export default FirstPost;
