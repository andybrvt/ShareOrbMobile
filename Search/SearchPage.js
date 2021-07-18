import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
 } from 'react-native';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 import { Avatar } from 'react-native-elements';
 import { FlatList } from "react-native-bidirectional-infinite-scroll";
 import { MoreVertical} from "react-native-feather";


 class SearchPage extends React.Component{


   render(){

     return(
       <View>
         <Text> This is the search page </Text>
       </View>
     )
   }
 }

 export default SearchPage;
