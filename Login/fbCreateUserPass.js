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
  AsyncStorage,
  ActivityIndicator
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
import { Mic, Bell, Unlock, Lock, User, Aperture, Image} from "react-native-feather";
import { Camera } from 'expo-camera';
import * as ExpoNotifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import SlideWrap from './SlideWrap';
import Permissions from './Permissions';
import InvitePeople from './InvitePeople';
import BasicSignUp from './BasicSignUp';
import BirthdaySlide from './BirthdaySlide';
import { Video, AVPlaybackStatus } from 'expo-av';

import test1 from './test1.mp4';
import ProfilePicSlide from './ProfilePicSlide';
import * as actions from '../store/actions/auth';
import axios from "axios";
import * as dateFns from 'date-fns';
import * as authActions from '../store/actions/auth';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class fbCreateUserPass extends React.Component{

  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  state = {
    stuff:[0, 1, 2, 3, 4],
    curIndex: 0,
    one: true,
    two: false,
    three: false,
    four: false,
    five: false,


    username: "",
    password: "",

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

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  }

  onScroll = (event) => {
    const index = event.nativeEvent.contentOffset.x / width;
    const roundedIndex = Math.round(index)

    this.setState({
      curIndex: roundedIndex
    })
  }

  openModal = (modalNum) => {
    // this function will open a specific modal
    if(modalNum === 'one'){
      console.log('stuff here')
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

  }

  closeModal = (modalNum) => {
    if(modalNum === 'one'){
      // this.setState({
      //   one:false
      // })
      this.props.navigation.navigate('Login')
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
  }

  onUsernameChange = e => {
    this.setState({
      username: e
    })
  }


  onPasswordChange = e => {
    this.setState({
      password:e
    })
  }


  componentDidUpdate(prevProps){

    if(this.props.isAuthenticated === true){
      this.props.navigation.navigate("LoadingScreen")
    }
  }

  onSignupSubmit = () => {
    this.setState({
      loading: true
    })
    const { profilePic, username, firstName, lastName, email, dob, password} = this.state;
    return axios.post(`${global.IP_CHANGE}/rest-auth/registration/`, {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      dob: dateFns.format(dob, "yyyy-MM-dd"),
      password1: password,
      password2: password
    }).then(res => {
      const token = res.data.key;
      const formData = new FormData();
      const newPic = global.FILE_NAME_GETTER(profilePic)


      formData.append("profilePic", newPic)


      AsyncStorage.setItem('token', token)

      authAxios.post(`${global.IP_CHANGE}/userprofile/changeProfilePic`,
        formData
      ).then( res => {
        this.setState({
          loading:false
        })
        this.props.authSuccess(token);
        this.props.navigation.navigate("")
      })
      // change userprofile picture using username
    })
    .catch( err => {
      alert('Check email or use a different one')
      this.setState({
        loading:false
      })
    })
  }

  render(){
    let showPicker=this.state.showDatePicker
    return(
      <View style = {{flex: 1}}>
          <View style = {{alignItems:'center'}}>
            <BasicSignUp
              un = {false}
              pw = {false}
              em = {false}
              loading = {this.state.loading}
              visible = {this.state.one}
              prompt = {"What's your name?"}
              value = {this.state.firstName}
              onChange = {this.onNameChange}
              closeModal = {this.closeModal}
              openModal = {this.openModal}
              closeNum = {'one'}
              openNum = {'two'}
               />

            <SlideWrap visible = {this.state.two}>
              <BasicSignUp
                un = {true}
                pw = {false}
                em = {false}
                loading = {this.state.loading}
                visible = {this.state.two}
                prompt = {"What is your username?"}
                value = {this.state.username}
                onChange = {this.onUsernameChange}
                closeModal = {this.closeModal}
                openModal = {this.openModal}
                closeNum = {'two'}
                openNum = {'three'}/>

            </SlideWrap>


            <SlideWrap visible = {this.state.three}>
              <BasicSignUp
                pw = {true}
                un = {false}
                em = {false}
                loading = {this.state.loading}
                signup = {this.onSignupSubmit}
                visible = {this.state.five}
                prompt = {"Create a password"}
                value = {this.state.password}
                onChange = {this.onPasswordChange}
                closeModal = {this.closeModal}
                openModal = {this.openModal}
                closeNum = {'three'}
                openNum = {'four'}/>

            </SlideWrap>

          </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  singleSlide: {
    height: height,
    width: width,
   backgroundColor:'green'
  },
  headerText:{
    color:'white',
    fontSize:17,
    fontFamily:'Nunito-Bold',
  },
  permissionsText:{
    color:'white',
    fontSize:15,
    fontFamily:'Nunito',
  },
  container: {
    backgroundColor: "#1890ff",
    alignItems: 'center',
  },
  purposeText:{
    color: 'white'
  },
  infoText: {
    color: 'white',
    textAlign: 'center'
  },
  welcomeText: {
  padding:5,
    color: "white",
    fontSize: 27.5,
    top: '7%',
    textAlign: 'center',
    fontFamily:'Nunito-SemiBold',
  },
  header2Text: {
    color: 'white',
    fontSize: 25,
  },
  bodyText:{
    color: 'white'
  },
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
    userId: state.auth.id,
    username: state.auth.username,
    isAuthenticated: state.auth.token !== null,

  }
}
const mapDispatchToProps = dispatch => {
  return {
    authSuccess: (token) => dispatch(actions.authSuccess(token)),

  }
}



 export default connect(mapStateToProps, mapDispatchToProps)(fbCreateUserPass)
