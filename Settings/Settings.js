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
  Switch
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { LogOut, Lock, User, Bell} from "react-native-feather";
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';

 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import * as authActions from '../store/actions/auth';
 class Settings extends React.Component{

   constructor(props){
     super(props)

     this.state = {
       showNotifications: this.getNotification.length !== 0
     }
   }


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

   cancelNotifications = async() => {
     await Notifications.cancelAllScheduledNotificationsAsync()
   }

   turnOnNotification = async() => {
      await Notifications.scheduleNotificationAsync({
       content: {
         title: "Come back",
         body: 'What did you do today to meet your goals?',
         data: {
           type: "active"
         }
       },
       trigger: {
         hour: 10,
         minute: 0,
         repeats: true
       },
     });
   }

   getNotification = async() => {

     const notifications = await Notifications.getAllScheduledNotificationsAsync();
     console.log(notifications)
   }

   toggleChange = () => {
     if(this.state.showNotifications === true){
       // if false you wanna turn it on then
       this.cancelNotifications()
     } else {
       this.turnOnNotification()
     }
     this.setState({
       showNotifications: !this.state.showNotifications
     })
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

            <View
              style = {{
                flexDirection: 'row'
              }}
              underlayColor="#f0f0f0" onPress={() => this.cancelNotifications()}>
                <View style={{
                    flex: 4,
                    flexDirection:'row',
                    padding:20}}>
                  <Bell stroke="black" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
                  <Text style={styles.settingWord}>Show Notifications</Text>


                 </View>

                <View style = {{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',

                  }}>
                  <Switch
                    trackColor={{ false: "gray", true: "#1890ff" }}
                    thumbColor={this.state.showNotifications ? "white" : "white"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.toggleChange}
                    value={this.state.showNotifications}
                     />

                </View>

            </View>

            {/*

              <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.getNotification()}>
                   <View style={{flexDirection:'row', padding:20}}>
                      <Bell stroke="black" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
                      <Text style={styles.settingWord}>Get Notifications</Text>
                  </View>
                </TouchableHighlight>

              */}


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
