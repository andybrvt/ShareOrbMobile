import React from 'react';
import {
  Text,
  Platform,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
 } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { connect } from "react-redux";
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
import Constant from 'expo-constants';
import { Appbar } from 'react-native-paper';
import BackgroundContainer from "../RandomComponents/BackgroundContainer";
import SocialCalendar from '../SocialCalendar/SocialCalendar';
import SocialCalendarHori from '../SocialCalendar/SocialCalendarHori';
import SocialCalendarVonly from '../SocialCalendar/SocialCalendarVonly';
import SocialCalendarTap from '../SocialCalendar/SocialCalendarTap';
import { Tag, Bookmark, Search, ChevronRight, Settings
  ,MessageCircle, UserPlus, Users, Clock, Grid, Calendar, Clipboard} from "react-native-feather";
import { TabView, SceneMap } from 'react-native-tab-view';
import GoalContainer from '../GoalAlbum/GoalContainer';
import * as authActions from '../store/actions/auth';

// This will be the bulk of the profile page
// this will be used for current user
class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Calendar' },
        { key: 'second', title: 'Goals' },
      ]
    }
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

  ViewProfile = () => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    this.props.navigation.navigate("Settings")
  }

  _renderScene = SceneMap({
    first: () =>  <SocialCalendarVonly openShowCamera = {this.props.openShowCamera} userId = {this.props.currentId} navigation = {this.props.navigation} currentId = {this.props.currentId}/>,
  second: () => <GoalContainer  userId = {this.props.currentId} navigation = {this.props.navigation}/>,
  });

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {
        props.navigationState.routes.map((route, i) => {
        return (
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => this.setState({ index: i })}>
            <View style={{flexDirection:'row'}}>
              {
                (i==1)?
               <Clipboard
                 style={{right:10}}
                 stroke="black" strokeWidth={2} width={20} height={20} />
              :
               <Calendar
                 style={{right:10}}
                 stroke="black" strokeWidth={2} width={20} height={20} />
              }
              <Text style={{fontSize:14}}>{route.title}</Text>
            </View>
          </TouchableOpacity>
          );
        })}
      </View>
    );
  };

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

          <View style={{top: 10,flex:1, justifyContent:'center', paddingLeft: 10}}>
            <Text style={styles.textStyle}>{this.props.username}</Text>
          </View>

          <View

            style={{flex:1,justifyContent:'center',
             alignItems:'flex-end', padding:15}}>
             <View style={{flexDirection:'row'}}>


             </View>
          </View>
        </View>

        <TouchableOpacity
          onPress = {() => this.ViewProfile()}
          style={{
            position:'absolute',top: 20, right:15}}
          >
        <View >

            <Settings
             stroke="#8c8c8c" strokeWidth={2} width={35} height={35}/>


        </View>
        </TouchableOpacity>
        <View style = {styles.profileHeader}>
          <ProfileHeader
            navigation={this.props.navigation}
            profile = {profile}
            {...this.props}
            />
        </View>
        <View style = {styles.socialCalContainer}>
          {/*
          <SocialCalendarVonly
            openShowCamera = {this.props.openShowCamera}
            userId = {this.props.currentId}
            navigation = {this.props.navigation}
            currentId = {this.props.currentId}/>
          */}
            <TabView
              navigationState = {this.state}
              renderScene = {this._renderScene}
              renderTabBar={this._renderTabBar}
              onIndexChange={this._handleIndexChange}
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
    bio: state.auth.bio,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openShowCamera: () => dispatch(authActions.openShowCamera()),

  }
}

const styles = StyleSheet.create({
  backgroundColor: {
    flex:1,
    backgroundColor:"#1890ff"
  },
  container: {
    marginTop: Constant.statusBarHeight,
    backgroundColor: "white"
  },
  socialCalContainer: {

    flex: Platform.OS === 'ios' ? 1.65: 1.45,
  },
  profileHeader: {

    flex: 1,
    top:'0%',
    // backgroundColor:'red',
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
  tabBar: {
    flexDirection: 'row',
    elevation:1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    // backgroundColor:'red',
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
