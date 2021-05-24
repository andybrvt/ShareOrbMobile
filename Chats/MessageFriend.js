import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
 import { Avatar, BottomNavigation } from 'react-native-paper';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 import BackgroundContainer from '../RandomComponents/BackgroundContainer';

 import { ArrowUpCircle, Plus, Mail, UserPlus, Send, Image} from "react-native-feather";
 class MessageFriend extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   updateMessageState(text){
    this.setState({newMessage: text});
  }

   render(){
     this.props.navigation.setOptions({headerTitle:

       this.props.route.params.chatPersonName+" @"+this.props.route.params.chatUserName})
     return (
       <BackgroundContainer>
         <View >
           <Text> Chat with {this.props.route.params.chatPersonName}</Text>

           <Avatar.Image
             source = {{
               uri: this.props.route.params.chatPersonProfilePic
             }}
             size = {50}
              />
            <View style = {styles.writeMessageContainer}>

              <Image stroke="#1890ff" strokeWidth={2.5} width={22.5} height={22.5} />
              <TextInput
                placeholder="Send a message!"
                style = {styles.whiteMessage}
                placeholder="Message..."
                returnKeyType="send"
                ref="newMessage"
                onBlur={() => {this.refs.scrollView.scrollTo(0,0)}}
                onChangeText={this.updateMessageState}>
              </TextInput>
              <Send stroke="#1890ff" strokeWidth={2.5} width={22.5} height={22.5} />
            </View>
         </View>
      </BackgroundContainer>

     )
   }
 }

 const styles = StyleSheet.create({
   writeMessageContainer:{
      padding:10,
      // backgroundColor:'red',
      flexDirection:'row',
      alignItems: 'center',
      borderTopWidth:1,
      borderColor:'#d9d9d9',
      justifyContent: 'center',
   },
   whiteMessage: {
     width:'85%',
     padding:2,
     paddingLeft:10,
     backgroundColor: 'white',
     borderRadius:10,
     left:10,
     right:20,
   },

 })

 export default MessageFriend;
