import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Switch,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Keyboard
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { PlusCircle, ArrowRight, XCircle, Unlock, Lock, Users} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { moderateScale } from 'react-native-size-matters';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import * as ImagePicker from 'expo-image-picker';
import FriendPickModal from './FriendPickModal';
import { connect } from 'react-redux';
import  authAxios from '../util';
import { Avatar } from 'react-native-elements';
import * as colabAlbumActions from '../store/actions/colabAlbum';


const width=SCREEN_WIDTH;
const coverScale = 1.7;
const col = 3;
class CreateAlbum extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isEnabled:false,
      caption:'',
      coverPic: '',
      showInvite: false,
      invitedPeople: [],
      invitedUsername: []
    }
  }

  showInvite = () => {

    this.setState({
      showInvite: true
    })
  }

  closeInvite = () => {
    this.setState({
      showInvite:false
    })
  }

  toggleSwitch = () => {

    this.setState({
      isEnabled:!this.state.isEnabled,
    })

  }


  handleCaptionChange = e => {
    this.setState({
      caption: e
    })

    this.checkReady()

  }


  addToInviteList = (username, profile_picture) => {
    let temp={"username":username, "profile_picture":profile_picture}
    if(this.state.invitedPeople.some(item => temp["username"] == item["username"])){
      const newList = this.state.invitedPeople.filter(function(el) { return el.username != temp["username"] });
      this.setState({
        invitedPeople: newList
      })
    }
    else{
      const newList = [...this.state.invitedPeople, temp]
      this.setState({
        invitedPeople: newList
      })
    }

    this.checkReady()

  }

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
      this.setState({
        coverPic: pickerResult.uri
      })
    }

    this.checkReady()



  }

  onSaveAlbum(){
    Keyboard.dismiss();
    // this function will be used to save the album
    const {caption, invitedPeople, coverPic} = this.state
    let newInvited = [];
    for(let i = 0; i < invitedPeople.length; i++){
      newInvited.push(
        invitedPeople[i].username
      )
    }
    newInvited.push(this.props.username)

    const newPic = global.FILE_NAME_GETTER(coverPic)

    const formData = new FormData();

    formData.append('title', caption)
    formData.append('person', JSON.stringify(newInvited))
    formData.append('coverPic', newPic)
    authAxios.post(`${global.IP_CHANGE}/colabAlbum/createColabAlubm`,
      formData
    ).then( res =>{
      // Probally run redux here to update albums
      this.props.updateExpiringColab(res.data)
      }
    )

    this.props.navigation.goBack(0);

  }

  renderSave = () => {

    return (
      <View style={{right:10}}>
      <TouchableOpacity
        >
        <Button

          title = "Save"
          onPress = {() => this.onSaveAlbum()}

           />
      </TouchableOpacity>
      </View>
    )
  }

  checkReady = () => {
    const {caption, invitedPeople, coverPic} = this.state

    if(
      caption !== "" &&
      invitedPeople.length !== 0 &&
      coverPic !== ""
    ){
      this.props.navigation.setOptions({
        headerRight:() => this.renderSave()
      })
    } else {
      this.props.navigation.setOptions({
        headerRight:null
      })
    }
  }


   render(){
     const {caption, invitedPeople, coverPic} = this.state
     console.log(invitedPeople)

     // if(
     //   caption !== "" &&
     //   invitedPeople.length !== 0 &&
     //   coverPic !== ""
     // ){
     //   this.props.navigation.setOptions({
     //     headerRight:() => this.renderSave()
     //   })
     // } else {
     //   this.props.navigation.setOptions({
     //     headerRight:null
     //   })
     // }

     return (
       <BackgroundContainer>
         <TouchableWithoutFeedback
           onPress = {() => Keyboard.dismiss()}
           >

           <View>
             <View style={styles.action}>

                <TextInput
                 placeholder="Describe your album"
                 autoCapitalize="sentences"
                 numberOfLines={2}
                 placeholderTextColor="#d9d9d9"
                 autoCorrect={false}
                 style={[
                   styles.textInput,

                 ]}
                 onChangeText = {this.handleCaptionChange}
                 value = {caption}
               />

             </View>


              <View style={styles.action2}>
                <View style = {{
                  marginTop:25,
                 flexDirection: 'row',
                 minHeight:50,
                 left:10,
                 padding:10,
                  }}>
                  <Users stroke="black" strokeWidth={2.5} width={20} height={20} />
                  <View style={{width:'70%'}}>
                    <Text style={[
                       styles.bioInput,
                       ]}>
                       <Text>Invite Friends</Text>
                    </Text>
                  </View>
                <TouchableOpacity onPress={() => this.showInvite()}>
                  <View style={styles.editButton}>
                     <Text style={{color:'#595959',}}>Invite</Text>
                   </View>
               </TouchableOpacity>

                </View>

              <View style = {{
                  flexDirection: 'row',

                }}>
                {invitedPeople.map((people,index) => {

                  return(
                    <View
                      style={{left:35}}
                      key = {index}
                      >
                      <Avatar
                        size={35}
                        rounded
                        source = {{
                          uri: `${global.IMAGE_ENDPOINT}`+people.profile_picture
                        }}
                      />
                      {/*
                        <Text>
                          {people.username}
                        </Text>
                      */}
                  </View>

                  )
                })}
              </View>
             </View>

             {/* take out for now, public/private
             <View style={styles.action3}>
                 {this.state.isEnabled?
               <Unlock stroke="black" strokeWidth={2.5} width={20} height={20} />
               :
                 <Lock stroke="black" strokeWidth={2.5} width={20} height={20} />
               }
               <View style={{width:'72.5%'}}>
                 <Text style={[
                    styles.bioInput,
                    ]}>
                    {this.state.isEnabled?
                      <Text style={styles.headerFont}>Public</Text>
                    :
                    <Text style={styles.headerFont}>Private</Text>
                     }
                 </Text>
               </View>

                  <Switch
                    style={{ transform: [{ scaleX:  moderateScale(1, 0.2) }, { scaleY:
                    moderateScale(1, 0.2) }] }}
                   trackColor={{ false: "#767577", true: "#81b0ff" }}
                   thumbColor={this.state.isEnabled ? "#1890ff" : "#f4f3f4"}
                   ios_backgroundColor="#3e3e3e"
                   onValueChange={this.toggleSwitch}
                   value={this.state.isEnabled}
                 ></Switch>
             </View>
             */}
             <View style={{alignItems:'center', top:'12.5%'}}>
                <Text style={{fontSize:18, bottom:30}}>Cover Pic</Text>
                {
                  this.state.coverPic === "" ?

                  <View style={styles.bigImageContainer}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress = {() => this.handleChoosePhoto()}
                      style = {styles.addSmallImage}>
                      <PlusCircle
                        height = {50}
                        width = {50}
                        stroke = "lightgray"
                        fill= "white" />

                    </TouchableOpacity>
                  </View>

                  :


                    <TouchableOpacity
                      onPress = {() => this.handleChoosePhoto()}

                       style = {styles.bigImageContainer} >
                      <Image
                        style = {styles.smallImage}
                        resizeMode = "cover"
                        source = {{
                          uri: this.state.coverPic
                        }}
                         />
                    </TouchableOpacity>


                }

             </View>
           </View>

         </TouchableWithoutFeedback>
          <FriendPickModal
           visible = {this.state.showInvite}
           onClose = {this.closeInvite}
           action = {this.addToInviteList}
           invitedPeople = {this.state.invitedPeople}
           {...this.props}
            />


       </BackgroundContainer>

     )
   }
 }


const mapStateToProps = state => {
  return{
    following: state.auth.following,
    username: state.auth.username
  }

}

const mapDispatchToProps = dispatch =>{
  return{
    updateExpiringColab: (album) => dispatch(colabAlbumActions.updateExpiringColab(album))
  }
}


const styles = StyleSheet.create({
   editButton: {

     alignItems: 'center',
     paddingVertical: 7.5,

     borderRadius: 5,
     alignItems: "center",
     backgroundColor: "#f0f0f0",
     padding: 15
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
   bigImageContainer:{
     width: Math.round(SCREEN_WIDTH/3)*coverScale,
     height: Math.round(SCREEN_WIDTH/3)*coverScale,

     alignItems: 'center',
     justifyContent: "center",

     shadowColor:'black',
     shadowOffset:{width:0,height:2},
     shadowOpacity:0.2,
   },
   bioInput: {
    flex: 1,

    paddingLeft: 10,
    fontSize:16,
    color:"#666666",

  },
   textInput: {
    flex: 1,

    paddingLeft: 10,
    paddingTop:10,
    fontSize:16

  },
  action2: {
    flexDirection: 'column'
 },
 action3: {
  flexDirection: 'row',
  height:50,
  // backgroundColor:'red',
  left:10,
  padding:10,
},
   action: {
    flexDirection: 'column',
    marginTop: 10,
    height:100,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',

    padding:10,
  },

  headerFont:{
    paddingLeft:10, fontSize:15, color:"#666666",
  },
   trendingText: {
     color: "black",
     fontSize: 18,
     fontWeight: 'bold',
     padding:10
   },
   trendingDaysContainer: {
     height: "82%",
   },
   smallImage: {
     width: "90%",
     height: "90%",
     borderRadius: 15,
     backgroundColor: 'lightgray',

   },
 })

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlbum);
