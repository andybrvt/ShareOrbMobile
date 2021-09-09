import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Modal,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  Animated
 } from 'react-native';

 const width = Dimensions.get("window").width
 const height = Dimensions.get("window").height
// this function is used to wrap the sliding of the intro
// pretty much a modal that moves right to left
class SlideWrap extends React.Component{

  modalX = new Animated.Value(width);

  openModal(){
    Animated.timing(this.modalX, {
      duration: 300,
      toValue: 0
    }).start()
  }

  closeModal(){
    Animated.timing(this.modalX, {
      duration: 300,
      toValue: width
    }).start()
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      if(this.props.visible === true){
        this.openModal()
      } else {
        this.closeModal()
      }

    }

  }

  render(){

    return(
      <Animated.View style = {{
          width: width,
          height: height,
          position: 'absolute',
          backgroundColor: 'red',
          transform: [
            {translateX:this.modalX}
          ]
        }}>
        {this.props.children}

      </Animated.View>
    )
  }

}

export default SlideWrap;
