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
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus, CheckCircle } from "react-native-feather";
import { Avatar } from 'react-native-elements';
import authAxios from '../util';
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class SuggestedGroups extends React.Component{
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
       <View style={{marginTop:'2.5%', alignItems:'center'}}>
         <View style={{width:'90%'}}>
            <Text style={styles.welcomeText}>Let's choose some orbs you'd enjoy</Text>
         </View>
         <View style={{marginTop:'5%', height:'75%'}}>
           <FlatList
             extraData={this.state.invitedPeople}
             columnWrapperStyle={{justifyContent: 'space-between'}}
             data={data}
             showsVerticalScrollIndicator={true}
             numColumns={2}
             renderItem={({item}) => {
               return (
                  <View style={{width: '50%', justifyContent:'center', alignItems:'center', padding:10}} >
                    <TouchableOpacity onPress = {() => this.onSelectUser(item)}>
                      <Avatar
                        source = {{
                          uri: 'https://images.unsplash.com/photo-1631798263380-d24c23a9e618?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                        }}
                        rounded
                        size = {125}
                         />
                       {this.state.invitedPeople.includes(item)?
                           <CheckCircle
                             stroke = "white"
                             strokeWidth = {2}
                             height = {25}
                             width = {25}
                              />
                           :
                           <Text></Text>
                         }


                    </TouchableOpacity>
                    <Text>{item.test}</Text>
                  </View>
                 );
               }}
             />
         </View>
         <View style={styles.loginBtn}>
           <Text>Join</Text>
         </View>
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

 export default SuggestedGroups;
