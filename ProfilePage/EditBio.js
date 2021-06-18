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
     console.log(this.props)

     return (
       <BackgroundContainer>
         <View style={styles.addBorder}>
         <TextInput
         style={{fontSize:15}}
            multiline = {true}
            numberOfLines = {2}
            maxLength = {80}
            placeholder='Enter Bio..'
            value={this.state.value}
            onChangeText={(value) => this.setState({value})}

            >


            {
                (this.props.route.params.bio)?
                <Text>
                  {this.props.route.params.bio}
                </Text>
                :
                ''
            }

          </TextInput>
          <View style={styles.characterCount}>

         <Text style={{color:"#666666",}}>
            {this.state.value.length}/80
         </Text>
         </View>
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default EditBio;


 const styles = StyleSheet.create({
   characterCount:{
     flexDirection: "row",
     justifyContent: "flex-end",
     padding:10,

   },
   textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,


  },

  addBorder:{
    padding:10,
    borderTopWidth:1,
    borderTopColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  }

 })
