import React, { useRef } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  Share,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import {  Circle, Instagram, Download} from "react-native-feather";
import * as ImagePicker from 'expo-image-picker';
// const viewRef = useRef();
import CameraRoll from "@react-native-community/cameraroll";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const data3=[
    {
        "itemImage": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=874&q=80"
    },
    {
        "itemImage": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80"
    },
    {
        "itemImage": "https://images.unsplash.com/photo-1634571348132-a4ca1aa4fabe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80"
    },
    {
        "itemImage": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
    },
    {
        "itemImage": "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
    },
    {
        "itemImage": "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
    },

  ]

class GroupPost extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      groupSelected:null,
      showInstagramStory:true,

    }
  }

  downloadFile(imageFile) {
    console.log(imageFile)
    showMessage({
      message: "Downloaded to phone",
      type: "info",
      backgroundColor: "#1890ff", // background color
      color: "white", // text color
      duration:850
    });
    const uri = "https://images.unsplash.com/photo-1634937916052-a893c9597b0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
    let fileUri = FileSystem.documentDirectory + "shareorb.jpg";
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        this.saveFile(uri);
      })
      .catch(error => {
        console.error(error);
      })
  }

  saveFile = async (fileUri: string) => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
          const asset = await MediaLibrary.createAssetAsync(fileUri)
          await MediaLibrary.createAlbumAsync("Download", asset, false)
      }
  }



  testInstagram(imageFile) {


  }

  _openCameraRoll = async (imageFile) => {
    let image = await ImagePicker.launchImageLibraryAsync();
    let { origURL } = image;
    let encodedURL = encodeURIComponent(origURL);
    let instagramURL = `instagram://library?AssetPath=${encodedURL}`;
    Linking.openURL(instagramURL);
  }


  componentDidMount() {
    if (Platform.OS === 'ios') {
      Linking.canOpenURL('instagram://')
        .then((val) => {
          this.setState({
            showInstagramStory:true,
          })

        })
        .catch((err) => console.error(err));
    }
    {/*
    else {
      Share.isPackageInstalled('com.instagram.android')
      .then((val) => {
        this.setState({
          showInstagramStory:true,
        })
      })
      .catch((err) => console.error(err));
    }
    */}
  }

  onSelectGroup = (item) => {
      this.setState({
        groupSelected: item
      })
  }

  renderItem3 = ({item}) => {
    return(
      <TouchableOpacity
      onPress = {() =>
        this.onSelectGroup(item)
      }
       activeOpacity={0.6} style={{flexDirection:'row',padding:5, marginTop:10, marginLeft:10, alignItems:'center'}}>
        <Avatar
          size={45}
          rounded
            resizeMode = "cover"
            source = {{
              uri: `${global.IMAGE_ENDPOINT}`+item.groupPic
            }}
           />
         <View style={{marginLeft:10,  width:'65%',}}>
         <Text style={{fontSize:14, fontFamily:'Nunito-SemiBold'}}>{item.group_name}</Text>
         <Text style={{fontSize:14, fontFamily:'Nunito'}}>{item.mini_member.length} members</Text>
       </View>
       <View>
       {(this.state.groupSelected===item)?

         <Circle
           stroke = "#d9d9d9"
           fill="#1890ff"
           strokeWidth={2}
           width = {30}
           height = {30} />

       :
       <Circle
         stroke = "#d9d9d9"
         strokeWidth={2}
         width = {30}
         height = {30} />

        }

       </View>
     </TouchableOpacity>
    )
  }
  render(){

    const imageFile = this.props.route.params.imageFile.uri
    console.log(imageFile)
    return(
      <BackgroundContainer>
        <View>
          <Text style={{color:'black', fontSize:18, fontFamily:'Nunito-Bold', marginLeft:10}}> Your Orbs</Text>
          <View style={{height:'77.5%',}}>
            <FlatList
            style={{height:500}}
             initialNumToRender={2}
             // numColumns={2}
             ListHeaderComponent = {this.listHeader}
             data={this.props.smallGroups}
             style={{}}
             // contentContainerStyle={{paddingBottom:25}}
             renderItem = {this.renderItem3}
             keyExtractor={(item, index) => String(index)}
             onEndReachedThreshold = {0.2}
             showsHorizontalScrollIndicator={false}
             horizontal={false}
              />
          </View>

          <View style= {{flexDirection:'row'}}>
            <TouchableOpacity
            style={styles.roundButton2}
            onPress = {() => this.testInstagram(imageFile)}>
              <Instagram
                stroke = "#bfbfbf"
                strokeWidth={2}
                width = {35}
                height = {35} />
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.roundButton2}
            onPress = {() => this.downloadFile()}>
              <Download
                stroke = "#bfbfbf"
                strokeWidth={2}
                width = {35}
                height = {35} />
            </TouchableOpacity>
          </View>

          <View style={{alignItems:'center'}}>
          {this.state.showInstagramStory?
            <TouchableOpacity
            onPress = {() => this._openCameraRoll()}
            style={styles.loginBtn}>

              <Text style={{color:'white', fontSize:18, fontFamily:'Nunito-SemiBold'}}>
               Post</Text>

            </TouchableOpacity>

          :
          <Text></Text>

        }

          </View>
        </View>
        <FlashMessage
          position="bottom" />
      </BackgroundContainer>
    )
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    width: "60%",
    height: 40,
    borderRadius:10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "#1890ff",
  },

  roundButton2: {
    borderColor:'#d9d9d9',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 100,
    backgroundColor: 'white',
    elevation:15,
    marginRight:'10%',
  },

})



const mapDispatchToProps = dispatch => {
  return{
  }
}


const mapStateToProps = state => {
  return {
    smallGroups: state.auth.smallGroups,
    smallGroupIds: state.auth.smallGroupIds
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPost);
