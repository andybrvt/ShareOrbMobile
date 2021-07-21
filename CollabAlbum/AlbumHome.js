import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { PlusCircle, UserPlus, Book, FolderPlus,Clock, Users} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { TabView, SceneMap } from 'react-native-tab-view';
import FacePile from 'react-native-face-pile';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import Timeline from './Timeline'
import Expiring from './Expiring'


class AlbumHome extends React.Component{
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'With Friends' },
      { key: 'second', title: 'Expiring' },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {
        props.navigationState.routes.map((route, i) => {
        return (
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => this.setState({ index: i })}>
            <View style={{flexDirection:'row'}}>
              {(i==1)?
                 <Clock
                   style={{right:10}}
                   stroke="black" strokeWidth={2.5} width={20} height={20} />
              :
               <Users
                 style={{right:10}}
                 stroke="black" strokeWidth={2.5} width={20} height={20} />
              }
              <Animated.Text style={{fontSize:14}}>{route.title}</Animated.Text>
            </View>
          </TouchableOpacity>
          );
        })}
      </View>
    );
  };

    _renderScene = SceneMap({
      first: () => <Timeline {...this.props}/>,
    second: () => <Expiring {...this.props}/>,
    });



   render(){
     return (
       <BackgroundContainer>
         <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
         />
         <TouchableOpacity activeOpacity={0.9}
           onPress = {() => this.goToNextScreen()}
           style={styles.roundButton1}>
           <FolderPlus stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
         </TouchableOpacity>
       </BackgroundContainer>
     )
   }
 }
 const styles = StyleSheet.create({

   expiringImageLook:{
     height:200,
     width:SCREEN_WIDTH-25,
     borderRadius: 5,
   },
   child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
   // {bottom:'17.5%', color:'white', fontSize:17, padding:10}
   albumTitle2:{
     bottom:'25%',
     color:'white',
     fontSize:15,
     padding:10,
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10
   },
   albumTitle:{
     bottom:'17.5%',
     color:'white',
     fontSize:15,
     padding:10,
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10
   },
   countDownTimer: {
     alignItems:'center',
     color:'white',
     fontSize:22,
     bottom:'40%',
     left:'45%',

   },

  tabBar: {
    flexDirection: 'row',
    // backgroundColor:'red',
    borderBottomColor: '#FFFFFF',
    elevation:1,
    borderBottomWidth: 1,

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
   roundButton1: {
     width: 50,
     height: 50,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 10,
     borderRadius: 100,
     right:20,
     bottom:50,
     backgroundColor: '#1890ff',
     zIndex:99,
     position:'absolute',
   },
 })

 export default AlbumHome;
