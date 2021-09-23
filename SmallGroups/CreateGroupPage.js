import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Dimensions,
  RefreshControle,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator
 } from 'react-native';
import { LogOut, Lock, User, Bell, Globe, Menu, PlusCircle} from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import CameraPic from './camera.jpg';
import { Avatar } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import ExploreSearchBar from '../Explore/ExploreSearchBar';
import authAxios from '../util';
import FakeRoundedInput from '../RandomComponents/FakeRoundedInput';
import SearchResults from '../Explore/SearchResults';
import SearchResultsMultiple from './SearchResultsMultiple';
import { connect } from 'react-redux';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class CreateGroupPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      condition:true,
      loading: false,
      username: '',
      loginCondition:true,
      groupPic: "",
      groupName: "",
      description: "",
      publicG: false,
      searchResults: [],
      invitedPeople: [],
      searchValue: '',
      showSearch: false
    }
    this.bs = React.createRef()
  }

  onShowSearch = () => {
    this.setState({
      showSearch: true
    })
  }

  onCloseSearch = () => {
    this.setState({
      searchValue: "",
      showSearch: false
    })
  }

  onPublicChange = () => {
    this.setState({
      public: !this.state.public
    })
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

      this.setState({
        groupPic: pickerResult.uri
      })

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
      this.setState({
        groupPic: pickerResult.uri
      })

      this.bs.current.snapTo(1)
    }
  }

  onGroupNameChange = e => {
    this.setState({
      groupName:e
    })
  }

  onDescriptionChange = e => {
    this.setState({
      description: e
    })
  }

  onChangeNewSearch = e => {

   this.setState({
     searchValue: e
   })

   const search = e === undefined ? null : e;

   if(search !== ""){
     this.setState({
       loading: true
     });
   authAxios.get(`${global.IP_CHANGE}/userprofile/userSearch/`, {
     params: {
       search
     }
   }).then(res => {

     this.setState({
       loading: false,
       searchResults: res.data,
     })
   })

 } else {
   // this.setState({
   //   searched:[],
   //
   // })
 }

 }

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


  frequentChatPeople=()=>{
    return(

      <View style = {styles.frequentPeopleContainer}>
        {
          this.state.invitedPeople.map((item, index) => {

            return(
              <View style={[styles.column]}>
                <Avatar
                  rounded
                  source = {{
                    uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture
                  }}
                  size = {70}
                />
              <Text>{item.first_name} {item.last_name}</Text>
              </View>

            )
          })
        }



        <TouchableOpacity
          onPress = {() => this.onShowSearch()}
          style={[styles.column]}>
           <PlusCircle
             stroke = "white"
             fill = {'gray'}
             width = {70}
             height = {70}
              />
          </TouchableOpacity>


      </View>

    )
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

  onOutSideClick = () => {
    Keyboard.dismiss()
    this.bs.current.snapTo(1)
  }


  onShowSearch = () => {
    this.setState({
      showSearch: true
    })
  }
  onUnShowSearch = () => {
     this.setState({
       showSearch: false
     })
  }

  onSearchChange = e => {
    this.setState({
      searchValue: e
    })
  }

  onSelectUser = (user) => {
    this.setState({
      invitedPeople: [...this.state.invitedPeople, user]
    })

  }

  checkCreating = () => {
    // this function will check whether or not you meet the criteria
    // to sumbit to create a group
    const {groupPic, groupName, description, publicG, invitedPeople} = this.state
    if(groupPic === ""){
      return false
    }
    if(groupName === ""){
      return false
    }
    if(description === ""){
      return false
    }
    if(invitedPeople.length < 1){
      return false
    }
    return true

  }

  onCreateGroup = () => {
    // this function is used to create
    console.log('create group')
    const {groupPic, groupName, description, publicG, invitedPeople} = this.state


    let newInvited = [];

    const pic = global.FILE_NAME_GETTER(groupPic)

    const formData = new FormData();
    formData.append('groupPic', pic)
    formData.append('groupName', groupName)
    formData.append('description', description)
    formData.append('public', publicG)
    formData.append('curId', this.props.id)
    authAxios.post(`${global.IP_CHANGE}/mySocialCal/createSmallGroup`,
      formData
    ).then(res => {
      console.log(res.data)
    })

  }


  render(){
    console.log(this.state.invitedPeople)
    return(
      <BackgroundContainer>

        {
          this.state.showSearch ?

          <SearchResultsMultiple
            searchValue = {this.state.searchValue}
            onSearchChange = {this.onChangeNewSearch}
            onClose = {this.onUnShowSearch}
            data = {this.state.searchResults}
            onSelect = {this.onSelectUser}
            invited = {this.state.invitedPeople}
             />

          :

          <View style ={{
                flex: 1}}>

            <TouchableWithoutFeedback
              onPress = {() => this.onOutSideClick()}
              >


                <ScrollView style = {{
                    height: height
                  }}>
                  <View underlayColor="#f0f0f0">
                    <View style={{
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',

                      }}>

                      <View style={{flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        width:'100%',
                        // backgroundColor:'red',
                        marginTop:'5%', }}>
                        {
                          this.state.groupPic !== "" ?

                          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                            <Avatar
                              rounded
                              source = {{
                                uri: this.state.groupPic
                              }}
                              size={100}
                               />
                          </TouchableOpacity>

                          :

                          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                            <Avatar
                              rounded
                              source = {CameraPic}
                              size={100}
                               />
                          </TouchableOpacity>


                        }

                        <View style={{
                          marginTop:10,
                          width:'70%',
                          }}>

                            <TextInput
                             placeholder="Orb Name"
                             placeholderTextColor="#919191"
                             autoCorrect={false}
                             style={{fontSize:18,

                               fontFamily:'Nunito-SemiBold', textAlign:'center', }}
                             onChangeText = {this.onGroupNameChange}
                             value = {this.state.groupName}
                             />

                         </View>
                      </View>
                     </View>
                     <View style={{
                         flexDirection:'row',
                         padding:25}}>
                         <Menu

                           stroke="black" strokeWidth={2.0} width={25} height={25} style={{top:3}}/>
                         <TextInput
                          placeholder="Description"
                          placeholderTextColor="#919191"
                          autoCorrect={false}
                          style={{marginLeft:20,fontSize:18, fontFamily:'Nunito-SemiBold', width:'85%',}}
                          onChangeText = {this.onDescriptionChange}
                          value = {this.state.description}
                          />

                      </View>
                      <View style={{
                          flexDirection:'row',

                          borderTopWidth:1,
                          borderColor:'#d9d9d9',
                          borderBottomWidth:1,
                          padding:20}}>
                        <View>
                          <Globe stroke="black" strokeWidth={1} width={45} height={45} style={{top:3}}/>
                        </View>
                        {
                          (this.state.publicG)?
                          <View style={{marginLeft:20, flexDirection:'column'}}>
                            <Text style={{fontFamily:'Nunito-Bold', fontSize:18}}>Make Orb Public</Text>
                            <Text style={{fontFamily:'Nunito-SemiBold', fontSize:18, color:'#108EE9'}}>Anyone can join the group</Text>
                          </View>
                          :
                          <View style={{marginLeft:20, flexDirection:'column'}}>
                            <Text style={{fontFamily:'Nunito-Bold', fontSize:18}}>Make Orb Private</Text>
                            <Text style={{fontFamily:'Nunito-SemiBold', fontSize:18, color:'#108EE9'}}>Choose who joins the group</Text>
                          </View>
                        }

                        <View style = {{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {
                            this.state.loading === true ?
                            <ActivityIndicator />
                          :

                          <Switch
                            trackColor={{ false: "gray", true: "#1890ff" }}
                            thumbColor={this.state.condition ? "white" : "white"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.onPublicChange}
                            value={this.state.publicG }
                             />

                          }

                        </View>


                       </View>

                      <View style = {{top: 20}}>
                        <View >
                          <Text style={styles.settingWord}>People in Group</Text>
                        </View>



                         <View
                           style = {{
                             flex:1,
                             width: width}}
                          // showsHorizontalScrollIndicator={false}
                          // horizontal = {true}
                          >
                          {this.frequentChatPeople()}
                        </View>

                      </View>

                  </View>


                  {
                    this.checkCreating() ?


                    <View style={{alignItems:'center',
                      height: 100,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress = {() => this.onCreateGroup()}
                       style={styles.loginBtn1}>
                      <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold'}}> CREATE GROUP</Text>
                    </TouchableOpacity>
                    </View>

                    :

                    <View style={{alignItems:'center',
                      height: 100,
                      justifyContent: 'center',
                    }}>
                    <View style={styles.loginBtn2}>
                      <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold'}}> CREATE GROUP</Text>
                    </View>
                    </View>



                  }




                </ScrollView>



            </TouchableWithoutFeedback>
          </View>

        }

        <BottomSheet
         ref={this.bs}
         snapPoints={[250, 0]}
         renderContent={this.renderInner}
         renderHeader={this.renderHeader}
         initialSnap={1}
         callbackNode={this.fall}
         enabledGestureInteraction={true}
       />
      </BackgroundContainer>
    )
  }
}
const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    zIndex:9999,
    elevation:40,
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
  test: {
    elevation:5,
  },
  bottomContainer: {
    height: '25%',
    width: width,
    flexDirection:'row'
  },
  frequentPeopleContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  column:{
    padding: 10,
    alignItems: 'center',
    width: width/4,
    //THIS LINE HAS CHANGED
    justifyContent:'center',

  },

  loginBtn1: {
    width: "85%",
    borderRadius: 35,
    height: 60,
    // elevation:20,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#40a9ff",
  },
  loginBtn2: {
    width: "85%",
    borderRadius: 35,
    height: 60,
    // elevation:20,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "gray",
  },

  settingWord: {
    left:5,
    color:'#919191',
    fontSize:18,
    fontFamily:'Nunito-Bold',
    marginLeft:10,
  },
});

const mapStateToProps = state => {
  return{
    id: state.auth.id
  }
}

export default connect(mapStateToProps, null)(CreateGroupPage);
