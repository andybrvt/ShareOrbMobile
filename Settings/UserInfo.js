import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';

 const Tab = createMaterialTopTabNavigator();
 class UserInfo extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   render(){
     console.log("HEEHEHEHEHEHE")
     console.log(this.props)
     return (
       <BackgroundContainer>
         <View style={styles.action}>

           <View><Text style={styles.headerFont}>Phone Number</Text></View>

            <TextInput

             placeholderTextColor="#666666"
             autoCorrect={false}
             style={[
               styles.textInput,

             ]}
           >

           {this.props.phone_number}

         </TextInput>
         </View>
         <View style={styles.action}>

           <View><Text style={styles.headerFont}>Birth Date</Text></View>

            <TextInput

             placeholderTextColor="#666666"
             autoCorrect={false}
             style={[
               styles.textInput,

             ]}
           >

           {this.props.dob}

         </TextInput>
         </View>

       </BackgroundContainer>

     )
   }
 }

const mapStateToProps = state => {
  console.log(state.auth)
   return {
     dob: state.auth.dob,
     userId: state.auth.id,
     currentUser: state.auth.username,
     profilepic: state.auth.profilePic,
     phone_number: state.auth.phone_number
   }
 }

 const mapDispatchToProps = dispatch => {
  return {
    updateCredentials: (updatedUserObj) => dispatch(authActions.updateCredentials(updatedUserObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

const styles = StyleSheet.create({

 headerFont:{
   paddingLeft:10, fontSize:15, color:"#666666",
 },
  container: {
   flex: 1,
   backgroundColor: '#F5FCFF',
 },
  action: {
   flexDirection: 'column',
   marginTop: 25,
   height:75,
   borderBottomWidth: 1,
   borderBottomColor: '#f2f2f2',

   padding:10,
 },
 action2: {
  flexDirection: 'row',
  marginTop: 25,
  height:50,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',

  padding:10,
},
  panelButton: {
   padding: 13,
   borderRadius: 10,
   backgroundColor: '#FF6347',
   alignItems: 'center',
   marginVertical: 7,
   },
  textInput: {
   flex: 1,
   marginTop: Platform.OS === 'ios' ? 0 : -5,
   paddingLeft: 10,
   paddingTop:10,
   fontSize:16

 },
 bioInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -5,
  paddingLeft: 10,
  fontSize:16,
  color:"#666666",

},


})
