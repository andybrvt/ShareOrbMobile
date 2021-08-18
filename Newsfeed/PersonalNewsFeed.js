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
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import authAxios from '../util';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import * as dateFns from 'date-fns';
import FacePile from 'react-native-face-pile';
import { Avatar } from 'react-native-elements';
import { ArrowUpCircle, Plus, Mail, UserPlus, Heart, MessageCircle } from "react-native-feather";


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


 class PersonalNewsFeed extends React.Component{
   state = {
     albums: [],
     refreshing: false,
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

   navAlbum = (albumId, groupInfo) => {
     this.props.navigation.navigate("PicAlbum",
      {albumId: albumId,
      groupInfo:groupInfo}
     );
   }
   renderItem = ({item}) => {
     // const month = dateFns.format(new Date(item.created_at), 'MMMM yyyy');
     {/*
     likeAvatarList=item.person.map(item => {
        return {
          imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
        };
      });
      */}
     return(
       <View style={{top:50,}}>
         <View style={{
             width:'100%',
             height:250,
             padding:10
           }}>
           <Text style={{top:0, padding: 5, fontSize:16}}>FF</Text>
            <TouchableOpacity activeOpacity={0.6}
              onPress = {() => this.navAlbum(item.id, item)}
              >
              <Image
                style={styles.expiringImageLook}
                source = {{
                  uri: `https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`
                }}>
              </Image>
              <View style={{top:'5%', right:'7.5%', position:'absolute'}}>
                <FacePile
                  size={2.5} numFaces={3} faces={FACES} circleSize={14}
                  containerStyle={{height:40}}
                   overlap={0.1} />
              </View>
              <Text style={styles.albumTitle}>
                test
               </Text>
            </TouchableOpacity>
          </View>


          <View style={{
              top:'5%',
              width:'100%',

              padding:10
            }}>
            <View style={{flexDirection:'row'}}>
              <Avatar
                onPress = {() => this.navAlbum(item.id, item)}
                size = {30}
                rounded
                source = {{
                  uri: 'https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=332&q=80'
                }}
                />
              <Text style={{marginLeft:5,fontSize:16, color:'black'}}>Hsu family</Text>
            </View>
             <TouchableOpacity activeOpacity={0.6}
                onPress = {() => this.navAlbum(item.id, item)}
                >
               <Image
                 style={styles.expiringImageLook}
                 source = {{
                   uri: `https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`
                 }}>
               </Image>
               <View style={{bottom:'30%', left:'5%', position:'absolute'}}>
                 <FacePile
                   size={2.5} numFaces={3} faces={FACES} circleSize={14}
                   containerStyle={{height:40}}
                    overlap={0.1} />
               </View>
               <View style={{top:'5%', left:'2.5%', position:'absolute'}}>
                 <Avatar
                   size = {30}
                   rounded
                   source = {{
                     uri: 'https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'
                   }}
                   />
               </View>

               <TouchableOpacity
                 style = {{position:'absolute',bottom:125, right:10}}>
                 <View style = {styles.justifyCenter}>
                   <Heart
                     stroke = "white"
                     fill="red"
                     width = {27.5}
                     height = {27.5}
                   />
                  <Text style = {styles.statNum}>
                   {4}
                 </Text>
                 </View>
               </TouchableOpacity>
               <TouchableOpacity
                 style = {{position:'absolute',bottom:100, right:10}}>
                 <View style = {styles.justifyCenter}>
                   <MessageCircle
                     stroke = "white"
                     fill="red"
                     width = {27.5}
                     height = {27.5}
                   />
                  <Text style = {styles.statNum}>
                   {4}
                 </Text>
                 </View>
               </TouchableOpacity>
               <Text style={styles.albumTitle}>
                 test
                </Text>
             </TouchableOpacity>
           </View>


           <View
             style={{
               flexDirection: "row",
               justifyContent: "flex-end",
               padding:15,
             }}
           >
             <TouchableOpacity
               onPress={() => this.props.navigation.navigate("CreateAlbum")}
               style={styles.roundButton1}>
               <UserPlus stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
             </TouchableOpacity>
           </View>



       </View>



     )
   }
   render(){
     var likeAvatarList=[];
     let albums = [];
     albums.push({"title":"hi"})
     // if(this.props.timeLine){
     //   albums = this.props.timeLine
     // }

     return (
       <View style={{
          height:'100%',
         }} >
         {
           albums.length === 0 ?
               <View style = {{
                   flexDirection:'column',
                   height:'100%',
                   top:'25%'
                 }}>
               <View style = {{
                   alignItems: 'center',
                 }}>
                 {/*
                   <Image source={require('./collabFriends.png')} style = {{height: 200, width: 250, resizeMode : 'stretch',}} />
                   */}
                  <Text style = {{color: 'gainsboro', fontSize:20}}>No Shared Albums with Friends</Text>
               </View>
             </View>
           :
           <FlatList
              // contentContainerStyle={{paddingBottom:0}}
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

   roundButton1: {
     width: 50,
     height: 50,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 10,
     borderRadius: 100,
     right:10,
     bottom:'10%',
     backgroundColor: '#1890ff',
   },


   expiringImageLook:{
     position: 'relative',
     height:225,
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

     padding:10,
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10
   },
   albumTitle:{
     bottom:'6%',
     color:'black',
     fontSize:18,
     padding:20,

   },


 })

 export default PersonalNewsFeed;
