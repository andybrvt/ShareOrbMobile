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


class ExploreSearchBar extends React.Component{


  render(){

    return(
      <View style={styles.passwordContainer}>
        <View style={{backgroundColor:'#f0f0f0', width:'97.5%', flexDirection:'row', borderRadius:10, padding:5,}}>
        <Search style={{top:6, left:10}} stroke="#8c8c8c" strokeWidth={2.5} width={17.5} height={17.5}   />
        <TextInput
            autoCorrect={false}
            placeholder="Search"
            onChangeText={  (value) => this.setState({value})}
          />
        </View>
      </View>

    )
  }
}

export default ExploreSearchBar;

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  inputStyle: {
    paddingLeft:15,
    flex: 1,
  },
})
