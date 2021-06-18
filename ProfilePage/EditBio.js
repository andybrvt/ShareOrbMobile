import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

 const Tab = createMaterialTopTabNavigator();
 class EditBio extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   constructor(props) {
   super(props);
   this.state = {
    value:''
    };
  }

   render(){

     return (
       <BackgroundContainer>
         <View >
         <TextInput
            multiline = {true}
            numberOfLines = {6}
            maxLength = {80}
            placeholder='Enter Bio..'
            value={this.state.value}
            onChangeText={(value) => this.setState({value})}

            />


         <Text>
            {this.state.value.length}/80
         </Text>
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default EditBio;


 const styles = StyleSheet.create({

   textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,
    fontSize:16

  },

 })
