import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity
 } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRightCircle, Plus, Mail, UserPlus } from "react-native-feather";


class ProfilePicSlide extends React.Component{

  next = () => {
    Keyboard.dismiss()
    this.props.openModal(this.props.openNum)
  }

  render(){
    return(
      <View>

        <View>
          <Button
            title = "back"
            onPress = {() => this.props.closeModal(this.props.closeNum)}

             />
        </View>

        <View>
          <Avatar
            size = {35}
            rounded
             />
        </View>

        <View>
          <Text style = {{color: 'white'}}>What do you want to call yourself</Text>

        </View>
        <View>
          <TextInput
            style = {{color: 'white'}}
            ref={(input) => { this.textInput = input; }}
            onChangeText = {this.props.onChange}
            value = {this.props.value}

            />
        </View>

        <View>
          <TouchableOpacity
            onPress = {() => this.next()}
            >
            <ArrowRightCircle
              stroke = "white"
               />
          </TouchableOpacity>
        </View>


      </View>

    )
  }
}

export default ProfilePicSlide;
