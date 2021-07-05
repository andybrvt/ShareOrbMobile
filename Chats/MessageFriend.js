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
  FlatList
 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, BottomNavigation,  } from 'react-native-paper';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { connect } from 'react-redux';
import { ArrowUpCircle, Plus, Mail, UserPlus, Send, Image} from "react-native-feather";
class MessageFriend extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }


   render(){
     // console.log("MESSAGE FRIEND")
     // console.log(this.props.chats)
     this.props.navigation.setOptions({
       headerTitle:this.props.route.params.chatPersonName+" @"+this.props.route.params.chatUserName
     })
     return (
       <BackgroundContainer>


         <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.props.chats}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            console.log("BBBBBBBBBBBBBBBBB")
            console.log(item.item)
            item=item.item

            let inMessage = item.id === this.props.userId;
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View>
                <Avatar.Image
                  source = {{
                    uri: `${global.IMAGE_ENDPOINT}`+item.recentSender.profile_picture
                  }}
                  size = {50}
                   />
                <Text>
                {item.recentMessage}
                </Text>
              {/*
              <View style={[styles.item, itemStyle]}>
                {!inMessage && this.renderDate(item.date)}
                <View style={[styles.balloon]}>
                  <Text>{item.recentMessage}</Text>
                </View>
                {inMessage && this.renderDate(item.date)}
              </View>
              */}
              </View>
            )
          }}/>

      </View>

         <View style = {styles.writeMessageContainer}>

           <Image stroke="#1890ff" strokeWidth={2.5} width={22.5} height={22.5} />
             {/*
             onBlur={() => {this.refs.scrollView.scrollTo(0,0)}}
             onChangeText={this.updateMessageState}
             */}
           <TextInput
             placeholder="Send a message!"
             style = {styles.whiteMessage}
             placeholder="Message..."
             returnKeyType="send"
             underlineColorAndroid='transparent'

             ref="newMessage"

             />

           <Send stroke="#1890ff" strokeWidth={2.5} width={22.5} height={22.5} />
         </View>
      </BackgroundContainer>

     )
   }
 }

 const mapStateToProps = state => {
   return {
     userId: state.auth.id,
     chats: state.message.chats,
     profilePic: state.auth.profilePic
   }
 }
export default connect(mapStateToProps, null)(MessageFriend);


 const styles = StyleSheet.create({
   list:{
height:'92%',
   },
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

     width:'82.5%',
     padding:2,
     paddingLeft:10,
     backgroundColor: '#f0f0f0',
     borderRadius:10,
     left:10,
     right:20,
   },

 })
