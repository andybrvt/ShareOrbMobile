import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Animated
 } from 'react-native';

 class GradientTest extends React.Component{

   animatedValue = new Animated.Value(0);

   componentDidMount(){
     Animated.timing(this.animatedValue, {
       toValue: 150,
       duration: 3500
     }).start()
   }

   render(){

     const interpolateColor = this.animatedValue.interpolate({
       inputRange: [0, 150],
       outputRange: ['rgb(0,0,0)', 'rgb(251,251,251)']
     })

     const animatedStyle = {
       backgroundColor: interpolateColor
     }
     return(
       <View>
         <Animated.View
           style = {[styles.box,animatedStyle]}
           >
         </Animated.View>

       </View>

     )
   }
 }

 export default GradientTest;


const styles = StyleSheet.create({
  box: {
    top: 100,
    left: 100,
    height: 100,
    width: 100,
    backgroundColor: 'pink'
  }
})
