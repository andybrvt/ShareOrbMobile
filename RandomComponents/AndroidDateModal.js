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


class AndroidDateModal extends React.Component{

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
            onPress = {() => this.onCancel()}
            style = {{
              flex: 1,

            }}
            >

            <View style = {{
                flex: 1,

                alignItems: 'center',
                justifyContent:'center',
              }}>
              

            </View>
          </TouchableWithoutFeedback>

        </Modal>
      </View>
    )
  }
}

export default AndroidDateModal;
