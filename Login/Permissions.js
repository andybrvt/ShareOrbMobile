import React from 'react';

// import * as Sharing from 'expo-sharing';
// This page will use mostly to introduce the user to
// what we are about and the

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
import newfeedpic from '../newfeedpic.jpg';
import profilepic from '../profilepic.jpg';
import postingpic from '../postingpic.jpg';
import MainLogo from '../logo.svg';
import Frame from '../Frame.svg';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import authAxios from '../util';
import PhoneContacts from './PhoneContacts';
import { Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import { Mic, Bell, Unlock, Lock, User, Video, Image} from "react-native-feather";
import { Camera } from 'expo-camera';
import * as ExpoNotifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import SlideWrap from './SlideWrap';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


class Permissions extends React.Component{
  state = {
    stuff:[0, 1, 2, 3, 4],
    curIndex: 0,
    allowCamera: false,
    allowMicrophone: false,
    allowNotifications:false,
    allowGallery:false,
  }

  allowCameraPermissions = async() => {
     try{
       const camera = await Camera.requestPermissionsAsync();
       // const microphone = await Camera.requestMicrophonePermissionsAsync();
       if(camera.status  == "granted"){
         this.setState({
           allowCamera: true,
         })
       }
     }
     catch(err){
       alert(err)
     }
   }
   allowMicrophonePermissions = async() => {
     try{
       const camera = await Camera.requestMicrophonePermissionsAsync();
       if(camera.status  == "granted"){
         this.setState({
           allowMicrophone: true,
         })
       }
     }
     catch(err){
       alert(err)
     }
   }
   allowNotificationPermissions = async() => {
     try{
       const noti = await ExpoNotifications.requestPermissionsAsync();
       if(noti.status  == "granted"){
         this.setState({
           allowNotifications: true,
         })
       }
     }
     catch(err){
       alert(err)
     }
   }

   allowGalleryPermissions = async() => {
     try{
       const noti = await ImagePicker.requestMediaLibraryPermissionsAsync();
       if(noti.status  == "granted"){
         this.setState({
           allowGallery: true,
         })
       }
     }
     catch(err){
       alert(err)
     }
   }

  next = () => {
    this.props.openModal(this.props.openNum)
  }

  close = () => {

    this.props.onClose()
  }


  render(){

    const{allowCamera, allowMicrophone, allowNotifications, allowGallery} = this.state
    return(
      <View style = {{
          // flex: 1,
          width: width,
          alignItems: 'center'
          }}>
        <View>
          <View style={{padding:30}}>
            <Text style = {styles.welcomeText}>
              Enable Permissions
            </Text>
            <View style={{textAlign:'center', top:20}}>
            <Text style={styles.permissionsText}>
              For the best experience, we'll need you to allow a few permissions to get started
            </Text>
            </View>
          </View>
        </View>
        <View
          style = {{
            height: "70%",
            width: width*0.85,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <TouchableOpacity onPress={()=>this.allowCameraPermissions()}>

            <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center'}}>
                <Video stroke="white" strokeWidth={1.5} width={27.5} height={27.5} />
              </View>
              <View style={{flexDirection:'column', width:'77.5%', padding:20}}>
                <Text style={styles.headerText}>
                  Camera
                </Text>
                <Text style={styles.permissionsText}>
                  Lets you take pictures and videos on the spot
                </Text>
              </View>
              { !this.state.allowCamera?
                <View style={{justifyContent:'center'}}>
                  <Lock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              :
                <View style={{justifyContent:'center'}}>
                  <Unlock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.allowMicrophonePermissions()}>
            <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
              <Mic stroke="white" strokeWidth={1.5} width={27.5} height={27.5} />
            </View>
            <View style={{flexDirection:'column', width:'77.5%', padding:20}}>
              <Text style={styles.headerText}>
                Microphone
              </Text>
              <Text style={styles.permissionsText}>
                Enable audio for posts
              </Text>
            </View>
            { !this.state.allowMicrophone?
              <View style={{justifyContent:'center'}}>
                <Lock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
              </View>
            :
              <View style={{justifyContent:'center'}}>
                <Unlock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
              </View>
            }
          </View>
          </TouchableOpacity>

          {/*
          <TouchableOpacity onPress={() => this.allowNotificationPermissions()}>
            <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center'}}>
                <Bell stroke="white" strokeWidth={1.5} width={27.5} height={27.5} />
              </View>
              <View style={{flexDirection:'column', width:'77.5%', padding:20}}>
                <Text style={styles.headerText}>
                  Notifications
                </Text>
                <Text style={styles.permissionsText}>
                  Keeps you in the loop
                </Text>
              </View>
              { !this.state.allowNotifications?
                <View style={{justifyContent:'center'}}>
                  <Lock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              :
                <View style={{justifyContent:'center'}}>
                  <Unlock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              }
            </View>
          </TouchableOpacity>
          */}

          <TouchableOpacity onPress={()=>this.allowGalleryPermissions()}>
          <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center'}}>
                <Image stroke="white" strokeWidth={1.5} width={27.5} height={27.5} />
              </View>
              <View style={{flexDirection:'column', width:'77.5%', padding:20}}>
                <Text style={styles.headerText}>
                  Storage
                </Text>
                <Text style={styles.permissionsText}>
                  Access pictures and videos from your gallery to post
                </Text>
              </View>
              { !this.state.allowGallery?
                <View style={{justifyContent:'center'}}>
                  <Lock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              :
                <View style={{justifyContent:'center'}}>
                  <Unlock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              }
            </View>
          </TouchableOpacity>
        </View>

        {
          allowCamera && allowMicrophone && allowGallery ?

          <TouchableOpacity
             onPress = {() => this.close()}
             style = {styles.loginBtn}>
            <Text style = {styles.loginText}>Let's Go!</Text>
          </TouchableOpacity>

          :

          null


        }
        </View>
    )
  }
}

export default Permissions;
const styles = StyleSheet.create({
  welcomeText: {
    padding:5,
    color: "white",
    fontSize: 27.5,
    top: '7%',
    textAlign: 'center',
    fontFamily:'Nunito-SemiBold',
  },
  permissionsText:{
    color:'white',
    fontSize:15,
    fontFamily:'Nunito',
  },
  headerText:{
    color:'white',
    fontSize:17,
    fontFamily:'Nunito-Bold',
  },
  loginBtn: {
    position: "absolute",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    top: '85%',
    zIndex: 9999,
    backgroundColor: "white",
  },
  loginBtnDisabled: {
    position: "absolute",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    top: '95%',
    zIndex: 9999,
    backgroundColor: "gray",
  },
  loginText: {
    color: '#1890ff',
    fontSize: 18,
    fontFamily:'Nunito-Bold',
  },
  loginTextDisabled: {
    color: 'lightgray',
    fontSize: 18,
    fontFamily:'Nunito-Bold',
  },

})
