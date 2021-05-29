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
 } from 'react-native';
import ImageSquare from './ImageSquare';
import Animated from "react-native-reanimated";

const width = Dimensions.get("window").width

const height = Dimensions.get('window').height
const margin = 0;
const col = 3;
const size = width/col + margin;

const { cond, eq, add, call, set, Value, event, or } = Animated;

// Most of the function that has to do with handling the movign like starting, moving
// and dropping should be done in this file and pass through the props to the
// Image square, mostly switching the order around so that it can get the
// position

class DragDrop extends React.Component{

  constructor(props){
    super(props)

    // Handle the state of the gesture
    // The State taken from the gesture handler will be a number that
    // determines what the current state is (ie 2 for BEGIN)
    this.gestureState = new Value(-1);

    this.state = {
      data: this.props.itemList
    }
  }



  render(){

    console.log('hits ')
    console.log(this.props)

    return(
      <ScrollView style = {styles.imageContainerContainer}>



        {this.props.itemList.map((images, key) => {

          return (
            <ImageSquare
              start = {this.props.start}
              rearrange = {this.props.rearrange}
              col = {col}
              margin = {margin}
              size = {size}
              images = {images}
              index = {key}
              />
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
