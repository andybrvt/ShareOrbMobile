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
 import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

 const Tab = createMaterialTopTabNavigator();
 class ViewProfile extends React.Component{

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

 export default ViewProfile;
