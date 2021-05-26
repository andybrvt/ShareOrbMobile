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
       <BackgroundContainer>
         <View>



           <View>
             <Avatar.Image
               source = {{
                 uri: `${global.IMAGE_ENDPOINT}`+item.commentUser.profile_picture
               }}
               size = {45}
                />
              <Text>
                {item.commentUser.first_name+" "+item.commentUser.last_name}
              {item.body}
            </Text>
           </View>




         </View>
        </BackgroundContainer>

     )
   }

   render(){

     this.props.navigation.setOptions({
        comments:this.props.route.params.comments
     })
     console.log("BLAHBLAHBLAH")
     console.log(this.props.route.params.comments)
     let commentList = [];

     return (
         <View >
           <Text> Comments {this.props.route.params.comments.length}</Text>
             <FlatList
               style = {{marginTop:5}}
               data = {this.props.route.params.comments}
               renderItem = {this.renderItem}
               ItemSeparatorComponent = { this.FlatListItemSeparator }

             />

         </View>

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


 export default connect(mapStateToProps)(Comments);
