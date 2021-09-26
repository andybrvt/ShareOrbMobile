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
  Share,
  Alert,
  TextInput,
  Dimensions,
  RefreshControle,
  ActivityIndicator
 } from 'react-native';
import { LogOut, Lock, User, Bell, Globe, ArrowRight, Menu} from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
<<<<<<< HEAD
import { connect } from "react-redux";
=======
import authAxios from '../util';
import * as authActions from '../store/actions/auth';
>>>>>>> 828091e050727f3334ae290e8e501905b0d4107b

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
      publicG: false
    }
    this.bs = React.createRef()
  }

  navPeopleInGroup= () => {
    this.props.navigation.navigate("PeopleInGroup")
  }

  navInvitePeople = () => {
    this.props.navigation.navigate("InvitePeople")
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
    if(this.props.smallGroups){
      data = this.props.smallGroups
    }
    console.log(data)


    let smallGroups = []
    let picture = ""
    let groupName = ""
    let members = []
    let description = ""
    let publicG = false
    let code = ""
    if(this.props.smallGroups){
      if(this.props.route.params.groupId){

        const groupId = this.props.route.params.groupId

        for(let i = 0; i < this.props.smallGroups.length; i++){
          if(this.props.smallGroups[i].id === groupId){
            const group = this.props.smallGroups[i]
            picture = `${global.IMAGE_ENDPOINT}`+group.groupPic
            groupName = group.group_name;
            members = group.members
            description = group.description
            publicG = group.public
            code = group.groupCode
          }


        }


      }
    }

    return(
      <BackgroundContainer>

        <View underlayColor="#f0f0f0">
          <View style={{
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'row',

            }}>

            <View style={{flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',

              width:'100%',
              // backgroundColor:'red',
              }}>
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
              <TouchableOpacity   onPress={() => this.bs.current.snapTo(0)}>
                <Avatar
                  rounded
                  source = {{
                    uri: picture
                  }}
                  size={125}
                   />
              </TouchableOpacity>
              <View style={{
                marginTop:10,

                }}>

                  <Text style={{fontSize:22,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{groupName}</Text>
                  <TouchableOpacity onPress = {()=>this.navPeopleInGroup()}>
                    <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold', textAlign:'center', }}> {members.length} Members </Text>
                  </TouchableOpacity>
              </View>
            </View>
           </View>
           <View style={{ alignItems:'center', marginTop:25}}>
           <Text style={{marginLeft:20,fontSize:18, fontFamily:'Nunito', width:'85%',}}>
             {description}
           </Text>
           </View>
           <TouchableOpacity onPress = {()=>this.navInvitePeople()}>
             <View style={{
               marginTop:25,
                 flexDirection:'row',
                 borderTopWidth:1,
                 borderColor:'#d9d9d9',
                 borderBottomWidth:1,
                 padding:15,
                 alignItems:'center'
               }}>
                 <View style={{marginLeft:20, flexDirection:'column'}}>
                   <Text style={{fontFamily:'Nunito-Bold', fontSize:16}}>Invite with username</Text>
                 </View>
                 <View style={{marginLeft:'40%'}}>
                   <ArrowRight stroke="black" strokeWidth={2.5} width={20} height={20} style={{top:3}}/>
                 </View>
                 <View style = {{
                   flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                 }}>
               </View>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',padding:20}}>
                <View style={{marginLeft:20, flex:3, }}>
                 <Text style={{fontFamily:'Nunito-Bold', fontSize:16}}>Make Orb Public</Text>
               </View>

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
            <View style={{alignItems:'center', top:'7.5%'}}>
            <View style={styles.loginBtn1}>
              <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold'}}> LEAVE GROUP</Text>
            </View>
            </View>
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
  loginBtn0: {

    borderRadius: 10,
    marginLeft:10,
    // elevation:20,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",

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
    left:5,
    color:'#919191',
    fontSize:18,
    fontFamily:'Nunito-Bold',
    marginLeft:10,
  },
});

const mapStateToProps = state => {
  return {
  smallGroups: state.auth.smallGroups
  }
}
export default connect(mapStateToProps)(GroupInfo);
    smallGroups: state.auth.smallGroups
  }
}

const mapDispatchToProps= dispatch =>{
    return{
      authUpdateSmallGroup: (group) => dispatch(authActions.authUpdateSmallGroup(group))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
