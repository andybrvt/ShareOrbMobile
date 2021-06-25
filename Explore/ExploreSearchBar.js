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
import Animated from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen')

const {interpolate, Extrapolate, diffClamp, cond, lessOrEq} = Animated;


class ExploreSearchBar extends React.Component{


  render(){

    const y = this.props.y;

    const translateY = interpolate(y, {
      inputRange: [0,500, 600],
      outputRange: [0, 0, -60],
      extrapolateRight: Extrapolate.CLAMP
    })

    return(
      <Animated.View style = {styles.passwordContainer}>
        <Animated.View
          style={{
            position: "absolute",
            width: '100%',
            height: 60,
            zIndex: 99,
            transform:[
              {translateY: translateY}
            ]
          }}>

          <SearchBar />
          {/*
            <View style={{backgroundColor:'#f0f0f0', width:'97.5%', flexDirection:'row', borderRadius:10, padding:5,}}>
            <Search style={{top:6, left:10}} stroke="#8c8c8c" strokeWidth={2.5} width={17.5} height={17.5}   />
            <TextInput
                autoCorrect={false}
                placeholder="Search"
                onChangeText={  (value) => this.setState({value})}
              />
            </View>
            */}

        </Animated.View>

      </Animated.View>

    )
  }
}

export default ExploreSearchBar;

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    // padding: 10,
    backgroundColor: 'red',
    position: 'relative',
  },
  inputStyle: {
    paddingLeft:15,
    flex: 1,
  },
})
