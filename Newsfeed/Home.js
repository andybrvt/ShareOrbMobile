import React from 'react';
import { Text, View, Button } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';



class Home extends React.Component{


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

    console.log(this.props)
    return(
      <View>
        <Text style = {{
            position: "relative",
            left: "50%",
            top: 100
          }}>
        Hello, {this.props.username}

        </Text>
        <Button
          title = "Friends"
          onPress = {() =>this.props.navigation.navigate('Friends')}
        />

        <Button
          title = "Logout"
          onPress = {this.handleLogOut}
        />



      </View>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
