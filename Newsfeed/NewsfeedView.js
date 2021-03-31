import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import Header from './Header';

import { Avatar, BottomNavigation } from 'react-native-paper';



class NewsfeedView extends React.Component{


  // componentDidMount(){
  //     axios.get("http://127.0.0.1:8000/userprofile/testMobileView")
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err =>{
  //       console.log(err)
  //     })
  // }
  handleLogOut = () => {
    this.props.logout()
    // this.props.navigation.navigate("Login")
  }

  render(){

    console.log(this.props)
    return(
      <View style = {styles.container}>

      <Header {...this.props} />
        <Text style = {{
            position: "relative",
            left: "50%",
            top: 100
          }}>
        Hello, {this.props.username}

        </Text>


        <Button
          title = "Logout"
          onPress = {() => this.handleLogOut()}
        />




      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"whitesmoke"
  }
})

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    username: state.auth.username,
    id: state.auth.id,
    profilePic: state.auth.profilePic


  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedView);
