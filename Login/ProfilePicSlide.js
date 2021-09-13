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
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus } from "react-native-feather";
import pic from './default.png';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class ProfilePicSlide extends React.Component{

  next = () => {

    this.props.openModal(this.props.openNum)
  }

  render(){
    return(
      <View
        style = {{
           height: height,
           width: width,
           backgroundColor: '#1890ff',
           alignItems: 'center'
         }}
        >
        <View style = {styles.topContainer}>
          <Text style = {styles.textInput}>Pick a profile picture</Text>
        </View>


        <View style = {styles.midContainer}>
          <Avatar
            size = {150}
            rounded
            source = {pic}
             />
        </View>



        <View style = {styles.bottomContainer}>
          <View style = {styles.bottomLContainer}>
            <TouchableOpacity
              onPress = {() => this.props.closeModal(this.props.closeNum)}
              >
              <ArrowLeftCircle
                width = {40}
                height = {40}
                stroke = "white"
                 />
            </TouchableOpacity>

          </View>

          <View style = {styles.bottomRContainer}>
            <TouchableOpacity
              onPress = {() => this.next()}

              >
              <ArrowRightCircle
                width = {40}
                height = {40}
                stroke = "white"
                 />
            </TouchableOpacity>
          </View>


        </View>


      </View>

    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    width: width,
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    color: 'white',
    fontSize: 25
  },
  midContainer:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  bottomContainer: {
    height: '25%',
    width: width,
    flexDirection:'row'
  },
  bottomLContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30
  },
  bottomRContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 30
  }
})


export default ProfilePicSlide;
