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
             onPress = {() =>this.onCancel()}
             >
            <View
              onPress = {() => this.onCancel()}
              style = {{
                backgroundColor: "#000000aa",
                flex: 1,
              }}>
              <Animated.View style = {{
                  backgroundColor: "#808080",
                  // margin: 50,
                  borderRadius:0,
                  height: 300,
                  transform: [
                    {translateY: this.props.slide}
                  ],
                  justifyContent: 'center',
                  position: 'relative'
                  // flex: 1
                }}>
                <View style = {{
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    position: 'absolute',
                    top: 0
                  }}>
                  <View style = {{
                      flex: 1,
                      alignItems: 'flex-start'
                    }}>
                    <Button
                      onPress = {() =>this.onCancel()}
                      color="white"
                      title = "Cancel"
                       />
                  </View>

                  <View style = {{
                      flex: 1,
                      alignItems: 'flex-end'
                    }}>
                    <Button
                      onPress = {() =>this.onCancel()}
                      color = "white"
                      title = "Save"
                       />
                  </View>

                </View>
                <DateTimePicker
                   testID="dateTimePicker"
                   value = {this.props.value}
                   mode="date"
                   is24Hour={true}
                   display="spinner"
                   onChange = {this.props.onChange}
                   maximumDate = {new Date()}
                 />

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
