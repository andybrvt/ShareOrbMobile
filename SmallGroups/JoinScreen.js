import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
  Share,
  Alert,
  TextInput,
  Dimensions,
  RefreshControle
 } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as dateFns from 'date-fns';
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus, CheckCircle, ArrowLeft } from "react-native-feather";
import { Avatar } from 'react-native-elements';
import authAxios from '../util';
import { LogOut, Lock, User, Bell, Globe, ArrowRight, Menu} from "react-native-feather";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class JoinScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      invitedPeople:[]
    }
  }

  onSelectUser = (user) => {
    if(this.state.invitedPeople.some(item => user.username == item.username)){
      const newList = this.state.invitedPeople.filter(function(el) { return el.username != user.username });
      this.setState({
        invitedPeople: newList
      })
    }
    else{
      this.setState({
        invitedPeople: [...this.state.invitedPeople, user],
      })
    }
    console.log(this.state.invitedPeople)


  }

  componentDidMount() {

  }



   render(){
     let data=[{'test':'Food'},{'test':'Family'},{'test':'Fitness'},{'test':'NBA'},
     {'test':'Tennis'},{'test':'volleball'},
   ]
     let codeInvite=this.props.codeInvite
     return(
       <View>
       <TouchableOpacity
         style={{width:50, padding:25}}
         onPress = {() => this.props.navigation.goBack(0)}
         >

         <ArrowLeft

           stroke="black"
           height = {25}
           width = {25}
           />
       </TouchableOpacity>
         <View>

           <View style={{
               alignItems:'center',
               justifyContent:'center',
               flexDirection:'row',

             }}>

             <View style={{flexDirection:'column',
               alignItems:'center',
               justifyContent:'center',
               width:'100%',
               // backgroundColor:'red',
               }}>

                 <Avatar
                   rounded
                   source = {{
                     uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
                   }}
                   size={125}
                    />
               <View style={{
                 marginTop:10,

                 }}>

                   <Text style={{fontSize:22,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>Fitness</Text>
                   <View style={styles.loginBtn0}>
                     <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold', padding:5}}> Private Orb</Text>
                   </View>
                   <TouchableOpacity onPress = {()=>this.navPeopleInGroup()}>
                     <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold', textAlign:'center', }}> 349 Members </Text>
                   </TouchableOpacity>
               </View>
             </View>
            </View>
            <View style={{ alignItems:'center', marginTop:25}}>
            <Text style={{marginLeft:20,fontSize:18, fontFamily:'Nunito', width:'85%',}}>
              This is the University of Arizona fitness group. Bear Down!
            </Text>
            </View>


             <View style={{alignItems:'center', top:'15%'}}>
             <TextInput
               autoCapitalize="none"
               onChangeText = {this.handleCode}
               style = {styles.inviteInput}
               placeholder = "Enter invite code"
               value = {this.state.inviteCode}
               />

             </View>
         </View>
       </View>
     )
   }
 }

 const styles = StyleSheet.create({
   inviteInput: {
     width: "75%",
     height: 50,
     marginLeft:20,
     backgroundColor:'#d9d9d9',
     fontFamily:'Nunito',
     borderRadius:10,
     padding:10,
     fontSize:18,
   },

   loginBtn0: {

     borderRadius: 10,
     marginLeft:10,
     // elevation:20,
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10,
     alignItems: "center",
     justifyContent: "center",

     backgroundColor: "#1890ff",
   },


   bottomContainer: {
     height: '25%',
     width: width,
     flexDirection:'row'
   },
   frequentPeopleContainer: {
     marginLeft:10,
     marginTop:20,
     height: 100,
     flexDirection: 'row',
   },
   column:{
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',       //THIS LINE HAS CHANGED
     marginRight:30,
     justifyContent:'center',

   },

   settingWord: {
     left:5,
     color:'#919191',
     fontSize:18,
     fontFamily:'Nunito-Bold',
     marginLeft:10,
   },
 })

 export default JoinScreen;
