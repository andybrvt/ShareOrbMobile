import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
   FlatList
  } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../RandomComponents/SearchBar';
import  authAxios from '../util';
import PictureBox from './PictureBox';


const {width, height} = Dimensions.get('screen')
// This class will be in charge of managing the explore page,
// the end goal is to show people and a way to find people
// or just browse through cool stuff that happens through out
// the current day


// For this you dont really need real time because you are really not interacting
// with new people but rather just see the trending stuff, so axios calls should
// be ok

class Explore extends React.Component{

  constructor(props){
    super(props)
  }

  state = {
    trendingCells: [],
    exploreCells: []
  }
  // So you would need a search here to search up people
  // So you want to render the people's day here and since
  // this is not really interacting with other people it will
  // just be the different days that are happening today and
  // and other people

  // so you are gonna need a search and maybe show trending days
  // and then trending people

  componentDidMount(){
    // so you want to pull the information here like all the trending
    // social cal cell and people
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/trendingDay`)
    .then( res => {
      this.setState({

        trendingCells: res.data
      })
    })

    authAxios.get(`${global.IP_CHANGE}/mySocialCal/exploreDay`)
    .then( res => {
      this.setState({
          exploreCells: res.data
      })

    })
  }

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
                <Text style = {styles.trendingText}>Trending Days Today</Text>
            </View>

            <View style = {styles.trendingDaysContainer}>
              <ScrollView
                showsHorizontalScrollIndicator={false}

                horizontal = {true}
                style = {{height: "100%"}}>

              {this.state.trendingCells.map((cell, key) => {
                return(
                  <View style = {styles.spacedSpace}>
                    <PictureBox cell = {cell} index = {key}/>
                  </View>

                )
              })}


              </ScrollView>

            </View>

          </View>

          <View style = {styles.exploreTheDayContainer}>
            <View style = {styles.topTextContianer}>
              <Text style = {styles.trendingText}> Explore the Day</Text>
            </View>

            <View style = {styles.twoColContainer}>
              {this.state.exploreCells.map((cell, key) => {
                return(
                  <View style = {styles.spacedSpace}>
                    <PictureBox cell = {cell} index = {key}/>
                  </View>

                )
              })}

            </View>

          </View>


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
    height: height * 0.46,

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
    height: "82%",
  },
  spacedSpace:{
    padding: 10,
  },
  exploreTheDayContainer: {

  },
  twoColContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "flex-start",
    justifyContent:'center'
  }

})
