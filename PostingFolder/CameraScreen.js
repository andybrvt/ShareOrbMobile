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
 AsyncStorage,
 Modal
} from "react-native";

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Zap, ZapOff, X } from "react-native-feather";


class CameraScreen extends React.Component{

  state = {
    allowCamera: false,
    type: "front",
    showFlash: "off",
    imagePreview: null,
    isOpen: false,
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
  onFlash(){

    const flash = this.state.showFlash;

    if(flash === "off"){
      this.setState({
        showFlash: 'on'
      })
    } else {
      this.setState({
        showFlash: 'off'
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

  takePicture = async() => {
    if(!this.cameraRef){
      return
    }

    try {
      const pic = await this.cameraRef.takePictureAsync();

      console.log(pic);
      this.setState({
        isOpen: true,
        imagePreview: pic.uri
      })
    } catch {
      console.log('error taking pictures')
    }


  }

  onCancelPhoto(){
    this.setState({
      isOpen: false,
      imagePreview: null
    })
  }

  render(){

    return(
      <View style = {{flex: 1}}>
        {
          this.state.allowCamera ?
          <View style = {{flex: 1}}>

            {
              this.state.imagePreview !== null ?

              <Modal  animationType = "fade" visible = {this.state.isOpen}>




                <Image source = {{uri:this.state.imagePreview}}
                  style = {{height: '100%', width: "100%"}}
                   />

               <TouchableOpacity
                 onPress = {() => this.onCancelPhoto()}
                 style = {{
                   position: 'absolute',
                   top: 20,
                   left: 10
                 }}>
                 <X
                   stroke = 'white'
                   height = {40}
                   width = {40}/>
               </TouchableOpacity>

              </Modal>

              :

              <Camera
                ref = {node => {this.cameraRef = node}}
                type = {this.state.type}
                flashMode = {this.state.showFlash}
                style = {{flex: 1}}>

                  <TouchableWithoutFeedback
                    onPress = {() => this.onSwitchCamera()}
                    style = {{flex: 1}}>
                    <View style = {{ flex: 1, }}></View>
                  </TouchableWithoutFeedback>
                  {
                    this.state.showFlash === "on" ?

                    <TouchableOpacity
                      onPress = {() => this.onFlash()}
                      style ={{
                        position: 'absolute',
                        top: 100
                      }}>
                      <Zap
                        stroke = "white"
                        width = {40}
                        height = {40} />
                    </TouchableOpacity>

                    :

                    <TouchableOpacity
                      onPress = {() => this.onFlash()}
                      style ={{
                        position: 'absolute',
                        top: 100
                      }}>
                      <ZapOff
                        stroke = "white"
                        width = {40}
                        height = {40} />
                    </TouchableOpacity>

                  }

                  <TouchableOpacity
                    onPress = {() => this.takePicture()}
                    style = {styles.captureBtn}></TouchableOpacity>

              </Camera>
            }



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
  },
  captureBtn: {
    position: 'absolute',
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 5,
    alignSelf: 'center',
    borderColor: 'white'
  }
})

export default CameraScreen;
