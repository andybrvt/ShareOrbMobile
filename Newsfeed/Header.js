import React from 'react';
import { Text, View, Button, StyleSheet,TextInput, TouchableWithoutFeedback } from 'react-native';
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

const {interpolate, interpolateColors, Extrapolate, diffClamp, cond, lessOrEq} = Animated;


class Header extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: false, // control what ever to render the searchbar or just the icon
    };
  }


  handleSearch = () => {
    this.setState({
      showSearchBar: !this.state.showSearchBar,
    });
  }
  handleLogOut = () => {
    this.props.logout()
    this.props.navigation.navigate("Login")
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
    const opacity = interpolate(final, {
      inputRange: [0, 200],
      outputRange: [ 1, 0],
      extrapolateRight: Extrapolate.CLAMP,
    });

    const translateY = interpolate(final, {
      inputRange: [0, 200],
      outputRange: [ 0, -80],
      extrapolateRight: Extrapolate.CLAMP,

    })
    const backgroundGradient = interpolateColors(y, {
      inputRange: [0, 400, 600],
      outputColorRange: ["rgba(0, 0, 0, 0.85)", "skyblue", "white"],

    })



    return(

      <View style = {{
          zIndex: 99,
          height:0
        }}>
      <Animated.View
        style = {[styles.container,{
          // opacity: opacity,
          zIndex: 99,

        }]}>


        <Animated.View style = {{
          flexDirection: "row",
          flex: 1,
          backgroundColor: "white",
          height: 50,
          position: 'absolute',
          width: "100%",


          }}>
          <View style = {styles.logoContainer}>
             <MainLogo1 width = {120}/>
          </View>
          <View style = {styles.searchProfileContainer}>
            {/*
              <MessageCircle
                onPress = {() => this.props.navigation.navigate("Messages")}
                style={{right:25}}
                stroke="black" strokeWidth={2.5} width={22.5} height={22.5} />
              */}
            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate("Notifications")}>
            <Bell
               strokeWidth={2.5} width={27} height={27} />
            </TouchableOpacity>
          </View>
        </Animated.View>

      </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"red",
    position: "relative",
    // shadowOffset:{  width: 0,  height: 2,  },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
    elevation:3,
    borderBottomWidth: 5,
    borderBottomColor: "gray",
  },
  logoContainer: {
    flex: 6,
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

    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue'
  }
})
//
// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//     token: state.auth.token,
//     username: state.auth.username,
//     id: state.auth.id,
//
//
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     logout: () => dispatch(authActions.logout())
//
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default(Header);
