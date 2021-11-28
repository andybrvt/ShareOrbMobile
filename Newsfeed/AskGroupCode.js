import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
   FlatList,
   TouchableHighlight,
   TextInput,
   Modal,
   TouchableWithoutFeedback,
   Keyboard,
   TouchableOpacity
  } from 'react-native';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import MainLogo from '../logo.svg';
import { MapPin,Bell,ArrowUpCircle, Plus, PlusCircle, Search, Mail, UserPlus, Globe } from "react-native-feather";
import { connect } from 'react-redux';
import authAxios from '../util';
import { BlurView } from "@react-native-community/blur";
import FriendShip from './friendship.svg';
import * as authActions from '../store/actions/auth';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class AskGroupCode extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      orbs: [],
      businessCondition:false,
      groupCode:'',
    }

  }

  onGroupCodeChange = e => {
    this.setState({
      groupCode:e
    })
  }



  componentDidMount(){


  }


  render(){


    const groupPosts = [1,2, 3]
    return(
      <View style = {{
        height:'100%',
        width:'100%',
          backgroundColor: '#1890ff',
          alignItems: 'center'
        }}>
        <TouchableOpacity
          onPress = {() => this.props.logout()}
          style = {styles.regSignup}>
          <Text style={{color:'white', fontSize:12}} >Log Out</Text>
        </TouchableOpacity>
        <View style={{alignItems:'center', justifyContent:'center', top:'25%'}}>
          <FriendShip width = {125} height = {125} />
          <Text style={{fontSize:25,
            marginTop:25,
            color:'white',
            fontFamily:"Nunito-Bold"}}>Enter Group Code</Text>
          <View style={{top:25}}>
            <TouchableWithoutFeedback
            style={{backgroundColor:'red',}}
              onPress = {() => this.textInput.focus()}>
              <TextInput
                style = {{
                  width: width,

                }}
                autoCapitalize="none"
                selectionColor={'white'}
                style = {styles.textInput}
                ref={(input) => { this.textInput = input; }}
                onChangeText = {this.onGroupCodeChange}
                value = {this.props.value}
                />
              </TouchableWithoutFeedback>
            </View>
        </View>




      </View>
    )
  }
}

const mapStateToProps = state => {
  return{
    id: state.auth.id,
    profilePic: state.auth.profilePic,
    username: state.auth.username,
    notificationSeen: state.auth.notificationSeen,
    secondUsername: state.auth.secondUsername,
    isOtherAccount: state.auth.isOtherAccount
  }
}


const styles = StyleSheet.create({
  regSignup:{
    position: "absolute",
    right:25,
    width: "25%",
    borderRadius: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#2f54eb",
  },
  cancelButton: {
    marginRight:10,
    borderRadius: 5,
    padding:10,
    elevation:5,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    flexDirection:'row'
  },
  viewWrapper: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.4) },
                  { translateY: -90 }],
      height: 180,
      width: width * 0.8,
      backgroundColor: "#fff",
      borderRadius: 7,
  },
  textInput: {
      width: 175,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderColor: "white",
      borderWidth:4,
      borderWidth: 1,
      marginBottom: 8,
      color:'white',
      fontSize:20,
      fontFamily:"Nunito-Bold",
      alignItems:'center',

  },
  roundButton: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
    shadowColor: '#333333',
    shadowOffset: {width: 1, height: 3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 20,
    backgroundColor: '#1890ff',
  },
  header: {
    height: 50,
    // backgroundColor: '#1890ff',
    backgroundColor:'white',
    width: '100%',
    flexDirection: 'row'
  },
  sideHeaders:{
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center'
  },
  middleHeader:{
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notiCircle: {
    position:'absolute',
    height: 10,
    width: 10,
    borderRadius: 1000,
    backgroundColor:'red',
  },
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AskGroupCode);
