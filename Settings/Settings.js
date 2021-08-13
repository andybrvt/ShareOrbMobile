import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { LogOut, Lock, User} from "react-native-feather";
import { connect } from 'react-redux';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import * as authActions from '../store/actions/auth';
 class Settings extends React.Component{



   navigateUserInfo = () => {
     this.props.navigation.navigate("UserInfo")
   }

   navigatePrivacy = () => {
     this.props.navigation.navigate("Privacy")
   }

   handleLogOut = () => {
     this.props.logout()
     // this.props.navigation.navigate("Login")
   }

   render(){

     return (
       <BackgroundContainer>
         <View >
          <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.navigateUserInfo()}>
             <View style={{flexDirection:'row', padding:20}}>
                <User stroke="black" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
                <Text style={styles.settingWord}> User Information</Text>
            </View>
          </TouchableHighlight>
          {/* Add in later
          <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.navigatePrivacy()}>
            <View style={{flexDirection:'row', padding:20}}>
             <Lock stroke="black" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
               <Text style={styles.settingWord}> Privacy</Text>
           </View>
          </TouchableHighlight>
          */}
        <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.handleLogOut()}>
          <View style={{flexDirection:'row', padding:20}}>
           <LogOut stroke="black" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
             <Text style={styles.settingWord}> Log Out</Text>
         </View>
       </TouchableHighlight>


         </View>
       </BackgroundContainer>

     )
   }
 }

 const styles = StyleSheet.create({
   settingWord: {
     left:5,
     color:'black',
     fontSize:16,
   },
 });



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
