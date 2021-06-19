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


             <View style={{top:10,}}>


               <View><Text>Caption</Text></View>
               <View
                 style={styles.addBorder}
                 >
                 <TextInput
                   style = {{
                     width: "100%",
                     fontSize: 18
                   }}
                  placeholder="Write something about your day..."
                  placeholderTextColor="lightgray"
                  multiline = {true}
                  numberOfLines = {2}
                  value = {this.props.caption}
                  onChangeText = {this.props.onChange}
                />
               </View>
               <View><Text>Tags</Text></View>
               <View><Text>Location</Text></View>
               <View><Text>Notify Friends</Text></View>

             </View>



           </TouchableWithoutFeedback>



           <FadingUpArrow />


       </Animated.View>


     )

   }
 }

const styles = StyleSheet.create({
  addBorder:{

    padding:20,
    borderTopWidth:1,
    borderTopColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',

  },
  container: {
    flex: 1,

  },
  topContainer: {
    flex: 3,
    backgroundColor: 'green'
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'pink',
    padding:20
  }


})

 export default FinalPostingPage;
