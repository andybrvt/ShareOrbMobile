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
  TouchableOpacity,
  TouchableWithoutFeedback
 } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus } from "react-native-feather";
import pic from './default.png';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class ProfilePicSlide extends React.Component{

  constructor(props){
    super(props)
    this.bs = React.createRef()
  }
  next = () => {

    this.props.openModal(this.props.openNum)
  }

  renderHeader = () => (
    <View style={styles.test}>
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
    </View>
  );

  renderInner =()=> {
    return(
      <View style={styles.panel}>

        <TouchableOpacity
          onPress = {this.handleTakeProfile}

          style={styles.panelButton} >
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {this.handleChooseProfile}
          style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton1}
          onPress={() => this.bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle1}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
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

        <TouchableWithoutFeedback
          onPress={() => this.bs.current.snapTo(0)}
          >
          <View style = {styles.midContainer}>
            <Avatar
              size = {150}
              rounded
              source = {pic}
               />
          </View>

        </TouchableWithoutFeedback>



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

          <BottomSheet
           ref={this.bs}
           snapPoints={[250, 0]}
           renderContent={this.renderInner}
           renderHeader={this.renderHeader}
           initialSnap={1}
           callbackNode={this.fall}
           enabledGestureInteraction={true}
         />


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
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelButtonTitle: {
    color:'white'
  },
  panelButton: {
   padding: 13,
   borderRadius: 10,
   backgroundColor: '#1890ff',
   alignItems: 'center',
   marginVertical: 7,
   },
   panelButton1: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    marginVertical: 7,
    },
    test: {
      elevation:5,
    },
     header: {
       backgroundColor: '#FFFFFF',
       shadowColor: '#333333',
       shadowOffset: {width: -1, height: -3},
       shadowRadius: 2,
       shadowOpacity: 0.2,

       paddingTop: 20,
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
     },
     panelHeader: {
       // backgroundColor:'blue',
       alignItems: 'center',
     },
     panelHandle: {
       width: 40,
       height: 8,
       borderRadius: 4,
       backgroundColor: '#00000040',
       marginBottom: 10,
     },
})


export default ProfilePicSlide;
