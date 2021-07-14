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


 class AlbumHome extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){

     return (
       <BackgroundContainer>
         <View >
           <Text> Person Profile</Text>
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default AlbumHome;
