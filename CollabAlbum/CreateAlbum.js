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
import { FlatList } from "react-native-bidirectional-infinite-scroll";

class CreateAlbum extends React.Component{
   render(){
     return (
       <BackgroundContainer>
         <View>
            <Text> Title</Text>
         </View>
         <View>
            <Text> Invite Friends</Text>
         </View>
         <View>
            <Text>Cover Pic</Text>
         </View>
       </BackgroundContainer>

     )
   }
 }
 const styles = StyleSheet.create({
   trendingText: {
     color: "black",
     fontSize: 18,
     fontWeight: 'bold',
     padding:10
   },
   trendingDaysContainer: {
     height: "82%",
   },
 })

 export default CreateAlbum;
