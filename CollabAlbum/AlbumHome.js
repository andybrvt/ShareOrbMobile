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
import { PlusCircle, UserPlus, Clock, Users} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { TabView, SceneMap } from 'react-native-tab-view';
import FacePile from 'react-native-face-pile';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";

const FACES = [
  {
    id: 0,
    imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
  }
];

const renderItem = ({item}) => {
  console.log(item.pic)
  return(
    <View style={{width:'100%', padding:10}}>
      <Text style={{padding: 5, fontSize:16}}>{item.month}</Text>
      <Image
        style = {{
          height:200,
          width:SCREEN_WIDTH-25,
          borderRadius: 5,
        }}
        source = {{
          uri: item.pic
        }}>

      </Image>
      <View style={{top:'17.5%', right:'6%', position:'absolute'}}>
      <FacePile
        size={2.5} numFaces={3} faces={FACES} circleSize={14}
        containerStyle={{height:40}}
         overlap={0.1} />
       </View>
     <Text style={{bottom:'17.5%', color:'white', fontSize:17, padding:10}}>
       Trip with the boys
     </Text>

   </View>
  )
}



const FirstRoute = () => (

  <View style={[styles.container, { backgroundColor: 'white' }]} >
    <FlatList
         showsVerticalScrollIndicator={false}
         style = {{}}
         data = {[
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
         ]}
         renderItem ={(item) => renderItem(item)}

         />

  </View>
);

const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />

);

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

         <TouchableOpacity
           onPress = {() => this.ViewChats()}
           style={styles.roundButton1}>
           <UserPlus stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
         </TouchableOpacity>
    
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
