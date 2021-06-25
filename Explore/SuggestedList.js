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
import TrendingList from './TrendingList';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash/lib/module/v1';

const {width, height} = Dimensions.get('screen')

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const {interpolate, Extrapolate} = Animated;

class SuggestedList extends React.Component{


  renderPost = ({ item }) => {

    return (
      <PictureBox
        cell = {item}
         />
    )
  }

  render(){
    const cells = this.props.cells

    const y = this.props.y;


    return(
      <Animated.View style = {styles.exploreTheDayContainer}>

        <View style = {styles.trendingTextContainer}>
          <Text style = {styles.trendingText}> Suggested</Text>
        </View>

        <AnimatedFlatList
          onScroll = {onScrollEvent({y})}
          scrollEventThrottle = {16} // important for animation
          data = {cells}
          renderItem = {this.renderPost}
          keyExtractor={item => item.id.toString()}
          numColumns = {2}
          showsVerticalScrollIndicator={false}

           />


       </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  exploreTheDayContainer: {
    // flex:1,
  },
  trendingText: {
    color: "black",
    fontSize: 18,
    fontWeight: 'bold'
  },
})

export default SuggestedList;
