import React from 'react';
import { Text, SafeAreaView, View, Button,StyleSheet, ScrollView } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { connect } from "react-redux";
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
import SocialCalendar from '../SocialCalendar/SocialCalendar';
import Constant from 'expo-constants';

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
      <View style = {styles.backgroundColor}>
        <View style = {styles.container} >

          <View style = {styles.profileHeader}>
            <ProfileHeader
              {...this.props}
              />
          </View>


          <View
            style = {styles.socialCalContainer}
            >
            <SocialCalendar {...this.props} />

          </View>


        </View>
      </View>


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
    flex: 1.5,

  },
  profileHeader: {
    flex: 1
  }

})

export default connect(mapStateToProps)(Profile);
