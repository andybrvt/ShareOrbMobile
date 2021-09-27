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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect } from "react-redux";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class JoinScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      invitedPeople:[],
      inviteCode: ''
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


  handleCode = (e) => {

    this.setState({
      inviteCode:e
    })
  }

  joinGroup = (groupId) => {

    const userId = this.props.id

    // for this you just need group id and userid
    authAxios.post(`${global.IP_CHANGE}`+"/mySocialCal/joinSmallGroup/"+groupId+'/'+userId)
    .then(res => {
      console.log(res.data)
    })
  }




   render(){

     console.log(this.props, 'stuff here')
     let data=[{'test':'Food'},{'test':'Family'},{'test':'Fitness'},{'test':'NBA'},
     {'test':'Tennis'},{'test':'volleball'},
   ]
     let codeInvite=this.props.codeInvite
     let group = {}
     if(this.props.route.params.item){
       group = this.props.route.params.item
     }

     return(
       <SafeAreaView style = {{flex: 1}}>

         <TouchableOpacity
           style={{
             position: 'absolute',
             top: '5%',
             left: '5%',
             zIndex: 999
           }}
           onPress = {() => this.props.navigation.goBack(0)}
           >

           <ArrowLeft

             stroke="black"
             height = {35}
             width = {35}
             />
         </TouchableOpacity>
         <ScrollView >

           <View style = {{top: '10%'}}>

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
                       uri:`${global.IMAGE_ENDPOINT}`+group.groupPic
                     }}
                     size={125}
                      />
                 <View style={{
                   marginTop:10,

                   }}>

                     <Text style={{fontSize:22,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{group.group_name}</Text>
                     {
                       group.public ?

                       <View style={styles.loginBtn0}>
                         <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold', padding:5}}>Public Orb</Text>
                       </View>

                       :

                       <View style={styles.loginBtn0}>
                         <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold', padding:5}}>Private Orb</Text>
                       </View>


                     }

                     <TouchableOpacity onPress = {()=>this.navPeopleInGroup()}>
                       <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{group.members.length} Members </Text>
                     </TouchableOpacity>
                 </View>
               </View>
              </View>
              <View style={{
                alignItems:'center',
                marginTop:25}}>
              <Text style={{fontSize:18, fontFamily:'Nunito'}}>
                {group.description}
              </Text>
              </View>


             <View style={{
                 alignItems:'center',
                 top:'15%'}}>
               {
                 group.public ?

                 <TouchableOpacity
                   onPress = {() => this.joinGroup(group.id)}
                   style = {styles.joinButton}>
                   <View >
                     <Text style = {styles.joinText}>Join</Text>
                   </View>

                 </TouchableOpacity>


                 :

                 <View style = {styles.inputHolder}>
                   <TextInput
                     autoCapitalize="none"
                     onChangeText = {this.handleCode}
                     style = {styles.inviteInput}
                     placeholder = "Enter invite code"
                     value = {this.state.inviteCode}
                     />

                     <View style = {styles.joinButton}>
                       <Text style = {styles.joinText}>Join</Text>
                     </View>


                 </View>

               }

             </View>
           </View>
         </ScrollView>

       </SafeAreaView>
     )
   }
 }

 const styles = StyleSheet.create({

   inputHolder:{
     width: "75%",
     alignItems: 'center'
   },
   inviteInput: {
     width: '100%',
     height: 50,
     backgroundColor:'#d9d9d9',
     fontFamily:'Nunito',
     borderRadius:10,
     padding:10,
     fontSize:18,
     marginBottom: 20
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
   joinButton: {
     width: '70%',
     backgroundColor: "#1890ff",
     justifyContent: 'center',
     alignItems: 'center',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10,
     borderRadius: 20,
     height: 50,

   },
   joinText:{
     color: 'white',
     fontSize: 15
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

const mapStateToProps = state => {
  return{
    id: state.auth.id
  }
}

 export default connect(mapStateToProps, null)(JoinScreen);
