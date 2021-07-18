import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { PlusCircle, UserPlus} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";

class AlbumHome extends React.Component{
  ViewChats = () => {
    this.props.navigation.navigate("CreateAlbum",

    );
  }

    renderItem = ({item}) => {
      console.log(item.pic)
      return(
        <View style={{width:'100%', padding:10}}>
          <Text style={{padding:5, fontSize:18}}>{item.month}</Text>
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
    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            top:24,
            backgroundColor:'red'
          }}
        />
      );
    }
   render(){
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

     return (
       <BackgroundContainer>
         {/*
         <View style={{flexDirection:'row', backgroundColor:'white', top:10}}>
           <View style={{flex:1, alignItems:'center',justifyContent:'center',}}>

           </View>

          <View style={{alignItems:'flex-end', justifyContent:'center', flex:1, top:10, right:20}}>
             <PlusCircle
               onPress = {() => this.ViewChats()}
               stroke="black" strokeWidth={2.5} width={35} height={35}/>
          </View>

         </View>
         */}


         <View style={{ alignItems:'center'}}>
           <FlatList
             showsVerticalScrollIndicator={false}
             style = {{}}
             data = {chatList}
             renderItem = {this.renderItem}
             ItemSeparatorComponent = { this.FlatListItemSeparator }
           />



         </View>

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
