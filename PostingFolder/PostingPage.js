import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import ModalBackgroundContainer from '../RandomComponents/ModalBackgroundContainer';
import { connect } from 'react-redux'
import { Avatar, Divider } from 'react-native-paper';
import  authAxios from '../util';
import * as dateFns from 'date-fns';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import FlashMessage from '../RandomComponents/FlashMessage';
import FinalPostingPage from './FinalPostingPage';
import * as authActions from '../store/actions/auth';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import AdjModal from '../RandomComponents/AdjModal';
import * as ImagePicker from 'expo-image-picker';
import Animated, {Easing} from 'react-native-reanimated';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Camera, Video, ArrowUpCircle, Plus, Mail, UserPlus, X, XCircle, PlusCircle, ChevronLeft } from "react-native-feather";
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import {loop, withTimingTransition, mix} from 'react-native-redash/lib/module/v1';
import NationalDayPost from './NationalDayPost';
import CurrentPicPost from './CurrentPicPost';
import Test from './Test';
import FadingUpArrow from './FadingUpArrow';
import { createStackNavigator, TransitionPresets} from '@react-navigation/stack';

const width = Dimensions.get("window").width
const height = Dimensions.get('window').height
const margin = 0;
const col = 3;
const size = width/col + margin;
const coverScale = 1.7;

const { Clock, cond, sub,divide, eq, add, call, set, Value, event, or } = Animated;

const isHidden = true;


class PostingPage extends React.Component{

    slide = new Value(SCREEN_HEIGHT);
    slideAnimation = withTimingTransition(this.slide, {duration: 300})


   constructor(props){
     super(props)

     this.state = {
       imageList: [],
       caption: "",
       flashMessage: false,
       fileList: [],
       draggingIndex: -1,
       dragging: false,
       showDeleteModal: false,
       deleteIndex: -1,
       showFinal: false,
       bigPicSize: 0

     }


     this.submit = false;

     this.absX = new Value(0);
     this.absY = new Value(0);
     this.transX = new Value(0);
     this.transY = new Value(0);

     this.gestureState = new Value(-1);

     this.curPicIndex = -1; // index of the pic you are holding
     // The draggingIndex in states will keep track of the current index
     // of the image

     this.onGestureEvent = event([
       {
         nativeEvent:{
           absoluteX: this.absX,
           absoluteY: this.absY,
           translationX: this.transX,
           translationY: this.transY,
           state: this.gestureState
         }
       }
     ])

     this.showFinal = new Value(false)


   }


   componentDidMount(){

     let caption = "";
     let fileList = [];



     if(this.props.curSocialCalCell){
       if(this.props.curSocialCalCell.dayCaption){
         caption = this.props.curSocialCalCell.dayCaption
       }

       if(this.props.curSocialCalCell.get_socialCalItems){

         // Now you will push the pictures into the file list here
         // in this case you might not need to but rather put
         // it into the file Listin states (imagelist specifically)

         for(let i = 0; i< this.props.curSocialCalCell.get_socialCalItems.length; i++){
           // You want to push an object into the fileLis
            fileList.push(
              `${global.IMAGE_ENDPOINT}`+this.props.curSocialCalCell.get_socialCalItems[i].itemImage
            )
         }
       }
     }

     this.setState({
       caption: caption,
       imageList: fileList,
     })

     if(fileList.length > 1){
       const curDate = dateFns.format(new Date(), "iiii MMMM dd")
       this.props.navigation.setOptions({
         headerStyle:{
           shadowColor:'#fff', //ios
           elevation:0,        // android

         },
         ...TransitionPresets.ModalSlideFromBottomIOS,
         title: curDate,
         headerRight: () => this.renderDone(),
         headerLeft: () => this.renderBack()

       })
     } else {
       this.props.navigation.setOptions({
         title: 'Add Day',
         headerStyle:{
           shadowColor:'#fff', //ios
           elevation:0,        // android

         },
         ...TransitionPresets.ModalSlideFromBottomIOS,
         headerLeft: () => this.renderBack()
       })
     }

   }

   componentWillUnmount(){
     //This will be run when the transition starts, from the animation

     console.log("unmount here")
     if(this.submit === true){
       this.props.finalPostModal()
       // Now you will submit
       this.handleImageUpload()

     }

   }

   onLayout = (e) => {
     this.setState({
       bigPicSize: e.nativeEvent.layout.height
     })
   }

   /*
   This function will be in charge of opening the indicator message
   */
   onShowMessage(){
     this.setState({
       flashMessage: true,
     }, () => setTimeout(() => this.onCloseMessage(), 3000))
   }

   /*
   This function will close the flash message
   */
   onCloseMessage (){
     this.setState({
       flashMessage: false
     })
   }

   getHeaderLoader = () => {
     <ActivityIndicator size = "small" color = {"#0580FF"} />
   }



   /*
   Function to open the final page of the posting process
   */
   openFinalPage = () => {

     this.setState({
       showFinal: true
     })
   }


   closeFinalPage = () => {
     this.setState({
       showFinal: false
     })
   }

   /*
   This function will be used to upload the pictures that are saved
   into a formadata and then submit it through authaxios and send to the
   backend
   */
   handleImageUpload = () => {


     const ownerId = this.props.curUserId;
     const caption = this.state.caption;
     const fileList = this.state.imageList;


     const formData = new FormData()
     const curDate = dateFns.format(new Date(), "yyyy-MM-dd")

     formData.append("curDate", curDate)
     formData.append("dayCaption", caption)

     formData.append("fileListLength", fileList.length);

     var config = {
       onUploadProgress: function(progressEvent){
         var percentCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total)
       }
     }

     // Loop through the list of images and then add them to the
     for(let i = 0; i<fileList.length; i++){

       if(fileList[i]){
         const filePackage = global.FILE_NAME_GETTER(fileList[i])
         formData.append("image["+i+"]",filePackage)
         formData.append("socialItemType["+i+"]", "picture")

       } else {
         // this is for when the picture is already tehre

       }

       }

       var config = {
           onUploadProgress: function(progressEvent) {

             var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
           }
         };



      this.props.authAddTotalLoad()
       authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateCurSocialCell/`+ownerId,
         formData,
         {headers: {"content-type": "multipart/form-data"},
         onUploadProgress: function(progressEvent){
           var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );

           // ADD AN LOADING HERE


         }
       },

       ).then(res => {

         this.props.authAddCurLoad()
         // this hits when the call is done

         // have a condition where if there are not social cal
         // then delete and remove the content type post
         if(res.data.cell.get_socialCalItems.length === 0 ){
            const curDate = dataFns.format(new Date(), "yyyy-MM-dd")

            // ADD A LOADING HERE

            this.props.authAddTotalLoad()

            WebSocketSocialNewsfeedInstance.removeAllPhotoSocialPost(
              ownerId,
              curDate
            )

            this.props.authAddCurLoad()

            // Now you wil direct to the newsfeed again
            this.props.navigation.navigate("newsfeed")

         }
         else {
         //   // This condition is for when you have pictures that you wnat to
         //   // post and it pass through
         //
           if(res.data.coverPicChange){


            const coverPicForm = new FormData()
            coverPicForm.append('cellId', res.data.cell.id)
            coverPicForm.append("createdCell", res.data.created)

            if(fileList[fileList.length -1].includes(global.POSTLIST_SPEC)){

              // PROBALLY GONNA HAVE TO FIX THIS
              // coverPicForm.append("coverImage", fileList[fileList.length-1].url.replace(global.POSTLIST_SPEC, ""))
            }
          else {

            const coverPackage = global.FILE_NAME_GETTER(fileList[fileList.length-1]);

              coverPicForm.append("coverImage", coverPackage)
            }


            // Now change the cover picture

            this.props.authAddTotalLoad()

            authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateCoverPic/`+ownerId,
              coverPicForm,
              {headers: {"content-type": "multipart/form-data"}}

              // ADD A LOADING HERE
            ).then( res => {

              this.props.authAddCurLoad()
            })

           }


           this.props.authAddTotalLoad()

           // ADD ONE HERE TOO
           WebSocketSocialNewsfeedInstance.addUpdateSocialPost(
             ownerId,
             res.data.cell.id,
             res.data.created
           )

           this.props.authAddCurLoad()



           // if(this.props.curLoad >= this.props.totalLoad){
             // if they are equal or larger you will just set it back to zero
           // this.props.authZeroCurLoad()
           // this.props.authZeroTotalLoad()

           // }

           // this.props.navigation.navigate("newsfeed")

         }

       })

   }


   /*
   This function is to handle choosing the photo when you pick a photo from
   image picker
   */
   handleChoosePhoto = async() => {
     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

     if(permissionResult.granted == false){
       alert("Permission to access camera roll is required!");
       return;
     }

     let  pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      base64: true,
    });


    if(!pickerResult.cancelled){
      const list = [...this.state.imageList, pickerResult.uri]
      this.setState({
        imageList: list
      })

      if(list.length > 0){
        this.props.navigation.setOptions({
          title: `Selected ${list.length} images`,
          headerRight: () => this.renderDone()
        })
      }

    }


   }


   // Next button that opens the finalpostmodal
   renderDone = () => {

     return (
       <View style={{right:10}}>
       <TouchableOpacity
         >
         <Button

           title = "Next"
           onPress = {() => this.nextPress()}

            />
       </TouchableOpacity>
       </View>
     )
   }

   // This will render the back button to the newsfeed
   renderBack = () => {
     return (
       <TouchableOpacity
       onPress = {() => this.props.navigation.goBack(0)}
       >
         <X
           height = {30}
           width = {30}
           style={{left:'25%'}}
           stroke = "#1890ff"
           />

      </TouchableOpacity>

     )
   }

   renderCloseModal =() => {
     return (
        <TouchableOpacity
          onPress = {() => this.backPress()}
          >
          <ChevronLeft
            height = {40}
            width = {40}
            stroke = "#1890ff"
             />

        </TouchableOpacity>
     )
   }

   renderSubmit = () => {
     return(
       <TouchableOpacity
         onPress = {() => this.handleImageUpload()}
         >
         <Text> Save </Text>

       </TouchableOpacity>
     )
   }



   // Handle opening modal
   nextPress = () => {
     this.submit = true;
     this.props.finalPostModal();
     this.props.navigation.setOptions({
       headerLeft: () => this.renderCloseModal(),
       headerRight: () => this.renderSubmit(),
       ...TransitionPresets.SlideFromRightIOS,

     })

     this.showFinal.setValue(true);
   }

   // Handle closing Modal
   backPress = () => {

     this.props.finalPostModal();
     this.showFinal.setValue(false);
     this.submit = false;
     this.props.navigation.setOptions({
       headerRight: () => this.renderDone(),
       headerLeft: () => this.renderBack(),


     })
  }


   /*
   This function is used to handle the on change of the caption
   */
   handleCaptionChange = e => {
     this.setState({
       caption: e,
     })
   }


   // This function will be used to adjust the absolute location
   // by subtracting off a set number to match that of the pictures
   adjustLoc = (num: number) =>{

     let value = num - (width/col)
     if(value <= 0){
       return 0
     }
     else {
       return value;
     }
   }

   // START OF DRAGGING
   start = ([x, y]) => {

    const adjX = this.adjustLoc(x)
    const adjY = this.adjustLoc(y)

    this.curPicIndex = this.getOrder(x,adjY);
    console.log(this.getOrder(x,adjY))
    this.setState({
       dragging: true,
       draggingIndex: this.curPicIndex
     })
   }

   // WHILE DRAGGING
   move = ([x, y]) => {

     const adjY = this.adjustLoc(y)


     this.updateList(x, adjY)

   }


   // END OF DRAGGING
   reset = () => {

     // this.active = false;
     this.setState({
       dragging: false,
       draggingIndex: -1
     })
   }

  updateList = (x,y) => {

    const newIndex = this.getOrder(x, y)
    if(this.curPicIndex !== newIndex
      && newIndex >= 0
      && newIndex <= this.state.imageList.length - 1
     ){
       this.setState({
         imageList: this.immutableMove(
           this.state.imageList,
           this.curPicIndex,
           newIndex
         ),
         draggingIndex: newIndex
       })

       this.curPicIndex = newIndex

    }

  }


  immutableMove(arr, from, to) {
    return arr.reduce((prev, current, idx, self) => {
      if (from === to) {
        prev.push(current);
      }
      if (idx === from) {
        return prev;
      }
      if (from < to) {
        prev.push(current);
      }
      if (idx === to) {
        prev.push(self[from]);
      }
      if (from > to) {
        prev.push(current);
      }
      return prev;
    }, []);
  }

   // Pretty much what is gonna happen is that you will start the move of the
   // drag and then set the current image index, once you set the current index
   // you wanna track the the movement and then check if the value will have an order
   // that is different from the current index, if it is them you will
   // rearrange the list again

   // given the x and y of the items you can then get the order of the function back
   // pretty much just return the index order that the values are in
   getOrder = (x: number, y: number)=> {

     const{bigPicSize} = this.state
     if(y < bigPicSize){
       return 0;
     }

     const curCol = Math.floor(x/size)
     const row = Math.round((y-bigPicSize)/size)

     return (row * col + curCol)+1
   }

   getPosition = (order: number) => {

     const {bigPicSize} = this.state
     if(order === 0) {
       return{
         x: (width/2)- bigPicSize/2,
         y: 0
       }

     }


     else{
       // so you want to return the x and y of the images
       return{
         x: ((order-1) % col) * size, // pretty much if 0 or 1, row would be 0
         y: (Math.floor((order-1) / col) * size)+ bigPicSize
       }
     }

   }

   // Used to open deleted modal
   openDeleteModal = (index: number) => {

     this.setState({
       deleteIndex: index,
       showDeleteModal: true
     })
   }

   onCloseDelete = () => {

     this.setState({
       deleteIndex: -1,
       showDeleteModal: false
     })
   }

   removeIndex = (list, index) => {

     const newList = []

     for(let i = 0; i<list.length; i++){
       if(i !== index){
         newList.push(
           list[i]
         )
       }

     }

     return newList;
   }


   /*
   Function to delete the picture
   */
   deletePicture = () => {
     const curList = this.state.imageList
     if(this.state.deleteIndex >= 0 ){
       const curIndex = this.state.deleteIndex

       curList.splice(curIndex, 1)
       // const newList = this.removeIndex(curList, curIndex)
       this.setState({
         imageList: curList ,
         deleteIndex: -1,
         showDeleteModal: false
       })

       this.props.navigation.setOptions({
         title: `Selected ${curList.length} images`,
         headerRight: () => this.renderDone()
       })

     }


   }

   /*
   Calculate the height of the image holder
   */
   picHolderHeight = () => {

     const {bigPicSize} = this.state
     const imageLength = MAX_PIC
     const numRows = Math.ceil(imageLength/col)
     if(imageLength === 0 ){
       return (width/col)
     }

     return (width/col)* numRows + bigPicSize
   }


   // This function will render the pictures either when it has a picture
   // or when it doesn't have a picture
   // for the start I will just try to render the stucture it self wihtout
   // the picture first
   renderPictures = () => {
     const {imageList, dragging, draggingIndex} = this.state

     let cards = []
     for( let i = 0; i < MAX_PIC; i++){
       cards.push(
         i < imageList.length ?
         <Animated.View
           key = {i}
           style = {{
             opacity: i === draggingIndex ? 0 : 1,
             position: "absolute",
             transform:[
               {translateX: this.getPosition(i).x},
               {translateY: this.getPosition(i).y}
             ]
           }}
           >

           {
             !dragging ? (
               <XCircle
                 onPress = {() => this.openDeleteModal(i)}
                 style = {{
                   position: 'absolute',
                   left: (width/col)*0.85,
                   zIndex: 9,
                   shadowColor: '#470000',
                   shadowOffset: {width: 0, height: 1},
                   shadowOpacity: 0.2,
                 }}
                 stroke = "#1890ff" fill= "white"/>

             ) : null


           }

           <PanGestureHandler
             maxPointers = {1}
             onGestureEvent = {this.onGestureEvent}
             onHandlerStateChange = {this.onGestureEvent}
             >
             <Animated.View
               onLayout = {e => {
                 i === 0 ? this.onLayout(e) : null
               }}
               key = {i}
               style = {[{
                 // transform:[
                 //   {translateX: this.getPosition(key).x},
                 //   {translateY: this.getPosition(key).y}
                 // ]
               },
                 i=== 0 ? styles.bigImageContainer : styles.imageContainer]}>


               <Image
                 style = {styles.smallImage}
                 resizeMode = "cover"
                 source = {{
                   uri: imageList[i]
                 }}
                  />
             </Animated.View>
           </PanGestureHandler>

         </Animated.View>

         :

         <Animated.View
           onLayout = {e => {
             i === 0 ? this.onLayout(e) : null
           }}
           style = {[{
             transform:[
               {translateX: this.getPosition(i).x},
               {translateY: this.getPosition(i).y},

             ]
           },i === 0 ? styles.bigNormImageContainer : styles.normImageContainer]}>


         <TouchableOpacity
           onPress = {this.handleChoosePhoto}
           style = {styles.addSmallImage}>
           <PlusCircle
             height = {50}
             width = {50}
             stroke = "lightgray"
             fill= "white" />
         </TouchableOpacity>

         </Animated.View>

       )
     }

     return cards;


   }

   render(){
    const {dragging, draggingIndex, imageList} = this.state


     // Remember, if you ever want to animate an element you will have to use
     // animated.view

     // THIS WILL MAKE A MAP THAT HAS THE OBJECT AS THE KEY AND THE INDEX
     // AS THE VALUE
     // const positions = Object.assign(
     //   {},
     //   ...this.state.imageList.map((child, index) => ({[child]: index}))
     // )

     // for the drag you are gonna need a function to handle the start
     // the rearrange when you are moving it
     // and the drop when you are done moving it around

     return (
       <ModalBackgroundContainer>
         <FlashMessage  showMessage = {this.state.flashMessage} message = {"Image Posted"} />

         <View
           style = {styles.wholeContainer}
           >

           <Animated.Code>
             {() =>
             cond(
               eq(this.gestureState, State.BEGAN),
               call([this.absX, this.absY], this.start),
             )}
           </Animated.Code>
           <Animated.Code>
             {() =>
               cond(
                 eq(this.gestureState, State.ACTIVE),
                 call([this.absX, this.absY], this.move),
               )
             }
           </Animated.Code>

           <Animated.Code>
             {() =>
               cond(
                 or(
                   eq(this.gestureState, State.END),
                   eq(this.gestureState, State.CANCELLED),
                   eq(this.gestureState, State.FAILED),
                   eq(this.gestureState, State.UNDETERMINED)
                 ),
                 call([], this.reset)
               )
             }
           </Animated.Code>

           <Animated.Code>
             {() => cond(this.showFinal, set(this.slide, 0), set(this.slide,SCREEN_HEIGHT))}
           </Animated.Code>




           <ScrollView  style = {styles.imageContainerContainer}>
             <View
               style = {{
                 height: this.picHolderHeight(),
               }}
               >

               {
                 dragging ? (
                   <Animated.View

                     style = {[{
                       transform: [
                         {translateX: sub(this.absX, new Value((2*width)/(3*col)))},
                         {translateY: sub(this.absY, new Value(width/col))}
                       ],
                       position: "absolute",
                       zIndex: 99
                     }, styles.imageContainer]}
                     >

                       <Image
                         style = {styles.smallImage}
                         resizeMode = "cover"
                         source = {{
                           uri: this.state.imageList[draggingIndex]
                         }}
                          />

                   </Animated.View>
                 ) : null
               }

               {
                 dragging && draggingIndex === 0 ?

                 <Animated.View

                   style = {[{
                     transform:[
                       {translateX: this.getPosition(0).x},
                       {translateY: this.getPosition(0).y},

                     ]
                   },styles.bigNormImageContainer]}>


                 <TouchableOpacity
                   onPress = {this.handleChoosePhoto}
                   style = {styles.addSmallImage}>
                  <Text style ={{
                      fontSize: 20
                    }}>
                    Cover
                  </Text>

                 </TouchableOpacity>

                 </Animated.View>

                 : null

               }


                {this.renderPictures()}
                <View style={styles.addBorder}>
                 <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
                    <TextInput
                      style = {{
                        width: "100%",
                        fontSize: 16,
                      }}
                     placeholder="Write something about your day..."
                     placeholderTextColor="lightgray"
                     multiline = {true}
                     numberOfLines = {2}
                     value = {this.state.caption}
                     onChangeText = {this.handleCaptionChange}
                   />
                 </TouchableWithoutFeedback>
                </View>



             </View>

             <View>
               <Text>
                 put image grid below here
               </Text>
             </View>



             {/*
             <View style = {styles.dayTextContainer}>
               <Camera
                 height = {35}
                 width = {35}
                 stroke = "black"
                 fill= "white" />
               <Video
                   height = {35}
                   width = {35}
                   stroke = "black"
                   fill= "white" />
             </View>
             */}
            {/*
             <View style = {styles.dayTextContainer}>
               <Text style = {styles.dayText}> National Days </Text>

               <NationalDayPost />


             </View>

            */}

            {/*
             <View style = {styles.dayTextContainer}>
               <Text style = {styles.dayText}> Pictures took today </Text>

               <CurrentPicPost />
             </View>
             */}





           </ScrollView>

           <AdjModal
             visible = {this.state.showDeleteModal}
             height = {230}
             width = {300}
             onAction = {this.deletePicture}
             onCancel = {this.onCloseDelete}
             />
           {/*
           <FinalPostingPage
             slide = {this.slideAnimation}
             visible = {this.state.showFinal}
             onCancel = {this.closeFinalPage}
             navigation = {this.props.navigation}
             onChange = {this.handleCaptionChange}
             caption = {this.state.caption}
              />
            */}



           </View>
       </ModalBackgroundContainer>


     )
   }
 }


 const mapStateToProps = state => {
   return{
     profilePic: state.auth.profilePic,
     curUserId: state.auth.id,
     curSocialCalCell: state.socialNewsfeed.curSocialCell,
     showFinalModal: state.socialNewsfeed.showFinalModal
   }
 }

 const mapDispatchToProps = dispatch => {
   return {
     authAddCurLoad: () => dispatch(authActions.authAddCurLoad()),
     authAddTotalLoad: () => dispatch(authActions.authAddTotalLoad()),
     authZeroCurLoad: () => dispatch(authActions.authZeroCurLoad()),
     authZeroTotalLoad: () => dispatch(authActions.authZeroTotalLoad()),
     finalPostModal: () => dispatch(socialNewsfeedActions.finalPostModal())
   }
 }


 const styles = StyleSheet.create({
     button:{
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',       //THIS LINE HAS CHANGED
     },
     addBorder:{
       top:'75%',
       padding:20,
       height:'25%',
       borderTopWidth:1,
       borderTopColor: '#f2f2f2',
       borderBottomWidth: 1,
       borderBottomColor: '#f2f2f2',

     },
     wholeContainer: {
        flex:1,
        alignItems: "center"
     },
     imageContainerContainer: {

       // flexDirection: "row",\
       // backgroundColor:'red',
       width: '100%',
       // flexWrap: 'wrap',
     },
     imageContainer: {
       width: Math.round(width/3),
       height: Math.round(width/3),
       overflow:"hidden",
       alignItems: 'center',
       justifyContent: "center",
       position: "absolute",
       shadowColor:'black',
       shadowOffset:{width:0,height:2},
       shadowOpacity:0.2,
      // padding: 10,
     },
     bigImageContainer:{
       width: Math.round(width/3)*coverScale,
       height: Math.round(width/3)*coverScale,

       overflow:"hidden",
       alignItems: 'center',
       justifyContent: "center",
       position: "absolute",
       shadowColor:'black',
       shadowOffset:{width:0,height:2},
       shadowOpacity:0.2,
     },

     normImageContainer: {
       width: Math.round(width/3),
       height: Math.round(width/3),
       overflow:"hidden",
       alignItems: 'center',
       justifyContent: "center",
       position: "absolute",

     },
     bigNormImageContainer: {
       width: Math.round(width/3)*coverScale,
       height: Math.round(width/3)*coverScale,
       overflow:"hidden",
       alignItems: 'center',
       justifyContent: "center",
       position: "absolute",
     },
     smallImage: {
       width: "90%",
       height: "90%",
       borderRadius: 15,
       backgroundColor: 'lightgray',

     },
     addSmallImage: {
       width: "90%",
       height: "90%",
       borderWidth: 3,
       borderRadius: 15,
       borderStyle: 'dashed',
       borderColor: 'lightgray',
       alignItems: "center",
       justifyContent: "center"
       // backgroundColor: 'lightgray'

     },
     xButton: {
       position: 'relative',

     },
     dayTextContainer: {
       // margin: 20
       textAlign: 'center',

       margin: 20,
     },
     dayText: {
       fontSize: 20,
       textAlign:'center'
     },
     smallText: {
       fontSize: 14,
       textAlign: "center"
     }



 })

export default connect(mapStateToProps, mapDispatchToProps)(PostingPage);
