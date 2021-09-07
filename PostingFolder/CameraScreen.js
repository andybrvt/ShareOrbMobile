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
import VideoPreview from './VideoPreview';
import { Video, AVPlaybackStatus } from 'expo-av';
import Test from '../PostingFolder/Test'
const width = Dimensions.get("window").width
const height = Dimensions.get('window').height
import * as Progress from 'react-native-progress';


const { Clock,
   cond,
   sub,
   divide,
   eq,
   add,
   call,
   set,
   Value,
   event,
   or,
   startClock,
   stopClock,
   timing,
   Extrapolate,
   interpolate,
   block
  } = Animated;


class CameraScreen extends React.Component{


  slide = new Value(SCREEN_HEIGHT);

  slideAnimation = withTimingTransition(this.slide, {duration: 300})

  isRecording = new Value(false);

  clock = new Clock();


  runLoadingTimer = (clock) => {
    // timer will need 3 things, the clock, state, and config

    const state = {
      finished: new Value(0), // value that it will finished at
      position: new Value(0), //this will hold the value starting from here to the to value
      time: new Value(0), // time will start here and go fro the duration time
      frameTime: new Value(0)
    }

    const config = {
      duration: 10000, // how long it will go for in ms
      toValue: new Value(width), // this will be the value it will go to
      easing: Easing.inOut(Easing.ease)
    }

    return block([
      cond(this.isRecording,

        startClock(clock),
        [
          stopClock(clock),
          set(state.finished, new Value(0)),
          set(state.position, new Value(0)),
          set(state.time, new Value(0)),
          set(state.frameTime, new Value(0))
        ]

      ),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position
    ])
  }


  constructor(props){

    super(props)
    this.showFinal = new Value(false)
  }
  state = {
    allowCamera: false,
    allowMicrophone: false,
    type: "front",
    showFlash: "off",
    imagePreview: null,
    videoPreview: null,
    isOpen: false,
    isVideoOpen: false,
    pageShow: true,
    showCaptionModal: false,
    caption:"",
    isGallery: false,
    goals: [],
    selectedGoal: {},
    showGoals: false,
    height: 0,
    isRecording: false,
    counter: 0,
    timer: null,
  }

  componentDidMount(){



    this.allowPermissions()

    this.open = this.props.navigation.addListener('focus', () => {
      this.props.openShowCamera()

    });
    const curId = this.props.curUserId
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/goalList/`+curId)
    .then( res => {
      this.setState({
        goals: res.data
      })
    })

  }

  componentWillUnmount() {
     this.open();
   }

   tick = () => {
     this.setState({
       counter: this.state.counter + 0.1
     })
   }



  openShowGoals = () => {
    this.setState({
      showGoals: true,
      showCaptionModal:false,
    })
    Keyboard.dismiss()
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
          const microphone = await Camera.requestMicrophonePermissionsAsync();
          if(camera.status  !== "granted"){
            alert("Permission to access camera roll is required!");

            return await Camera.requestPermissionsAsync();
          }
          if(microphone.status !== "granted"){

            // PUT BACK ONCE VIDEO IS UP
            // alert("Permission to access microphone is required!");

            // return await Camera.requestMicrophonePermissionsAsync();
          }

          this.setState({
            allowCamera: true,
            allowMicrophone: true
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

  takeVideo = async() => {
    if(!this.cameraRef){
      return
    }


    try{

      this.setState({isRecording: true}, async() => {

        let timer = setInterval(this.tick, 1000);
        this.setState({
          timer
        })

        // this.isRecording.setValue(true)
        const video = await this.cameraRef.recordAsync({
          maxDuration: 10
        });

        // this.clearInterval(this.state.timer);

        clearInterval(this.state.timer);

        this.setState({
          isVideoOpen: true,
          isRecording: false,
          videoPreview: video.uri,
          timer: null,
          counter: 0
        })


        // this.isRecording.setValue(false)

      })


    } catch {
      console.log('error recording video')
    }
  }

  // 20 sec video test
  handleLongPress = () => {
        // Before starting to recording, setup a timer that calls stopRecording() after 20s IF the camera is still recording, otherwise, no need to call stop
        // setTimeout(() => this.state.capturing && this.camera.stopRecording(), 20*1000);
        // const videoData = await this.cameraRef.recordAsync();

        this.takeVideo();
  };

  handlePressOut = () => {
    this.cameraRef.stopRecording()
  }

  onCancelPhoto =() => {

    this.showFinal.setValue(false)

    setTimeout(() =>  this.setState({
        isOpen: false,
        imagePreview: null,
        caption: "",
        showCaptionModal: false,
        isGallery: false,
        selectedGoal: {},
        videoPreview: null,
        isVideoOpen: false,
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
     videoMaxDuration: 10,
   });

   if(!pickerResult.cancelled){
     this.props.openShowCamera()
     // setTimeout(() =>

     if(pickerResult.type === "image"){

       this.setState({
         isOpen: true,
         imagePreview: pickerResult.uri
       })

     }
     if(pickerResult.type === "video"){

       if(pickerResult.duration/1000 > 10){

          setTimeout(() => alert("Video duration cannot be over 10 seconds"), 300)
          // return
       } else {

         console.log(pickerResult.uri)
         // setTimeout(() => {
         //   this.setState({
         //     isVideoOpen: true,
         //     isRecording: false,
         //     videoPreview: pickerResult.uri
         //   })
         // }, 300)
         setTimeout(() => alert("Videos are not ready yet"), 300)



       }

     }



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
    // this.props.authAddTotalLoad()
    authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateSinglePic/`+ownerId,
      formData,
      {headers: {"content-type": "multipart/form-data"}}

    ).then(res => {

      // either put a props here that updates the newsfeed

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


  onSaveVideo = (video) => {
      console.log('save video')
      console.log(video)

      const ownerId = this.props.curUserId;
      const caption = this.state.caption;
      const goalId = this.state.selectedGoal.id;
      const curDate = dateFns.format(new Date(), "yyyy-MM-dd");
      const curDateTime = dateFns.format(new Date(), "yyyy-MM-dd HH:mm:ss")
      // const curDateTime = new Date();
      const formData = new FormData();
      const videoFile = global.FILE_NAME_GETTER(video);
      formData.append("curDate", curDate)
      formData.append("video", videoFile)
      formData.append('curDateTime', curDateTime);
      formData.append("caption", caption);
      formData.append('goalId', goalId);

      authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateSingleVid/`+ownerId,
        formData,
        {headers: {"content-type": "multipart/form-data"}}

      ).then(res =>{
        this.props.addFirstSocialCellPost(res.data.item)
        const coverPicForm = new FormData();
        coverPicForm.append('cellId', res.data.cellId)

        coverPicForm.append('coverVideo', videoFile)

        authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateCoverVid/`+ownerId,
          coverPicForm,
          {headers: {"content-type": "multipart/form-data"}}

        ).then( res => {

        })


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


  opacity = this.runLoadingTimer(this.clock)



  render(){
    console.log(this.state.videoPreview)
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
                    <Text style={{fontSize:16, paddingBottom:10, fontFamily:'Nunito-Bold'}}> Thoughts</Text>
                   <View
                     style = {{
                       // backgroundColor: "whitesmoke",
                       padding: 10,
                       borderRadius:10,
                       width: "100%",
                     }}
                     >
                     <TextInput
                       onContentSizeChange={(event) => {
                          // event.preventDefult()
                          this.setState({
                            height: event.nativeEvent.contentSize.height
                          })
                       }}
                       style={{fontFamily:'Nunito', color:'#595959', fontSize:15}}
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
                         textAlign: 'right',
                         fontFamily:'Nunito-SemiBold'
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
                     width = {35}
                     height = {35}
                      />

                    <Circle
                      strokeWidth={2}
                      stroke = "white"
                      width = {35}
                      height = {35}
                       />

                 </TouchableOpacity>

               <TouchableOpacity
                 style = {styles.submitBtn}
                 onPress = {() => this.onSavePhoto(this.state.imagePreview)}
                 >
                   <Text style = {{
                       color: 'white',
                       fontSize: 20,
                       fontFamily:'Nunito-SemiBold',
                     }}> Save  </Text>
               </TouchableOpacity>
              </Modal>

              :

              this.state.videoPreview !== null ?

              <Modal visible = {this.state.isVideoOpen}>
                <View style = {styles.container}>

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
                    style = {{flex: 1}}
                    onPress = {() => this.onWriteCaption()}

                    >
                    <Video
                      source={{ uri: this.state.videoPreview }}
                      style={[styles.image, { height, width }]}
                      rate={1.0}
                      isMuted={false}
                      resizeMode="cover"
                      volume={0.5}
                      isLooping
                      shouldPlay

                       />

                  </TouchableWithoutFeedback>

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
                         width = {35}
                         height = {35}
                          />

                        <Circle
                          strokeWidth={2}
                          stroke = "white"
                          width = {35}
                          height = {35}
                           />

                     </TouchableOpacity>


                     <TouchableOpacity
                       style = {styles.submitBtn}
                       onPress = {() => this.onSaveVideo(this.state.videoPreview)}
                       >
                         <Text style = {{
                             color: 'white',
                             fontSize: 20
                           }}> Save  </Text>
                     </TouchableOpacity>
                </View>
                <GoalDropDown
                  cancel = {this.onClearSelectedGoal}
                  data = {this.state.goals}
                  showGoals = {this.state.showGoals}
                  onClose = {this.closeShowGoals}
                  select = {this.onSelectGoal}
                  save = {this.onSaveNewGoal}
                  />
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

                <Progress.Bar
                  animationType = "timing"
                  borderWidth = {0}
                  style = {{
                    position: 'absolute',
                    bottom: '0%',
                    left: 0,
                  }}
                  progress = {this.state.counter} width = {width}/>
                {/*
                  <Animated.View
                      onPress = {() => this.onRedirect()}
                      style = {{
                        position: 'absolute',
                        bottom: '0%',
                        left: 0,
                        backgroundColor: '#1890ff',
                        width: this.opacity,
                        height: 10,
                      }}
                      >
                    </Animated.View>

                  */}



                {
                  this.state.isRecording === true ?

                  null

                  :

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
                }


                {
                  this.state.isRecording === true ?

                  null

                  :

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

                }






                {

                  this.state.isRecording === true ?

                  null

                  :

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

                {
                  this.state.isRecording === true ?

                  null

                  :

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


                }




                  <TouchableOpacity
                    onPressOut = {() => this.handlePressOut()}
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
  container: {
    // flex: 1,
    // position: 'absolute',
    //  top: 0,
    //  left: 0,
     width: '100%',
     height: '100%',
 },
 image: {
   flex: 1,
   transform: [{
     scaleX: -1
   }]
 },

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
    padding: 12.5,
    backgroundColor: '#1890ff',
    borderRadius: 15,
    alignSelf: 'flex-end',
    bottom: 25,
    right: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
