import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  TextInput,
  Dimensions,
  RefreshControle
 } from 'react-native';
import { LogOut, Lock, User, Bell, Globe, Menu} from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
import SearchBar from '../RandomComponents/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faUserCircle} from '@fortawesome/free-solid-svg-icons';
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
class GroupInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      condition:false,
      loading: false,
      username: '',
      loginCondition:true,
    }
    this.bs = React.createRef()
  }

  renderItem = ({item}) => {
    console.log(item)
    return(
      <View style={{
        flexDirection:'row',
      }}>
        <View style={{
          width:'100%',
          marginLeft:10,
          marginTop:'2.5%', }}>
          <View style={{flexDirection:'row'}}>
            <Avatar
              rounded
              source = {{
                uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
              }}
              size={40}/>
             <View style={{width:'62.5%', justifyContent:'center'}}>
               <Text style={{marginLeft:10, fontSize:16, fontFamily:'Nunito',  }}>{item.name}</Text>
             </View>
             <View style={{justifyContent:'center', alignItems:'center'}}>
               <View style={styles.inviteButton}>
                 <Text style={{color:'white', padding:10, fontSize:16, fontFamily:'Nunito-SemiBold'}}> Invite</Text>
               </View>
             </View>
          </View>
        </View>
     </View>
    )
  }


  shareMessage = (codeInvite) => {
    //Here is the Share API
    Share.share({
      // message: inputValue.toString(),
      message:"Join ShareOrb with my code: "+ codeInvite+"\nIOS:"+" https://testflight.apple.com/join/v58j1FSw"
      + "\nAndroid: "+"https://play.google.com/store/apps/details?id=com.pinghsu520.ShareOrbMobile"

    })
      //after successful share return result
      .then((result) => console.log(result))
      //If any thing goes wrong it comes here
      .catch((errorMsg) => console.log(errorMsg));
  };


  toggleChange = () => {
    Alert.alert(
      "Are you sure?",
      "This change is irreversible",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Change to public",
          style:'destructive', onPress: () => this.makeGroupPublic }
      ]
    );


  }

  makeGroupPublic  = ()=> {
    this.setState({
      condition: !this.state.condition
    })
  }

  render(){
    let data=[{'name':'Ping Hsu'},{'name':'Andy Le'},]
    let data1=[{'name':'John Smith'},{'name':'George Dong'},
  {'name':'Abe Ging'},{'name':'Josh Lee'},
{'name':'April Forest'},{'name':'Emily Ju'},
{'name':'May June'},{'name':'July August'},]
    console.log(data)
    return(
      <BackgroundContainer>
      <View style={{ alignItems:'center', borderBottomWidth:1, borderColor:'#d9d9d9', paddingBottom:10,}}>
        <Text style={{marginLeft:20,fontSize:18, fontFamily:'Nunito', width:'85%',}}>
          Join my Fitness orb with this code: N49045ABS
        </Text>
      </View>
      <View style = {{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          marginTop:10,
        }}>
        <View style = {{
          width: this.props.visible ? '75%' : '92.5%',
          }}>
          <View style = {styles.searchText}>
            <FontAwesomeIcon
              style={{marginRight:10, color: 'gray',left:20}}
              size = {12.5}
              icon={faSearch} />
            <TextInput
              autoCapitalize="none"
              // value = {this.props.value}
              // onChangeText = {this.props.onChange}
              // onFocus = {() => this.props.onOpen()}
              style={{
                width: "82.5%",
                fontFamily:'Nunito-SemiBold',
                left:20
              }}
              underlineColorAndroid = "transparent"
              placeholder = "Search"></TextInput>
          </View>
        </View>
        {
          this.props.visible ?
          <View style = {{
              width:'17.5%',
              left:10,
            }}>
            <TouchableWithoutFeedback onPress = {() => this.props.onClose()}>
              <View style={styles.editButton}>
                 <Text style={{color:'white', fontFamily:'Nunito-SemiBold', fontSize:13,}}>Cancel</Text>
               </View>
           </TouchableWithoutFeedback>
          </View>
          : null
        }
      </View>
      <ScrollView>
      <View underlayColor="#f0f0f0">
        <Text style={styles.settingWord}>
        Recents
        </Text>
        {/* put like max 3 people for recent */}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={true}
          renderItem={(item) => {
            return(
          this.renderItem(item)
          )
            }}
          />
       <View style={{marginTop:10}}>
         <Text style={styles.settingWord}>
         Suggested
         </Text>
         <FlatList
           // style={{ height:'55%', backgroundColor:'red'}}
             data={data1}
             showsVerticalScrollIndicator={true}
             renderItem={(item) => {
               return(
             this.renderItem(item)
           )
             }}
           />
       </View>
      </View>
      </ScrollView>
      </BackgroundContainer>
    )
  }
}
const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    zIndex:9999,
    elevation:40,
    alignItems: "center",
    justifyContent: "center",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },

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

  bottomContainer: {
    height: '25%',
    width: width,
    flexDirection:'row'
  },

  column:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',       //THIS LINE HAS CHANGED
    marginRight:30,
    justifyContent:'center',
  },

  settingWord: {
    left:5,
    color:'#919191',
    fontSize:16,
    fontFamily:'Nunito-Bold',
    marginLeft:10,
  },

  searchText: {
    flexDirection: 'row',
    height:40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    width:'100%',
    alignItems: 'center',
  },
  searchIcon: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: "center"
  },
  searchInput: {
    flex: 1,
    justifyContent: "center",
    flexDirection:'row'
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
});
export default GroupInfo;
