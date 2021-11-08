import React from 'react';
import {
  Alert,
  Text,
  FlatList,
   SafeAreaView, View, TouchableOpacity, Button,StyleSheet, ScrollView, Dimensions } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { connect } from "react-redux";
import ExploreWebSocketInstance from '../Websockets/exploreWebsocket';
import Constant from 'expo-constants';
import { Appbar } from 'react-native-paper';
import BackgroundContainer from "../RandomComponents/BackgroundContainer";
import SocialCalendar from '../SocialCalendar/SocialCalendar';
import SocialCalendarHori from '../SocialCalendar/SocialCalendarHori';
import SocialCalendarVonly from '../SocialCalendar/SocialCalendarVonly';
import { ArrowLeft, Shield, Tag, Bookmark, Bell, Search, ChevronRight, Settings, UserPlus, Calendar, Clipboard} from "react-native-feather";
import * as authActions from '../store/actions/auth';
import { TabView, SceneMap } from 'react-native-tab-view';
import GoalContainer from '../GoalAlbum/GoalContainer';
import { Avatar } from 'react-native-elements';
import authAxios from '../util';
import NoOrbs from './noOrbs.svg';
import BlockingModal from './BlockingModal';

// this will be used mostly for the other person profile
// I want to make it seperate is because for your profile you can just
// use auth and changing stuff would be so much easier because you don't
// need two reducers to manage
const {width, height} = Dimensions.get('screen')


class ProfilePage extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      profile: {},
      showBlockingModal: false
    }
  }

  onCloseBlockingModal = () => {
    this.setState({
      showBlockingModal: false
    })
  }


  onOpenBlockingModal = () => {
    this.setState({
      showBlockingModal: true
    })
  }

  initialiseProfile() {

    // honeslty you don't even need websockets bc there are not that
    // much real time stuff,
    // you just gotta pull the profiele
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
    //     this.initialiseProfile()
      const name = this.props.route.params.username
      authAxios.get(`${global.IP_CHANGE}`+"/userprofile/"+name)
      .then(res => {
        console.log(res.data)
        this.setState({
          profile: res.data
        })

      })

    }

  }

  componentDidUpdate(prevProps){
    if(prevProps.route.params.username !== this.props.route.params.username){

    // this.props.closeProfile()

    // we will be fetching the profile however since we are gonna render the
    // months a bit differently, we will pull the information a bit more differnet
    // than that of the website. We will just get the profile stuff and then
    // for the social cal we will get it seperatly
    // ExploreWebSocketInstance.disconnect();
    // this.waitForSocketConnection(() => {
    //   ExploreWebSocketInstance.fetchProfile(
    //     this.props.route.params.username
    //   )
    // })
    // ExploreWebSocketInstance.connect(String(this.props.route.params.username))
  }

  }


  renderEmptyContainer(){
    return(
      <View style = {{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <NoOrbs width = {150} height = {150}/>
        <Text style = {{
            fontSize: 20,
          }}>No orbs yet, go check out your city</Text>
      </View>
    )
  }

  onBack = () => {
    this.props.navigation.goBack(0)
  }

  onGroupDirect = (item) => {
    console.log("creator: "+item.creator.id)
    console.log("orbId: "+item.id)
    console.log("groupName: "+item.group_name)
    console.log("groupPic: "+item.groupPic)

    this.props.navigation.navigate("groupOrb", {
      creator: item.creator.id,
      orbId: item.id,
      groupName: item.group_name,
      groupPic: item.groupPic
    })
  }


  listHeader = () => {
    const profile = this.state.profile
    const username = profile.username
    const profilePic = profile.profile_picture
    const bio = profile.bio
    const name = profile.first_name
    return(
      <View style = {styles.container1}>
        <View>
          <View style={styles.profileInfoHeader}>
              <View style={{
                 flexDirection:'column',
                  alignItems: 'center',
                 justifyContent:'center',}}>
                 <View style={{zIndex:99, borderWidth: 2, borderColor: '#2f54eb', borderRadius:75,}}>
                  <Avatar
                    size={110}
                    rounded
                    source={{
                      uri:
                        profilePic,
                    }}
                  />
                </View>
                <Text style = {styles.name}>{name}</Text>
                <Text style = {styles.username}>@{username}</Text>
              </View>
          </View>
        </View>
        <View style = {styles.bioContainer}>
          <Text style = {styles.bio}> {bio}</Text>
        </View>

      </View>
    )
  }


  renderItem = ({item}) => {

    const pic = `${global.IMAGE_ENDPOINT}` + item.groupPic

    return(
      <View style={{
          width: width/2, justifyContent:'center', alignItems:'center', padding:10}} >
        <TouchableOpacity
          onPress = {() => this.onGroupDirect(item)}
          >
          <Avatar
            source = {{
              uri: pic
            }}
            rounded
            size = {120}
             />
        </TouchableOpacity>

           <Text style={{fontFamily:'Nunito-SemiBold'}}>{item.group_name}</Text>

           {/*<View style={styles.roundButton1}></View> */}
      </View>

    )
  }

  onAlertBlock = (selected) => {


    Alert.alert(
      "Block user",
      "Are you sure you want to block the users from these orbs?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes",
          style:'destructive', onPress: () => this.onBlock(selected) }
      ]

    )

  }

  onBlock = (selected) => {
    console.log(selected, 'block users')
    console.log(this.state.profile.id)
    const formData = new FormData()
    formData.append('orbs', JSON.stringify(selected))
    formData.append("curUser", JSON.stringify(this.state.profile.id))
    authAxios.post(`${global.IP_CHANGE}/mySocialCal/blockUser`,
      formData
    ).then( res => {
      console.log('done')

    })
  }





  render(){
    console.log(this.props.smallGroups, 'groupgroup grup')

    const screenWidth = Math.round(Dimensions.get('window').width);

    let username = "";
    let userId = "";

    const data = this.state.profile.recentOrbs

    // you would use userId in this one

    return (
      <BackgroundContainer>
        <View style={styles.viewStyle}>
          <View style = {{
              justifyContent: 'center',
              alignItems:'center'}}>
            <TouchableOpacity
              style={{padding:10}}
              onPress = {() => this.onBack()}
              >
              <ArrowLeft
                stroke="black"
                width = {25}
                height = {25}
                 />
            </TouchableOpacity>

          </View>

            <View style={{justifyContent:'center', paddingLeft: 10}}>
              <Text style={styles.textStyle}>{this.state.profile.username}</Text>
            </View>

          <View style = {{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: '5%',
              top: '30%'
            }}>
            <TouchableOpacity
              onPress = {() => this.onOpenBlockingModal()}
              >
              <Shield />
            </TouchableOpacity>

          </View>


        </View>


        <FlatList
          ListHeaderComponent = {this.listHeader}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={data}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 25 }}
          keyExtractor={(item, index) => String(index)}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmptyContainer}

           />

         <BlockingModal
           onCancel = {this.onCloseBlockingModal}
           onAction = {this.onAlertBlock}
           visible = {this.state.showBlockingModal}
           yourGroup = {this.props.smallGroups}
           width = {350}
           title = {"Block this user"}
           information = {"Which orb do you want to block this user from?"}
           acceptText = {"Block"}
           cancelText = {"Cancel"}
            />
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
    smallGroups: state.auth.smallGroups,
    curId: state.auth.id,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    grabUserCredentials: () => dispatch(authActions.grabUserCredentials()),
    authSetActiveNewsfeedSlide: (index) => dispatch(authActions.authSetActiveNewsfeedSlide(index)),
  }
}

const styles = StyleSheet.create({
  backgroundColor: {
    flex:1,
    backgroundColor:"#1890ff"
  },
  profileInfoHeader: {
    flexDirection:'column',
     alignItems: 'center',
    justifyContent:'center',
  },
  container1: {
    alignItems: 'center',
    width: '100%',
    padding: 25,
    paddingLeft: 30,
    paddingRight: 30,

  },
  bioContainer:{
    marginTop: 5,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginTop: Constant.statusBarHeight,
    backgroundColor: "white"
  },
  socialCalContainer: {

    flex: Platform.OS === 'ios' ? 2: 3,

  },
  profileHeader: {

    width:'100%',


  },
  viewStyle: {

    height:50,
    paddingTop:0,
    flexDirection:'row',
    // shadowColor:'black',
    // shadowOffset:{width:0,height:2},
    // shadowOpacity:0.2,
    // elevation:4
  },
  textStyle:{
    fontSize:20,
    fontFamily:'Nunito-Bold',
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

  name:{
    fontSize: 20,
    color: "black",
    fontFamily:'Nunito-SemiBold',
  },
  username:{
    fontSize: 14,
    color: "gray",
    fontFamily:'Nunito-SemiBold',
  },
  bio: {
    fontSize: 15,
    fontFamily:'Nunito-SemiBold',
  }
})





export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
