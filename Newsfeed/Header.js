import React from 'react';
import { Text, View, Button, StyleSheet,TextInput } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import Constant from 'expo-constants';
import MainLogo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from 'react-native-paper';
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { Search, Bell} from "react-native-feather";
import Animated from 'react-native-reanimated';

const {interpolate, Extrapolate, diffClamp, cond, lessOrEq} = Animated;


class Header extends React.Component{


  handleLogOut = () => {
    this.props.logout()
    this.props.navigation.navigate("Login")
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
      outputRange: [ 0, -50],
      extrapolateRight: Extrapolate.CLAMP,

    })




    return(
      <Animated.View
        style = {[styles.container,{
          opacity: opacity,
          zIndex: 99
        }]}>

        <Animated.View style = {{
          flexDirection: "row",
          flex: 1,
          zIndex: 999,
          backgroundColor: 'white',
          height: 50,
          position: 'absolute',
          width: "100%",
          transform: [{
            translateY: translateY
          }]
          }}>
          <View style = {styles.logoContainer}>
             <MainLogo width = {125}/>
          </View>
          <View style = {styles.searchProfileContainer}>
              <Search stroke="black" strokeWidth={2.5} width={20} height={20} />

              <Bell stroke="black" strokeWidth={2.5} width={20} height={20} />

          </View>

        </Animated.View>

      </Animated.View>
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
    elevation:1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: ,
    // backgroundColor: "red",
    paddingLeft: "2%"
  },
  logo: {
    position: "relative"
  },
  searchProfileContainer: {
    // flex: 1,
    justifyContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "25%",
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
