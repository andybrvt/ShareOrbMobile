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
const { cond, eq, add, call, set, Value, event, or, spring } = Animated;


// this will be used for the images in the posting
// whenever you want to have animation in your views
// you will use animated.view
class ImageSquare extends React.Component{

  // ** the PanGestureHandler has to be in the same file as the file variable

  state = {
    dragging: false
  }

  constructor(props){
    super(props)

    // this.y = new Value(this.getPosition(this.props.index).y)
    // this.x = new Value(this.getPosition(this.props.index).x)

    this.picHeight = 0
    this.picWidth = 0
    this.gestureState = new Value(-1)

    // Helps capture the correctly location of the object

    // remember that when you make a value, the startin value will be
    // at zero, you have to get it right the first time
    this.index = new Value(this.props.index)

    this.dragY = new Value(0)
    this.dragX = new Value(0)

    // this offset probally has to be the getposition
    this.offSetX = new Value(this.getPosition(this.props.index).x);
    this.offSetY = new Value(this.getPosition(this.props.index).y);

    this.onGestureEvent = event([
      {
        nativeEvent:{
          translationY: this.dragY,
          translationX: this.dragX,
          state: this.gestureState
        }
      }
    ])

    // this conditional will make sure that you get the right value at the right
    // position, this conditional will check if the gestureState is active and
    // if it is it will add dragX to offset, if not true then it will just set
    // the offset as thew new value
    this.transX = cond(
      eq(this.gestureState, State.ACTIVE),
      add(this.offSetX, this.dragX),
      set(this.offSetX, this.getPosition(this.props.index).x)
    )

    // this.transX = add(this.offSetX, this.dragX)
    //
    this.transY = cond(
      eq(this.gestureState, State.ACTIVE),
      add(this.offSetY, this.dragY),
      set(this.offSetY, this.getPosition(this.props.index).y)
    )

    // this.transY = add(this.offSetY, this.dragY)
    // this.y = add(this.absY,
    // this.x = this.absX


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


  // handle the start of the guesture
  // parameter will be the index of the imagesquare
  start = ([order]) => {
    this.setState({
      dragging: true
    })

    this.props.start(order)
  }

  // this will be run when you let go of the item
  reset = () => {
    // so for now you want the pictures to run to its original place
    // this.dragX = set(this.dragX, 0)
    // this.offSetX = set(this.offSetX, this.getPosition(this.props.index).x)
    // this.transX = set(this.transX, add(this.offSetX, this.dragX))
    //

    this.setState({
      dragging: false
    })

    this.props.reset()


  }

  move = ([x, y]) => {



    if(x > 0 && x < width && y > 0 && y < height){

      const order = this.getOrder(x, y)
      this.props.move(order)

    }


  }



  // remember the PanGestureHandler is wrapped around any place you
  // want it to dectect gestrue movement. This is simlar to taht of the
  // panResponder

  // You will have to handle when you first click on it you have to id what the location
  // of that box is, and then you when you start moving it around you gotta find a way
  // to id that you are in another square and then switch places, should be an infinite loop
  render(){


    const{dragging} = this.state

    const index = this.props.index



    return(
      <Animated.View
        style = {{
          zIndex: dragging ? 10 : 0,
          transform: [
            {translateX: this.transX},
            {translateY: this.transY},
            {scale: dragging ? 1.1 : 1 }
          ]
        }}
        >

        <Animated.Code>
          {() =>
            cond(
              eq(this.gestureState, State.BEGAN),
              call([this.index], this.start)
            )
          }
        </Animated.Code>
        <Animated.Code>
          {() =>
            cond(
              eq(this.gestureState, State.ACTIVE),
              call([this.transX, this.transY], this.move)
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
            onLayout = {e => {
              const height = e.nativeEvent.layout.height
              this.picHeight = height
              this.picWidth = height

            }}
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
