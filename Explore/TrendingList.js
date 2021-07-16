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
import ExploreSearchBar from './ExploreSearchBar';
import Animated from 'react-native-reanimated';

const {interpolate, Extrapolate, diffClamp, cond, lessOrEq} = Animated;


const {width, height} = Dimensions.get('screen')


class TrendingList extends React.Component{

  constructor(props){
    super(props)

  }

  renderPost = ({item}) => {

    return (
      <PictureBox
        cell = {item}
         />
    )
  }


  render(){

    const cells = this.props.cells;

    const y = this.props.y;
    const height = interpolate(y, {
      inputRange: [0, 330],
      outputRange: [330, 0],
      extrapolate: Extrapolate.CLAMP
    })

    return(
      <Animated.View
         style = {[styles.trendingContainer,{
           height: height
         }]}>

        <View style = {styles.trendingTextContainer}>
            <Text style = {styles.trendingText}>Trending
            {/*
              <View>
              <ChevronRight stroke="gray" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
              </View>

              */}
            </Text>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data = {cells}
          renderItem = {this.renderPost}
          keyExtractor={item => item.id.toString()}
          horizontal = {true}
          showsHorizontalScrollIndicator = {false}
           />

      </Animated.View>
    )
  }

}


const styles = StyleSheet.create({
  trendingContainer:{
  },
  trendingTextContainer:{
     padding: 10,
     justifyContent:'center',
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

})


export default TrendingList;
