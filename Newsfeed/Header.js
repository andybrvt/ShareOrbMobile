import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
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

    return(
      <View style = {styles.container}>
        <View style = {styles.logoContainer}>
           <MainLogo width = {125}/>
        </View>
        <View style = {styles.searchProfileContainer}>
            <Search stroke="black" strokeWidth={2.5} width={22.5} height={22.5} />

            <Bell stroke="black" strokeWidth={2.5} width={22.5} height={22.5} />

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    backgroundColor:"white",
    // shadowOffset:{  width: 0,  height: 2,  },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
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
