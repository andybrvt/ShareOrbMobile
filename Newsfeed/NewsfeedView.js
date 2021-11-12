import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  processColor,
  FlatList,
  Modal
 } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import { connect } from 'react-redux';
import Header from './Header';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import InfiniteScroll from './InfiniteScroll';
import { Avatar, BottomNavigation } from 'react-native-paper';
import * as dateFns from 'date-fns';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import LoadingBar from '../RandomComponents/LoadingBar';
import AdjModal from '../RandomComponents/AdjModal';
import AppIntro from '../Login/AppIntro';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import InfiniteScrollFlat from './InfiniteScrollFlat';
import NewsfeedComment from './NewsfeedComment';
import { LinearGradient } from 'expo-linear-gradient';
import PersonalNewsFeed from './PersonalNewsFeed';
import authAxios from '../util';
import * as Progress from 'react-native-progress';
import FirstPost from './FirstPost';
import NearOrbButton from './NearOrbButton';
import SwipeInfiniteScrollHolder from './SwipeInfiniteScrollHolder';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import GlobeGroup from './GlobeGroup/GlobeGroup';
import { Globe, Map } from "react-native-feather";
import * as Location from 'expo-location';
import * as globeGroupActions from '../store/actions/globeGroup';



const { Clock, interpolateColors, Extrapolate, cond, sub,divide, eq, add, call, set, Value, event, or } = Animated;
const height = Dimensions.get('window').height
class NewsfeedView extends React.Component{
  y = new Value(0);
  color = new Value(0);
  handleLogOut = () => {
  this.props.logout()
    // this.props.navigation.navigate("Login")
  }

  changeFeed = () => {
    this.setState({
      newsFeedCondition: !this.state.newsFeedCondition,
    });

  }

  connectToLocation = async() => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    this.setState({
      showLocationModal:false
    })

    let location = await Location.getCurrentPositionAsync({});
    return location
  }

  getLocationPermission = async() => {


    const permission = await Location.getForegroundPermissionsAsync()

    if(permission.granted === false){
      this.setState({
        showLocationModal: true
      })

    } else {
      // if you already have it then run the interval command
      // this.interval = setInterval(() => this.locationChecker(), 10000)
      this.locationChecker()

    }

  }

  locationChecker = async() => {
    // this function will check for the closes orbs within a 5 mile radius
    // and then return it,

    console.log('how many times does this run')
    this.setState({
      loading: true
    })
    const location = await this.connectToLocation()

    // now put a backend call function so that you can grab the nears orb
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/getClosestOrb`, {
      params: {
        lat: location.coords.latitude,
        long: location.coords.longitude
      }
    })
    .then(res => {

      // Now you put in redux

      if(res.data !== false){
        this.props.addCloseOrb(res.data)

        this.setState({
          loading: false
        })

      } else {
        // set the thing to false
        this.props.nullCloseOrb()

        this.setState({
          loading: false
        })

      }


    })
  }



  componentDidMount(){

    // this.connectToLocation()

    this.getLocationPermission()


  }


  ViewProfile = (username) => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    if(username !== this.props.username){
      this.props.navigation.navigate("ProfilePage", {
        username: username
      })
    } else {
      this.props.navigation.navigate("Profile")
    }

  }

  constructor(props){
    super(props)
    this.state={
      username: '',
      id: '',
      postShow:false,
      eventShow:false,
      upperStart: 6,
      newsFeedCondition:true,
      showLocationModal: false,
      loading: false
    }
    this.myRef = React.createRef();
    this.commentRef = React.createRef();
    if(this.props.isAuthenticated){

      // this only hits once
      // this.initialiseSocialNewsfeed()
    }
  }




  initialiseSocialNewsfeed(){

    const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
    // use to initialize the social newsfeed
    this.waitForSocialNewsfeedSocketConnection(() => {
      // You will fetch the social cotnent type here
      WebSocketSocialNewsfeedInstance.fetchSocialPost(
        this.props.id,
        curDate,
        this.state.upperStart
      )
    })
    WebSocketSocialNewsfeedInstance.connect()

  }

  waitForSocialNewsfeedSocketConnection(callback){
  const component = this
  setTimeout(
    function(){
      if(WebSocketSocialNewsfeedInstance.state() === 1){
        callback()
        return;
      } else {
        component.waitForSocialNewsfeedSocketConnection(callback);
      }
    }, 100)
}

  componentDidUpdate(prevProps){

    if(prevProps !== this.props){
      const curDate = dateFns.format(new Date(), "yyyy-MM-dd")

      // WebSocketSocialNewsfeedInstance.disconnect()
      if(this.props.isAuthenticated){
        // this.waitForSocialNewsfeedSocketConnection(() => {
        //       // Fetch stuff here
        //   WebSocketSocialNetruewsfeedInstance.fetchSocialPost(
        //     this.props.id,
        //     curDate,
        //     this.state.upperStart)
        // })
        // WebSocketSocialNewsfeedInstance.connect()
      }


    if(this.props.curLoad >= this.props.totalLoad && this.props.totalLoad > 0){
      setTimeout(() => {
        this.props.authZeroTotalLoad()
        this.props.authZeroCurLoad()
      }, 2000)
      }


    }

  }

  ComponentWillUnmount(){
    // WebSocketSocialNewsfeedInstance.disconnect()
    clearInterval(this.interval)
  }


  unShow = () => {
    authAxios.post(`${global.IP_CHANGE}`+'/userprofile/unShowIntialInstructions/'+this.props.id)
    .then(res => {
      this.props.unShowIntialInstructions(false)
    })
    .catch(err => {
      alert(err)
    })

  }


  onSwipeLeft(gestureState) {
    this.props.navigation.navigate("Explore")
   }

   onSwipeRight(gestureState) {
     this.props.navigation.navigate("Test1")
   }


   onCloseLocationModal = () => {
     this.setState({
       showLocationModal: false
     })
   }

   onOpenLocationModal = async() => {

     await this.locationChecker()
     // this.interval = setInterval(() => this.locationChecker(), 10000)
     this.locationChecker()


   }






  render(){

    return(


        <BackgroundContainer>


          {
            this.props.showFirstPostModal ?
            <FirstPost
              visible = {this.props.showFirstPostModal}
              unShow = {this.props.authUnshowFirstPostModal}
              show = {this.props.authShowFirstPostModal}
               />
             :
             null
          }

          <View style = {{
              flex: 1,
            }}>

          <GlobeGroup
            navigation = {this.props.navigation}
             />


          </View>

          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 0, y: 1}}
            style = {{
              position: 'absolute',
              width: '100%',
              bottom: '0%',
              height: "12%",
            }}
            colors = {['transparent', '#000000']}>
          </LinearGradient>

          {/*
            <Animated.View
              style = {{
                // backgroundColor: backgroundGradient
              }}
              >
              <SwipeInfiniteScrollHolder
                // navGroupIDCondition={navGroupIDCondition}
                // test={test}
                navigation = {this.props.navigation}
                smallGroups = {this.props.smallGroups}
                curLoad = {this.props.curLoad}
                activeSlide = {this.props.activeSlide}
                setNull = {this.props.authSetActiveNewsfeedSlideNull}
                 />

            </Animated.View>


            */}

            {
              this.state.loading ?

              <NearOrbButton
                loading = {true}
                orb = {this.props.closeOrb}
                navigation = {this.props.navigation}
                 />

               :

              this.props.closeOrb ?

              <NearOrbButton
                loading = {false}
                orb = {this.props.closeOrb}
                navigation = {this.props.navigation}
                 />

              :

              <View style = {{
                  position: 'absolute',
                  alignSelf: 'center',
                  bottom: '5%',
                }}>
                <Text style = {{color:'white', fontSize: 30}}>|</Text>
              </View>

            }

            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate("Explore")}
               style = {{
                position: 'absolute',
                bottom: '5%',
                right: '23%'
              }}>
              <Globe
                stroke = "white"
                width = {37.5}
                height = {37.5}
                 />
             </TouchableOpacity>
             {/*
            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate("Test1")}
              style = {{
                position: 'absolute',
                bottom: '5%',
                left: '23%'
              }}>
              <Map
                stroke = "white"
                width = {40}
                height = {40}

                 />
             </TouchableOpacity>
             */}

             <AdjModal
               onCancel = {this.onCloseLocationModal}
               onAction = {this.onOpenLocationModal}
               visible = {this.state.showLocationModal}
               width = {300}
               title = {"Enable Location?"}
               information = {"You can only post if you are within 1 mile of an orb. We use your location to find avaliable businesses near you and thus allowing you to post direct to them."}
               acceptText = {"Allow location"}
               cancelText = {"Do not allow location"}
                />



        </BackgroundContainer>




    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"whitesmoke"
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#1890ff"
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  cameraButton:{
    position: 'absolute',
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    bottom: 15,
    backgroundColor: 'pink'
  }

})

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    username: state.auth.username,
    id: state.auth.id,
    profilePic: state.auth.profilePic,
    following: state.auth.following,
    curLoad: state.auth.curLoad,
    totalLoad: state.auth.totalLoad,
    showNewsfeedComments: state.socialNewsfeed.showNewsfeedComments,
    showIntialInstructions: state.auth.showIntialInstructions,
    notificationSeen: state.auth.notificationSeen,
    showFirstPostModal: state.auth.showFirstPostModal,
    smallGroups: state.auth.smallGroups,
    groupPosts: state.smallGroups.groupPosts,
    curLoad: state.auth.curLoad,
    activeSlide: state.auth.activeSlide,
    closeOrb: state.globeGroup.closeOrb
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout()),
    authZeroCurLoad: () => dispatch(authActions.authZeroCurLoad()),
    authZeroTotalLoad: () => dispatch(authActions.authZeroTotalLoad()),
    newsFeedCommentSec: () => dispatch(socialNewsfeedActions.newsFeedCommentSec()),
    unShowIntialInstructions: (bool) => dispatch(authActions.unShowIntialInstructions(bool)),
    authShowFirstPostModal: () => dispatch(authActions.authShowFirstPostModal()),
    authUnshowFirstPostModal: () => dispatch(authActions.authUnshowFirstPostModal()),
    authSetActiveNewsfeedSlideNull: () => dispatch(authActions.authSetActiveNewsfeedSlideNull()),
    addCloseOrb: (orb) => dispatch(globeGroupActions.addCloseOrb(orb)),
    nullCloseOrb: () => dispatch(globeGroupActions.nullCloseOrb()),


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedView);
