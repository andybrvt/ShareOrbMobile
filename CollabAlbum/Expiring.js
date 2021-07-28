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
  RefreshControl
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import FacePile from 'react-native-face-pile';
import authAxios from '../util';
import * as dateFns from 'date-fns';
import { Folder } from "react-native-feather";
import { connect } from 'react-redux';


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


const height = Dimensions.get('window').height

 class Expiring extends React.Component{

   state = {
     albums: [],
     refreshing: false
   }

   navAlbum = () => {
     this.props.navigation.navigate("PicAlbum",

     );
   }

   componentDidMount(){
     authAxios.get(`${global.IP_CHANGE}`+'/colabAlbum/getLiveAlbums')
     .then(res => {
       this.setState({
         albums: res.data

       })

     })
   }

   onRefresh = () => {
     this.setState({refreshing: true})
     authAxios.get(`${global.IP_CHANGE}`+'/colabAlbum/getLiveAlbums')
     .then(res => {
       this.setState({
         albums: res.data

       })

     })

     this.setState({refreshing: false});
   }

   navAlbum = (albumId) => {
     this.props.navigation.navigate("PicAlbum",
        {albumId: albumId}
     );
   }

   timeLeft = (created) => {
     const curDate = new Date(created);
     const lastTime = dateFns.addHours(curDate, 24);

     const hourLeft = dateFns.differenceInHours(lastTime, new Date())
     const minLeft = dateFns.differenceInMinutes(lastTime, new Date())%60


     return hourLeft+"h"+" "+minLeft+"m"
   }

   renderItem = ({item}) => {
     const curDate = new Date(item.created_at);
     const month = dateFns.format(new Date(item.created_at), 'MMMM yyyy');
     const lastTime = dateFns.addHours(new Date(item.created_at), 24);

     const timeLeft = this.timeLeft(item.created_at)

     return(
       <View style={{
           width:'100%',
           height:250,
           padding:10, }}>
         <Text style={{top:0, padding: 5, fontSize:16}}>{month}</Text>
         <TouchableOpacity
           onPress = {() => this.navAlbum(item.id)}
           activeOpacity={0.6}>
           <ImageBackground
             style={styles.expiringImageLook}
             source = {{
               uri: item.coverPic
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
             {timeLeft}
           </Text>
           <Text style={styles.albumTitle2}>
             {item.title}
           </Text>
         </TouchableOpacity>
      </View>
     )
   }

   render(){
     const {albums} = this.state;
     console.log('in expiring')
     console.log(this.props.expiring)
     return (
       <View style={{
           flex: 1,
           backgroundColor: 'white' }} >

          {
            albums.length === 0 ?

            <ScrollView
              style={{position:'relative', top:'50%'}}
              showsVerticalScrollIndicator = {false}
              refreshControl = {
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              >
                <View style = {{
                    flexDirection:'column',
                    height:'100%',
                  }}>
                <View style = {{
                    alignItems: 'center',
                  }}>
                  <Folder
                    stroke = "gainsboro"
                     />
                   <Text style = {{color: 'gainsboro', fontSize:20}}>No Pending Albums with Friends</Text>
                </View>
              </View>
            </ScrollView>

            :

            <FlatList
              contentContainerStyle={{paddingBottom:0}}
                 showsVerticalScrollIndicator={false}
                 style = {{flex: 1}}
                 data = {albums}
                 renderItem ={(item) => this.renderItem(item)}
                 keyExtractor={(item, index) => String(index)}
                 onRefresh = {() => this.onRefresh()}
                 refreshing = {this.state.refreshing}

                 />

          }


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

 const mapStateToProps = state => {
   return{
     expiring: state.colabAlbum.expiring
   }
 }


export default connect(mapStateToProps, null)(Expiring);
