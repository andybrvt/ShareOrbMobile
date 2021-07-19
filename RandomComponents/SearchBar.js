import React from 'react';
import { Text,
   View,
  Button,
  StyleSheet,
  TextInput
 } from 'react-native';
import axios from "axios";
import { ArrowUpCircle, Search, Plus, Menu } from "react-native-feather";
import { faSearch, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Avatar, BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
import { Settings } from "react-native-feather";


class SearchBar extends React.Component{

    render(){
      return (
        <View style = {{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
          }}>

          {/*
            <View style = {{
                flex:0.5,
                alignItems: 'center'
              }}>
              <Avatar.Image
                source = {{
                  uri: `${global.IMAGE_ENDPOINT}`+this.props.profilePic,
                }}
                size = {30}
              />
            </View>

            */}

          <View style = {{
              width: this.props.visible ? '75%' : '90%',
            }}>

            <View style = {styles.searchText}>

              <FontAwesomeIcon
                style={{marginRight:10, color: 'gray',left:20}}
                size = {12.5}
                icon={faSearch} />

              <TextInput
                onChangeText = {this.props.onChange}
                onFocus = {() => this.props.onOpen()}
                style={{
                  width: "80%",
                  // backgroundColor: 'yellow',
                  left:20}}
                underlineColorAndroid = "transparent"
                placeholder = "Search Chats"></TextInput>

            </View>
          </View>
          {
            this.props.visible ?

            <View style = {{
                width:'20%'
              }}>
              <Button
                onPress = {() => this.props.onClose()}
                color="white"
                title = "cancel"
                 />
            </View>

            : null
          }



        </View>
      )
    }
}




const styles = StyleSheet.create({
  searchText: {
    flexDirection: 'row',

    height: 40,
    backgroundColor: 'whitesmoke',
    borderRadius: 25,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    width:'100%',
    alignItems: 'center',


  },
  searchIcon: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: "center"
  },

  searchInput: {
    flex: 1,
    justifyContent: "center",
    flexDirection:'row'
  },


  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
})

const mapStateToProps = state => {
  return{
    chats: state.message.chats,
    profilePic: state.auth.profilePic
  }
}

export default connect(mapStateToProps, null)(SearchBar);
