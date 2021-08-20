import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Button,StyleSheet, ScrollView, Dimensions } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { connect } from "react-redux";
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
import Constant from 'expo-constants';
import { Appbar } from 'react-native-paper';
import BackgroundContainer from "../RandomComponents/BackgroundContainer";
import SocialCalendar from '../SocialCalendar/SocialCalendar';
import SocialCalendarHori from '../SocialCalendar/SocialCalendarHori';
import SocialCalendarVonly from '../SocialCalendar/SocialCalendarVonly';
import { ArrowLeft, Tag, Bookmark, Bell, Search, ChevronRight, Settings, UserPlus} from "react-native-feather";
import * as authActions from '../store/actions/auth';


// this will be used mostly for the other person profile
// I want to make it seperate is because for your profile you can just
// use auth and changing stuff would be so much easier because you don't
// need two reducers to manage
class UserProfile extends React.Component{

  constructor(props){
    super(props);

    this.state = {

    }
  }

  ViewNoti = () => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    this.props.navigation.navigate("Notifications")
  }

  ViewProfile = () => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    this.props.navigation.navigate("Settings")
  }

  initialiseProfile() {

      this.waitForSocketConnection(() => {
          ExploreWebSocketInstance.fetchProfile(
            this.props.route.params.username
          )
      })
      if(this.props.route.params.username){
        ExploreWebSocketInstance.connect(String(this.props.route.params.username))
      }
    }

  waitForSocketConnection(callback){
	// This is pretty much a recursion that tries to reconnect to the websocket
	// if it does not connect
	const component = this;
	setTimeout(
		function(){
			console.log(ExploreWebSocketInstance.state())
			if (ExploreWebSocketInstance.state() === 1){
				console.log('connection is secure');
				callback();
				return;
			} else {
				console.log('waiting for connection...')
				component.waitForSocketConnection(callback)
			}
		}, 100)
	}

  componentDidMount(){
    if(this.props.route.params.username !== null){
        this.initialiseProfile()
    }

  }

  componentDidUpdate(prevProps){
    if(prevProps.route.params.username !== this.props.route.params.username){

    // this.props.closeProfile()

    // we will be fetching the profile however since we are gonna render the
    // months a bit differently, we will pull the information a bit more differnet
    // than that of the website. We will just get the profile stuff and then
    // for the social cal we will get it seperatly
    ExploreWebSocketInstance.disconnect();
    this.waitForSocketConnection(() => {
      ExploreWebSocketInstance.fetchProfile(
        this.props.route.params.username
      )
    })
    ExploreWebSocketInstance.connect(String(this.props.route.params.username))
  }

  }


  onRedirect = () => {
    this.props.navigation.goBack();
  }

  render(){


    const screenWidth = Math.round(Dimensions.get('window').width);

    let username = "";
    let userId = "";

    if(this.props.profile){
      if(this.props.profile.username){
        username = this.props.profile.username
      }
      if(this.props.profile.id){
        userId = this.props.profile.id
      }

    }

    return (
      <BackgroundContainer>
        <View style={styles.viewStyle}>
          <TouchableOpacity
            onPress = {() => this.onRedirect()}>
          <ArrowLeft
                style={{top:15}}
                stroke='black'
                width ={35}
                height = {25}
           />
         </TouchableOpacity>
          <View style={{top: 10, flex:1, justifyContent:'center'}}>
            <Text style={styles.textStyle}>{username}</Text>
          </View>

        </View>
        <View style = {styles.profileHeader}>
          <ProfileHeader
            navigation={this.props.navigation}
            {...this.props}
            />
        </View>
        <View style = {styles.socialCalContainer}>
          <SocialCalendarVonly
            navigation = {this.props.navigation}
            userId = {userId}
            />
        </View>
      </BackgroundContainer>
    )
  }
}

const mapStateToProps = state => {

  return {
    currentId: state.auth.id,
    currentUser: state.auth.username,
    following: state.auth.following,
    profile: state.explore.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    grabUserCredentials: () => dispatch(authActions.grabUserCredentials()),

  }
}

const styles = StyleSheet.create({
  backgroundColor: {
    flex:1,
    backgroundColor:"#1890ff"
  },
  container: {
    flex: 1,
    marginTop: Constant.statusBarHeight,
    backgroundColor: "white"
  },
  socialCalContainer: {
    flex: 2,
  },
  profileHeader: {
    flex: 1,
    alignItems:'flex-start',
    // left:'12.5%',
    width:'100%',


  },
  viewStyle: {


    height:30,
    paddingTop:0,
    flexDirection:'row',

    // shadowColor:'black',
    // shadowOffset:{width:0,height:2},
    // shadowOpacity:0.2,
    // elevation:4
  },
  textStyle:{
    fontSize:20,
    fontWeight:'bold',
    justifyContent:'flex-start',
  },

  separator: {
    height: 20,
  },
  contentStyle: {
    paddingHorizontal: 16,
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
