import React from 'react';
import {
  Text,
  Platform,
  SafeAreaView,
  View,
  Share,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
  FlatList
 } from 'react-native';
 import * as Contacts from 'expo-contacts';
import TextInputError1 from '../RandomComponents/TextInputError1'
import authAxios from '../util';
import { connect } from "react-redux";
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus } from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import pic from '../Login/default.png';
class InviteContacts extends React.Component{
  constructor(props){
    super(props)
    this.state = {
     loading: false,
     error: null,
     data: [],
    }
  }

  componentDidMount() {
    this.grabContacts()
  }

  grabContacts= async () => {
    const { status } = await Contacts.requestPermissionsAsync();
     if (status === 'granted') {
       const { data } = await Contacts.getContactsAsync({
         fields: [
          Contacts.Fields.Name,
          Contacts.Fields.Image,
          Contacts.Fields.PhoneNumbers,
        ],
       });
       this.setState({
         loading: false,
         error: null,
         data: this.state.data.concat(data),
       })
     }
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#f0f0f0",
        }}
      />
    );
  }

  shareMessage = (codeInvite) => {
    //Here is the Share API
    Share.share({
      // message: inputValue.toString(),
      message:"Join my orb on ShareOrb with my code: "+ codeInvite+"\nIOS:"+" https://testflight.apple.com/join/v58j1FSw"
      + "\nAndroid: "+"https://play.google.com/store/apps/details?id=com.pinghsu520.ShareOrbMobile"
    })
      //after successful share return result
      .then((result) => console.log(result))
      //If any thing goes wrong it comes here
      .catch((errorMsg) => console.log(errorMsg));
  };


   render(){
     let data=this.state.data
     console.log(data)
     // You will need to get the current number of poeple on the wait list
     return(
       <BackgroundContainer>
       <View>
        <FlatList
          ItemSeparatorComponent = { this.FlatListItemSeparator }
          keyExtractor={item => item.key}
         renderItem={({item}) =>
           <View style={{flexDirection:'row', padding:20}}>
             {item.image!=null?
               <View>
                  <Avatar
                    size={37.5}
                    rounded
                    source = {{
                    uri: item.image.uri
                    }} />
                </View>
             :
             <View>
                <Avatar
                  size={37.5}
                  rounded
                  source = {pic} />
              </View>
            }
            <View style={{flexDirection:'column', width:'62.5%'}}>
              <Text style={styles.addressName}>{item.name}</Text>
                {item.phoneNumbers!=null?
                     <Text style={styles.addressPhone}>{item.phoneNumbers[0].number}</Text>
                  :
                  <Text></Text>
                }
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
                onPress={() =>this.shareMessage("N3FDI2W")}
              style={{alignItems:'center', justifyContent:'center', }}>
              <View style={styles.inviteButton}>
                <View style={{flexDirection:'row', padding:15, }}>
                <UserPlus
                  width = {15}
                  height = {15}
                  stroke = "white"
                  />
                <Text style={{color:'white', fontSize:12, fontFamily:'Nunito-SemiBold'}}> Invite</Text>
                </View>
            </View>
            </TouchableOpacity>
           </View>

         }
         // ItemSeparatorComponent={listSeparator}
         data={data}
         />
        </View>
       </BackgroundContainer>
     )
   }
 }

 const mapStateToProps = state => {
   return {
     inviteCode: state.auth.inviteCode
   }
 }

const styles = StyleSheet.create({
  inviteButton: {
    borderRadius: 20,
    height:30,
    elevation:5,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1890ff",
  },

  addressName: {
    marginLeft:10, fontSize:16, fontFamily:'Nunito-SemiBold',
  },
  addressPhone: {
    marginLeft:10, fontSize:13, fontFamily:'Nunito',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  welcomeText: {
  padding:5,
    color: "#1890ff",
    fontSize: 27.5,
    top: '7%',
    textAlign: 'center',
    fontFamily:'Nunito-SemiBold',
  },
  loginBtn1: {
    width: "75%",
    borderRadius: 25,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "#40a9ff",
  },
  loginBtn: {
    width: "20%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "#1890ff",
  },
  loginBtnDisabled: {
    width: "20%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "gainsboro",
  },
  loginText: {
    color: 'white',
    fontSize: 14,
    fontFamily:'Nunito-SemiBold',
  },
})

export default connect(mapStateToProps)(InviteContacts);
