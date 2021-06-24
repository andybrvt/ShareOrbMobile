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
import { LogOut} from "react-native-feather";

 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

 class Settings extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){

     return (
       <BackgroundContainer>
         <View >

           <View style={{flexDirection:'row'}}>
            <LogOut stroke="gray" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
              <Text> Log Out</Text>
          </View>

         </View>
       </BackgroundContainer>

     )
   }
 }

 export default Settings;
