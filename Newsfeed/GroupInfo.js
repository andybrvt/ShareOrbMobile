import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  Switch,
  Share,
  Alert,
  TextInput,
  Dimensions,
  RefreshControle,
  ActivityIndicator,
  Clipboard
 } from 'react-native';
import { LogOut, Lock, User, Bell, Map, Globe, ArrowRight, UserPlus, Menu, Mic, Unlock, MapPin} from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import authAxios from '../util';
import * as authActions from '../store/actions/auth';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { faQrcode, faFire, faAppleAlt, faMapMarked, Android, faRobot, faAndroid, faGoogle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Linking from 'expo-linking';


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
      publicG: false,
      smallGroupInfo: {}
    }
    this.bs = React.createRef()
  }


  componentDidMount(){
    const groupId = this.props.route.params.groupId
    authAxios.get(`${global.IP_CHANGE}`+'/mySocialCal/getSmallGroupInfo/'+groupId)
    .then(res => {
      this.setState({
        smallGroupInfo: res.data
      })
    })

  }


  navPeopleInGroup = (groupId) => {
    this.props.navigation.navigate("PeopleInGroup", {groupId: groupId })
  }

  navInvitePeople = () => {
    this.props.navigation.navigate("InvitePeople")
  }

  navAnnouncements = () => {
    this.props.navigation.navigate("Announcements")
  }

  shareMessage = (codeInvite) => {
    //Here is the Share API
    Share.share({
      // message: inputValue.toString(),
      message:"Join my Fitness orb with my code: N324FJ3A "+ codeInvite
    })
      //after successful share return result
      .then((result) => console.log(result))
      //If any thing goes wrong it comes here
      .catch((errorMsg) => console.log(errorMsg));z
  };

  navMapsLocation = (address) => {
    Linking.openURL(`http://maps.google.com/?daddr=${address}`);
  }



  leaveGroup = (groupId) => {
    const userId = this.props.curId
    const groupList=this.props.smallGroups
    this.setState({
      loading: true,
      disabled:true,
    })


    authAxios.post(`${global.IP_CHANGE}`+"/mySocialCal/leaveSmallGroup/"+groupId+'/'+userId)
    .then(res => {

      this.props.authUpdateAllSmallGroup(res.data.smallGroups, res.data.smallGroupId)
      this.setState({
        loading: false
      })

      this.props.navigation.navigate("Home")


    })


    // setTimeout(()=>{
    //    this.setState({
    //     disabled: false,
    //   });
    // }, 5000)
    //
    // for(let i=0; i<groupList.length; i++) {
    //   if(groupList[i].id===groupId){
    //     this.props.navigation.navigate("Home")
    //     // this.props.authUpdateNewsfeedSlide(i)
    //     // this.props.authSetActiveNewsfeedSlide(i+2)
    //   }
    // }


  }



  toggleLeave = (groupID) => {
    Alert.alert(
      "Are you sure?",
      "You will leave the orb",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Leave",
          style:'destructive', onPress: () => this.leaveGroup(groupID) }
      ]
    );


  }


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
          style:'destructive', onPress: () => this.makeGroupPublic() }
      ]
    );
  }

  makeGroupPublic  = ()=> {
    const groupId = this.props.route.params.groupId;
    this.setState({
      loading: true
    })
    authAxios.post(`${global.IP_CHANGE}`+'/mySocialCal/changeSGPublic/'+groupId)
    .then(res =>{
      // do a redux here that updates the global group info
      this.props.authUpdateSmallGroup(res.data)
      this.setState({
        loading: false
      })
    })

  }

  renderInner =()=> {
    return(
      <View>
        {
          Platform.OS ===  'ios' ?
          <View style={styles.panel}>
            <TouchableOpacity
              onPress = {()=>this.handleTakeProfile()}
              style={styles.panelButton} >
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress = {()=>this.handleChooseProfile()}
              style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton1}
              onPress={() => this.bs.current.snapTo(1)}>
              <Text style={styles.panelButtonTitle1}>Cancel</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.panel}>
            <TouchableOpacity1
              onPress = {()=>this.handleTakeProfile()}
              style={styles.panelButton} >
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity1>
            <TouchableOpacity1
              onPress = {()=>this.handleChooseProfile()}
              style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity1>
            <TouchableOpacity1
              style={styles.panelButton1}
              onPress={() => this.bs.current.snapTo(1)}>
              <Text style={styles.panelButtonTitle1}>Cancel</Text>
            </TouchableOpacity1>
          </View>
        }
      </View>
    )
  }

  ViewProfile = (username) => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    if(username !== this.props.username){
      this.props.navigation.navigate("ProfilePage", {
        username: username
      })
    } else {
      this.props.navigation.navigate("Profile")
    }

  }


  renderHeader = () => (
    <View style={styles.test}>
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
    </View>
  );

  render(){

    let data = []
    let creatorID=0
    let creatorFirstName=""
    let creatorLastName=""
    let creatorUserName=""
    let smallGroups = []
    let picture = ""
    let groupName = ""
    let members = []
    let description = ""
    let publicG = false
    let code = ""
    let groupID=""
    let address=""



    const {smallGroupInfo} = this.state
    if(smallGroupInfo.creator){
      creatorFirstName=smallGroupInfo.creator.first_name
      creatorLastName=smallGroupInfo.creator.last_name
      creatorID=smallGroupInfo.creator.id
      creatorUserName=smallGroupInfo.creator.username

    }


    return(
      <BackgroundContainer>
        <View underlayColor="#f0f0f0">
          <View style={{

              flexDirection:'column',
            }}>
            <View style={{flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',
              width:'100%',


            }}>
            {/*
              <View style={{flexDirection:'row', alignItems:'center', marginBottom:'5%',}}>
                <Text style={styles.settingWord}>

                Invite code
                </Text>
                <TouchableOpacity onPress={()=>this.shareMessage()}>

                <View style={styles.loginBtn0}>
                  <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold', padding:5}}>{code}</Text>
                </View>
                </TouchableOpacity>
              </View>
            */}

              <TouchableOpacity   onPress={() => this.bs.current.snapTo(0)}>
                <Avatar
                  rounded
                  source = {{
                    uri: `${global.IMAGE_ENDPOINT}`+smallGroupInfo.groupPic
                  }}
                  size={125}
                   />
              </TouchableOpacity>

              <View style={{
                marginTop:10,
                }}>
                  <Text style={{fontSize:20, fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{smallGroupInfo.group_name}</Text>
                {/*
                <TouchableOpacity onPress = {()=>this.navPeopleInGroup(this.props.route.params.groupId)}>

                    <Text style={{fontSize:12,fontFamily:'Nunito-SemiBold', textAlign:'center', color:'#8c8c8c',}}> {members.length} Members </Text>

                  </TouchableOpacity>
                */}
                <View style={{flexDirection:'row', width:'60%', justifyContent:'center', alignItems:'center'}}>
                  <MapPin style={{marginRight:5,}} stroke="#8c8c8c" strokeWidth={2.5}  width={15} height={15} />
                  <Text style={{fontSize:13, fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{address}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress = {() => this.ViewProfile(creatorUserName)}
                style={{flexDirection:'row', alignItems:'center'}}>
                  <Avatar
                    size={15}
                    rounded
                    source = {{
                      uri: `https://images.unsplash.com/photo-1569173112611-52a7cd38bea9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80`
                    }}
                  />
                <Text style={{marginLeft:5, fontFamily:'Nunito-SemiBold', fontSize:13}}>{creatorFirstName+" "+creatorLastName}</Text>
              </TouchableOpacity>

            </View>


            <View style={{ }}>
            <View style={{ alignItems:'center', marginTop:15, marginBottom:15,}}>
              <Text style={{marginLeft:20,fontSize:16, fontFamily:'Nunito', width:'85%',}}>
                {description}
              </Text>
            </View>
            </View>
           </View>

           <TouchableHighlight underlayColor="#f0f0f0" onPress = {()=>this.navInvitePeople()}>
             <View style={{flexDirection:'row', padding:10, alignItems:'center', marginLeft:20,}}>
               <View style={styles.roundButton1}>
                 <UserPlus stroke="white" strokeWidth={2.5} width={17.5} height={17.5} />
               </View>
               <Text style={styles.settingWord}> Invite People </Text>
             </View>
           </TouchableHighlight>
           {
             (this.props.curId==creatorID)?
               <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.navAnnouncements()}>
                <View style={{flexDirection:'row', padding:10, alignItems:'center', marginLeft:20,}}>
                  <View style={styles.roundButton1}>
                    <Mic stroke="white" strokeWidth={2.5}  width={17.5} height={17.5} />
                  </View>
                 <Text style={styles.settingWord}> Create Announcements </Text>
                 </View>
               </TouchableHighlight>
               :
              <Text></Text>
           }

           {(!publicG)?
             <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.navigateUserInfo()}>
              <View style={{flexDirection:'row', padding:10, alignItems:'center', marginLeft:20,}}>
                <View style={styles.roundButton1}>
                  <Unlock stroke="white" strokeWidth={2.5}  width={17.5} height={17.5} />
                </View>
               <Text style={styles.settingWord}> Make Orb Public </Text>
               <View style = {{
                   flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                 }}>
                 {
                   this.state.loading === true ?
                   <ActivityIndicator />
                 :

                 <Switch
                   trackColor={ this.state.condition ? "gray": "red" }
                   thumbColor={this.state.condition ? "white" : "white"}
                   ios_backgroundColor="#3e3e3e"
                   onValueChange={this.toggleChange}
                   value={publicG}
                   disabled = {publicG}
                    />
                 }
               </View>
              </View>
             </TouchableHighlight>

           :
           <View style={{marginTop:'0%'}}>
             <Text></Text>
           </View>
            }
           <View style={{flexDirection:'row', padding:10, borderTopWidth:1, borderColor:'whitesmoke',
             alignItems:'center', marginLeft:10,}}>
             <Text style={{color:'#919191',
             fontSize:15,
             fontFamily:'Nunito-SemiBold', marginLeft:10,}}> Share The Orb </Text>
            </View>
              <View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}>
            <TouchableHighlight
              onPress={() => this.navMapsLocation(address)}
              style={styles.roundButton2}>
              <FontAwesomeIcon
               style = {{
                 color:'white',
                 right:1,
               }}
               size = {25}
               icon={faMapMarked} />
            </TouchableHighlight>
          </View>


          {/*
            (this.props.curId==creatorID)?
            <View style={{alignItems:'center', top:'5%'}}>
              <TouchableOpacity  onPress={() => this.toggleLeave(groupID)} style={styles.loginBtn1}>
                <Text style={{color:'white', fontSize:14, fontFamily:'Nunito-Bold'}}> LEAVE GROUP</Text>
              </TouchableOpacity>
            </View>

            :
            <View style={{alignItems:'center', top:'10%'}}>
              <TouchableOpacity  onPress={() => this.toggleLeave(groupID)} style={styles.loginBtn1}>
                <Text style={{color:'white', fontSize:14, fontFamily:'Nunito-Bold'}}> LEAVE GROUP</Text>
              </TouchableOpacity>
            </View>

          */}

        </View>

         <BottomSheet
          ref={this.bs}
          snapPoints={[250, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
        />

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
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },

  roundButton1: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 100,
    backgroundColor: '#1890ff',
    elevation:15,
  },

  roundButton2: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 100,
    backgroundColor: '#1890ff',
    elevation:15,
  },


  loginBtn0: {

    borderRadius: 10,
    marginLeft:10,

    // elevation:20,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row',
    backgroundColor: "#1890ff",

  },
  loginBtn1: {
    width: "60%",
    borderRadius: 10,
    height: 40,
    // elevation:20,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#ff4d4f",
  },
  panelButtonTitle: {
    color:'white'
  },
  panelButton: {
   padding: 13,
   borderRadius: 10,
   backgroundColor: '#1890ff',
   alignItems: 'center',
   marginVertical: 7,
   },
  panelButton1: {
  padding: 13,
  borderRadius: 10,
  backgroundColor: '#F0F0F0',
  alignItems: 'center',
  marginVertical: 7,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.2,

    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    // backgroundColor:'blue',
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  test: {
    elevation:5,
  },
  bottomContainer: {
    height: '25%',
    width: width,
    flexDirection:'row'
  },
  frequentPeopleContainer: {
    marginLeft:10,
    marginTop:20,
    height: 100,
    flexDirection: 'row',
  },
  column:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',       //THIS LINE HAS CHANGED
    marginRight:30,
    justifyContent:'center',

  },

  settingWord: {

    color:'#919191',
    fontSize:15,
    fontFamily:'Nunito-SemiBold',
    marginLeft:10,
  },
});

const mapStateToProps = state => {
  return {
    curId: state.auth.id,
    username: state.auth.username,
    // smallGroups: state.auth.smallGroups,
  }
}


const mapDispatchToProps= dispatch =>{
    return{
      authUpdateNewsfeedSlide: (index) => dispatch(authActions.authUpdateNewsfeedSlide(index)),
      authSetActiveNewsfeedSlide: (index) => dispatch(authActions.authSetActiveNewsfeedSlide(index)),
      authUpdateSmallGroup: (group) => dispatch(authActions.authUpdateSmallGroup(group)),
      authUpdateAllSmallGroup: (smallGroups, smallGroupsId) => dispatch(authActions.authUpdateAllSmallGroup(smallGroups, smallGroupsId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
