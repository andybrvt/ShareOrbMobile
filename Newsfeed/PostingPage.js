import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

 class PostingPage extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){

     console.log(this.props)
     return (
       <BackgroundContainer>
         <View >
           <Button
             title = "Go back"
             onPress = {() => this.props.navigation.goBack()}
             />
           <Text> this will be the page where people be posting</Text>
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default PostingPage;
