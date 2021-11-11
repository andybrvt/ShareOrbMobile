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
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal
 } from 'react-native';


class LoadingModal extends React.Component{


  render(){

    return(
      <View>
        <Modal
          transparent = {true}
          visible = {this.props.visible}
          >
          <TouchableWithoutFeedback>
            <View
              style = {{
                backgroundColor: "#000000aa",
                flex: 1,

                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <View style = {{
                  backgroundColor: "#ffffff",
                  // margin: 50,
                  borderRadius: 15,
                  height: 100,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center'
                  // flex: 1
                }}>

                <ActivityIndicator
                  size = "large"
                  />
              </View>
            </View>
          </TouchableWithoutFeedback>

        </Modal>
      </View>

    )
  }
}


const styles = StyleSheet.create({
  button: {
    position: "relative",
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#1890ff",

  },
  buttonText: {
    color: 'white',
    fontSize: 14
  },
  cancelText: {
    marginTop: 20,
  }
})

export default LoadingModal;
