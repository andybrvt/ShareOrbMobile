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

let likeAvatarList=[]
const height = Dimensions.get('window').height
class Timeline extends React.Component{
   state = {
     albums: [],
     refreshing: false,
   }
   componentDidMount(){
     authAxios.get(`${global.IP_CHANGE}`+'/colabAlbum/getAlbums')
     .then(res => {
       this.setState({
         albums: res.data
       })
     })
   }

   onRefresh = () => {
     this.setState({refreshing: true})
     authAxios.get(`${global.IP_CHANGE}`+'/colabAlbum/getAlbums')
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
   renderItem = ({item}) => {
     const month = dateFns.format(new Date(item.created_at), 'MMMM yyyy');
     likeAvatarList=item.person.map(item => {
        return {
          imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
        };
      });
     return(
       <View style={{
           width:'100%',
           height:250,
           padding:10
         }}>
        <Text style={{top:0, padding: 5, fontSize:16}}>{month}</Text>
        <TouchableOpacity activeOpacity={0.6} onPress = {() => this.navAlbum(item.id)}>
          <Image
            style={styles.expiringImageLook}
            source = {{
              uri: item.coverPic
            }}>
          </Image>
          <View style={{top:'2.5%', right:'4%', position:'absolute'}}>
            <FacePile
              size={2.5} numFaces={3} faces={likeAvatarList} circleSize={14}
              containerStyle={{height:40}}
               overlap={0.1} />
          </View>
          <Text style={styles.albumTitle}>
            {item.title}
          </Text>
        </TouchableOpacity>
        </View>
     )
   }

   render(){
     var likeAvatarList=[];
     let albums = [];
     if(this.props.timeLine){
       albums = this.props.timeLine
     }
     return (
       <View style={{
          height:'100%',
         }} >
         {
           albums.length === 0 ?
               <View style = {{
                   flexDirection:'column',
                   height:'100%',
                   top:'50%'
                 }}>
               <View style = {{
                   alignItems: 'center',
                 }}>
                 <Folder
                   stroke = "gainsboro"
                    />
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
   expiringImageLook:{
     position: 'relative',
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


 })

const mapStateToProps = state => {
  return{
    timeLine: state.colabAlbum.timeLine
  }
}

 export default connect(mapStateToProps, null)(Timeline);
