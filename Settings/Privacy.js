import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

 const Tab = createMaterialTopTabNavigator();
 class Privacy extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       isEnabled:false,

     }
   }

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   toggleSwitch = () => {

     this.setState({
       isEnabled:!this.state.isEnabled,
     })

   }

   render(){

     return (
       <BackgroundContainer>
         <View >
           <Text style={{fontSize:16}}> Toggle your profile to be public or private</Text>
           <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={this.toggleSwitch}
        value={this.state.isEnabled}
      />
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default Privacy;
