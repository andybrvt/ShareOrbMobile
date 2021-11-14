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
  TouchableWithoutFeedback,
  Platform,
  Keyboard
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

  render(){
    let data=this.props.data
    console.log("proifle!!1")
    console.log(data)
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
          {(this.props.data)?
            <View style={{marginTop:'48%', alignItems:'center'}}>

            <View style={{alignItems:'center'}}>
              <Text style={styles.fbText}>Welcome to ShareOrb</Text>

              <View style={{top:25, alignItems:'center'}}>
                <TouchableWithoutFeedback onPress={() => this.bs.current.snapTo(0)}>
                  <Avatar
                      size={210}
                      rounded
                      source = {{
                        uri:this.props.value,
                      }}
                    />

                </TouchableWithoutFeedback>
                <View style={{top:20}}>
                  <Text style={styles.fbText}>{data.name}</Text>
                </View>
              </View>
            </View>
            </View>
          :

        ''
          }

        </View>
        <View style={{height:'47.5%', }}>
        {!this.props.data?
        <TouchableWithoutFeedback onPress={() => this.bs.current.snapTo(0)}>
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
          :
          <View style = {styles.midContainer}>

          </View>
          }
          </View>
          <View>
          {
            (this.props.value=="https://scontent-lax3-2.xx.fbcdn.net/v/t1.30497-1/s960x960/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=iaSSiD4IA5cAX_Qg0zD&_nc_ht=scontent-lax3-2.xx&edm=AP4hL3IEAAAA&oh=ef00f6c1e2823c946ae3616645a0fa37&oe=61B79B3D")?
          <View>

            <Text style = {styles.fbText2}>
              Please enter a profile picture
            </Text>
          </View>
          :
          <Text></Text>
          }
          </View>
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
         <View>
           {this.props.data?
             <View style = {styles.bottomRContainer}>
               {
                  this.props.value !== ""&& this.props.value!=="https://scontent-lax3-2.xx.fbcdn.net/v/t1.30497-1/s960x960/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=iaSSiD4IA5cAX_Qg0zD&_nc_ht=scontent-lax3-2.xx&edm=AP4hL3IEAAAA&oh=ef00f6c1e2823c946ae3616645a0fa37&oe=61B79B3D"  ?
                  <View >
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
               </View>
           :
           <View style = {styles.bottomRContainer}>
             {
                this.props.value !== "" ?
                <View>
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
           </View>


          }

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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

fbText: {
  color: 'white',
  fontSize: 24.5,
  fontFamily:'Nunito-Bold',
},
fbText2: {
  color: 'white',
  fontSize: 20,
  fontFamily:'Nunito-Bold',
},
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
    // backgroundColor:'red'
  },
  midContainer2:{
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    // backgroundColor:'red'
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
