import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
    TouchableOpacity,
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
 import { Avatar, BottomNavigation } from 'react-native-paper';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 import BackgroundContainer from '../RandomComponents/BackgroundContainer';

 import { ArrowUpCircle, Plus, Mail, UserPlus, Send, Image} from "react-native-feather";
 class EditProfile extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }


   render(){

     return (
       <BackgroundContainer>
         <View style={{height:'92%'}}>
           <Text> test</Text>
           {/*
           <Avatar.Image
             source = {{
               uri: this.props.route.params.chatPersonProfilePic
             }}
             size = {50}
              />
          */}

         </View>


      </BackgroundContainer>

     )
   }
 }

 const styles = StyleSheet.create({
   writeMessageContainer:{


      padding:10,
      // backgroundColor:'red',
      flexDirection:'row',
      alignItems: 'center',
      borderTopWidth:1,
      borderColor:'#d9d9d9',
      justifyContent: 'center',
   },
   whiteMessage: {

     width:'82.5%',
     padding:2,
     paddingLeft:10,
     backgroundColor: '#f0f0f0',
     borderRadius:10,
     left:10,
     right:20,
   },

 })

 export default EditProfile;
