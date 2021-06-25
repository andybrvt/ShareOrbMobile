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
        <View style ={styles.searchText}>
          <Avatar.Image
            source = {{
              uri: `${global.IMAGE_ENDPOINT}`+this.props.profilePic,
            }}
            style={{right:10}}
            size = {30}
          />
          <View style = {styles.searchText}>

            <FontAwesomeIcon
              style={{marginRight:10, color: 'gray',left:20}}
              size = {12.5}
              icon={faSearch} />

            <TextInput
              style={{left:20}}
            underlineColorAndroid = "transparent"
            placeholder = "Search Chats"></TextInput>

          </View>

            <Settings style={{marginLeft:10}} stroke="#1890ff"
               strokeWidth={2.5}
               width={22.5}
               height={22.5}
            />

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
    flex: 2,
    width:'100%',
    flexDirection: 'row',
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
