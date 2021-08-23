import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,

  TouchableHighlight,
  ImageBackground,
  TouchableWithoutFeedback
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
import { connect } from 'react-redux';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { Bell, User, ArrowRight, ChevronLeft, ArrowLeft} from "react-native-feather";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as dateFns from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import  authAxios from '../util';
import * as authActions from '../store/actions/auth';
import * as exploreActions from '../store/actions/explore';



 class EditProfile extends React.Component{


   goBioPage() {
     let bio = this.props.bio;
     if(bio === null){
       bio = ""
     }
     this.props.navigation.navigate("EditBio");
   }


   constructor(props){
     super(props);
     this.bs = React.createRef();
     this.state = {
       date:'',
       firstName: "",
       lastName: "",
       userName: "",
       bio: ""
     }
   }

   componentDidMount(){
     // for this part make sure you add the name and stuff to the state
     // and have an onchange for the inputs

     this.props.navigation.setOptions({

       headerLeft: () => this.renderBack()
     })
     this.setState({
       firstName: this.props.firstName,
       lastName: this.props.lastName,
       username: this.props.username
     })
   }

   componentDidUpdate(prevProps){


     if(this.props !== prevProps){
       this.setState({
         firstName: this.props.firstName,
         lastName: this.props.lastName,
         username: this.props.username
       })

     }
   }






   handleTakeProfile = async() => {
     let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

     if(permissionResult.granted === false){
       alert("Permission to access camera is required!");
       // permissionResult = await ImagePicker.requestCameraPermissionsAsync();
       return;
     }

     let pickerResult = await ImagePicker.launchCameraAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
       allowsMultipleSelection: true,
       base64: true,

     })


     if(!pickerResult.cancelled){

       this.uploadProfileImage(pickerResult.uri);

     }

   }

   // handle to choose photo
   handleChooseProfile = async() => {

     // this will give permission in order to open up your camera roll
     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

     if(permissionResult.granted === false){
       // in the case that permission is not granted
       alert("Permission to access camera roll is required!");
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

       this.uploadProfileImage(pickerResult.uri);

     }

   }

   handleFirstNameChange = e => {
     const tempVal = e;

     if(tempVal !== this.props.firstName){

       this.props.navigation.setOptions({
         headerRight: () => this.renderSave()
       })

     } else {
       this.props.navigation.setOptions({
         headerRight: null
       })
     }

     this.setState({
       firstName: e
     })

   }

   handleUsernameChange = e => {
     const tempVal = e;

     if(tempVal !== this.props.username){
       this.props.navigation.setOptions({
         headerRight: () => this.renderSave()
       })

     } else {
       this.props.navigation.setOptions({
         headerRight: null
       })
     }

     this.setState({
       username: e
     })
   }

   renderSave = () => (
       <View>
         <Button
           onPress = {() =>this.onHandleEdit()}
           title = "Save"/>
       </View>
  )

  renderBack = () => (
    <TouchableOpacity
      style={{width:50}}
      onPress = {() => this.props.navigation.goBack(0)}
      >

      <ArrowLeft
        style={{left:10}}
        stroke="black"
        height = {25}
        width = {25}
        />
    </TouchableOpacity>
  )

  onHandleEdit(){

    let userId = ""

    if(this.props.userId){
      userId = this.props.userId
    }

    var data = new FormData();

    data.append("first_name", this.state.firstName)
    data.append('username', this.state.username)

    authAxios.put(`${global.IP_CHANGE}/userprofile/profile/update/`+userId,
      data,
    ).then(res => {
      const pic = res.data.profile_picture.replace(global.IP_CHANGE, "")

      const profileInfo = {
        first_name: res.data.first_name,
        username: res.data.username,
        profile_picture: pic
      }

      this.props.changeProfileInfoAuth(profileInfo);
    })

    this.props.navigation.goBack(0);
  }




   uploadProfileImage(imageUri){

     let userId = ""
     if(this.props.userId){
        userId = this.props.userId
     }

     var data = new FormData();

     const filePackage = global.FILE_NAME_GETTER(imageUri)

     data.append('profile_picture', filePackage)
     data.append('username', this.props.username)
     authAxios.put(`${global.IP_CHANGE}/userprofile/profile/update/`+userId,
       data,
       {headers: {"content-type": "multipart/form-data"}}

     ).then(res => {

      const pic = res.data.profile_picture.replace(global.IP_CHANGE, "")
      this.props.changeProfilePicAuth(pic)

     })
     .catch(err => {
       console.log(err)
     })
   }


   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   renderInner = () => (

     <View style={styles.panel}>
       <View style={{alignItems: 'center'}}>
         <Avatar
           size={100}
           rounded
           source={{
             uri:
               `${global.IMAGE_ENDPOINT}`+this.props.profile_picture,
           }}
         />
       </View>
       <TouchableOpacity
         onPress = {this.handleTakeProfile}

         style={styles.panelButton} >
         <Text style={styles.panelButtonTitle}>Take Photo</Text>
       </TouchableOpacity>
       <TouchableOpacity
         onPress = {this.handleChooseProfile}
         style={styles.panelButton}>
         <Text style={styles.panelButtonTitle}>Choose From Library</Text>
       </TouchableOpacity>
       <TouchableOpacity
         style={styles.panelButton1}
         onPress={() => this.bs.current.snapTo(1)}>
         <Text style={styles.panelButtonTitle1}>Cancel</Text>
       </TouchableOpacity>
     </View>
  );

  renderHeader = () => (
    <View style={styles.test}>
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
    </View>
  );


   render(){
     let profilePic = '';
     if(this.props.profile_picture){
       profilePic = `${global.IMAGE_ENDPOINT}`+this.props.profile_picture
     }
     const {firstName, lastName, username} = this.state
     return (
       <BackgroundContainer>
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <View style={{height:'95%'}}>
             <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
              <View
                style={{
                  height:125,
                  top:10,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Avatar
                    size={95}
                    rounded
                    source={{
                      uri:
                        profilePic,
                    }}
                  />
              </View>
            </TouchableOpacity>

            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
              {this.props.firstName+" "+this.props.lastName}
            </Text>
            <Text style={{ fontSize: 15, color:'gray'}}>
              @{this.props.username}
            </Text>
          </View>

             <BottomSheet
              ref={this.bs}
              snapPoints={[330, 0]}
              renderContent={this.renderInner}
              renderHeader={this.renderHeader}
              initialSnap={1}
              callbackNode={this.fall}
              enabledGestureInteraction={true}
            />

            {/*
            <View style={{backgroundColor:'green', flexDirection:'column'}}>
              <View style={{backgroundColor:'red'}}><Text>hi</Text></View>
              <View style={{backgroundColor:'blue'}}><Text>ho</Text></View>
            </View>
            */}

          <View style={styles.action}>

            <View><Text style={styles.headerFont}>Name</Text></View>

             <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,

              ]}
              onChangeText = {this.handleFirstNameChange}
              value = {firstName}
            />

          </View>
          <View style={styles.action}>
            <View><Text style={styles.headerFont}>Username</Text></View>
            <TextInput
             placeholder="Username"
             placeholderTextColor="#666666"
             autoCorrect={false}
             style={[
               styles.textInput,
             ]}
             onChangeText = {this.handleUsernameChange}
             value = {username}
             />

         </View>
        <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.goBioPage()}>
         <View style={styles.action2}>
           {/*
           <TextInput
             // multiline={true}
            placeholder="Bio"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,

            ]}
          />
          */}
          <View style={{width:'90%'}}>

          <Text  style={[
             styles.bioInput,

             ]}>

             {
                 (this.props.bio)?
                 <Text>
                   {this.props.bio}
                 </Text>
                 :
                 <Text>Bio</Text>
             }

          </Text>
          </View>

          <ArrowRight stroke="black" strokeWidth={2.5} width={20} height={20} />
        </View>
        </TouchableHighlight>





             {/*
             <Avatar.Image
               source = {{
                 uri: this.props.route.params.chatPersonProfilePic
               }}
               size = {50}
                />
            */}

          </View>

        </TouchableWithoutFeedback>


      </BackgroundContainer>

     )
   }
 }


const mapStateToProps = state => {
  return {
    firstName:state.auth.firstName,
    lastName:state.auth.lastName,
    username:state.auth.username,
    userId: state.auth.id,
    currentUser: state.auth.username,
    profile_picture: state.auth.profilePic,
    bio: state.auth.bio
  }
}

const mapDispatchToProps = dispatch => {
  return{
    changeProfilePic: (profilePic) => dispatch(exploreActions.changeProfilePic(profilePic)),
    changeProfilePicAuth: (profilePic) => dispatch(authActions.changeProfilePicAuth(profilePic)),
    changeProfileInfoAuth: (profileInfo) => dispatch(authActions.changeProfileInfoAuth(profileInfo)),
    changeProfileInfo: (profileInfo) => dispatch(exploreActions.changeProfileInfo(profileInfo))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
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
  panelButtonTitle1: {

  },

  headerFont:{
    paddingLeft:10, fontSize:15, color:"#666666",
  },
   container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
   action: {
    flexDirection: 'column',
    marginTop: 25,
    height:75,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',

    padding:10,
  },
  action2: {
   flexDirection: 'row',
   marginTop: 25,
   height:50,
   borderBottomWidth: 1,
   borderBottomColor: '#f2f2f2',

   padding:10,
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
   textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,
    paddingTop:10,
    fontSize:16

  },
  bioInput: {
   flex: 1,
   marginTop: Platform.OS === 'ios' ? 0 : -5,
   paddingLeft: 10,
   fontSize:16,
   color:"#666666",

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
