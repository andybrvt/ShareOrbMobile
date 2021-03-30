import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import Constant from 'expo-constants';
import MainLogo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons'



class Header extends React.Component{


  handleLogOut = () => {
    this.props.logout()
    this.props.navigation.navigate("Login")
  }

  render(){

    return(
      <View style = {styles.container}>
        <View style = {styles.logoContainer}>
           <MainLogo width = {150}/>
        </View>
        <View style = {styles.searchProfileContainer}>
          <FontAwesomeIcon
            size = {25}
            icon={faSearch} />

          <FontAwesomeIcon
            size = {25}
            icon={faBell} />

          <FontAwesomeIcon
            size = {25}
            icon={faUserCircle} />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    height: 60,
    flexDirection: "row",
    backgroundColor:"white"
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
    width: "30%",
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
