import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
   FlatList,
   TouchableHighlight,
   TextInput
  } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../RandomComponents/SearchBar';
import  authAxios from '../util';
import PictureBox from './PictureBox';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Tag, Bookmark, MapPin, Search, ChevronRight} from "react-native-feather";

const {width, height} = Dimensions.get('screen')
// This class will be in charge of managing the explore page,
// the end goal is to show people and a way to find people
// or just browse through cool stuff that happens through out
// the current day
import { Icon, Grid } from 'antd-mobile';

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
    axios.get(`${global.IP_CHANGE}`+'/mySocialCal/trendingDay')
    .then( res => {
      this.setState({

        trendingCells: res.data
      })
    })

    axios.get(`${global.IP_CHANGE}/mySocialCal/exploreDay`)
    .then( res => {
      this.setState({
          exploreCells: res.data
      })

    })
  }








  render(){

    return  (

      <BackgroundContainer>

        {/*

          <View style={{flexDirection:'column', flex:1}}>
            <View style={{flex:1, backgroundColor:'red'}}><Text>hi</Text></View>
            <View style={{flex:1, backgroundColor:'blue'}}></View>
            <View style={{flex:1}}></View>
          </View>

        */}
        <ScrollView>
        <View style={{flexDirection:'column', flex:1}}>

            <View style={styles.passwordContainer}>
              <View style={{backgroundColor:'#f0f0f0', width:'97.5%', flexDirection:'row', borderRadius:10, padding:5,}}>
              <Search style={{top:6, left:10}} stroke="#8c8c8c" strokeWidth={2.5} width={17.5} height={17.5}   />
              <TextInput
                style={styles.inputStyle}
                  autoCorrect={false}
                  secureTextEntry
                  placeholder="Search"
                  value={this.state.password}
                  onChangeText={this.onPasswordEntry}
                />
              </View>

  </View>


          <View style = {styles.trendingContainer}>
            <View style = {styles.trendingTextContainer}>
                <Text style = {styles.trendingText}>Trending
                  <View>
                <ChevronRight stroke="gray" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
                </View>
                </Text>


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
            <View style = {styles.trendingTextContainer}>
              <Text style = {styles.trendingText}> Suggested</Text>
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
        </View>
      </ScrollView>

      </BackgroundContainer>



    )
  }
}

export default Explore;

const styles = StyleSheet.create({
  passwordContainer: {
  flexDirection: 'row',


  padding: 20,
},
inputStyle: {
  paddingLeft:15,
  flex: 1,
},


  searchContainer: {
    flex:1,
   paddingLeft: 40,
   top:20,
   fontSize:15,
   padding:10,

    backgroundColor: "#f0f0f0",
    borderRadius:10,
 },
  safeArea: {
    backgroundColor: "#1890ff",
    flex: 1,
  },
  containerContainer: {
    flex:1,
    backgroundColor: 'white'
  },
  container:{
    // backgroundColor: "red",

  },

  topText: {
    color: 'black',
    fontSize: 45,
    fontWeight: "bold"
  },
  suggestedContainer:{
    // backgroundColor: "white",

    padding: 20
  },
  searchHeader:{

    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor:'red',
  },
  trendingContainer:{
    flex: 1,
    // flexDirection:'row',
    // backgroundColor:'green',

  },
  exploreTheDayContainer: {
    flex:2,
    // backgroundColor:'blue',
  },
  trendingTextContainer:{
     padding: 10,
     justifyContent:'center',
     // backgroundColor:'red',

  },

  trendingText: {
    color: "black",
    fontSize: 18,
    fontWeight: 'bold'
  },
  trendingDaysContainer: {
    height: "82%",
  },
  spacedSpace:{
    padding: 3,
  },

  twoColContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "flex-start",
    justifyContent:'center'
  },
  circle1: {
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#1890ff',
    left: -150,
    bottom: 40,
    position: 'absolute',
    opacity: 0.1

  },
  circle2: {
    width: 100,
    height: 100,
    right: 10,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#1890ff',
    position: 'absolute',
    opacity: 0.1

  },
  circle3: {
    width: 250,
    height: 250,
    right: -50,
    top: -150,
    borderRadius: 175,
    backgroundColor: '#1890ff',
    position: 'absolute',
    opacity: 0.1

  },
  circle4: {
    width: 150,
    height: 150,
    left: 20,
    top: 50,
    borderRadius: 75,
    backgroundColor: 'red',
    position: 'absolute',
    opacity: 0.1

  },

  circle5: {
    width: 150,
    height: 150,
    right: -40,
    top: 250,
    borderRadius: 75,
    backgroundColor: 'yellow',
    position: 'absolute',
    opacity: 0.1

  }

})
