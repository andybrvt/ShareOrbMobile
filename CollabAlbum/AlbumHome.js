import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { PlusCircle} from "react-native-feather";

 class AlbumHome extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){

     return (
       <BackgroundContainer>
         <View style={{alignItems:'flex-end'}}>
          <View style={{flexDirection:'row', padding:25}}>

             <PlusCircle

               onPress = {() => this.ViewChats()}
               stroke="black" strokeWidth={2.5} width={35} height={35}/>
            </View>
         </View>
         <Text> Person Profile</Text>
         <View style={{alignItems:'center'}}>
         {/*
         <Image
           style = {{
             height:"50%",
             width:'90%',
             borderRadius: 5,
           }}
          source={{ uri: `https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80` }}
          />
          */}
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default AlbumHome;
