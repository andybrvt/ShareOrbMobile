import React from 'react';
import { Text,
   View,
  Button,
  StyleSheet,
  TextInput
 } from 'react-native';
import axios from "axios";
import { ArrowUpCircle, Search, Plus, Menu } from "react-native-feather";


class SearchBar extends React.Component{




    render(){
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
}


export default SearchBar;

const styles = StyleSheet.create({
  searchText: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 45,
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

  searchInput: {
    flex: 5,
    justifyContent: "center"
  },
})
