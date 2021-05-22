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
  Animated,
  FlatList
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import ModalBackgroundContainer from '../RandomComponents/ModalBackgroundContainer';
import { connect } from 'react-redux'
import { Avatar, Divider } from 'react-native-paper';
import  authAxios from '../util';
import * as dateFns from 'date-fns';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import FlashMessage from '../RandomComponents/FlashMessage';
import * as authActions from '../store/actions/auth';
import ImageSquare from './ImageSquare';


const colorMap = {}

class TestDrag extends React.Component{

  state = {
    // New type of format inorder to put 200 values
    // into an array
    data: Array.from(Array(200), (_,i) => {
      colorMap[i] = this.getRandomColor()
      return i
    }),

    point: new Animated.ValueXY(),
    dragging: false
  }


  reset = () => {
    this.setState({
      dragging: false
    })
  }
  constructor(props){
    super(props)

    this.scrollOffset= 0;
    this.panResponder =  PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,


      // this is important, helps with starting the the gesture
      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now

        console.log(gestureState.y0)
        // y0 is the starting position of the y, you can have an x0 as well
        this.setState({
          dragging: true
        })
      },

      // for the gesture move, get updates on the objects location
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.moveY)
        Animated.event([{y:this.state.point.y}])({y:gestureState.moveY})
        // in the gestureState, x and y 0 are the intial value
        // d x and y are the distnace from the origianl

        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        false,

      // for release and terminate you will use to restart the states
      // once everything is done
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.reset()
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.reset()
      },


      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })


  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(){
    // Step 1: of getting the panResponder to work
    // first you have to make it a field in the constructor
    // Step 2: then call its panHandler inside the view you want to
    // have the gesture have affect {...this.panResponder.panHandlers}
    // Step 3: You will make a new Animated.ValueXY, this will be the point where
    // the person finger is on
    // Step 4: You would then want to update the value of point based on the
    // onPanResponderMove funcion


    // WHEN TO USE ANIMATED.VIEW
    // this is all the area you want the animation to happen


    const {data, dragging} = this.state;
    console.log('here in the test')

    const renderItem = ({item}) =>(
      <View
        style = {{
          padding: 22,
          backgroundColor: colorMap[item],
          flexDirection: "row"
        }}>
          <View
            {...this.panResponder.panHandlers}
            >
            <Text style = {{fontSize: 24}}>@</Text>
          </View>
        <Text style = {{
            fontSize: 22,
            textAlign: 'center',
            flex:1
          }}>{item}</Text>
      </View>
    )

    return(
      <View style = {styles.container}>

        {this.state.dragging &&
          <Animated.View style = {{
              position: "absolute",
              backgroundColor: "black",
              zIndex: 2,
              width: "100%",
              top: this.state.point.getLayout().top
            }}>
            {renderItem({item: 3})}
          </Animated.View>
        }

        <FlatList
          scrollEnabled = {!dragging}
          style = {{width: "100%"}}
          data = {data}
          renderItem = {renderItem}
          onScroll = {e =>{
            // this is to see how far down it is
            this.scrollOffset = e.nativeEvent.contentOffset.y
          }}
          onLayout = {e => console.log(e)}
          scrollEventThrottle = {16}
          keyExtractor = {item => ""+item}
           />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TestDrag;
