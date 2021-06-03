import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {Easing} from "react-native-reanimated";
const {
   cond,
   Value,
   event,
   eq,
   call,
   or,
   add
  } = Animated;


const height = Dimensions.get('window').height
const width = Dimensions.get("window").width

// This will be used mostly for the static images, where as the imageSquare
// will be the moving one
class NormImageSquare extends React.Component{

  state = {
    dragging: false
  }

  constructor(props){
    super(props)


    this.x = this.getPosition(this.props.index).x
    this.y = this.getPosition(this.props.index).y

    this.absX = new Value(0);
    this.absY = new Value(0);

    this.dragY = new Value(0);
    this.dragX = new Value(0);
    this.gestureState = new Value(-1);


    this.onGestureEvent = event([
      {
        nativeEvent:{
          absoluteX: this.absX,
          absoluteY: this.absY,
          translationY: this.dragY,
          translationX: this.dragX,
          state: this.gestureState
        }
      }
    ])


  }


  start = ([x, y]) => {
    this.setState({
      dragging: true
    })

    this.props.start()
  }

  move = ([x, y]) => {

    this.props.move(x, y)
  }

  reset = ([]) => {
    this.setState({
      dragging: false
    })

    this.props.reset()
  }

  getPosition = (order: number) => {

    const col = this.props.col
    const size = this.props.size

    // so you want to return the x and y of the images
    return{
      x: (order % col) * size, // pretty much if 0 or 1, row would be 0
      y: Math.floor(order / col) * size
    }
  }


  render(){

    const {dragging} = this.state


    return (

      <Animated.View
        style = {{
          opacity: dragging ? 0 : 1
        }}
        >

        <Animated.Code>
          {() =>
          cond(
            eq(this.gestureState, State.BEGAN),
            call([], this.start)
          )}
        </Animated.Code>
        <Animated.Code>
          {() =>
            cond(
              eq(this.gestureState, State.ACTIVE),
              call([this.absX, this.absY], this.move)
            )
          }
        </Animated.Code>

        <Animated.Code>
          {() =>
            cond(
              or(
                eq(this.gestureState, State.END),
                eq(this.gestureState, State.CANCELLED),
                eq(this.gestureState, State.FAILED),
                eq(this.gestureState, State.UNDETERMINED)
              ),
              call([], this.reset)
            )
          }
        </Animated.Code>
        <PanGestureHandler
          maxPointers = {1}
          onGestureEvent = {this.onGestureEvent}
          onHandlerStateChange = {this.onGestureEvent}
          >
          <Animated.View
            key = {this.props.index}
            style = {[{
              transform:[
                {translateX: this.x},
                {translateY: this.y}
              ]
            },
              styles.imageContainer]}>
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

export default NormImageSquare;
