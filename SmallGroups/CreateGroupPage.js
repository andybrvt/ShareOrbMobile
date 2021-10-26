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

      inputValue:'',
      isModalVisible:false,
    }
    this.bs = React.createRef()
  }


  openModal = (modalNum) => {
    // this function will open a specific modal
    if(modalNum === 'one'){
      // this.setState({
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

  onShowSearch = () => {
    this.setState({
      showSearch: true
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

  onDescriptionChange = e => {
    this.setState({
      description: e
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


  onShowSearch = () => {
    this.setState({
      showSearch: true
    })
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
    const {groupPic, groupName, description, publicG, invitedPeople, selectedAddress} = this.state
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
    const {groupPic, groupName, description, publicG, invitedPeople, selectedAddress} = this.state
    // let newInvited = [];
    // for(let i = 0; i < invitedPeople.length; i++){
    //     newInvited.push(
    //       invitedPeople[i].id
    //     )
    // }


    const location = await Location.geocodeAsync(selectedAddress)
    const address=selectedAddress
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
      this.props.navigation.navigate('Home')
      this.props.authSetActiveNewsfeedSlide(numIndex+1)

      setTimeout(()=>{
         this.setState({
          disabled: false,
        });
      }, 2500)
    })

  }


  businessAlert = () => {
    console.log("hi")
    return(
        <Modal  animationType = "slide" visible = {true}>

          <AddressSearch
            onClose = {this.onCloseAddressSearch}
            setAddress = {this.setAddress}
            />
        </Modal>
    )
  }


  onBack = () => {
    this.props.navigation.goBack(0)
  }

  render(){
    return(
      <BackgroundContainer>

        <BasicGroupPage
          {...this.props}
          loading = {this.state.loading}
          visible = {this.state.one}
          prompt = {"What is the name of your business?"}
          value = {this.state.firstName}
          onChange = {this.onNameChange}
          closeModal = {this.closeModal}
          openModal = {this.openModal}
          closeNum = {'one'}
          openNum = {'two'}
           />
        <SlideWrap visible = {this.state.two}>
          <BasicGroupPage
            {...this.props}
            prompt = {"Write a description of your business"}
            visible = {this.state.two}
            closeModal = {this.closeModal}
            openModal = {this.openModal}
            closeNum = {'two'}
            openNum = {'three'}
            />
        </SlideWrap>

        <SlideWrap visible = {this.state.three}>
          <BasicGroupPage
            {...this.props}
            prompt = {"Upload a profile picture"}
            visible = {this.state.two}
            closeModal = {this.closeModal}
            openModal = {this.openModal}
            closeNum = {'three'}
            openNum = {'four'}
            pp={true}
          />

        </SlideWrap>

        <SlideWrap visible = {this.state.four}>
          <BasicGroupPage
            {...this.props}
            prompt = {"Search your address"}
            visible = {this.state.two}
            closeModal = {this.closeModal}
            openModal = {this.openModal}
            closeNum = {'four'}
            openNum = {'five'}
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

        {
          this.state.showSearch ?


          <SearchResultsMultiple
            searchValue = {this.state.searchValue}
            onSearchChange = {this.onChangeNewSearch}
            onClose = {this.onUnShowSearch}
            data = {this.state.searchResults}
            onSelect = {this.onSelectUser}
            invited = {this.state.invitedPeople}
             />

          :

          <View style ={{
                flex: 1}}>
            <TouchableWithoutFeedback
              onPress = {() => this.onOutSideClick()}
              >
                <ScrollView style = {{
                    height: height
                  }}>

                  <TouchableOpacity
                    style = {{
                      position: 'absolute',
                      left: '5%',
                      top: '5%',
                      zIndex: 999
                    }}
                    onPress = {() => this.onBack()}
                    >
                    <ArrowLeft
                      stroke="black"
                      height = {30}
                      width = {30}
                      />
                  </TouchableOpacity>

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
      marginTop:'20%', }}>


                        <View style={{flexDirection:'row', alignItems:'center',}}>


                        </View>
                        <View style={{
                          marginTop:10,
                          width:'55%',
                          flexDirection:'row',
                          // justifyContent:'center',
                          alignItems:'center',

                          }}>
                            <Text style={{color:'red',  marginRight:10, fontSize:18,}}>*</Text>
                            <TextInput
                             placeholder="Orb Name"
                             placeholderTextColor="#919191"
                             autoCorrect={false}
                             style={{fontSize:18, fontFamily:'Nunito-SemiBold',

                               textAlign:'center', color:'#919191', width:'75%' }}
                             onChangeText = {this.onGroupNameChange}
                             value = {this.state.groupName}
                             >
                           </TextInput>
                         </View>
                      </View>
                     </View>
                     <View style={{
                         flexDirection:'row',
                         justifyContent:'center',
                         // backgroundColor:'blue',
                         padding:25}}>
                         <Text style={{color:'red',  marginRight:10, fontSize:18,}}>*</Text>
                         <Menu stroke="#919191" strokeWidth={2.0} width={22.5} height={22.5} style={{top:3}}/>
                         <TextInput
                          placeholder="Description"
                          placeholderTextColor="#919191"
                          autoCorrect={false}
                          style={{marginLeft:20,fontSize:16, fontFamily:'Nunito-SemiBold', width:'85%', color:'#919191'}}
                          onChangeText = {this.onDescriptionChange}
                          value = {this.state.description}
                          />
                      </View>



                      <View>
                        <Text>Add Address</Text>

                      <TouchableOpacity
                        onPress = {() => this.onShowAddressSearch()}
                        >
                        <Text>{this.state.selectedAddress}</Text>
                        <Search />
                      </TouchableOpacity>

                      </View>

                  </View>

                  <View style={{marginTop:30}}>
                  {
                    this.checkCreating() ?
                    <View style={{alignItems:'center',
                      height: 100,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress = {() => this.onCreateGroup()}
                       style={styles.loginBtn1}>
                      <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold'}}> CREATE ORB</Text>
                    </TouchableOpacity>
                    </View>

                    :

                    <View style={{alignItems:'center',
                      height: 100,
                      justifyContent: 'center',
                    }}>
                    <View style={styles.loginBtn2}>
                      <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold'}}> CREATE ORB</Text>
                    </View>
                    </View>
                  }
                  </View>




                </ScrollView>



            </TouchableWithoutFeedback>
          </View>

        }




     <Modal
      animationType = "slide"
      visible = {this.state.showAddressSearch}>

       <AddressSearch
         onClose = {this.onCloseAddressSearch}
         setAddress = {this.setAddress}
         />
     </Modal>


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
