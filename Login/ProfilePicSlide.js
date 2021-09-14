import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
 } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus } from "react-native-feather";
import pic from './default.png';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class ProfilePicSlide extends React.Component{
  constructor(props){
    super(props)
    this.bs = React.createRef()
  }
  next = () => {
    this.props.openModal(this.props.openNum)
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
      // this.uploadProfileImage(pickerResult.uri);
      this.props.onChange(pickerResult.uri);
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
      console.log("B")
      console.log(pickerResult.uri)
      this.props.onChange(pickerResult.uri);
      this.bs.current.snapTo(1)
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



  renderInner =()=> {
    return(
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
    )
  }

  render(){
    return(
      <View
        style = {{
           height: height,
           width: width,
           backgroundColor: '#1890ff',
           alignItems: 'center'
         }}
        >
        <View style = {styles.topContainer}>
          <Text style = {styles.profilePicText}>Pick a profile picture</Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => this.bs.current.snapTo(0)}
          >
          <View style = {styles.midContainer}>
            {
              this.props.value !== "" ?
              <Avatar
                size = {250}
                rounded
                source = {{
                  uri: this.props.value
                }}
                 />
               :
               <Avatar
                 size = {250}
                 rounded
                 source = {pic}
                  />
            }
          </View>
        </TouchableWithoutFeedback>

        <View style = {styles.bottomContainer}>
          <View style = {styles.bottomLContainer}>
            <TouchableOpacity
              onPress = {() => this.props.closeModal(this.props.closeNum)}
              >
              <ArrowLeftCircle
                width = {40}
                height = {40}
                stroke = "white"
                 />
            </TouchableOpacity>
          </View>

          {
            this.props.value !== "" ?
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
            : null
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    width: width,
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicText: {
    color: 'white',
    fontSize: 27.5,
    fontFamily:'Nunito-Bold',
  },
  midContainer:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  bottomContainer: {
    height: '25%',
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
    test: {
      elevation:5,
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


export default ProfilePicSlide;
