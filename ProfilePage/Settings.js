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
import { connect } from 'react-redux';
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
            <LogOut stroke="#ff4d4f" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
              <Text style={{color:'#ff4d4f'}}> Log Out</Text>
          </View>
          <View>
            <Text>hi</Text>
          </View>
          <View style={{flexDirection:'row'}}>
           <LogOut stroke="gray" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
             <Text> Log Out</Text>
         </View>
         <View style={{flexDirection:'row'}}>
          <LogOut stroke="gray" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
            <Text> Log Out</Text>
        </View>
        <View style={{flexDirection:'row'}}>
         <LogOut stroke="gray" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
           <Text> Log Out</Text>
       </View>

         </View>
       </BackgroundContainer>

     )
   }
 }

 const mapStateToProps = state => {
   return {
     isAuthenticated: state.auth.token !== null,
     token: state.auth.token,
     username: state.auth.username,
     id: state.auth.id,
     profilePic: state.auth.profilePic,

     curLoad: state.auth.curLoad,
     totalLoad: state.auth.totalLoad,
     showNewsfeedComments: state.socialNewsfeed.showNewsfeedComments

   }
 }

 const mapDispatchToProps = dispatch => {
   return {
     logout: () => dispatch(authActions.logout()),
     authZeroCurLoad: () => dispatch(authActions.authZeroCurLoad()),
     authZeroTotalLoad: () => dispatch(authActions.authZeroTotalLoad()),
     newsFeedCommentSec: () => dispatch(socialNewsfeedActions.newsFeedCommentSec())
   }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Settings);
