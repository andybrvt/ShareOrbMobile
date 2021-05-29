import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 class Comments extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }
   // renderItem = {this.renderItem}
   // ItemSeparatorComponent = { this.FlatListItemSeparator }


   renderItem = ({item}) => {
     console.log(item)

     return (

         <View style={styles.container}>


           <Avatar.Image
             style={styles.image}
             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+item.commentUser.profile_picture
             }}
             size = {40}
              />
           <View style={styles.content}>

             <View style={styles.contentHeader}>
                  <Text  style={styles.name}>  {item.commentUser.first_name+" "+item.commentUser.last_name}</Text>
                  <Text style={styles.time}>

                      {global.RENDER_TIMESTAMP(item.created_on)}

                  </Text>
              </View>

              <Text>
                {item.body}
              </Text>
           </View>




         </View>


     )
   }

   render(){

     this.props.navigation.setOptions({
        comments:this.props.route.params.comments
     })
     console.log(this.props.route.params.comments)
     let commentList = [];

     return (
       <BackgroundContainer>
         <Avatar.Image
           style={styles.image}
           source = {{
             uri: this.props.route.params.profilePic
           }}
           size = {40}
            />
           <Text> {this.props.route.params.caption}</Text>
         <View >
           <Text> {this.props.route.params.comments.length}</Text>
             <FlatList
               style = {{marginTop:100}}
               data = {this.props.route.params.comments}
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
     userId: state.auth.id,
     currentUser: state.auth.username,
     profilepic: state.auth.profilePic,
   }
 }

 const styles = StyleSheet.create({
   container: {

   paddingLeft: 15,
   paddingRight: 16,
   paddingVertical: 12,
   flexDirection: 'row',
   alignItems: 'flex-start'
 },
 content: {
   marginLeft: 16,
   flex: 1,
 },
 contentHeader: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   // backgroundColor:'red',
 },
 separator: {
   height: 1,
   backgroundColor: "#CCCCCC"
 },
 image:{


   marginLeft:1
 },
 time:{
   fontSize:11,
   color:"#808080",
 },
 name:{
   fontSize:16,
   fontWeight:"bold",
 },
 })



 export default connect(mapStateToProps)(Comments);
