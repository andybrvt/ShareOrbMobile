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
import { Avatar, BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import BackgroundContainer from '../RandomComponents/BackgroundContainer';





 class Comments extends React.Component{

   renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );


   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }
   // renderItem = {this.renderItem}
   // ItemSeparatorComponent = { this.FlatListItemSeparator }


   render(){


     return (
         <View style = {{
             backgroundColor: 'red',
             height: 200
           }}>
           <Text style = {{color: "white"}}> Some text </Text>
         </View>

     )
   }
 }
 const mapStateToProps = state => {
   return {
     userId: state.auth.id,
     currentUser: state.auth.username,
     profilepic: state.auth.profilePic,
   }
 }

 const styles = StyleSheet.create({
   header: {
   backgroundColor: '#FFFFFF',
   shadowColor: '#333333',
   shadowOffset: {width: -1, height: -3},
   shadowRadius: 2,
   shadowOpacity: 0.4,
   // elevation: 5,
   paddingTop: 20,
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
 },
 panelHeader: {
   alignItems: 'center',
 },
 panelHandle: {
   width: 40,
   height: 8,
   borderRadius: 4,
   backgroundColor: '#00000040',
   marginBottom: 10,
 },
   container: {

   paddingLeft: 15,
   paddingRight: 16,
   paddingVertical: 14,
   flexDirection: 'row',
   alignItems: 'flex-start',
   // backgroundColor:'red',
 },
 captionBody: {
   fontSize:20,
 },
 commentBody: {
   fontSize:12,
 },
 content: {
   marginLeft: 16,
   flex: 1,
 },
 contentHeader: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   // backgroundColor:'red',
 },
 separator: {
   height: 1,
   backgroundColor: "#CCCCCC"
 },
 image:{


   marginLeft:1
 },
 time:{
   fontSize:11,
   color:"#808080",
 },
 name:{
   fontSize:16,
   fontWeight:"bold",
 },
 })



 export default connect(mapStateToProps)(Comments);
