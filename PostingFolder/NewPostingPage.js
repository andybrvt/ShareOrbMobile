import React, { createRef } from "react";
import { View, Text, Dimensions, SafeAreaView } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import ModalBackgroundContainer from '../RandomComponents/ModalBackgroundContainer';
import { connect } from 'react-redux'
import * as authActions from '../store/actions/auth';


const {width} = Dimensions.get("window");
const margin = 8;
const col = 2;
const size = width/col - margin;


class NewPostingPage extends React.Component{

  constructor(props){
    super(props)
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



  render(){

    console.log(this.props)
    return(
      <ModalBackgroundContainer>

        <Text>Some text here</Text>


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

export default connect(mapStateToProps, mapDispatchToProps)(NewPostingPage);
