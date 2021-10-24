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
  Modal
 } from 'react-native';
import { Search, LogOut, Lock, User, Bell, Globe, Menu, PlusCircle, ArrowLeft} from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import CameraPic from './camera.jpg';
import { Avatar } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
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

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class CreateGroupPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
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
      selectedAddress: ""
    }
    this.bs = React.createRef()
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

  handleTakeProfile = async() => {
    let permissionResult = await Camera.requestPermissionsAsync();
    if(permissionResult.granted === false){
      alert("Permission to access camera is required!");
      // permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      base64: true,

    })


    if(!pickerResult.cancelled){

      this.setState({
        groupPic: pickerResult.uri
      })

      this.bs.current.snapTo(1)

    }

  }

  // handle to choose photo
  handleChooseProfile = async() => {
    // this will give permission in order to open up your camera roll
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted === false){
      // in the case that permission is not granted
      alert("Permission to access library is required!");
      return;
    }

    // this is to pick the image
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      base64: true,
    })

    if(!pickerResult.cancelled){
      // this is if you pick out a picture
      // in this case you will just change the picture right away

      // this.uploadProfileImage(pickerResult.uri);
      this.setState({
        groupPic: pickerResult.uri
      })

      this.bs.current.snapTo(1)
    }
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


  frequentChatPeople=()=>{
    return(
      <View style = {styles.frequentPeopleContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection:'row'}}>
          {
              this.state.invitedPeople.map((item, index) => {
                return(
                  <View
                    key = {index}
                    style={[styles.column]}>
                    <Avatar
                      rounded
                      source = {{
                        uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture
                      }}
                      size = {50}
                    />
                  <Text style={{fontFamily:'Nunito-SemiBold'}}>{item.first_name} {item.last_name}</Text>
                  </View>
                )
              })
            }
        </ScrollView>
        <TouchableOpacity
          onPress = {() => this.onShowSearch()}
          style={[styles.column]}>
           <PlusCircle
             stroke = "white"
             fill = {'#1890ff'}
             width = {40}
             height = {40}
              />
          </TouchableOpacity>


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

  onBack = () => {
    this.props.navigation.goBack(0)
  }

  render(){
    return(
      <BackgroundContainer>
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
                        marginTop:'25%', }}>
                        <View style={{flexDirection:'row', alignItems:'center',}}>

                        {
                          this.state.groupPic !== "" ?
                          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                            <Avatar
                              rounded
                              source = {{
                                uri: this.state.groupPic
                              }}
                              size={125}
                               />
                          </TouchableOpacity>

                          :
                          <View style={{zIndex:99, borderWidth: 1, borderColor: 'red', borderRadius:75,}}>
                          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                            <Avatar
                              rounded
                              source = {CameraPic}
                              size={125}
                               />
                          </TouchableOpacity>
                          </View>
                        }
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
                      <View style={{

                          flexDirection:'row',
                          borderTopWidth:1,
                          borderColor:'#d9d9d9',
                          borderBottomWidth:1,
                          padding:20}}>
                        <View>
                          <Globe stroke="#919191" strokeWidth={1.5} width={40} height={40} style={{top:3}}/>
                        </View>
                        {
                          (this.state.publicG)?
                          <View style={{marginLeft:20, flexDirection:'column'}}>
                            <Text style={{color:'#919191',
                            fontSize:16,
                            fontFamily:'Nunito-Bold',
                            }}>Make Orb Public</Text>
                          <Text style={{fontFamily:'Nunito-SemiBold', fontSize:14, color:"#919191" }}>Anyone can join the group</Text>
                          </View>
                          :
                          <View style={{marginLeft:20, flexDirection:'column'}}>
                            <Text style={{color:'#919191',
                            fontSize:16,
                            fontFamily:'Nunito-Bold',
                            }}>Make Orb Private</Text>
                          <Text style={{fontFamily:'Nunito-SemiBold', fontSize:14, color:"#919191"}}>Choose who joins the group</Text>
                          </View>
                        }

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
                            trackColor={{ false: "gray", true: "#1890ff" }}
                            thumbColor={this.state.condition ? "white" : "white"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.onPublicChange}
                            value={this.state.publicG }
                             />

                          }

                        </View>


                       </View>

                       {/*
                         <View style = {{top: 20}}>
                           <View >
                             <Text style={styles.settingWord}>People in Group</Text>
                           </View>
                            <View
                              style = {{
                                marginTop:20,
                                flex:1,
                                width: width}}
                             // showsHorizontalScrollIndicator={false}
                             // horizontal = {true}
                             >
                             {this.frequentChatPeople()}
                           </View>

                         </View>


                         */}

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

        <BottomSheet
         ref={this.bs}
         snapPoints={[250, 0]}
         renderContent={this.renderInner}
         renderHeader={this.renderHeader}
         initialSnap={1}
         callbackNode={this.fall}
         enabledGestureInteraction={true}
       />

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
