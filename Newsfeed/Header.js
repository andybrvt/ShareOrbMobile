import React from 'react';
import { Text, Dimensions, View, Button, StyleSheet,TextInput,Switch, TouchableWithoutFeedback } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import Constant from 'expo-constants';
import MainLogo from '../logo.svg';
import MainLogo1 from '../logo1.svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from 'react-native-paper';
import { Search, Bell, MessageCircle, BookOpen, Sunrise} from "react-native-feather";
import Animated from 'react-native-reanimated';
import * as Progress from 'react-native-progress';
import SmallGroupHolder from './SmallGroupHolder';


const {interpolate, interpolateColors, Extrapolate, diffClamp, cond, lessOrEq} = Animated;
const width = Dimensions.get("window").width


class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: false, //
      isEnabled:false,
    };
  }

  toggleSwitch = () => {
    this.setState({
      isEnabled:!this.state.isEnabled,
    })
  }

  handleSearch = () => {
    this.setState({
      showSearchBar: !this.state.showSearchBar,
    });
  }

  ViewNoti = () => {
    this.props.navigation.navigate("Notifications")
  }

  ViewChats = () => {
    this.props.navigation.navigate("Notifications")
  }


  render(){

    let profilePic = ""
    if(this.props.profilePic){
      profilePic = `${global.IMAGE_ENDPOINT}`+this.props.profilePic
    }
    const y = this.props.y;
    const diff = diffClamp(y, 0, 200)
    const final = cond(lessOrEq(y, 0.1), y, diff)
    // const opacity = interpolate(final, {
    //   inputRange: [0, 200],
    //   outputRange: [ 1, 0],
    //   extrapolateRight: Extrapolate.CLAMP,
    // });
    // const translateY = interpolate(final, {
    //   inputRange: [0, 200],
    //   outputRange: [ 0, -80],
    //   extrapolateRight: Extrapolate.CLAMP,
    // })
    // const backgroundGradient = interpolateColors(y, {
    //   inputRange: [0, 400, 600],
    //   outputColorRange: ["rgba(0, 0, 0, 0.85)", "skyblue", "white"],
    // })

    return(



        <Animated.View style = {{
          flexDirection: "column",
          flex: 1,
          backgroundColor: Platform.OS === "ios" ? "white" : "white",
          // height: 70,
          height: 130,
          position: 'absolute',
          width: "100%",
          }}>

          <Progress.Bar
            animationType = "timing"
            borderWidth = {0}
            style = {{
              position: 'absolute',
              bottom: '0%',
              left: 0,
            }}
            progress = {this.props.curLoad} width = {width}
             />

           <View style = {{
             flexDirection: "row",
             height: 70,
             }}>
             <View style = {styles.logoContainer}>
                <MainLogo1 width = {120}/>
             </View>
             {/*
             <View style = {styles.testWhere2}>
                    <Text style = {styles.videoFooterUserName}>
                      {this.props.currentMonth}
                    </Text>
                    <Text style = {styles.dayNumTag}>
                      {this.props.currentDay}
                    </Text>
             </View>
             */}

           </View>

           <View>
             <SmallGroupHolder />
           </View>




        </Animated.View>







    )
  }
}

const styles = StyleSheet.create({

  testWhere2:{
    position:'absolute',
    padding:10,
    right:0,
    width:'30%',
    flexDirection:'column',
    alignItems:'center',
  },
  loginBtn: {
    position: "relative",
    marginRight:10,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#1890ff",
  },

  notiCircle: {
    position:'absolute',
    height: 10,
    width: 10,
    borderRadius: 1000,
    backgroundColor:'red',
  },
  container: {
    flex: 1,
    position: "relative",
    // shadowOffset:{  width: 0,  height: 2,  },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
    backgroundColor: 'red',
    height: 20,
    elevation:3,
    borderBottomWidth: 5,
    borderBottomColor: "gray",
  },
  logoContainer: {
    flex: 3,
    justifyContent: "center",
    // alignItems: ,
    // backgroundColor: "red",
    paddingLeft: "2%"
  },
  logo: {
    position: "relative"
  },
  searchProfileContainer: {
    flex: 1,

    flexDirection: "row",
    marginRight:25,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue'
  },
  dayNumTag: {
    color:'#1890ff',
    fontSize:30,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowColor: 'black',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 5,
    fontFamily:'Nunito-Bold',
    // fontWeight:'bold',

  },
  videoFooterUserName: {
    color:'#1890ff',
    fontSize:15,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowColor: 'black',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 5,
    fontFamily:'Nunito-Bold',
    // fontWeight:'bold',
  },
})


export default(Header);
