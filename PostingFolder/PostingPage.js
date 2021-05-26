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
  PanResponder,
  Animated
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
import * as authActions from '../store/actions/auth';
import ImageSquare from '../RandomComponents/ImageSquare';
import DragDrop from '../RandomComponents/DragDrop';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import * as ImagePicker from 'expo-image-picker';
// import { ImageBrowser } from 'expo-image-picker-multiple';


const width = Dimensions.get("window").width

class PostingPage extends React.Component{

   constructor(props){
     super(props)

     this.state = {
       imageList: [],
       caption: "",
       flashMessage: false,
       fileList: [],
       pan: new Animated.ValueXY(),
       showDraggable: true,
       dropZoneValues: null
     }



     this.panResponder = PanResponder.create({
       onStartShouldSetPanResponder: () => true,
       onPanResponderMove: Animated.event([null, {
         dx: this.state.pan.x,
         dy: this.state.pan.y
       }]),
       onPanResponderRelease: (e, gesture) => {
         Animated.spring(
           // spring back into this place
           this.state.pan,
           {toValue:{x:0, y: 0}}
         ).start();
       }
     })



   }

   setDropZoneValues(event){
     this.setState({
       dropZoneValues: event.nativeEvent.layout
     })
   }

   renderDraggable(){
     if(this.state.showDraggable){
       return(
         <View>
         </View>
       )
     }
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

         console.log('here are some pictures')
         console.log(this.props.curSocialCalCell.get_socialCalItems)


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
       imageList: fileList
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



   fileNameGetter = (fileURI) => {
     // this function will be used to return the packaged file
     // containing uri, type, and name

     const fileName = fileURI.split("/").pop()

     let match = /\.(\w+)$/.exec(fileName);
     let type = match ? `image/${match[1]}` : `image`;


     return {
       uri: fileURI,
       type: type,
       name: fileName,
     }
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
         const filePackage = this.fileNameGetter(fileList[i])
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
           console.log('percent here')
           console.log(percentCompleted)

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

            const coverPackage = this.fileNameGetter(fileList[fileList.length-1]);

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

           this.props.navigation.navigate("newsfeed")




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
          title: `Seclected ${list.length} images`,
          headerRight: () => this.renderDone()
        })
      }

    }


   }

   renderDone = () => {

     return (
       <TouchableOpacity>
         <Button
           title = "Save"
           onPress = {() => this.handleImageUpload()}
            />
       </TouchableOpacity>
     )
   }


   /*
   This function is used to handle the on change of the caption
   */
   handleCaptionChange = e => {

     this.setState({
       caption: e,
     })
   }



   render(){

     console.log('here is the posting ')

     // Remember, if you ever want to animate an element you will have to use
     // animated.view

     // THIS WILL MAKE A MAP THAT HAS THE OBJECT AS THE KEY AND THE INDEX
     // AS THE VALUE
     // const positions = Object.assign(
     //   {},
     //   ...this.state.imageList.map((child, index) => ({[child]: index}))
     // )

     return (
       <ModalBackgroundContainer>
         <FlashMessage  showMessage = {this.state.flashMessage} message = {"Image Posted"} />

         <View
           style = {styles.wholeContainer}
           >


          <DragDrop itemList = {this.state.imageList}/>


           <Button
             title = "Choose Photo"
             onPress = {this.handleChoosePhoto}
             />

           </View>


       </ModalBackgroundContainer>


     )
   }
 }


 const mapStateToProps = state => {
   return{
     profilePic: state.auth.profilePic,
     curUserId: state.auth.id,
     curSocialCalCell: state.socialNewsfeed.curSocialCell
   }
 }

 const mapDispatchToProps = dispatch => {
   return {
     authAddCurLoad: () => dispatch(authActions.authAddCurLoad()),
     authAddTotalLoad: () => dispatch(authActions.authAddTotalLoad()),
     authZeroCurLoad: () => dispatch(authActions.authZeroCurLoad()),
     authZeroTotalLoad: () => dispatch(authActions.authZeroTotalLoad())
   }
 }


 const styles = StyleSheet.create({
     button:{
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',       //THIS LINE HAS CHANGED
     },
     wholeContainer: {
        flex:1,
        alignItems: "center"
     },
     imageContainerContainer: {
       flex: 1,
       // flexDirection: "row",
       width: width,
       // flexWrap: 'wrap',
       // backgroundColor: 'red'
     },
     imageContainer: {
       width: Math.round(width/3),
       height: Math.round(width/3),
       overflow:"hidden",
       alignItems: 'center',
       justifyContent: "center",

      // padding: 10,
     },
     imageHolder: {

     },
     smallImage: {
       width: "80%",
       height: "80%",
       borderRadius: 15

     }

 })

export default connect(mapStateToProps, mapDispatchToProps)(PostingPage);
