import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableHighlight,

 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import ModalBackgroundContainer from '../RandomComponents/ModalBackgroundContainer';
import { connect } from 'react-redux'
import { Avatar, Divider } from 'react-native-paper';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 // import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

 import * as ImagePicker from 'expo-image-picker';



 class PostingPage extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   // handleChoosePhoto =() => {
   //   const options = {}
   //   launchImageLibrary(options, response => {
   //     console.log("response", response)
   //   })
   // }



   render(){

     let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
      }

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
                onPress = {openImagePickerAsync}
                />
              <Text> this will be the page where people be posting</Text>

         </View>

       </ModalBackgroundContainer>


     )
   }
 }


 const mapStateToProps = state => {
   return{
     profilePic: state.auth.profilePic
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
