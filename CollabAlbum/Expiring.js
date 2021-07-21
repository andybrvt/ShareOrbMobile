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
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import FacePile from 'react-native-face-pile';
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

 class Expiring extends React.Component{
   navAlbum = () => {
     this.props.navigation.navigate("PicAlbum",

     );
   }
   renderItem = ({item}) => {
     return(
       <View style={{width:'100%', height:'22.5%', padding:10, }}>
         <Text style={{top:0, padding: 5, fontSize:16}}>{item.month}</Text>
         <TouchableOpacity activeOpacity={0.6}>
           <ImageBackground
             style={styles.expiringImageLook}
             source = {{
               uri: item.pic
             }}>
             <View style={styles.child}></View>

           </ImageBackground>
           <View style={{top:'2.5%', right:'4%', position:'absolute'}}>
             <FacePile
               size={2.5} numFaces={3} faces={FACES} circleSize={14}
               containerStyle={{height:40}}
                overlap={0.1} />
           </View>
           <Text style={styles.countDownTimer}>
             23h 15m
           </Text>
           <Text style={styles.albumTitle2}>
             {item.title}
           </Text>
         </TouchableOpacity>
      </View>
     )
   }

   render(){


     return (
       <View style={{ backgroundColor: 'white' }} >
         <FlatList
           contentContainerStyle={{paddingBottom:0}}
              showsVerticalScrollIndicator={false}
              style = {{}}
              data = {[
                {"username":"pinghsu520",
                "pic":"https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "title": "Trip with the boys",
                "caption":"liked your album on",
                "month":"March 2021",
                "date":"July 1",
                "time": "8h",
                },
              {"username":"andybrvt",
                "pic":"https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
                "title": "WaterFall in Nigeria",
                "caption":"commented on your album on",
                "month":"July 2020",
                "date":"September 24",
                "time": "3h",
              },
              {"username":"andybrvt",
                "pic":"https://images.unsplash.com/photo-1552083375-1447ce886485?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "title": "Iceland Views 7/2/2020",
                "caption":"commented on your album on",
                "month":"April 2020",
                "date":"Jan 24",
                "time": "3h",
              },
              {"username":"andybrvt",
                "pic":"https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
                "title":"Nature Vibes forest",
                "caption":"commented on your album on",
                "month":"January 2020",
                "date":"Jan 24",
                "time": "3h",
              },


              ]}
              renderItem ={(item) => this.renderItem(item)}
              />

       </View>
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


 export default Expiring;
