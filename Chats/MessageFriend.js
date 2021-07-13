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
import { ArrowUpCircle, Plus, Mail, UserPlus, Send, Image, Info} from "react-native-feather";
class MessageFriend extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }


   render(){
         // {global.RENDER_TIMESTAMP(item.recentTime)}
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
          <View style={{flexDirection:'column', flex:1}}>
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
          <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
          <Info style={{right:5}} stroke="#1890ff"
             strokeWidth={2.5} width={25} height={25} />
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
      <KeyboardAvoidingView
        behavior="null"
        keyboardVerticalOffset={100}
        style={{flex:1}}
      >
         <View style = {styles.writeMessageContainer}>

           <Image stroke="#1890ff"
             style={{right:2.5}}
             strokeWidth={2.5} width={30} height={30} />
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
           <Send style={{left:15}} stroke="#1890ff"
              strokeWidth={2.5} width={27.5} height={27.5} />
         </View>
        </KeyboardAvoidingView>
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
    height:'88.5%',
    padding:15,
    // backgroundColor:'blue',
   },
   writeMessageContainer:{
     flex:1,
     height:70,
     paddingLeft:'2.5%',
      // backgroundColor:'red',
      flexDirection:'row',
      alignItems: 'center',
      borderTopWidth:1,
      borderColor:'#d9d9d9',
      // justifyContent: 'center',
   },
   whiteMessage: {

     width:'77.5%',
     padding:5,
     paddingLeft:10,
     backgroundColor: '#f0f0f0',
     borderRadius:10,
     left:10,
     right:30,
   },

 })
