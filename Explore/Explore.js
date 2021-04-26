import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../RandomComponents/SearchBar';

// This class will be in charge of managing the explore page,
// the end goal is to show people and a way to find people
// or just browse through cool stuff that happens through out
// the current day
class Explore extends React.Component{

  // So you would need a search here to search up people
  // So you want to render the people's day here and since
  // this is not really interacting with other people it will
  // just be the different days that are happening today and
  // and other people

  // so you are gonna need a search and maybe show trending days
  // and then trending people


  render(){
    return  (
      <SafeAreaView style = {styles.safeArea}>

        <View style = {styles.container}>

          <View style = {styles.searchHeader}>
            <SearchBar />
          </View>


          <Text> This will be the explore page</Text>
        </View>

      </SafeAreaView>

    )
  }
}

export default Explore;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1890ff",
    flex: 1,
  },
  container:{
    backgroundColor: "white",
    flex: 1,
  },
  searchHeader:{
    padding: 10,
  }
})
