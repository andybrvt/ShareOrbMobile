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
 Modal,
 Constants
} from "react-native";
import { connect } from 'react-redux'
import { Camera } from 'expo-camera';
// import * as Permissions from 'expo-permissions';
import { Zap, ZapOff, X, ArrowLeft, Grid, Repeat, Circle} from "react-native-feather";
import * as dateFns from 'date-fns';
import  authAxios from '../util';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import * as authActions from '../store/actions/auth';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import * as ImagePicker from 'expo-image-picker';
import InputModal from '../RandomComponents/InputModal';
import Animated, {Easing} from 'react-native-reanimated';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import {loop, withTimingTransition, mix} from 'react-native-redash/lib/module/v1';
import GoalDropDown from './GoalDropDown';

const width = Dimensions.get("window").width
const height = Dimensions.get('window').height


const { Clock, cond, sub,divide, eq, add, call, set, Value, event, or } = Animated;


class CameraScreen extends React.Component{


  slide = new Value(SCREEN_HEIGHT);

  slideAnimation = withTimingTransition(this.slide, {duration: 300})

  constructor(props){

    super(props)
    this.showFinal = new Value(false)
  }
  state = {
    allowCamera: false,
    type: "front",
    showFlash: "off",
    imagePreview: null,
    isOpen: false,
    pageShow: true,
    showCaptionModal: false,
    caption:"",
    isGallery: false,
    goals: [],
    selectedGoal: {},
    showGoals: false,
    height: 0,
  }

  componentDidMount(){
    this.allowPermissions()

    const curId = this.props.curUserId
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/goalList/`+curId)
    .then( res => {
      this.setState({
        goals: res.data
      })
    })

  }



  openShowGoals = () => {
    this.setState({
      showGoals: true
    })
  }

  closeShowGoals = () => {
    this.setState({
      showGoals: false
    })

  }

  onWriteCaption =() =>{

    if(this.state.showCaptionModal === false){
      this.showFinal.setValue(true)
      this.setState({
        showCaptionModal: true
      })
      this.textInput.focus()
    } else {

      if(this.state.caption.length === 0){
        this.showFinal.setValue(false)
        this.setState({
          showCaptionModal: false
        })
        Keyboard.dismiss()
      } else {
        Keyboard.dismiss()

      }

    }
  }


  changeCaption = e => {
    this.setState({
      caption:e
    })
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

    // try{

    // if (Constants.platform.ios) {
      // const  camera = await Permissions.askAsync(Permissions.CAMERA);


      // setTimeout(async () => {
        try{
          // const camera = await Permissions.askAsync(Permissions.CAMERA);
          const camera = await Camera.requestPermissionsAsync();

          if(camera.status  !== "granted"){
            alert("Permission to access camera roll is required!");

            return await Camera.requestPermissionsAsync();
          }

          this.setState({
            allowCamera: true
          })
        }
        catch(err){
          alert(err)
        }


      // }, 1000)

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

  // 20 sec video test
  handleLongPress = async () => {
        // Before starting to recording, setup a timer that calls stopRecording() after 20s IF the camera is still recording, otherwise, no need to call stop
        // setTimeout(() => this.state.capturing && this.camera.stopRecording(), 20*1000);
        // const videoData = await this.cameraRef.recordAsync();
        this.setState({ capturing: true});
    };

  onCancelPhoto(){

    this.showFinal.setValue(false)

    setTimeout(() =>  this.setState({
        isOpen: false,
        imagePreview: null,
        caption: "",
        showCaptionModal: false,
        isGallery: false,
        selectedGoal: {}
      }), 1 )

  }

  openPhoto =()=> {
    this.setState({
      isGallery: true
    })
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
     allowsEditing: false,
     aspect: [4, 3],
     quality: 1,
     base64: true,
   });

   if(!pickerResult.cancelled){
     this.props.openShowCamera()
     // setTimeout(() =>
     this.setState({
       isOpen: true,
       imagePreview: pickerResult.uri
     })

    // , 100)


   }
   if(pickerResult.cancelled){
     this.setState({
       isGallery: false
     })
     this.props.openShowCamera()
   }


  }

  onSavePhoto = (image) => {

    const ownerId = this.props.curUserId;
    const caption = this.state.caption;
    const goalId = this.state.selectedGoal.id;
    const curDate = dateFns.format(new Date(), "yyyy-MM-dd");
    const curDateTime = dateFns.format(new Date(), "yyyy-MM-dd HH:mm:ss")
    // const curDateTime = new Date();
    const formData = new FormData();
    const imageFile = global.FILE_NAME_GETTER(image);
    formData.append("curDate", curDate);
    formData.append('image', imageFile);
    formData.append('curDateTime', curDateTime);
    formData.append("caption", caption);
    formData.append('goalId', goalId);
    this.props.authAddTotalLoad()
    authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateSinglePic/`+ownerId,
      formData,
      {headers: {"content-type": "multipart/form-data"}}

    ).then(res => {

      // either put a props here that updates the newsfeed

        console.log(res.data.item)
        this.props.addFirstSocialCellPost(res.data.item)
        const coverPicForm = new FormData();
        coverPicForm.append('cellId', res.data.cellId)

        coverPicForm.append('coverImage', imageFile)

        this.props.authAddTotalLoad()
        authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateCoverPic/`+ownerId,
          coverPicForm,
          {headers: {"content-type": "multipart/form-data"}}

        ).then(res => {
          // put loading here

          this.props.authAddCurLoad()

          // or put one here
        })

      // this.props.authAddCurLoad()
      //
      // if(res.data.coverPicChange){
      //
      //
      //
      //   coverPicForm.append('createdCell', res.data.created)
      //   // you
      //   coverPicForm.append('coverImage', imageFile)
      //
      //   this.props.authAddTotalLoad()
      //   authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateCoverPic/`+ownerId,
      //     coverPicForm,
      //     {headers: {"content-type": "multipart/form-data"}}
      //
      //   ).then(res => {
      //     // put loading here
      //
      //     this.props.authAddCurLoad()
      //
      //   })
      //
      // }

      // this.props.authAddTotalLoad()

      // WebSocketSocialNewsfeedInstance.addUpdateSocialPost(
      //   ownerId,
      //   res.data.cell.id,
      //   res.data.created
      // )

      // this.props.authAddCurLoad()

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

  onSelectGoal = (goal) => {
    this.setState({
      selectedGoal: goal
    })
  }

  onClearSelectedGoal = () => {
    this.setState({
      selectedGoal: {}
    })
  }

  onSaveNewGoal = (goal) => {
    // run teh create function for goals here and then
    // add it into the state of goal list
    const userId = this.props.curUserId
    authAxios.post(`${global.IP_CHANGE}/mySocialCal/createGoal/`+userId,
      {
        body: goal
      }
    ).then(res => {
      this.setState({
        goals: [...this.state.goals, res.data],
      })
    })
  }

  additionalTop = () => {
    const top = this.state.height;

    if(top > 150){
      return -(top-150);
    }

    else{
      return 0;
    }
  }


  render(){

    const showCaption = this.state.showCaptionModal;
    return(
      <View
        style = {{flex: 1}}>
        <Animated.Code>
          {() => cond(this.showFinal, set(this.slide, SCREEN_HEIGHT*0.3), set(this.slide,SCREEN_HEIGHT))}
        </Animated.Code>

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

                <Animated.View style = {{
                    position: 'absolute',
                    backgroundColor: 'white',
                    borderRadius:20,
                    // android shadow
                    elevation:20,
                    shadowColor: '#52006A',
                    // ios shadow
                    shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    alignSelf: 'center',
                    zIndex: 99,
                    top: this.additionalTop(),
                    transform: [
                      {translateY: showCaption ? SCREEN_HEIGHT*0.3 : SCREEN_HEIGHT}
                    ]
                  }}>

                  <KeyboardAvoidingView
                    style = {{
                      padding: 20,
                      backgroundColor: 'transparent',
                      width: width*0.8,
                      alignItems: 'center',
                    }}
                    behavior = "height"
                    keyboardVerticalOffset = {10}
                    >
                    <Text style={{fontSize:18, paddingBottom:10}}> Caption</Text>
                   <View
                     style = {{
                       backgroundColor: "whitesmoke",
                       padding: 10,
                       borderRadius:10,
                       width: "100%",
                     }}
                     >
                     <TextInput
                       onContentSizeChange={(event) => {
                         console.log(event)
                          console.log(event.nativeEvent.contentSize.height)
                          // event.preventDefult()
                          this.setState({
                            height: event.nativeEvent.contentSize.height
                          })
                       }}
                       value = {this.state.caption}
                       onChangeText = {this.changeCaption}
                       placeholder = "Write something here..."
                       multiline = {true}
                       ref={(input) => { this.textInput = input; }}
                        />
                   </View>
                 </KeyboardAvoidingView>
                </Animated.View>

                <TouchableWithoutFeedback
                  onPress = {() => this.onWriteCaption()}
                  >
                  <Image
                    source = {{uri:this.state.imagePreview}}
                    style = {{
                      height: '100%',
                      width: "100%",
                      transform: [
                        {scaleX: !this.state.isGallery ? (this.state.type === "front" ? -1 : 1)  : 1}
                      ]
                    }}
                    />



                </TouchableWithoutFeedback>



                <GoalDropDown
                  cancel = {this.onClearSelectedGoal}
                  data = {this.state.goals}
                  showGoals = {this.state.showGoals}
                  onClose = {this.closeShowGoals}
                  select = {this.onSelectGoal}
                  save = {this.onSaveNewGoal}
                  />

               <TouchableOpacity
                 onPress = {() => this.onCancelPhoto()}
                 style = {{
                   position: 'absolute',
                   top: '5%',
                   left:'5%',
                 }}>
                 <X
                   style={{top:0, position:'absolute'}}
                   strokeWidth={4}
                   stroke = "#d9d9d9"
                   height = {40}
                   width = {40}/>
                 <X
                   stroke = 'white'
                   height = {40}
                   width = {40}/>
               </TouchableOpacity>

               {
                 this.state.selectedGoal.goal  ?

                 <View
                   style ={{
                     // position: 'relative',
                     position: 'absolute',
                     top: '4%',
                     right: '2%',
                     alignSelf: 'flex-end',

                     backgroundColor: '#000000aa',
                     padding: 20,
                     borderRadius: 30,
                     flexDirection: 'row'
                     // top: 100
                   }}
                   >



                   <View>
                     <Text style = {{
                         color: 'white',
                         textAlign: 'right'
                       }}>{this.state.selectedGoal.goal}</Text>
                   </View>

                   <View style = {{
                       height: 20,
                       width: 40
                     }}>

                   </View>

                 </View>

                 :

                 null




               }


                 <TouchableOpacity
                   onPress = {() => this.openShowGoals()}
                   style ={{
                     // position: 'relative',
                     position: 'absolute',
                     top: '5%',
                     right:'5%',
                     // top: 100
                   }}
                   >
                   <Circle
                     style={{top:0, position:'absolute'}}
                     stroke = "#d9d9d9"
                     strokeWidth={3}
                     width = {40}
                     height = {40}
                      />

                    <Circle
                      strokeWidth={2}
                      stroke = "white"
                      width = {40}
                      height = {40}
                       />

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
                autoFocus={"on"}
                ref = {node => {this.cameraRef = node}}
                type = {this.state.type}
                ratio={"16:9"}
                skipProcessing={false}
                flashMode = {this.state.showFlash}
                style = {{flex: 1}}>
                    <TouchableOpacity
                      onPress = {() => this.onRedirect()}
                      style = {{
                        position: 'absolute',
                        top: '5%',
                        left:'5%',
                      }}
                      >
                      <ArrowLeft
                        style={{top:0, position:'absolute'}}
                        strokeWidth={3}
                        stroke = "#d9d9d9"
                        width = {40} height = {40} />
                      <ArrowLeft
                        strokeWidth={2}
                        stroke = "white"
                        width = {40} height = {40} />

                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress = {this.openPhoto}
                      style = {{
                        position: 'absolute',
                        bottom: '5%',
                        left: '5%',
                        alignSelf: 'flex-start',
                      }}
                      >

                      <Grid
                        style={{top:0, position:'absolute'}}
                        strokeWidth={3}
                        stroke = "#d9d9d9"
                        width = {40} height = {40} />
                      <Grid
                        strokeWidth={2}
                        stroke = "white"
                        width = {40} height = {40} />

                    </TouchableOpacity>




                    {
                      this.state.showFlash === "on" ?

                      <TouchableOpacity
                        onPress = {() => this.onFlash()}
                        style ={{
                          position: 'absolute',
                          top: '5%',
                          right:'5%',
                        }}>
                        <Zap
                          style={{top:0, position:'absolute'}}
                          stroke = "#d9d9d9"
                          strokeWidth={3}
                          width = {30}
                          height = {30} />
                        <Zap
                          stroke = "white"
                          strokeWidth={2}
                          width = {30}
                          height = {30} />
                      </TouchableOpacity>

                      :

                      <TouchableOpacity
                        onPress = {() => this.onFlash()}
                        style ={{
                          // position: 'relative',
                          position: 'absolute',
                          top: '5%',
                          right:'5%',
                          // top: 100
                        }}>
                        <ZapOff
                          style={{top:0, position:'absolute'}}
                          stroke = "#d9d9d9"
                          strokeWidth={3}
                          width = {30}

                          height = {30} />
                        <ZapOff
                          strokeWidth={2}
                          stroke = "white"
                          width = {30}
                          height = {30} />
                      </TouchableOpacity>

                    }



                    <TouchableOpacity
                      onPress = {() => this.onSwitchCamera()}
                      style ={{
                        // position: 'relative',
                        position: 'absolute',
                        top: '15%',
                        right: '5%',
                        // top: 100
                      }}>

                      <Repeat
                        style={{top:0, position:'absolute'}}
                        strokeWidth={3}
                        stroke = "#d9d9d9"
                        width = {30} height = {30} />
                      <Repeat
                        strokeWidth={2}
                        stroke = "white"
                        width = {30} height = {30} />
                    </TouchableOpacity>


                  <TouchableOpacity
                    onLongPress = {() => this.handleLongPress()}
                    onPress = {() => this.takePicture()}
                    style = {[(this.state.capturing)&&styles.captureBtnActive,styles.captureBtn]}></TouchableOpacity>



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
    addFirstSocialCellPost: (post) => dispatch(socialNewsfeedActions.addFirstSocialCellPost(post))
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
    borderRadius: 5,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:10,
  },
  btnText: {
    color: "white"
  },
  captureBtn: {
    position: 'absolute',
    bottom: '5%',
    width: 90,
    height: 90,
    borderRadius: 100,
    borderWidth: 5,
    alignSelf: 'center',
    borderColor: 'white'
  },

  captureBtnActive: {
    position: 'absolute',
    bottom: '5%',
    width: 90,
    height: 90,
    borderRadius: 100,
    borderWidth: 5,
    alignSelf: 'center',
    borderColor: 'red'
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
