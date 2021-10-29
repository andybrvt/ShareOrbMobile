import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Modal,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
  Alert,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  TouchableHighlight,
 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRightCircle, ArrowLeftCircle, XCircle, Plus, Mail, UserPlus } from "react-native-feather";
import axios from "axios";
import { Camera } from 'expo-camera';
import { Avatar } from 'react-native-elements';
import CameraPic from './camera.jpg';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import AddressSearch from './AddressSearch';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { faStore, faUsers, faLaptopHouse, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

// used for general 1 line text input
class BasicGroupPage extends React.Component{

  constructor(props){
      super(props)
      this.state = {
        pageHeight: 0,
        showPassword: this.props.pw,
        loading: false,
        groupPic: "",

      }
      this.bs = React.createRef()
      this._keyboardDidShow = this._keyboardDidShow.bind(this)
      this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }


  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    if(this.props.visible||this.props.test){
      this.textInput.focus()
    }
  }


  checkType = (condition) => {
    if(condition=='online'){
      this.props.onChange("online")
    }
    else {
      this.props.onChange("store")
    }
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

      this.props.onChange(pickerResult.uri)
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
      this.props.onChange(pickerResult.uri)
      // this.uploadProfileImage(pickerResult.uri);
      this.setState({
        groupPic: pickerResult.uri
      })

      this.bs.current.snapTo(1)
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

  _keyboardDidShow(e){
    this.setState({
      pageHeight: e.endCoordinates.height
    })
  }

  _keyboardDidHide(e){
    this.setState({
      pageHeight: 0
    })
  }

  componentDidUpdate(prevProps){

    if((prevProps.visible !== this.props.visible)){
      if(this.props.visible){
        if(this.textInput){
          this.textInput.focus()
        }
      } else {
        Keyboard.dismiss()
        this.setState({
          pageHeight: 0
        })
      }

    }

  }

  userSubmit = () => {

    this.props.signup()
    // Keyboard.dismiss()
    // this.props.openModal(this.props.openNum)
  }

  checkUsername = () => {
    const username = this.props.value
    axios.get(`${global.IP_CHANGE}`+'/userprofile/validateUsername/'+username)
    .then(res => {
      if(res.data === true){
        Keyboard.dismiss()
        this.props.openModal(this.props.openNum)
      } else {
        Alert.alert(
          "Username already taken",
          "Someone else has the username already",
          [

            { text: "OK",
              style:'destructive',
              onPress: () => console.log('ok')
            }
          ]

        )
      }
    })
  }

  checkEmail = () => {
    const email = this.props.value;
    axios.get(`${global.IP_CHANGE}`+'/userprofile/validateEmail', {
      params: {
        email: email
      }
    })
    .then(res => {
      if(res.data === true){
        Keyboard.dismiss()
        this.props.openModal(this.props.openNum)
      } else {
        Alert.alert(
          "Email already taken",
          "Email in use already",
          [

            { text: "OK",
              style:'destructive',
              onPress: () => console.log('ok')
            }
          ]

        )
      }


    })


  }

  next = () => {
    console.log("ENDDDDDDDd")
    if(this.props.pw){
      Alert.alert(
        "Are you sure?",
        "You cannot go back after this, but you will still be able to edit later in the future",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes",
            style:'destructive',
            // onPress: () => this.userSubmit()
          }
        ]

      )

    }

    else if(this.props.un){
      // if username
      this.checkUsername()
    } else if(this.props.em){
      this.checkEmail()

    }
    else {
      Keyboard.dismiss()
      this.props.openModal(this.props.openNum)
    }

  }

  validate = () => {

    if(this.props.value === ""){
      return false
    }


    return true

  }

  render(){

    return(

        <View style = {{
            height: height-this.state.pageHeight,
            width: width,
            backgroundColor: '#1890ff',
            alignItems: 'center'
          }}>

          <View
            style = {styles.bottomContainer}
            >

            <View style = {styles.bottomLContainer}>
              {
                this.props.loading ?

                <TouchableOpacity
                  onPress = {() => this.props.closeModal(this.props.closeNum)}

                  >
                  <XCircle
                    width = {40}
                    height = {40}
                    stroke = "white"
                    />
                </TouchableOpacity>

                :



                <TouchableOpacity
                  onPress = {() => this.props.closeModal(this.props.closeNum)}

                  >
                  <ArrowLeftCircle
                    width = {40}
                    height = {40}
                    stroke = "white"
                    />
                </TouchableOpacity>


              }

            </View>


            {
              this.props.end ?
              <View style = {styles.bottomRContainer}>
                <TouchableOpacity
                  onPress = {() => this.props.submitGroup()}
                  >
                  <ArrowRightCircle
                    width = {40}
                    height = {40}
                    stroke = "white"
                    />
                </TouchableOpacity>
              </View>
              :

              <View style = {styles.bottomRContainer}>
                <TouchableOpacity
                  onPress = {() => this.next()}
                  >
                  <ArrowRightCircle
                    width = {40}
                    height = {40}
                    stroke = "white"
                    />
                </TouchableOpacity>
              </View>
            }
          </View>


            <View
              style = {styles.midContainer}
              >
              <Text style = {styles.promptText}>{this.props.prompt}</Text>
            </View>

            { this.props.pp==true?
              <View style={{marginTop:'10%'}}>
              {
                this.state.groupPic !== "" ?
                <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                  <Avatar
                    rounded
                    source = {{
                      uri: this.state.groupPic
                    }}
                    size={150}
                     />
                </TouchableOpacity>

                :
                <View style={{zIndex:99,  borderRadius:75,}}>
                <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                  <Avatar
                    rounded
                    source = {CameraPic}
                    size={150}
                     />
                </TouchableOpacity>
                </View>
              }
              </View>
              :
              null
            }

            { this.props.add==true?

              <View style={{padding:15}}>
              <GooglePlacesAutocomplete
                styles={{
                  textInputContainer: {
                    width:width-25
                  },
                  placesautocomplete: {
                    flex:1,
                  },
                  textInput: {
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                placeholder='Type here...                                            '
                onChangeText = {this.props.onChange}
                value = {this.props.value}
                onPress={(data, details = null) => {
                  this.props.onChange(data.description)
                }}
                onFail = {(err) => {
                  console.log(err)
                }}
                style = {{
                  textInput: {
                    color: 'black',

                  },
                  predefinedPlacesDescription: {
                   color: '#1faadb',
                 },
                }}
                query={{
                  key: 'AIzaSyCSJihRY1IF_wsdEWBgtK6UnmC9p_kxkh4',
                  language: 'en',
                }}
              />

              <View
                style={{width:width-25, }}
                >
                <Text style = {styles.promptText}>{this.props.value}</Text>
              </View>

            </View>

              :
              null
            }


            <View>
              {this.props.pp||this.props.type||this.props.add?
                <View></View>
              :
              <TouchableWithoutFeedback>
                <View
                  style = {styles.textContainer}
                  >
                  <TextInput
                    style = {{
                      width: 'width'
                    }}
                    autoCapitalize="none"
                    selectionColor={'white'}
                    style = {styles.textInput}
                    ref={(input) => { this.textInput = input; }}
                    onChangeText = {this.props.onChange}
                    value = {this.props.value}
                    />

                  </View>
              </TouchableWithoutFeedback>
              }
            </View>

            <View>
              { this.props.type?
                <View style={{height:'55%'}}>

                  {this.props.value=="store"?

                    <TouchableOpacity
                      style={styles.rectButtonStore}
                      activeOpacity={0.8}
                       onPress = {() => this.checkType("store")}
                       underlayColor={'gray'}  >
                        <FontAwesomeIcon
                        size = {50}
                        style={{color:'white'}}
                        icon={faStore} />
                        <Text style={{color:'white', fontSize:18, fontFamily:'Nunito-SemiBold'}}>In Person</Text>
                    </TouchableOpacity>
                  :

                  <TouchableOpacity
                    style={styles.rectButton}
                    activeOpacity={0.8}
                     onPress = {() => this.checkType("store")}
                     underlayColor={'gray'}  >
                      <FontAwesomeIcon
                      size = {50}
                      style={{color:'white'}}
                      icon={faStore} />
                      <Text style={{color:'white', fontSize:18, fontFamily:'Nunito-SemiBold'}}>In Person</Text>
                  </TouchableOpacity>
                  }

                  {this.props.value=="online"?

                    <TouchableOpacity

                      onPress = {() => this.checkType("online")}
                      underlayColor={'gray'}  style={styles.rectButtonOnline}>
                      <FontAwesomeIcon
                        size = {50}
                        style={{color:'white'}}
                        icon={faLaptopHouse} />
                      <Text style={{color:'white', fontSize:18, fontFamily:'Nunito-SemiBold'}}>Online</Text>
                    </TouchableOpacity>
                  :

                  <TouchableOpacity
                    onPress = {() => this.checkType("online")}
                    underlayColor={'gray'}  style={styles.rectButton}>
                    <FontAwesomeIcon
                      size = {50}
                      style={{color:'white'}}
                      icon={faLaptopHouse} />
                    <Text style={{color:'white', fontSize:18, fontFamily:'Nunito-SemiBold'}}>Online</Text>
                  </TouchableOpacity>
                  }


                </View>
                :
                <Text></Text>
              }
            </View>


            <BottomSheet
             ref={this.bs}
             snapPoints={[225, 0]}
             renderContent={this.renderInner}
             renderHeader={this.renderHeader}
             initialSnap={1}
             callbackNode={this.fall}
             enabledGestureInteraction={true}
           />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  rectButton: {
    marginTop:25,
    marginBottom:50,
    width:175,
    height:100,
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 10,
    backgroundColor: '#1890ff',
    elevation:15,

  },
  rectButtonOnline: {
    marginTop:25,
    marginBottom:50,
    width:175,
    height:100,
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 10,
    backgroundColor: '#2f54eb',
    elevation:15,

  },

  rectButtonStore: {
    marginTop:25,
    marginBottom:50,
    width:175,
    height:100,
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 10,
    backgroundColor: '#2f54eb',
    elevation:15,

  },
  promptText: {
    color: 'white',
    fontSize: 20,
    fontFamily:'Nunito-Bold',
    flexWrap: 'wrap'
  },
  profilePicTopContainer: {
    width: width,
    height:'5%',
    backgroundColor: '#1890ff'
  },
  topContainer: {
    width: width,
    height:'15%',
    backgroundColor: '#1890ff'
  },
  midContainer: {
    height: '20%',
    marginTop:'5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding:25,
    flexWrap: 'wrap',


  },
  textContainer: {
    alignItems:'center',
    justifyContent: 'center',
    height: '37.5%',
    width: '90%',
    top:'10%',
    // backgroundColor:'red',
  },
  textInput: {
    color: 'white',
    fontSize: 30,
    fontFamily:'Nunito-SemiBold',
  },
  bottomContainer: {
    padding: 25,
    width: width,
    flexDirection:'row'
  },
  bottomLContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30
  },
  bottomRContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 30
  },
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


})

export default BasicGroupPage;
