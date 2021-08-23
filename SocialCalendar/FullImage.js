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


 class FullImage extends React.Component{



   render(){

     return (
       <BackgroundContainer>
         <View >
           <Text> Person Profilef</Text>
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default FullImage;
