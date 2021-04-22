import React from 'react';
import { Text,
   View,
  Button,
  StyleSheet,
  TextInput
 } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { Avatar, BottomNavigation } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpCircle, Search, Plus, Menu } from "react-native-feather";



// The first thing you want to do in making the chat is
// that you need to have a chat side panel which will show
// you all the chats that are avaliable, so this chats here will
// be simlar to the side menu in the chats of the website

// First you want to link up your chat sidepanel with its own websocket
// so that you can get incoming messages

// this will be used to show the list of chats
class Chats extends React.Component{

    getChatUserProfile(participantList){
      // This function will show the correct userProfile that you are chatting
      // with

      // There should jsut be 2 for here so not too much run time
      var profilePic = ""
      for(let i = 0; i<participantList.length; i++){
        if(participantList[i].id !== this.props.curId){
          profilePic = participantList[i].profile_picture
        }
      }

      return profilePic;

    }

    getChatUserName(participantList){
      // This function will show the correct name of the user that you are chatting
      // with

      var name = ""

      for(let i = 0; i<participantList.length; i++){
        if(participantList[i].id !== this.props.curId){
          name = global.CAPITALIZE(participantList[i].first_name)+ ' '
          +global.CAPITALIZE(participantList[i].last_name)
        }
      }

      if(name.length > 30){
        name = name.substring(0,30)+ "..."
      }
      return name;

    }


    chatDescription (str, senderObj, recentTime){
      // This fucntion will take in a string and check how long it is, if it is
      // passed a certain lenght you would just put ... at the end of it
      let finalStr = str
      console.log(recentTime)
      if(str.length > 20){
        finalStr = finalStr.substring(0,20)
        finalStr = finalStr+"..."
      }
      if(senderObj.id === this.props.curId){
        // This is if you sent the message
        finalStr = "You: "+finalStr
      } else {
        finalStr = finalStr
      }

      const timeStamp = this.renderTimestamp(recentTime)
      finalStr = finalStr +" - "+timeStamp
      return global.CAPITALIZE(finalStr)
    }

    renderTimestamp = timestamp =>{
      console.log(timestamp)
      let prefix = '';
      console.log(new Date().getTime())
      console.log(new Date(timestamp).getTime())
      const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)
      console.log(timeDiff)
      if (timeDiff < 1 ) {
        prefix = `now`;
      } else if (timeDiff < 60 && timeDiff >= 1 ) {
        prefix = `${timeDiff} min`;
      }else if (timeDiff < 24*60 && timeDiff > 60) {
        prefix = `${Math.round(timeDiff/60)}h`;
      } else if (timeDiff < 31*24*60 && timeDiff > 24*60) {
        prefix = `${Math.round(timeDiff/(60*24))}d`;
      } else {
          prefix = `${dateFns.format(new Date(timestamp), "MMMM d, yyyy")}`;
      }

      return prefix;
    }

    getGroupChatName(participantList){
      // This function will show the correct name of the group chats
      var names = ""
      let noCurUserList = []
      for(let i = 0; i < participantList.length; i++){
        console.log(participantList[i].first_name)
        if(participantList[i].id !== this.props.curId){
          const name = global.CAPITALIZE(participantList[i].first_name)+ ' '
          +global.CAPITALIZE(participantList[i].last_name)
          noCurUserList.push(name)
        }
      }

      if(noCurUserList.length <= 3){
        for (let i = 0; i < noCurUserList.length; i++){
          if(i === 0){
            names = names+noCurUserList[i]
          } else if(i === noCurUserList.length-1){
            if(noCurUserList.length === 2){
                names = names+" and "+noCurUserList[i]
            } else {
              names = names+" , and "+noCurUserList[i]
            }
          } else {
            names = names + ", "+ noCurUserList[i]
          }

        }


      } else {
        for (let i = 0; i < 2; i++){
          if(i === 0){
            names = names+noCurUserList[i]
          } else {
            names = names + ", "+ noCurUserList[i]
          }

        }

        names = names +", and "+(noCurUserList.length-2)+ " others"

      }



      console.log(noCurUserList)


      return names;
    }

  renderItem = ({item}) => {
    console.log('these are individual items')
    console.log(item)
    return (

      <View style = {styles.chatBox}>
        {
          item.participants.length === 2 ?

          <View style = {styles.chatInfoHolder} >
            <Avatar.Image
              source = {{
                url: `${global.IMAGE_ENDPOINT}`+this.getChatUserProfile(item.participants)
              }}
              size = {50}
               />
             <View style = {styles.chatInfo}>
               <View style = {styles.chatNameContainer}>
                 <Text style = {styles.chatName}>{this.getChatUserName(item.participants)}</Text>
                 <Text style = {styles.chatUsername}> {"@"+item.participants[1].username}</Text>
               </View>

               <Text style = {styles.chatText}>{this.chatDescription(item.recentMessage,
                        item.recentSender,
                        item.recentTime
                      )} </Text>
             </View>

          </View>

          :

          <View style = {styles.chatInfoHolder}>
            <FontAwesomeIcon
              size = {50}
              icon={faUsers} />

            <View style = {styles.chatInfo}>
              <Text style = {styles.chatName}>{this.getGroupChatName(item.participants)}</Text>
              <Text style = {styles.chatText}>{this.chatDescription(item.recentMessage,
                    item.recentSender,
                    item.recentTime
                    )}</Text>

            </View>

        </View>
        }

      </View>
    )
  }


  searchHeader = () => {
    // this function will be used to render the headers of the
    // chats

    return (
      <View style = {styles.chatHeaderContainer}>
        <View style = {styles.chatAvatar}>
          <Avatar.Image
            source = {{
              url: `${global.IMAGE_ENDPOINT}`+this.props.profilePic
            }}
            size = {40}
             />
        </View>
        <View style = {styles.chatChatText}>
          <Text style = {styles.chatWordText} >Chats</Text>
        </View>

        <View style = {styles.chatNew}>
          <Plus width= {30} height = {30} />
        </View>

      </View>
    )
  }

  searchBox = () => {
    // This function will be used to render the search of the chats


    return (
      <View style ={styles.searchText}>
        <View style = {styles.searchIcon}>
          <Search />

        </View>

        <View style = {styles.searchInput}>
          <TextInput
          underlineColorAndroid = "transparent"

          placeholder = "Search Chats" />

        </View>

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
      <SafeAreaView style = {styles.safeArea}>
        <View style = {styles.container}>

          <View style = {styles.chatHeaderHeader}>
            {this.searchHeader()}

            <View style = {styles.searchTextContainer}>
              {this.searchBox()}

            </View>

          </View>

          <FlatList
            data = {chatList}
            renderItem = {this.renderItem}
            keyExtractor={(item) => item.id}


            />
        </View>


      </SafeAreaView>

    )
  }
}

const mapStateToProps = state => {
  return{
    chats: state.message.chats,
    profilePic: state.auth.profilePic
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1890ff",
    flex: 1,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  chatBox: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
    padding: 15
  },
  chatInfoHolder:{
    display: 'flex',
    flexDirection: 'row'
  },
  chatInfo: {
    justifyContent: "center",
    marginLeft: 10
  },
  searchTextContainer:{
    padding: 10,
  },
  searchText: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50,
    backgroundColor: 'whitesmoke',
    borderRadius: 25,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  searchIcon: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: "center"
  },
  chatNameContainer: {
    flexDirection: "row"
  },
  chatName: {
    fontSize: 15,
    color: 'black',
    fontWeight: "600"
  },
  chatUsername: {
    fontSize: 10,
    color: 'gray',
    marginTop: 4,

  },
  chatText: {
    marginTop: 8,
    color: 'gray',
    fontWeight: '400'
  },
  chatHeaderContainer: {
    height: 60,
    flexDirection: 'row'
  },
  chatAvatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  chatChatText: {
    flex: 4,
    justifyContent: 'center',
  },
  chatWordText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  chatNew: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  searchInput: {
    flex: 5,
    justifyContent: "center"
  },
  chatHeaderHeader: {
    // backgroundColor: "white",

  }
})

export default connect(mapStateToProps, null)(Chats);
