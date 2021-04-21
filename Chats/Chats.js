import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import { FlatList } from "react-native-bidirectional-infinite-scroll";



// The first thing you want to do in making the chat is
// that you need to have a chat side panel which will show
// you all the chats that are avaliable, so this chats here will
// be simlar to the side menu in the chats of the website

// First you want to link up your chat sidepanel with its own websocket
// so that you can get incoming messages

// this will be used to show the list of chats
class Chats extends React.Component{



  renderItem = ({item}) => {
    console.log('these are individual items')
    console.log(item)
    return (
      <View>
        <Text> test</Text>
      </View>
    )
  }

  render(){

    let chatList = []
    let seenList = []

    if(this.props.chats){
      chatList = this.props.chats
    }

    // You are gonna use a flat list for this chat
    return (
      <View>

        <FlatList
          data = {chatList}
          renderItem = {this.renderItem}
          keyExtractor={(item) => item.id}


          />
      </View>


    )
  }
}

const mapStateToProps = state => {
  return{
    chats: state.message.chats,
  }
}

export default connect(mapStateToProps, null)(Chats);
