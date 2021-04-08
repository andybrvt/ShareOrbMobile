import React from 'react';
import { Text, View, Button,StyleSheet, ScrollView } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { connect } from "react-redux";
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
import SocialCalendar from '../SocialCalendar/SocialCalendar';

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
    ExploreWebSocketInstance.disconnect();
    this.waitForSocketConnection(() => {
      ExploreWebSocketInstance.fetchProfile(
        this.props.route.params.username
      )
    })
    ExploreWebSocketInstance.connect(String(this.props.route.params.username))
  }

  // if(this.props.location.pathname !== newProps.location.pathname){
  //   //To refetch the information
  //   this.waitForSocketConnection(() => {
  //     ExploreWebSocketInstance.fetchProfile(
  //       String(newProps.parameter.username)
  //     )
  //   })
  //   ExploreWebSocketInstance.connect(newProps.parameter.username)
  //
  // }

  }

  render(){
    return (
      <View style = {styles.container} >

        <View style = {styles.profileHeader}>
          <ProfileHeader
            {...this.props}
            />
        </View>


        <View
          style = {styles.socialCalContainer}
          >
          <SocialCalendar />

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
  container: {
    flex: 1
  },
  socialCalContainer: {
    flex: 2,

  },
  profileHeader: {
    flex: 1
  }

})

export default connect(mapStateToProps)(Profile);
