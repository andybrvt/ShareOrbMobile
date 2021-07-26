import React from 'react';
import { Text, SafeAreaView, View, Button,StyleSheet, ScrollView, Dimensions } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { connect } from "react-redux";
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
import Constant from 'expo-constants';
import { Appbar } from 'react-native-paper';
import BackgroundContainer from "../RandomComponents/BackgroundContainer";
import SocialCalendar from '../SocialCalendar/SocialCalendar';
import SocialCalendarHori from '../SocialCalendar/SocialCalendarHori';
import SocialCalendarVonly from '../SocialCalendar/SocialCalendarVonly';
import { Tag, Bookmark, Bell, Search, ChevronRight, Settings
  ,MessageCircle, UserPlus} from "react-native-feather";


// This will be the bulk of the profile page
// this will be used for current user
class Profile extends React.Component{

  constructor(props){
    super(props);

    this.state = {

    }
  }

  ViewChats = () => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    this.props.navigation.navigate("Chats")
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

  // Probally dont need this is because its taken from the auth
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

  render(){

    const screenWidth = Math.round(Dimensions.get('window').width);

    const profile = {
      username: this.props.username,
      profile_picture: this.props.profilePic,
      first_name: this.props.firstName,
      last_name: this.props.lastName,
      get_following: this.props.following,
      id: this.props.currentId,
      bio: this.props.bio,
      get_followers: this.props.followers
    }

    return (
      <BackgroundContainer>
        <View style={styles.viewStyle}>
          <View style={{flex:1, justifyContent:'center'}}>
            <Text style={styles.textStyle}>{this.props.username}</Text>
          </View>

          <View

            style={{flex:1,justifyContent:'center',
             alignItems:'flex-end', padding:20}}>
             <View style={{flexDirection:'row'}}>
               <MessageCircle
                 style={{right:20}}
                 onPress = {() => this.ViewChats()}
                 stroke="black" strokeWidth={2.5} width={25} height={25}/>
               <Bell
                 style={{right:10}}
                 onPress = {() => this.ViewNoti()}
                 stroke="black" strokeWidth={2.5} width={25} height={25}/>
               <UserPlus
                 onPress = {() => this.ViewProfile()}
                 stroke="black" strokeWidth={2.5} width={25} height={25}/>
             </View>
          </View>
        </View>
        <View style = {styles.profileHeader}>
          <ProfileHeader
            navigation={this.props.navigation}
            profile = {profile}
            {...this.props}
            />
        </View>
        <View style = {styles.socialCalContainer}>
          <SocialCalendarVonly
            userId = {this.props.currentId}
            navigation = {this.props.navigation}
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
    curUserFriend: state.auth.friends,
    curRequested: state.auth.requestList,
    followers: state.auth.followers,
    following: state.auth.following,
    username: state.auth.username,
    profilePic: state.auth.profilePic,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    bio: state.auth.bio ,
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
    // backgroundColor:'red',


    height:50,
    paddingTop:0,
    flexDirection:'row',

    // shadowColor:'black',
    // shadowOffset:{width:0,height:2},
    // shadowOpacity:0.2,
    // elevation:4
  },
  textStyle:{
    padding:15,
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

export default connect(mapStateToProps)(Profile);
