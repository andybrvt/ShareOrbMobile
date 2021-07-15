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
 import DateTimePicker from '@react-native-community/datetimepicker';
 import Animated from 'react-native-reanimated';
 import { Transition } from 'react-native-reanimated';


class BottomModal extends React.Component{

  onCancel = () => {
    this.props.onCancel()
  }

  onAction = () => {
    this.props.onAction()
  }

  render(){
    return(
      <View>
        <Modal
          transparent = {true}
          visible = {this.props.visible}
          >
          <TouchableWithoutFeedback
             onPress = {() =>this.onCancel()}>
            <View
              onPress = {() => this.onCancel()}
              style = {{
                backgroundColor: "#000000aa",
                flex: "1",

              }}>
              <Animated.View style = {{
                  backgroundColor: "#ffffff",
                  // margin: 50,
                  padding: 30,
                  borderRadius: 10,
                  height: 200,
                  alignItems: 'center',
                  transform: [
                    {translateY: this.props.slide}
                  ]
                  // flex: 1
                }}>
                <Text style = {{
                   textAlign: "center",
                   fontSize: 20}}>
                  Are you sure you want to delete this photo?
                </Text>
                <TouchableOpacity
                  onPress = {() => this.onAction()}
                  style = {styles.button}
                  >
                  <Text
                    style = {styles.buttonText}
                    >Accept</Text>
                </TouchableOpacity>

                <View
                  style = {styles.cancelText}>
                  <Text
                    onPress = {() => this.onCancel()}

                    > Nope, I'm good </Text>
                </View>

              </Animated.View>
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

export default BottomModal;
