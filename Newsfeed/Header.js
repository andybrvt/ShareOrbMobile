import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import Constant from 'expo-constants';
import MainLogo from '../logo.svg';



class Header extends React.Component{


  handleLogOut = () => {
    this.props.logout()
    this.props.navigation.navigate("Login")
  }

  render(){

    return(
      <View style = {styles.container}>
        <View style = {styles.logoContainer}>
           <MainLogo height = {50}/>
        </View>
        <View style = {styles.searchProfileContainer}>
          <Text> this will be the search and the profile</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    height: 60,
    backgroundColor:"blue",
    flexDirection: "row"
  },
  logoContainer: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    position: "relative"
  },
  searchProfileContainer: {
    flex: 1,
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
