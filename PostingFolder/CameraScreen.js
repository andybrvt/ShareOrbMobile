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
 AsyncStorage
} from "react-native";

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

class CameraScreen extends React.Component{

  state = {
    allowCamera: false
  }

  componentDidMount(){
    this.allowPermissions()
  }

  allowPermissions = async() => {

    try{

      const camera = await Permissions.askAsync(Permissions.CAMERA)

      if(!camera.granted){
        return Permissions.askAsync(Permissions.CAMERA)
      }

      this.setState({
        allowCamera: true
      })


    } catch(error){

    }
  }

  render(){

    return(
      <View style = {{flex: 1}}>
        {
          this.state.allowCamera ?
          <View style = {{flex: 1}}>
            <Camera style = {{flex: 1}}>

            </Camera>
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

      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    borderRadius: 5

  },
  btnText: {
    color: "white"
  }
})

export default CameraScreen;
