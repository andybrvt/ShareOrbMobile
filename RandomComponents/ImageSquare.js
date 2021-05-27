import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet
} from 'react-native'
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const height = Dimensions.get('window').height
const width = Dimensions.get("window").width
const { cond, eq, add, call, set, Value, event, or } = Animated;


// this will be used for the images in the posting
// whenever you want to have animation in your views
// you will use animated.view
class ImageSquare extends React.Component{

  // ** the PanGestureHandler has to be in the same file as the file variable

  constructor(props){
    super(props)

    // this.y = new Value(this.getPosition(this.props.index).y)
    // this.x = new Value(this.getPosition(this.props.index).x)

    this.absY = new Value(this.getPosition(this.props.index).x)
    this.absX = new Value(this.getPosition(this.props.index).y)

    this.onGestureEvent = event([
      {
        nativeEvent:{
          absoluteY: this.absY,
          absoluteX: this.absX,
          state: this.gestureState
        }
      }
    ])


  }
  // So when you are doing the simple calls you will need
  // to do the values in the ui reanimated. You will do it
  // in the jsx for now but whne you start moving stuff around
  // you want to put the calculations inside the ui reanimated run

  // order will be a number that represent the index of the picture
  getPosition = (order: number) => {

    const col = this.props.col
    const size = this.props.size

    // so you want to return the x and y of the images
    return{
      x: (order % col) * size, // pretty much if 0 or 1, row would be 0
      y: Math.floor(order / col) * size
    }
  }

  // given the x and y of the items you can then get the order of the function back

  // pretty much just return the index order that the values are in
  getOrder = (x: number, y: number)=> {

    const col = Math.round(x/this.props.size)
    const row = Math.round(y/this.props.size)

    return row * this.props.col + col
  }

  // remember the PanGestureHandler is wrapped around any place you
  // want it to dectect gestrue movement. This is simlar to taht of the
  // panResponder

  // You will have to handle when you first click on it you have to id what the location
  // of that box is, and then you when you start moving it around you gotta find a way
  // to id that you are in another square and then switch places, should be an infinite loop
  render(){


    const index = this.props.index
    return(
      <Animated.View
        style = {{
          transform: [
            {translateX: this.absX},
            {translateY: this.absY}
          ]
        }}
        >
        <PanGestureHandler
          maxPointers = {1}
          onGestureEvent = {this.onGestureEvent}
          onHandlerStateChange = {this.onGestureEvent}
          >
          <Animated.View
            style = {styles.imageContainer}
            key = {this.props.index}
            >
            <Image
              style = {styles.smallImage}
              resizeMode = "cover"
              source = {{
                uri: this.props.images
              }}
               />
           </Animated.View>
        </PanGestureHandler>

      </Animated.View>

    )
  }
}


const styles = StyleSheet.create({
  imageContainer: {
    width: Math.round(width/3),
    height: Math.round(width/3),
    overflow:"hidden",
    alignItems: 'center',
    justifyContent: "center",
    position: "absolute",
    // backgroundColor: 'red'
   // padding: 10,
  },
  imageHolder: {

  },
  smallImage: {
    width: "90%",
    height: "90%",
    borderRadius: 15

  }


})

export default ImageSquare;
