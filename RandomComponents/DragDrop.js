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
  PanResponder,
  Animated
 } from 'react-native';
 import ImageSquare from './ImageSquare';

const width = Dimensions.get("window").width

const height = Dimensions.get('window').height
const margin = 8;
const col = 3;
const size = width/col - margin;

class DragDrop extends React.Component{


  render(){

    return(
      <ScrollView style = {styles.imageContainerContainer}>



        {this.props.itemList.map((images, key) => {

          return (
            <ImageSquare
              col = {col}
              margin = {margin}
              size = {size}
              images = {images}
              index = {key}/>
          )
        })

      }

    </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  imageContainerContainer: {
    flex: 1,
    // flexDirection: "row",
    width: width,
    // flexWrap: 'wrap',
    // backgroundColor: 'red'
  },

})

export default DragDrop;
