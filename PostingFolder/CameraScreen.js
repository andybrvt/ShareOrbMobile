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
import { Zap } from "react-native-feather";


class CameraScreen extends React.Component{

  state = {
    allowCamera: false,
    type: "front"
  }

  componentDidMount(){
    this.allowPermissions()
  }

  onSwitchCamera(){
    const camera = this.state.type;

    if(camera === "front"){
      this.setState({
        type: 'back'
      })
    } else {
      this.setState({
        type: 'front'
      })
    }

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
            <Camera
              type = {this.state.type}
              style = {{flex: 1}}>

                <TouchableWithoutFeedback
                  onPress = {() => this.onSwitchCamera()}
                  style = {{flex: 1}}>
                  <View style = {{ flex: 1, }}></View>
                </TouchableWithoutFeedback>
                <View style ={{
                    position: 'absolute',
                    top: 100
                  }}>
                  <Zap
                    stroke = "white"
                    width = {40}
                    height = {40} />
                </View>

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
