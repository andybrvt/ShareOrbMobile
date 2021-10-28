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
  TextInput,
  Dimensions,
  RefreshControle,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  Alert
 } from 'react-native';
import { Search, LogOut, Lock, User, Bell, Globe, Menu, PlusCircle, ArrowLeft} from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import ExploreSearchBar from '../Explore/ExploreSearchBar';
import authAxios from '../util';
import FakeRoundedInput from '../RandomComponents/FakeRoundedInput';
import SearchResults from '../Explore/SearchResults';
import SearchResultsMultiple from './SearchResultsMultiple';
import { connect } from 'react-redux';
import * as authActions from '../store/actions/auth';
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';
import AddressSearch from './AddressSearch';
import * as Location from 'expo-location';
import { faStore, faUsers, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Animated, {Easing} from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import BasicGroupPage from './BasicGroupPage';
import SlideWrap from '../Login/SlideWrap';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class CreateGroupPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      one: true,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven:false,
      eight: false,
      condition:true,
      loading: false,
      username: '',
      loginCondition:true,
      groupPic: "",
      groupName: "",
      description: "",
      publicG: true,
      searchResults: [],
      invitedPeople: [],
      searchValue: '',
      showSearch: false,
      disabled:false,
      showAddressSearch: false,
      selectedAddress: "",
      businessCondition:false,
      type:'',
      inputValue:'',
      isModalVisible:false,
    }
    this.bs = React.createRef()
  }


  openModal = (modalNum) => {
    // this function will open a specific modal
    if(modalNum === 'one'){
      // this.setState({+
      //   one:true,
      //   videoPlaying:false,
      //   resumeOnce:true,
      // })
      // this.video.current.pauseAsync()
      console.log('stuff here')
    }
    if(modalNum === 'two'){
      this.setState({
        two:true
      })
    }
    if(modalNum === 'three'){
      this.setState({
        three:true
      })
    }
    if(modalNum === 'four'){
      this.setState({
        four:true
      })
    }
    if(modalNum === 'five'){
      this.setState({
        five:true
      })
    }
    if(modalNum === 'six'){
      this.setState({
        six:true
      })
    }
    if(modalNum === 'seven'){
      this.setState({
        seven:true
      })
    }
  }

  closeModal = (modalNum) => {
    if(modalNum === 'one'){
      // this.setState({
      //   one:false
      // })
      this.props.navigation.navigate('createSmallGroup')
    }
    if(modalNum === 'two'){
      this.setState({
        two:false
      })
    }
    if(modalNum === 'three'){
      this.setState({
        three:false
      })
    }
    if(modalNum === 'four'){
      this.setState({
        four:false
      })
    }
    if(modalNum === 'five'){
      this.setState({
        five:false
      })
    }
    if(modalNum === 'six'){
      this.setState({
        six:false
      })
    }
    if(modalNum === 'seven'){
      this.setState({
        seven:true
      })
    }
  }


  testGeoCode = async() =>{
    const location = await Location.reverseGeocodeAsync({
      latitude: 32.25143,
      longitude: -111.02191
    })

    console.log(location)
  }

  setAddress = async(address) => {
    // this function will set the address into the states
    const location = await Location.geocodeAsync(address)
    this.setState({
      selectedAddress: address,
      showAddressSearch: false
    })
  }

  onShowAddressSearch = () => {
    this.setState({
      showAddressSearch: true
    })
  }


  onCloseAddressSearch = () => {
    this.setState({
      showAddressSearch: false
    })
  }



  onCloseSearch = () => {
    this.setState({
      searchValue: "",
      showSearch: false
    })
  }

  onPublicChange = () => {
    this.setState({
      publicG: !this.state.publicG
    })
  }



  onGroupNameChange = e => {
    this.setState({
      groupName:e
    })
  }


  onGroupPicChange = e => {
    this.setState({
      groupPic: e
    })
  }

  onDescriptionChange = e => {
    this.setState({
      description: e
    })
  }


  onTypeChange = e => {
    this.setState({
      type: e
    })
    console.log(e)
  }

  onNameChange = e => {
    this.setState({
      firstName: e
    })
  }

  onChangeNewSearch = e => {

   this.setState({
     searchValue: e
   })

   const search = e === undefined ? null : e;

   if(search !== ""){
     this.setState({
       loading: true
     });
   authAxios.get(`${global.IP_CHANGE}/userprofile/userSearch/`, {
     params: {
       search
     }
   }).then(res => {
     this.setState({
       loading: false,
       searchResults: res.data.users,
     })
   })

 } else {
   // this.setState({
   //   searched:[],
   //
   // })
 }

 }




  onOutSideClick = () => {
    Keyboard.dismiss()
    this.bs.current.snapTo(1)
  }



  onUnShowSearch = () => {
     this.setState({
       showSearch: false
     })
  }

  onSearchChange = e => {
    this.setState({
      searchValue: e
    })
  }

  onSelectUser = (user) => {

    if(this.state.invitedPeople.some(item => user.username == item.username)){
      const newList = this.state.invitedPeople.filter(function(el) { return el.username != user.username });
      this.setState({
        invitedPeople: newList
      })
    }
    else{
      this.setState({
        invitedPeople: [...this.state.invitedPeople, user],
      })
    }


  }

  checkCreating = () => {
    // this function will check whether or not you meet the criteria
    // to sumbit to create a group
    const {groupPic, type, groupName, description, publicG, invitedPeople, selectedAddress} = this.state
    if(groupPic === ""){
      return false
    }
    if(groupName === ""){
      return false
    }
    if(description === ""){
      return false
    }
    if(selectedAddress === ""){
      return false
    }
    return true
  }

  onCreateGroup = async() => {
    // this function is used to create
    this.setState({
      disabled:true,
    })
    const {groupPic, groupName, description, type, publicG, invitedPeople, selectedAddress} = this.state
    // let newInvited = [];
    // for(let i = 0; i < invitedPeople.length; i++){
    //     newInvited.push(
    //       invitedPeople[i].id
    //     )
    // }


    const location = await Location.geocodeAsync(selectedAddress)
    const address=selectedAddress
    console.log("Final info!")
    console.log(groupName)
    console.log(type)
    console.log(description)
    console.log(groupPic)
    console.log(address)
    const lat = location[0].latitude
    const long = location[0].longitude
    const pic = global.FILE_NAME_GETTER(groupPic)
    const formData = new FormData();
    formData.append('groupPic', pic)
    formData.append('groupName', groupName)
    formData.append('description', description)
    formData.append('public', publicG)
    formData.append('curId', this.props.id)
    formData.append('type', type)
    // formData.append('invited', JSON.stringify(newInvited))
    formData.append("lat", lat)
    formData.append("long", long)
    formData.append("address", selectedAddress)
    authAxios.post(`${global.IP_CHANGE}/mySocialCal/createSmallGroup`,
      formData
    ).then(res => {
      console.log(res.data, 'create a group here')
      const numIndex=this.props.smallGroups.length
      this.props.authAddSmallGroup(res.data)
      // const groupId = res.data.id
      //
      // // for(let j = 0; j < newInvited.length; j++){
      // //   const userId = newInvited[j]
      // //   const curId = this.props.id
      //
      //
      //   // const notificationObject = {
      //   //   command: "send_group_invite_notification",
      //   //   actor: curId,
      //   //   recipient: userId,
      //   //   groupId: groupId
      //   // }
      //
      //   // NotificationWebSocketInstance.sendNotification(notificationObject);
      //
      // // }
      //
      this.props.navigation.navigate("Explore")

      // this.props.authSetActiveNewsfeedSlide(numIndex+1)

      setTimeout(()=>{
         this.setState({
          disabled: false,
        });
      }, 2500)
    })

  }



  onBack = () => {
    this.props.navigation.goBack(0)
  }

  render(){
    return(
      <BackgroundContainer>

        <BasicGroupPage
          {...this.props}
          prompt = {"What is the name of your business?"}
          visible = {this.state.one}
          closeModal = {this.closeModal}
          loading = {this.state.loading}
          openModal = {this.openModal}
          onChange = {this.onGroupNameChange}
          value = {this.state.groupName}
          closeNum = {'one'}
          openNum = {'two'}
          loading = {this.state.loading}

          />

          <SlideWrap visible = {this.state.two}>
            <BasicGroupPage
              {...this.props}
              prompt = {"What type of business are you?"}
              visible = {this.state.two}
              closeModal = {this.closeModal}
              openModal = {this.openModal}
              autoCorrect={false}
              closeNum = {'two'}
              openNum = {'three'}
              type={true}
              onChange = {this.onTypeChange}
              value = {this.state.type}
              loading = {this.state.loading}
              />
          </SlideWrap>

        <SlideWrap visible = {this.state.three}>
          <BasicGroupPage
            {...this.props}
            prompt = {"Write a description of your business"}
            visible = {this.state.three}
            closeModal = {this.closeModal}
            openModal = {this.openModal}
            autoCorrect={false}
            closeNum = {'three'}
            openNum = {'four'}
            onChange = {this.onDescriptionChange}
            value = {this.state.description}
            loading = {this.state.loading}
            />
        </SlideWrap>

        <SlideWrap visible = {this.state.four}>
          <BasicGroupPage
            {...this.props}
            loading = {this.state.loading}
            prompt = {"Upload a picture"}
            closeModal = {this.closeModal}
            openModal = {this.openModal}
            onChange = {this.onGroupPicChange}
            value = {this.state.groupPic}
            closeNum = {'four'}
            openNum = {'five'}
            pp={true}
          />

        </SlideWrap>

        <SlideWrap visible = {this.state.five}>
          <BasicGroupPage
            {...this.props}
            prompt = {"Search your address"}
            visible = {this.state.four}
            value = {this.state.selectedAddress}
            onChange = {this.setAddress}
            closeModal = {this.closeModal}
            openModal = {this.openModal}
            add={true}
            submitGroup={this.onCreateGroup}
            closeNum = {'five'}
            openNum = {'six'}
            end={true}
          />

        </SlideWrap>
        {
          this.state.loading ?
          <View style = {{
              width: width,
              height: height,
              backgroundColor: 'transparent',
              position: 'absolute',
              zIndex: 999,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <View style = {{
                height: 200,
                width: 200,
                backgroundColor: "#000000aa",
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <ActivityIndicator
                size ="large"
                color = "white"
                 />
            </View>
          </View>
          :
          null
        }





      </BackgroundContainer>
    )
  }
}
const styles = StyleSheet.create({


  test: {
    elevation:5,
  },
  bottomContainer: {
    height: '25%',
    width: width,
    flexDirection:'row'
  },
  frequentPeopleContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  column:{
    padding: 10,
    alignItems: 'center',
    width: width/4,
    //THIS LINE HAS CHANGED
    justifyContent:'center',

  },

  loginBtn1: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    // elevation:20,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#40a9ff",
  },

  roundButton2: {
    width:210,
    height:210,
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 125,
    backgroundColor: '#1890ff',
    elevation:15,

  },

  loginBtn2: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    // elevation:20,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "gray",
  },
  modal: {
    backgroundColor: 'white',
    margin: 15,
    alignItems: undefined,
    justifyContent: undefined,
  },
  settingWord: {
    left:5,
    color:'#919191',
    fontSize:16,
    fontFamily:'Nunito-Bold',
    marginLeft:10,
  },
});

const mapStateToProps = state => {
  return{
    id: state.auth.id,
    smallGroups: state.auth.smallGroups,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authAddSmallGroup: (group) => dispatch(authActions.authAddSmallGroup(group)),
    authSetActiveNewsfeedSlide: (index) => dispatch(authActions.authSetActiveNewsfeedSlide(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupPage);
