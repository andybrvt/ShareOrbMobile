import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight,

 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
 class DisplayLikeList extends React.Component{

   selectItem = (username) => {
     // This fucntion will be used to navigate to the post page
     // that you can use to post pictures and write caption
     this.props.navigation.navigate("ProfilePage", {
       username: username
     })
   }

   renderItem = ({item}) => {
     let userFollowing=this.props.following
     return (
       <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.selectItem(item.username)}>
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
             {/*

             {    userFollowing.includes(item.id) ?

               ''
               :
               <View style={{flex:0.5, justifyContent:"center"}}>
                 <View style={styles.editButton}>
                    <Text style={{color:'white',}}>Follow</Text>
                  </View>
               </View>
          }
          */}

          </View>
         </View>
       </TouchableHighlight>
     )
   }

   render(){
     let likeList=this.props.route.params.likePeople

     return (
       <BackgroundContainer>
         <View >
         <FlatList
           keyExtractor={(item, index) => String(index)}
           style = {{marginTop:5}}
           data = {likeList}
           renderItem = {this.renderItem}
           ItemSeparatorComponent = { this.FlatListItemSeparator }
           />
         </View>
       </BackgroundContainer>

     )
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

  const mapStateToProps = state => {
    return {

      following:state.auth.following,
    }
  }
  export default connect(mapStateToProps, null)(DisplayLikeList);
