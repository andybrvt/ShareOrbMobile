import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
} from 'react-native'
import Animated, {Easing} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const height = Dimensions.get('window').height
const width = Dimensions.get("window").width
const { cond,
   eq,
   add,
   call,
   set,
   Value,
   event,
   or,
   spring,
   Clock,
   block,
   timing,
   stopClock,
   interpolate,
   Extrapolate,
   and,
   neq,
   startClock,
   divide,
   diff,
   lessThan,
   abs,
   multiply
  } = Animated;
const POSITION_THRESHOLD = 1; // threshold where the clock will stop
const VELOCITY = 10;
const VELOCITY_THRESHOLD = 0;


// this will be used for the images in the posting
// whenever you want to have animation in your views
// you will use animated.view
class ImageSquare extends React.Component{

  // ** the PanGestureHandler has to be in the same file as the file variable

  state = {
    dragging: false
  }



  // get called everytime gestureTranslation or gestureState gets updated
  interaction(gestureTranslation, gestureState){
    const start = new Value(0)
    const dragging = new Value(0)
    const position = new Value(0);
    const velocity = new Value(0);

    // Use clock for all the velocity stuff
    const clock = new Clock()
    // change in time
    // diff will get the difference in tiem from orignal to end
    const dt = divide(diff(clock), 1000)

    // remember the first part of the condition is a block
    // where it will all be run if the first condition is correct
    return cond(
      eq(gestureState, State.ACTIVE),
        [
          cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
          stopClock(clock),
          dt,
          set(position, add(start, gestureTranslation)),
        ],
        [set(dragging, 0),
          startClock(clock),
          this.force(dt, position, velocity),
          cond(lessThan(abs(velocity), VELOCITY_THRESHOLD), stopClock(clock)),
          set(position, add(position, multiply(velocity,dt))),
          ]
      );

  }


  // this will stop the clock whenever a certain condition is met
  stopWhenNeeded(dt, position, velocity , clock){
    // if the position is within a certian range
    return cond(
      and(
        lessThan(position, POSITION_THRESHOLD),
        lessThan(-POSITION_THRESHOLD, position)
      ),
      [stopClock(clock), set(velocity, 0), set(position, 0)]
    )
  }

  force(dt, position, velocity){
    return set(velocity, cond(lessThan(position, 0), VELOCITY, -VELOCITY))
  }


  // this will run things on a timer, after a certain amout of time it will
  // run on its own
  runPositionTimer = (clock, gestureState) => {

    // the timing is gonna need a clock, state, and config
    const state = {
      finished: new Value(0), // st once animation has completed
      position: new Value(0), // hold on to transition to value to the current position
      time: new Value(0),
      frameTime: new Value(0) // is the current frame of time over the process of the animation
    };

    console.log(state)

    const config = {
      duration: 3000,
      toValue: new Value(-1),
      easing: Easing.inOut(Easing.ease),
    };

    // For blocking, the last value of the block will be the
    // value that is gonna be returned, this this case it will
    // be the interpolate value
    return block([
      cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
         set(state.finished, 0),
         set(state.time, 0),
         set(state.frameTime, 0),
         set(config.toValue, 1),
         startClock(clock),
       ]),
       cond(and(eq(gestureState, State.END), neq(config.toValue, 0)), [
         set(state.finished, 0),
         set(state.time, 0),
         set(state.frameTime, 0),
         set(config.toValue, 0),
         startClock(clock),
       ]),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      cond(
        eq(this.gestureState, State.ACTIVE),
        add(this.offSetX, this.dragX),
        set(this.offSetX, this.getPosition(this.props.index).x)
      ),
    ])
  }


  constructor(props){
    super(props)

    // this.y = new Value(this.getPosition(this.props.index).y)
    // this.x = new Value(this.getPosition(this.props.index).x)

    this.clock = new Clock()


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

    // this.opacity = this.runPositionTimer(this.clock,this.gestureState)

    // this conditional will make sure that you get the right value at the right
    // position, this conditional will check if the gestureState is active and
    // if it is it will add dragX to offset, if not true then it will just set
    // the offset as thew new value
    // this.transX = cond(
    //   eq(this.gestureState, State.ACTIVE),
    //   add(this.offSetX, this.dragX),
    //   set(this.offSetX, this.getPosition(this.props.index).x)
    // )

    this.transX = this.interaction(this.dragX, this.gestureState)


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
          // opacity: this.opacity,
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
