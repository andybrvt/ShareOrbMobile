import React from 'react';
import {View, TextInput, Text} from 'react-native';

// This Component will be a text input but
// will have error show on the bottom

const TextInputError1 = (props) => (
  <View style = {{
    }}>
    <View style = {{
        // borderWidth: 2,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        // borderColor: '#1890ff'

      }}>
      <TextInput
        placeholder = {props.placeholder}
        onChangeText = {props.onChangeText}
        onBlur = {props.onBlur}
        secureTextEntry={props.secureTextEntry}
        style = {{
          height: 40,
          fontSize: 15,
          marginLeft: 7
        }}
        value = {props.value}
         />
    </View>

     {
        props.error ? <Text style = {{color: 'red'}}>{props.error}</Text> : null
     }

  </View>

)

export default TextInputError1;
