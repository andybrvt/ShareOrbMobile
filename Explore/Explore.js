import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
  } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../RandomComponents/SearchBar';

const {width, height} = Dimensions.get('screen')
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

        <ScrollView style = {styles.container}>

          <View style = {styles.topTextContianer}>
            <Text style = {styles.topText}> What's everyone doing?</Text>
          </View>

          <View style = {styles.searchHeader}>
            <SearchBar />
          </View>

          <View style = {styles.trendingContainer}>
            <View style = {styles.trendingTextContainer}>
                <Text style = {styles.trendingText}>Trending Days</Text>
            </View>

            <View style = {styles.trendingDaysContainer}>
              <ScrollView
                horizontal = {true}
                style = {{height: "100%"}}>

                <View style = {styles.picBoxContainer}>
                  <View>

                  </View>

                  <View>
                    <Text> some text here</Text>
                  </View>
                </View>
              </ScrollView>

            </View>
          </View>

          <Text> This will be the explore page</Text>
        </ScrollView>

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
    padding: 20,
  },
  topText: {
    color: 'black',
    fontSize: 45,
    fontWeight: "bold"
  },
  topTextContianer:{
    backgroundColor: "white",
    padding: 20
  },
  trendingContainer:{
    flex: 1,
    backgroundColor: "pink",
    height: height * 0.57,

  },
  trendingTextContainer:{
     padding: 20,

  },
  trendingText: {
    color: "black",
    fontSize: 17,
    fontWeight: 'bold'
  },
  trendingDaysContainer: {
    height: "75%",
    backgroundColor: 'orange'
  },
  picBoxContainer: {
    height: 250,
    width: 170,
    backgroundColor: "red"
  }

})
