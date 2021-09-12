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
import pic from './default.png';

class ProfilePicSlide extends React.Component{

  next = () => {
    
    this.props.openModal(this.props.openNum)
  }

  render(){
    console.log(pic)
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
            source = {pic}
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
