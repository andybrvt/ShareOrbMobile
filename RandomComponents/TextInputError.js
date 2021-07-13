import React from 'react';
import {View, TextInput, Text} from 'react-native';

// This Component will be a text input but
// will have error show on the bottom

const TextInputError = (props) => (
  <View>
    <TextInput
      placeholder = {props.placeholder}
      onChangeText = {props.onChangeText}
       />
     {
        props.error ? <Text> {props.error}</Text> : null
     }

  </View>

)

export default TextInputError;
