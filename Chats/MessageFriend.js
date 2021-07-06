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
         // {global.RENDER_TIMESTAMP(item.recentTime)}
     // console.log("MESSAGE FRIEND")
     // console.log(this.props.chats)
     // headerTitle:this.props.route.params.chatPersonName+" @"+this.props.route.params.chatUserName
     this.props.navigation.setOptions({
       headerTitle: (props) => (
         <View style={{flexDirection:"row"}}>
           <Avatar.Image
             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+this.props.profilePic
             }}
             size = {40}
             style={{right:10}}
              />
            <View style={{flexDirection:'column'}}>
              <View style={{flex:1}}>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize:18}}>
                    {this.props.route.params.chatPersonName}
                </Text>
              </View>
              <View style={{flex:1}}>
                <Text {...props} style={{color: 'gray', fontSize:14}}>
                  {this.props.route.params.chatUserName}
                </Text>
              </View>


          </View>
      </View>
    ),
    headerStyle: {
      // backgroundColor: 'red', //Set Header color
      shadowColor:'#fff', //ios
      elevation:0,
      height:70,
    },
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
            console.log("AAAAAAAAAAAAAAAAAAAAaa")
            console.log(item.item)
            item=item.item

            let inMessage = item.id === this.props.userId;
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            let itemStyle1 = inMessage ? styles.textIn : styles.textOut;
            return (
              <View style={[styles.item, itemStyle]}>
                {/*
                <Avatar.Image
                  source = {{
                    uri: `${global.IMAGE_ENDPOINT}`+item.recentSender.profile_picture
                  }}
                  size = {35}
                   />
               */}
                 <View style={[styles.balloon]}>

                    <Text style={[itemStyle1]}>
                    {item.recentMessage}

                    </Text>


                  </View>
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
             ref="newMessage"/>
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
     profilePic: state.auth.profilePic,
   }
 }
export default connect(mapStateToProps, null)(MessageFriend);


 const styles = StyleSheet.create({
   inputs:{
    height:30,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  textIn:{
    color:'black',
  },
  textOut:{
    color:'white',
  },
  balloon: {
    maxWidth: 250,
    padding: 12.5,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end',
    backgroundColor:'#1890ff',

  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:300,
    padding:2.5,
  },
   list:{
    height:'91%',
    padding:15,
    // backgroundColor:'red',
   },
   writeMessageContainer:{

     height:50,
      padding:10,
      // backgroundColor:'red',
      flexDirection:'row',
      alignItems: 'center',
      borderTopWidth:1,
      borderColor:'#d9d9d9',
      justifyContent: 'center',
   },
   whiteMessage: {

     width:'80%',
     padding:2,
     paddingLeft:10,
     backgroundColor: '#f0f0f0',
     borderRadius:10,
     left:10,
     right:20,
   },

 })
