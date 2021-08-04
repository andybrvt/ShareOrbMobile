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


 class DisplayLikeList extends React.Component{



   render(){
     console.log("new page")
     let likeList=this.props.route.params.likePeople
     console.log(likeList)
     return (
       <BackgroundContainer>
         <View >
           <Text> Like List</Text>
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default DisplayLikeList;
