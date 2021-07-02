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
import { Tag, Bookmark, MapPin, Search, ChevronRight, Settings, UserPlus} from "react-native-feather";
// This will be the bulk of the profile page
class Profile extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      data: [
        {
          image:
            'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          desc: 'Silent Waters in the mountains in midst of Himilayas',
        },
        {
          image:
            'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
          desc:
            'Red fort in India New Delhi is a magnificient masterpeiece of humans',
        },
        {
          image:
            'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
          desc:
            'Sample Description below the image for representation purpose only',
        },
        {
          image:
            'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
          desc:
            'Sample Description below the image for representation purpose only',
        },
        {
          image:
            'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
          desc:
            'Sample Description below the image for representation purpose only',
        },
      ],
    }
  }

  ViewProfile = () => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    console.log("hi")
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

  render(){


    const screenWidth = Math.round(Dimensions.get('window').width);


    return (
      <BackgroundContainer>
        <View style={styles.viewStyle}>
          <View style={{flex:1, justifyContent:'center'}}>
          <Text style={styles.textStyle}>pinghsu520</Text>
          </View>
          <View

            style={{flex:1,justifyContent:'center',
             alignItems:'flex-end', padding:20}}>
             <UserPlus
               onPress = {() => this.ViewProfile()}
               stroke="black" strokeWidth={2.5} width={25} height={25}/>
          </View>
        </View>
        <View style = {styles.profileHeader}>
          <ProfileHeader
            navigation={this.props.navigation}
            {...this.props}
            />
        </View>
        <View style = {styles.socialCalContainer}>
          <SocialCalendarVonly />
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
    flex: 1,
    alignItems:'flex-start',
    // left:'12.5%',
    width:'100%',
    backgroundColor: 'red'


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
