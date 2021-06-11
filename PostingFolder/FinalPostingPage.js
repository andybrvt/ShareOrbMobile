import React from 'react';
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
Keyboard,
TouchableWithoutFeedback
} from 'react-native';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronsUp } from "react-native-feather";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH} from "../Constants";
import FadingUpArrow from './FadingUpArrow';

 class FinalPostingPage extends React.Component{


   /*
   return back to posting page
   */
   onBack = () => {
     this.props.onCancel()
   }

   render(){

     return (
       <Animated.View
         style = {{
           position: "absolute",
           backgroundColor: "white",
           ...StyleSheet.absoluteFill,
           transform: [
             {translateY: this.props.slide}
           ]
         }}

         >

           <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>




             <View style = {{
                 flex: 1
               }}>



               <View
                 style = {styles.textContainer}
                 >
                 <TextInput
                   style = {{
                     width: "100%",
                     fontSize: 30
                   }}
                  placeholder="Write something about your day..."
                  placeholderTextColor="lightgray"
                  multiline = {true}
                  value = {this.props.caption}
                  onChangeText = {this.props.onChange}
                />
               </View>

             </View>

           </TouchableWithoutFeedback>



           <FadingUpArrow />


       </Animated.View>


     )

   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  topContainer: {
    flex: 3,
    backgroundColor: 'green'
  },
  textContainer: {
    flex: 3,
    // backgroundColor: 'pink',
    padding:20
  }


})

 export default FinalPostingPage;
