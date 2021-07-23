import React from 'react';
import {
 ScrollView,
 StyleSheet,
 Text,
 View,
 Image,
 TextInput,
 Button,
 TouchableOpacity,
 Keyboard,
 TouchableWithoutFeedback,
 KeyboardAvoidingView,
 Dimensions,
 AsyncStorage,
 Modal
} from "react-native";
import { connect } from 'react-redux'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Zap, ZapOff, X, ArrowLeft, Grid} from "react-native-feather";
import * as dateFns from 'date-fns';
import  authAxios from '../util';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import * as authActions from '../store/actions/auth';
import * as ImagePicker from 'expo-image-picker';


const width = Dimensions.get("window").width


class CameraScreen extends React.Component{

  state = {
    allowCamera: false,
    type: "front",
    showFlash: "off",
    imagePreview: null,
    isOpen: false,
    pageShow: true
  }

  componentDidMount(){
    this.allowPermissions()

  }

  componentDidUpdate(){
  }



  onSwitchCamera(){
    const camera = this.state.type;

    if(camera === "front"){
      this.setState({
        type: 'back'
      })
    } else {
      this.setState({
        type: 'front'
      })
    }

  }
  onFlash(){

    const flash = this.state.showFlash;

    if(flash === "off"){
      this.setState({
        showFlash: 'on'
      })
    } else {
      this.setState({
        showFlash: 'off'
      })
    }


  }

  allowPermissions = async() => {

    try{

      const camera = await ImagePicker.requestCameraPermissionsAsync();

      if(!camera.granted){
        return ImagePicker.requestCameraPermissionsAsync();
      }

      this.setState({
        allowCamera: true
      })


    } catch(error){

    }
  }

  takePicture = async() => {
    if(!this.cameraRef){
      return
    }

    try {
      const pic = await this.cameraRef.takePictureAsync();

      this.setState({
        isOpen: true,
        imagePreview: pic.uri
      })
    } catch {
      console.log('error taking pictures')
    }


  }

  onCancelPhoto(){
    this.setState({
      isOpen: false,
      imagePreview: null
    })
  }

  openPhoto =()=> {
    this.props.closeShowCamera();


    setTimeout(() => {this.handleChoosePhoto()}, 100)
  }

  handleChoosePhoto = async() => {


    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();


    if(permissionResult.granted == false){
      alert("Permission to access camera roll is required!");
      return;
    }
    // this.props.closeShowCamera();

    let  pickerResult = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
     base64: true,
   });

   if(!pickerResult.cancelled){
     this.onSavePhoto(pickerResult.uri)

   }
   if(pickerResult.cancelled){
     this.props.openShowCamera()
   }


  }

  onSavePhoto = (image) => {
    // upload just one picture
    // console.log('save image')
    //
    // you gonnna need the userid to get the cells and then the date to
    // filter out the cell
    const ownerId = this.props.curUserId;
    const curDate = dateFns.format(new Date(), "yyyy-MM-dd");

    const formData = new FormData();
    const imageFile = global.FILE_NAME_GETTER(image);
    formData.append("curDate", curDate)
    formData.append('image', imageFile)

    this.props.authAddTotalLoad()
    authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateSinglePic/`+ownerId,
      formData,
      {headers: {"content-type": "multipart/form-data"}}

    ).then(res => {

      this.props.authAddCurLoad()

      if(res.data.coverPicChange){


        const coverPicForm = new FormData();

        coverPicForm.append('cellId', res.data.cell.id)
        coverPicForm.append('createdCell', res.data.created)
        // you
        coverPicForm.append('coverImage', imageFile)

        this.props.authAddTotalLoad()
        authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateCoverPic/`+ownerId,
          coverPicForm,
          {headers: {"content-type": "multipart/form-data"}}

        ).then(res => {
          // put loading here

          this.props.authAddCurLoad()

        })

      }

      this.props.authAddTotalLoad()

      WebSocketSocialNewsfeedInstance.addUpdateSocialPost(
        ownerId,
        res.data.cell.id,
        res.data.created
      )

      this.props.authAddCurLoad()

      // if(this.props.curLoad >= this.props.totalLoad){
      //   // if they are equal or larger you will just set it back to zero
      //   this.props.authZeroCurLoad()
      //   this.props.authZeroTotalLoad()
      //
      // }




    })

    this.onCancelPhoto();
    this.props.navigation.navigate("newsfeed");

    setTimeout(() => {this.props.closeShowCamera()}, 1000);


  }

  onRedirect = () => {
    this.props.closeShowCamera();
    this.props.navigation.goBack();
  }

  render(){

    return(
      <View
        // visible = {this.props.showCamera}
        style = {{flex: 1}}>

        <Modal
          visible = {this.props.showCamera}
          style = {{flex: 1}}
          >
        {
          this.state.allowCamera ?
          <View style = {{flex: 1}}>

            {
              this.state.imagePreview !== null ?

              <Modal  animationType = "fade" visible = {this.state.isOpen}>

                <Image
                  source = {{uri:this.state.imagePreview}}
                  style = {{
                    height: '100%',
                    width: "100%",
                    transform: [
                      {scaleX: this.state.type === "front" ? -1 : 1}
                    ]
                  }}

                   />

               <TouchableOpacity
                 onPress = {() => this.onCancelPhoto()}
                 style = {{
                   position: 'absolute',
                   top: 20,
                   left: 10
                 }}>
                 <X
                   stroke = 'white'
                   height = {40}
                   width = {40}/>
               </TouchableOpacity>

               <TouchableOpacity
                 style = {styles.submitBtn}
                 onPress = {() => this.onSavePhoto(this.state.imagePreview)}
                 >
                   <Text style = {{
                       color: 'white',
                       fontSize: 20
                     }}> Save  </Text>
               </TouchableOpacity>

              </Modal>

              :

              <Camera
                ref = {node => {this.cameraRef = node}}
                type = {this.state.type}
                flashMode = {this.state.showFlash}
                style = {{flex: 1}}>

                  <TouchableWithoutFeedback
                    onPress = {() => this.onSwitchCamera()}
                    style = {{flex: 1}}>
                    <View style = {{ flex: 1, }}></View>
                  </TouchableWithoutFeedback>




                    <TouchableOpacity
                      onPress = {() => this.onRedirect()}
                      style = {{
                        position: 'absolute',

                        top: 20
                      }}
                      >
                      <ArrowLeft
                        stroke = "white"
                        width = {45} height = {45} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress = {this.openPhoto}
                      style = {{
                        position: 'absolute',
                        bottom: 30,
                        left: 30,
                        alignSelf: 'flex-start',
                      }}
                      >
                      <Grid
                        stroke = "white"
                        width = {40} height = {40}/>
                    </TouchableOpacity>




                    {
                      this.state.showFlash === "on" ?

                      <TouchableOpacity
                        onPress = {() => this.onFlash()}
                        style ={{
                          position: 'absolute',
                          top: 200,
                          right: 20
                        }}>
                        <Zap
                          stroke = "white"
                          width = {40}
                          height = {40} />
                      </TouchableOpacity>

                      :

                      <TouchableOpacity
                        onPress = {() => this.onFlash()}
                        style ={{
                          // position: 'relative',
                          position: 'absolute',
                          top: 200,
                          right: 20
                          // top: 100
                        }}>
                        <ZapOff
                          stroke = "white"
                          width = {40}
                          height = {40} />
                      </TouchableOpacity>

                    }



                  <TouchableOpacity
                    onPress = {() => this.takePicture()}
                    style = {styles.captureBtn}></TouchableOpacity>

              </Camera>
            }



          </View>

          :


          <View style = {styles.notAllowed}>
            <TouchableOpacity
              onPress = {this.allowPermissions}
              style = {styles.btn}>

              <Text style = {styles.btnText}>
                Allow camera permissions
              </Text>

           </TouchableOpacity>

          </View>


        }

        </Modal>

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    curUserId: state.auth.id,
    showCamera: state.auth.showCamera
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeShowCamera: () => dispatch(authActions.closeShowCamera()),
    authAddCurLoad: () => dispatch(authActions.authAddCurLoad()),
    authAddTotalLoad: () => dispatch(authActions.authAddTotalLoad()),
    authZeroCurLoad: () => dispatch(authActions.authZeroCurLoad()),
    authZeroTotalLoad: () => dispatch(authActions.authZeroTotalLoad()),

    openShowCamera: () => dispatch(authActions.openShowCamera()),

  }
}



const styles = StyleSheet.create({
  notAllowed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5

  },
  btnText: {
    color: "white"
  },
  captureBtn: {
    position: 'absolute',
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 5,
    alignSelf: 'center',
    borderColor: 'white'
  },
  submitBtn: {
    position: 'absolute',
    padding: 15,
    backgroundColor: '#1890ff',
    borderRadius: 20,
    alignSelf: 'flex-end',
    bottom: 25,
    right: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
