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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import LoadingBar from '../RandomComponents/LoadingBar';

class NewsfeedView extends React.Component{


  state={
    username: '',
    id: '',
    postShow:false,
    eventShow:false,
    upperStart: 6
  }

  handleLogOut = () => {
    this.props.logout()
    // this.props.navigation.navigate("Login")
  }



  ViewProfile = () => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption

    this.props.navigation.navigate("ViewProfile")
  }

  constructor(props){
    super(props)
    if(this.props.isAuthenticated){
      this.initialiseSocialNewsfeed()

    }



  }

  initialiseSocialNewsfeed(){

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

  componentDidUpdate(prevProps){

    const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
    WebSocketSocialNewsfeedInstance.disconnect()
    if(this.props.isAuthenticated){
      this.waitForSocialNewsfeedSocketConnection(() => {
            // Fetch stuff here
        WebSocketSocialNewsfeedInstance.fetchSocialPost(
          this.props.id,
          curDate,
          this.state.upperStart)

      })
      WebSocketSocialNewsfeedInstance.connect()
    }

  }

  ComponentWillUnmount(){
    // WebSocketSocialNewsfeedInstance.disconnect()

  }

  render(){
    console.log('here are the props')
    console.log(this.props)

    return(

      <BackgroundContainer>
        <LoadingBar
          step = {1}
          steps = {10}
          height = {20} />
        <Header {...this.props} />

        <ScrollView>


          <InfiniteScroll
            onPagePost = {this.onPagePost}
            ViewProfile={this.ViewProfile}
            />


          <Button
            title = "Logout"
            onPress = {() => this.handleLogOut()}
          />
        </ScrollView>


      </BackgroundContainer>







    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"whitesmoke"
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#1890ff"
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
