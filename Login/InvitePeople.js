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
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus } from "react-native-feather";
import { Avatar } from 'react-native-elements';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class InvitePeople extends React.Component{
   shareMessage = (codeInvite) => {
     //Here is the Share API
     Share.share({
       // message: inputValue.toString(),
       message:"Join ShareOrb with my code: "+ codeInvite
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
         { text: "Skip",
           style:'destructive', onPress: () => this.props.openModal(this.props.openNum) }
       ]
     );


   render(){
     let codeInvite=this.props.codeInvite
     return(
       <View>

            <View style = {{top:'1%'
                }}>
                <View style = {{

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
                  top: '7.5%'
                }}>
                <View style={{padding:30}}>
                  <Text style = {styles.welcomeText}>
                    Invite Friends
                  </Text>
                  <Text style = {styles.welcomeText}>
                    Skip the Waitlist
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  {
                    this.props.profilePic !== "" ?

                    <Avatar
                      size={150}
                      rounded
                      source={{
                        uri: this.props.profilePic
                      }}
                    />

                  : null

                  }

                  <View style={{alignItems: 'center'}}>
                    <Text style = {styles.welcomeText}>
                      {this.props.firstName} {this.props.lastName}
                    </Text>
                  </View>
                  <View style={{top:'17.5%'}}>
                    <Text style = {styles.welcomeText}>
                      Your Code:&nbsp;
                      <Text  style={{fontSize:32.5, color:'white', fontFamily:'Nunito-Bold'}}>
                        {this.props.codeInvite}
                      </Text>
                    </Text>

                    <Text style = {styles.welcomeText}>
                      You have only 5 invites
                    </Text>
                  </View>
                </View>
              </View>
            </View>

              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() =>this.shareMessage(codeInvite)}>
                <Text style = {styles.loginText}>
                  Share Invites
                </Text>
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


     width: "75%",
     borderRadius: 25,
     height: 50,
     marginLeft:'15%',
     marginTop:'40%',
     alignItems: "center",
     justifyContent: "center",
     zIndex: 9999,
     backgroundColor: "white",
   },
   loginText: {
     color: '#1890ff',
     fontSize: 20,
     fontFamily:'Nunito-Bold',
   },
   bottomContainer: {
     height: '25%',
     width: width,
     flexDirection:'row'
   },
   bottomLContainer: {
     alignItems: 'flex-start',
     justifyContent: 'center',
     paddingLeft: 30
   },
   bottomRContainer: {

     alignItems: 'flex-end',
     justifyContent: 'center',
     paddingRight: 30
   }
 })

 export default InvitePeople;
