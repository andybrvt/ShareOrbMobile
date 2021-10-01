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
  Alert,
  AsyncStorage

 } from 'react-native';
import Permissions from './Permissions';
import InvitePeople from './InvitePeople';
import SuggestedGroups from './SuggestedGroups';
import SlideWrap from './SlideWrap';
import { Video, AVPlaybackStatus } from 'expo-av';
import test1 from './test1.mp4';
import { connect } from "react-redux";
import authAxios from '../util';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class MiniAppIntro extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      allowCamera: false,
      allowMicrophone: false,
      allowNotifications:false,
      allowGallery:false,
      one: false,
      two: false,
    }
    this.video = React.createRef();

  }

  componentDidUpdate(prevProps){


  }

  resumeVid = () =>  {
    this.setState({
      videoPlaying: true
    })
    this.video.current.playAsync()
  }

  openModal = (modalNum) => {
    // this function will open a specific modal
    if(modalNum === 'one'){
      this.setState({
        one:true,
        videoPlaying:false,
        resumeOnce:true,
      })
      this.video.current.pauseAsync()
    }
    if(modalNum === 'two'){
      this.setState({
        two:true
      })
    }
    if(modalNum === 'three'){
      this.setState({
        three:true
      })
    }
    if(modalNum === 'four'){
      this.setState({
        four:true
      })
    }
    if(modalNum === 'five'){
      this.setState({
        five:true
      })
    }
    if(modalNum === 'six'){
      this.setState({
        six:true
      })
    }
    if(modalNum === 'seven'){
      this.setState({
        seven:true
      })
    }
  }

  closeModal = (modalNum) => {
    if(modalNum === 'one'){
      this.setState({
        one:false
      })
    }
    if(modalNum === 'two'){
      this.setState({
        two:false
      })
    }
    if(modalNum === 'three'){
      this.setState({
        three:false
      })
    }
    if(modalNum === 'four'){
      this.setState({
        four:false
      })
    }
    if(modalNum === 'five'){
      this.setState({
        five:false
      })
    }
    if(modalNum === 'six'){
      this.setState({
        six:false
      })
    }
    if(modalNum === 'seven'){
      this.setState({
        seven:true
      })
    }
  }

  close = () =>  {
    authAxios.post(`${global.IP_CHANGE}`+'/userprofile/unShowIntialInstructions/'+this.props.id)
    .then(res => {
      this.props.navigation.navigate("tabs")
    })
    .catch(err => {
      alert(err)
    })
  }


  render(){

    let profilePic = ""
    if(this.props.profilePic){

      profilePic = `${global.IMAGE_ENDPOINT}` + this.props.profilePic
    }

    return(
      <View style = {{

            flex: 1}}>
        <View style = {{

              alignItems: 'center'}}>

          {/*
            this.props.isInvited ?

            null

            :

            (this.state.one==true||this.state.two==true||this.state.three==true||this.state.four==true
            ||this.state.five==true||this.state.six==true||this.state.seven==true)?
              <View><Text></Text></View>
            :
            <View style={{position:'absolute', right:10, top:45, zIndex:5}}>
              {this.state.resumeOnce==true?
                <View >
                  <TouchableOpacity style={styles.tagCSS1} onPress = {() => this.openModal('one')}>
                    <Text style={{color:'white', fontSize:14, fontFamily:'Nunito-Bold', padding:5}}>Next</Text>
                  </TouchableOpacity>
                </View>
                :
                <View >
                  <TouchableOpacity style={styles.tagCSS1} onPress = {() => this.openModal('one')}>
                    <Text style={{color:'white', fontSize:14, fontFamily:'Nunito-Bold', padding:5}}>Skip</Text>
                  </TouchableOpacity>
                </View>
              }

            </View>
          */}

          {/*
            this.props.isInvited ?

            null

            :

            <View>
              <View style={{height: height, justifyContent:'center', alignItems:'center'}}>
                <Video
                  ref={this.video}
                  style={{width:height,
                     height: Platform.OS === 'ios' ? width : width+35,
                     transform: [{ rotate: '270deg' }], }}
                  source = {test1}
                  resizeMode="contain"
                  // isLooping
                  shouldPlay={true}
                />
                <View>


                </View>
              </View>
            </View>


          */}

          {/*
            <View style = {{height: height, width: width,  backgroundColor: "#1890ff"}}>
              <SafeAreaView>
                <InvitePeople
                  codeInvite = {this.props.inviteCode}
                  profilePic = {profilePic}
                  firstName = {this.props.firstName}
                  lastName = {this.props.lastName}
                  closeModal = {this.closeModal}
                  openModal = {this.openModal}
                  closeNum = {'one'}
                  openNum = {'two'}
                   />
              </SafeAreaView>

            </View>

            */}
            <View style = {{height: height, width: width,  backgroundColor: "#1890ff"}}>

              <Permissions
                onClose = {this.close}
                 />
            </View>

            {/*
              <SlideWrap visible = {this.state.three}>
                <View style={{height:'100%'}}>
                <SuggestedGroups
                  onClose = {this.close}
                   />
                 </View>
              </SlideWrap>


              */}





        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tagCSS1: {
    padding:2.5,
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius:20,
    color:'white',
    bottom:'25%',
    justifyContent: 'center',
    fontSize:13,
    right:7.5,
    zIndex:1,
    flex:1,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    elevation:25,
  },
})


const mapStateToProps = state => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    profilePic: state.auth.profilePic,
    isInvited: state.auth.inviToken !== null,
    id: state.auth.id,
    username: state.auth.username,
    inviteCode: state.auth.inviteCode
  }
}
const mapDispatchToProps = dispatch => {
  return {
    unShowIntialInstructions: (bool) => dispatch(authActions.unShowIntialInstructions(bool)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniAppIntro);
