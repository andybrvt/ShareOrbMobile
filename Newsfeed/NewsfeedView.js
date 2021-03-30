import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import Header from './Header';




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
    this.props.navigation.navigate("Login")
  }

  render(){

    return(
      <View style = {styles.container}>

      <Header />
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


  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedView);
