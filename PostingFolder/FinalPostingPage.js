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
 import { ChevronLeft } from "react-native-feather";
 import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
 import { Transition } from 'react-native-reanimated';


 class FinalPostingPage extends React.Component{

   componentDidMount(){
     this.props.navigation.setOptions({
       title: "Some stuff"
     })
   }

   /*
   return back to posting page
   */
   onBack = () => {
     this.props.onCancel()
   }

   render(){

     return (
       <View>
         <Modal
           animationType = "slide"
           visible = {this.props.visible}
           >


           <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>

             <SafeAreaView
               style = {styles.container}
               >
               <TouchableOpacity
                 onPress = {() => this.onBack()}
                 style = {{
                   width: "10%",
                 }}
                 >
                 <ChevronLeft height ={38} width = {38}/>

               </TouchableOpacity>


               <View
                 style = {styles.bottomContainer}
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

              <Button
                title = "click to go to newsfeed"
                onPress = {() => this.props.navigation.navigate("newsfeed")}
                 />

             </SafeAreaView>
           </TouchableWithoutFeedback>


         </Modal>

       </View>


     )

   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 3,
    backgroundColor: 'green'
  },
  bottomContainer: {
    flex: 1,
    // backgroundColor: 'pink',
    padding:20
  }


})

 export default FinalPostingPage;
