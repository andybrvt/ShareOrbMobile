import React from 'react';
import { Text,
   View,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,

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
              width: this.props.visible ? '75%' : '95%',
            }}>

            <View style = {styles.searchText}>

              <FontAwesomeIcon
                style={{marginRight:10, color: 'gray',left:20}}
                size = {12.5}
                icon={faSearch} />

              <TextInput
                autoCapitalize={false}
                value = {this.props.value}
                onChangeText = {this.props.onChange}
                onFocus = {() => this.props.onOpen()}
                style={{
                  width: "80%",
                  // backgroundColor: 'yellow',
                  left:20}}
                underlineColorAndroid = "transparent"
                placeholder = "Search"></TextInput>

            </View>
          </View>
          {
            this.props.visible ?

            <View style = {{
                width:'17.5%',
                left:10,
              }}>
              <TouchableWithoutFeedback onPress = {() => this.props.onClose()}>
                <View style={styles.editButton}>
                   <Text style={{color:'white',}}>Cancel</Text>
                 </View>
             </TouchableWithoutFeedback>
            </View>

            : null
          }



        </View>
      )
    }
}




const styles = StyleSheet.create({

  editButton: {

    alignItems: 'center',
    paddingVertical: 7.5,

    borderRadius: 5,
    backgroundColor: '#1890ff',

    alignItems: "center",
    backgroundColor: "#1890ff",
    padding: 10
  },


  searchText: {
    flexDirection: 'row',

    height:37.5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
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
