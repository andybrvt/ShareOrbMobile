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

 class Following extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   selectItem(item) {

     this.props.navigation.navigate("ViewProfile");
     {/*}
     this.props.navigation.navigate("MessageFriend",
       {
         chatPersonName:this.getChatUserName(item.participants),
         chatUserName:item.participants[1].username,
         chatPersonProfilePic: `${global.IMAGE_ENDPOINT}`+this.getChatUserProfile(item.participants),
         }
     );
     */}
   }

   renderItem = ({item}) => {
     return (
       <TouchableOpacity onPress={() => this.selectItem(item)}>
         <View style = {styles.chatBox}>
           <View style={{flexDirection:'row', backgroundColor:'blue'}}>

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
             <View style={{flex:2}}>


             </View>
          </View>


       </View>
       </TouchableOpacity>
     )
   }


   render(){

     return (
       <BackgroundContainer>
         <View >
         <FlatList
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
   console.log(state.auth)
   return {
     following:state.auth.following,

   }
 }

 const styles = StyleSheet.create({

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
     backgroundColor:'red',
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


 export default connect(mapStateToProps, null)(Following);
