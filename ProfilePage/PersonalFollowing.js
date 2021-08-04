import React from 'react';
import { Text, View, Button,StyleSheet,TouchableOpacity, TouchableHighlight} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList } from "react-native-bidirectional-infinite-scroll";

 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures

 class PersonalFollowing extends React.Component{


   selectItem(item) {
     this.props.navigation.navigate("ProfilePage", {
       username: item.username
     })
   }

   renderItem = ({item}) => {
     return (
       <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.selectItem(item)}>
         <View style = {styles.chatBox}>
           <View style={{flexDirection:'row'}}>
             <View style = {styles.chatInfoHolder} >
               <Avatar
               rounded
                 source = {{
                   uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture
                 }}
                 size = {55}
                  />
                <View style = {styles.chatInfo}>
                  <View style = {styles.chatNameContainer}>
                    <Text style = {styles.chatName}>{item.username}</Text>
                  </View>
                  <Text style = {styles.chatText}> {item.first_name+" "+item.last_name} </Text>
                </View>
             </View>
             {
               (this.props.following.length>0)?
                 <View>
                   {
                    (this.props.following.some((loopItem) => loopItem.username === item.username)) ?
                     <View style={{flex:1, justifyContent:"center"}}>
                       <View style={styles.editButton}>
                          <Text style={{color:'white',}}>Following</Text>
                        </View>
                     </View>:
                     <Text></Text>
                    }
                  </View>
                :
                <Text></Text>
              }
          </View>
         </View>
       </TouchableHighlight>
     )
   }


   render(){
     let data = [];

     if(this.props.profile){
       if(this.props.profile.get_following){
         data = this.props.profile.get_following
       }
     }

     return (
       <BackgroundContainer>
         <View >
         <FlatList
           keyExtractor={(item, index) => String(index)}
           style = {{marginTop:5}}
           data = {this.props.following}
           renderItem = {this.renderItem}
           ItemSeparatorComponent = { this.FlatListItemSeparator }
           />

         </View>
       </BackgroundContainer>

     )
   }
 }

 const mapStateToProps = state => {
   return {

     following:state.auth.following,
   }
 }

 const styles = StyleSheet.create({
   editButton: {
     alignItems: 'center',
     paddingVertical: 7.5,
     paddingHorizontal: 20,
     borderRadius: 4,
     top:5,
     alignItems: "center",
     backgroundColor: "#1890ff",
     padding: 10
   },

   column:{
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',       //THIS LINE HAS CHANGED
     paddingLeft: 35,
     justifyContent:'center',

 },

   container: {
     backgroundColor: "white",
     flex: 1,
   },
   chatBox: {
     flex: 1,
     height: 70,
     justifyContent: 'center',
     padding: 15,
     // backgroundColor:'green',
   },
   chatInfoHolder:{
     display: 'flex',
     flexDirection: 'row',
     flex:1,
   },
   chatInfo: {
     justifyContent: "center",
     marginLeft: 10,
     // backgroundColor:'red',
   },
   chatNameContainer: {
     flexDirection: "row"
   },
   chatName: {
     fontSize: 15,
     color: 'black',
     fontWeight:'bold',

     left:5,
   },

   chatText: {
     marginTop: 0,
     color: 'gray',
     fontWeight: '400'
   },

 })


 export default connect(mapStateToProps, null)(PersonalFollowing);
