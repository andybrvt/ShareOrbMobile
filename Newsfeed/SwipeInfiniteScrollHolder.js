import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
 } from 'react-native';
import { Avatar } from 'react-native-elements';
import ScrollableTabBarNew from './ScrollableTabBarNew';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';


class SwipeInfiniteScrollHolder extends React.Component{


  render(){

    return(

      <ScrollableTabView
        style={{ marginTop: 20 }}
         initialPage={0}
         renderTabBar={() => <ScrollableTabBarNew />}
        >
        <Text tabLabel='Tab #1'>My</Text>
        <Text tabLabel='Tab #2'>favorite</Text>
        <Text tabLabel='Tab #3'>project</Text>
        <Text tabLabel='Tab #4'>favorite</Text>
         <Text tabLabel='Tab #5'>project</Text>
           <Text tabLabel='Tab #1'>My</Text>
           <Text tabLabel='Tab #2'>favorite</Text>
           <Text tabLabel='Tab #3'>project</Text>
           <Text tabLabel='Tab #4'>favorite</Text>
            <Text tabLabel='Tab #5'>project</Text>

      </ScrollableTabView>
    )
  }
}

export default SwipeInfiniteScrollHolder;
