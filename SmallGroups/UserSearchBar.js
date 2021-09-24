import React from 'react';
import { Text,
   View,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity
 } from 'react-native';
import axios from "axios";
import { ArrowUpCircle, Search, Plus, Menu, ArrowLeft } from "react-native-feather";
import { faSearch, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Avatar, BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
import { Settings } from "react-native-feather";


class UserSearchBar extends React.Component{

  render(){
    return (
      <View style = {{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
        }}>

        <View style = {{
            width:'8%',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress = {() => this.props.onClose()}>
            <ArrowLeft
              stroke="black"
              height = {27.5}
              width = {27.5}
              />
         </TouchableOpacity>
        </View>

        <View style = {{
            width:'85%',
            marginLeft: 10
          }}>
          <View style = {styles.searchText}>
            <FontAwesomeIcon
              style={{marginRight:10, color: 'gray',left:20}}
              size = {12.5}
              icon={faSearch} />
            <TextInput
              autoCapitalize="none"
              value = {this.props.value}
              onChangeText = {this.props.onChange}
              // onFocus = {() => this.props.onOpen()}
              style={{
                width: "82.5%",
                fontFamily:'Nunito-SemiBold',
                left:20
              }}
              underlineColorAndroid = "transparent"
              placeholder = "Search"></TextInput>
          </View>
        </View>


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



export default UserSearchBar;
