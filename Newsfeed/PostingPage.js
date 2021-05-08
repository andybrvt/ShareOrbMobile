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
  TouchableHighlight
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import ModalBackgroundContainer from '../RandomComponents/ModalBackgroundContainer';
import { connect } from 'react-redux'
import { Avatar, Divider } from 'react-native-paper';
import  authAxios from '../util';
import * as dateFns from 'date-fns';


 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 // import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

 import * as ImagePicker from 'expo-image-picker';
 // import { ImageBrowser } from 'expo-image-picker-multiple';



 class PostingPage extends React.Component{

   state = {
     imageList: [],
     caption: "",
   }


   getHeaderLoader = () => {
     <ActivityIndicator size = "small" color = {"#0580FF"} />
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

     // Loop through the list of images and then add them to the
     for(let i = 0; i<fileList.length; i++){

       if(fileList[i]){
         const fileName = fileList[i].split("/").pop()

         let match = /\.(\w+)$/.exec(fileName);
         let type = match ? `image/${match[1]}` : `image`;


         console.log(match, type)

         formData.append("image["+i+"]",{
           uri: fileList[i].uri,
           type: type,
           name: fileName,

         })
         formData.append("socialItemType["+i+"]", "picture")

       } else {
         // this is for when the picture is already tehre

       }

       }

       authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateCurSocialCell/`+ownerId,
         formData,
         {headers: {
           'Accept': 'application/json',
           "content-type": "multipart/form-data"
         }}
       ).then(res => {
         console.log(res.data)
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
      // base64: true,
    });


    console.log(pickerResult)
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



     console.log(this.props)
     return (
       <ModalBackgroundContainer>
         <View >
           <Button
             title = "Go back"
             onPress = {() => this.props.navigation.goBack()}
             />

             <Avatar.Image
               source = {{
                 uri: `${global.IMAGE_ENDPOINT}`+this.props.profilePic
               }}
               size = {75}
             />
           <Divider/>
             <TextInput


               placeholder = "What's going on today?"

               />
             <Text> Your pictures todayf</Text>

              <TouchableHighlight>
                <View style={styles.button}>
                  <Text>Touch Here</Text>
                </View>
              </TouchableHighlight>


           <Button
             title = "Choose Photo"
             onPress = {this.handleChoosePhoto}
             />
           {this.state.imageList.map((images, key) => {

             return (
              <Image
                key = {key}
                 source={{ uri: images }} style={{ width: 200, height: 200 }} />
             )
           })

         }

         <TextInput
           onChangeText = {this.handleCaptionChange}
           value = {this.state.caption}
           placeholder = "Write a caption for the your wonderful day..."

           />




           <Button
             title = "direct to image browser"
             onPress = {() => this.props.navigation.navigate("ImageBrowserScreen")} />

         </View>

       </ModalBackgroundContainer>


     )
   }
 }


 const mapStateToProps = state => {
   return{
     profilePic: state.auth.profilePic,
     curUserId: state.auth.id
   }
 }


 const styles = StyleSheet.create({
     button:{
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',       //THIS LINE HAS CHANGED


   },
 })

export default connect(mapStateToProps, null)(PostingPage);
