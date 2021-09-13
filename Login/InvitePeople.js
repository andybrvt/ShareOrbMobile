import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
  Alert
 } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as dateFns from 'date-fns';
import { ArrowRightCircle, Plus, Mail, UserPlus } from "react-native-feather";
import { Avatar } from 'react-native-elements';

class InvitePeople extends React.Component{
   shareMessage = () => {
     //Here is the Share API
     Share.share({
       // message: inputValue.toString(),
       message:"Join ShareOrb with my code: N24FJFE"
     })
       //after successful share return result
       .then((result) => console.log(result))
       //If any thing goes wrong it comes here
       .catch((errorMsg) => console.log(errorMsg));
   };

   createTwoButtonAlert = () =>
     Alert.alert(
       "Are you sure?",
       "ShareOrb is more fun with friends",
       [
         {
           text: "Cancel",
           onPress: () => console.log("Cancel Pressed"),
           style: "cancel"
         },
         { text: "Skip", style:'destructive', onPress: () => console.log("OK Pressed") }
       ]
     );


   render(){
     return(
       <View>

            <View style = {{top:'2.5%'
                }}>
                <View style = {{
                    top: '2.5%',
                    right:'2.5%',
                    position:'absolute',
                  }}>
                  <TouchableOpacity onPress={this.createTwoButtonAlert}>
                    <Text style = {styles.skipText}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                </View>
              <View style = {{
                  top: '2.5%'
                }}>
                <View style={{padding:30}}>
                  <Text style = {styles.welcomeText}>
                    Invite Friends
                  </Text>
                  <View style={{textAlign:'center', top:20}}>

                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Avatar
                    size={150}
                    rounded
                    source={{
                      uri:
                        `${global.IMAGE_ENDPOINT}`+this.props.profile_picture,
                    }}
                  />
                  <View style={{alignItems: 'center'}}>
                    <Text style = {styles.welcomeText}>
                      {this.props.firstName} {this.props.lastName}
                    </Text>
                  </View>
                  <Text style = {styles.welcomeText}>
                    Your Code:&nbsp;
                    <Text  style={{fontSize:35, color:'white', fontFamily:'Nunito-Bold'}}>
                      N693FD
                    </Text>
                  </Text>
                  <Text style = {styles.welcomeText}>
                    5 invites left
                  </Text>
                  <View style={{alignItems: 'center', top:'50%'}}>
                    <TouchableOpacity
                      style={styles.loginBtn}
                      onPress={this.shareMessage}>
                      <Text style = {styles.loginText}>
                        Share Invites
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
         <TouchableOpacity
           onPress = {() => this.props.openModal(this.props.openNum)}
           >
           <ArrowRightCircle
             stroke = "white"
             />
         </TouchableOpacity>
       </View>

     )
   }
 }

 const styles = StyleSheet.create({
   welcomeText: {
   padding:5,
     color: "white",
     fontSize: 27.5,
     top: '7%',
     textAlign: 'center',
     fontFamily:'Nunito-SemiBold',
   },
   skipText: {
     // position:'absolute',
     padding:10,
     color: "white",
     fontFamily:'Nunito-Bold',
     fontSize: 15,
   },
   loginBtn: {
     position: "absolute",
     width: "80%",
     borderRadius: 25,
     height: 50,
     alignItems: "center",
     justifyContent: "center",
     top: '90%',
     zIndex: 9999,
     backgroundColor: "white",
   },
   loginText: {
     color: '#1890ff',
     fontSize: 18,
     fontFamily:'Nunito-Bold',
   },
 })

 export default InvitePeople;
