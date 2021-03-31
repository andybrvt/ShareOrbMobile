import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView
 } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import Header from './Header';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import InfiniteScroll from './InfiniteScroll';
import { Avatar, BottomNavigation } from 'react-native-paper';
import * as dateFns from 'date-fns';



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

  constructor(props){
    super(props)
    this.initialiseSocialNewsfeed()



  }

  initialiseSocialNewsfeed(){

    console.log(dateFns.format(new Date(), "yyyy-MM-dd"))
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

  render(){

  
    return(
      <View style = {styles.container}>

      <Header {...this.props} />

      <ScrollView>

        <InfiniteScroll />
        <Text style = {{

          }}>
        Hello, {this.props.username}

        </Text>


        <Button
          title = "Logout"
          onPress = {() => this.handleLogOut()}
        />
      </ScrollView>





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
