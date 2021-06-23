import React from 'react';
import { Text, SafeAreaView, View, Button,StyleSheet, ScrollView } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { connect } from "react-redux";
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
import Constant from 'expo-constants';
import { Appbar } from 'react-native-paper';
import BackgroundContainer from "../RandomComponents/BackgroundContainer";
import SocialCalendar from '../SocialCalendar/SocialCalendar';
import { Tag, Bookmark, MapPin, Search, ChevronRight, Settings} from "react-native-feather";
// This will be the bulk of the profile page
class Profile extends React.Component{

  constructor(props){
    super(props);

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

  render(){
    return (

      <BackgroundContainer>


        <View style={styles.viewStyle}>
          <View style={{flex:1}}>
          <Text style={styles.textStyle}>pinghsu520</Text>
          </View>
          <View style={{flex:1, backgroundColor:'blue'}}>
          <Settings
            style={{justifyContent:'flex-end'}}
            stroke="black" strokeWidth={2.5} width={20} height={20}
            />
          </View>
        </View>
        <View style = {styles.profileHeader}>
          <ProfileHeader
            navigation={this.props.navigation}
            {...this.props}
            />
        </View>


        <View style = {styles.socialCalContainer}>
          <SocialCalendar
            navigation={this.props.navigation}
            {...this.props} />
        </View>
      </BackgroundContainer>





    )
  }
}

const mapStateToProps = state => {

  return {
    currentId: state.auth.id,
    currentUser: state.auth.username,
    profile: state.explore.profile,
    curUserFriend: state.auth.friends,
    curRequested: state.auth.requestList,
    followers: state.auth.followers,
    following: state.auth.following,
    // chats: state.message.chats
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
    marginTop: Constant.statusBarHeight,
    flex: 1.75,

  },
  profileHeader: {
    flex: 1.5,
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

})

export default connect(mapStateToProps)(Profile);
