import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

// This Component will be a text input but
// will have error show on the bottom

const TextInputError = (props) => (
  <View style = {{
    }}>
    <View style={[
        // borderWidth: 2,
        styles.box,

        props.onChangeText.length>0 ?
    styles.borderColor1 :
    styles.borderColor2 ]}
      >
      <TextInput
        // placeholder = {props.placeholder}
        onChangeText = {props.onChangeText}
        onBlur = {props.onBlur}
        secureTextEntry={props.secureTextEntry}
        style = {{

          height: 40,
          fontSize: 14,

          padding:10,
        }}
         />
    </View>

     {
        props.error ? <Text style = {{color: 'red'}}>{props.error}</Text> : null
     }

  </View>

)

const styles = StyleSheet.create({
    borderColor1: {
        borderColor: '#1890ff'
    },
    borderColor2: {
        borderColor: 'red'
    },
    box:{
      height: 40,
      borderRadius: 10,
      backgroundColor: '#F0F0F0',
    },

});

export default TextInputError;
