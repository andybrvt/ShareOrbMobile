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
  TouchableOpacity
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { PlusCircle, UserPlus} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { TabView, SceneMap } from 'react-native-tab-view';
const chatList=[
    {"username":"pinghsu520",
    "pic":"https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    "caption":"liked your album on",
    "month":"March 2021",
    "date":"July 1",
    "time": "8h",
    },
  {"username":"andybrvt",
    "pic":"https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
    "caption":"commented on your album on",
    "month":"July 2020",
    "date":"September 24",
    "time": "3h",
  },
  {"username":"andybrvt",
    "pic":"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1140&q=80",
    "caption":"commented on your album on",
    "month":"April 2020",
    "date":"Jan 24",
    "time": "3h",
  },
  {"username":"andybrvt",
    "pic":"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
    "caption":"commented on your album on",
    "month":"January 2020",
    "date":"Jan 24",
    "time": "3h",
  },
]
const renderItem = ({item}) => {
  console.log(item.pic)
  return(
    <View style={{width:'100%', padding:10}}>
      <Text style={{padding:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             5, fontSize:18}}>{item.month}</Text>
      <Image
        style = {{
          height:200,
          width:325,
          borderRadius: 5,
        }}
        source = {{
          uri: item.pic
        }}
       />
   </View>
  )
}

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        top:24,
        backgroundColor:'red'
      }}
    />
  );
}

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);

// <View style={{ alignItems:'center'}}>
//   <FlatList
//     showsVerticalScrollIndicator={false}
//     style = {{}}
//     data = {chatList}
//     renderItem ={(item) => this.renderItem(item)}
//     ItemSeparatorComponent = { <View
//       style={{
//         top:24,
//         backgroundColor:'red'
//       }}
//     /> }
//   />
//
//
//
// </View>
//
// <View
//   style={{
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     padding:15,
//   }}
// >
//   <TouchableOpacity
//     onPress = {() => this.ViewChats()}
//     style={styles.roundButton1}>
//     <UserPlus stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
//   </TouchableOpacity>
// </View>
//

const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} >
    <Text>hi</Text>
    {/*
    <View
     style={{
         flexDirection: "row",
         justifyContent: "flex-end",
         padding:15,
       }}
     >
       <TouchableOpacity
         onPress = {() => this.ViewChats()}
         style={styles.roundButton1}>
         <UserPlus stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
       </TouchableOpacity>
    </View>
    */}
  </View>
);

class AlbumHome extends React.Component{
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Timeline' },
      { key: 'second', title: 'Second' },
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
              <Animated.Text>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  ViewChats = () => {
    this.props.navigation.navigate("CreateAlbum",

    );
  }



   render(){


     return (
       <BackgroundContainer>

         <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
       </BackgroundContainer>

     )
   }
 }
 const styles = StyleSheet.create({

   trendingText: {
     color: "black",
     fontSize: 18,
     fontWeight: 'bold',
     padding:10
   },
   trendingDaysContainer: {
     height: "82%",
   },
   container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
   roundButton1: {
     width: 50,
     height: 50,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 10,
     borderRadius: 100,
     right:20,
     bottom:60,
     backgroundColor: '#1890ff',
     zIndex:99,
     position:'absolute',
   },
 })

 export default AlbumHome;
