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


  render(){

    return(
      <View>
        <Modal
          transparent = {true}
          visible = {this.props.visible}
          >

          <TouchableWithoutFeedback
            style = {{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            >

            <DateTimePicker
              testID="dateTimePicker"
              value={this.props.value}
              mode="date"
              is24Hour = {true}
              display="default"
              onChange={this.props.onChange}
              maximumDate = {new Date()}
            />
          </TouchableWithoutFeedback>

        </Modal>
      </View>
    )
  }
}

export default AndroidDateModal;
