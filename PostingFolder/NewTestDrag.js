import React, {createRef} from 'react';
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
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";


// USE THIS AS REFERENCE FOR THE OLD WAY OF MAKING DRAG AND DROP USING PANRESPONDER



// So reanimited pretty much is the other version of animiated from react native
// so you will be using it instead


const colorMap = {}


// This will be used for the recyclerlistview to handle the different types
// of rows
const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
}

const { width } = Dimensions.get("window");

class OldTestDrag extends React.Component{



  state = {
    // New type of format inorder to put 200 values
    // into an array
    data: Array.from(Array(20), (_,i) => {
      colorMap[i] = this.getRandomColor()
      return i
    }),

    // point: new Animated.ValueXY(),
    dragging: false,
    draggingIndex: -1,
  }


  reset = () => {
    this.setState({
      dragging: false,
      draggingIndex: -1,

    })
    this.active = false
  }
  constructor(props){
    super(props)

    // this will be used as reference to the recyleListview
    this.recyleList = createRef();
    // In order to get recycle list view working, you will need a layoutprovider
    // dataprovider and the rowprovider
    // the layoutprovider is used to set the height and width of each element (probally
    // just returns the number)
    // dataprovider checks if to rows are equal or not, you have to use clonewiht rows
    // to fill in the data with an array
    // rowRender, returns the actual react component to be render


    // LayoutProvider will have two methods
    this.layoutProvider = new LayoutProvider()

    // this will be used as a reference to the overall list container
    this.listContainer = createRef();




    this.flatListHeight = 0;
    this.flatList  = createRef(),
    this.active = false
    this.currentY = 0;
    this.point = new Animated.ValueXY()
    this.currentIndex = -1;
    this.rowHeight = 0;
    this.flatListTopOffset = 0;
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

        // y0 is the starting position of the y, you can have an x0 as well


        // how much you scroll (assuming it start from the top of the container)
        // then afterwards you will then add to how much of the screen you are on to
        // which is the y0 value or the value that you clicked on, then substract
        // any offset from the top

        this.currentIndex = this.yToIndex(gestureState.y0) ;
        this.currentY = gestureState.y0; // remember y0 is the intial starting position
        Animated.event(
          [{y:this.point.y}],
          {useNativeDriver: false}
        )({y:gestureState.y0 - this.rowHeight/2})
        this.active = true
        this.setState({
          dragging: true,
          draggingIndex: this.currentIndex
        }, () => {
          this.animateList()
        })

        // YOu can add a call back to a set state, so wehnever the state changes, that funciton
        // will run
      },

      // for the gesture move, get updates on the objects location
      onPanResponderMove: (evt, gestureState) => {
        this.currentY = gestureState.moveY; // remember moveY is the new y position
        Animated.event(
          [{y:this.point.y}],
          {useNativeDriver: false}
        )({y:gestureState.moveY})
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

  // function that will reorder the list
  immutableMove = (arr, from, to) => {
    return arr.reduce((prev, current, idx, self) => {
      if (from === to) {
        prev.push(current);
      }
      if (idx === from) {
        return prev;
      }
      if (from < to) {
        prev.push(current);
      }
      if (idx === to) {
        prev.push(self[from]);
      }
      if (from > to) {
        prev.push(current);
      }
      return prev;
    }, []);
  }


  animateList = () => {
    // since this is recursive, we would need a base case and a
    // recusive case
    if(!this.active){
      // pretty much when you are not touching or dragging
      return;
    }

    // fucntion used to recursively call it self inorder ot check
    // if everything in the list is ordered correctly

    // the requestAnimationFrame will help with the lag
    // request the browser toe xecute the code during the next
    // repaint cycle
    requestAnimationFrame(() => {
      // check if near the bottom or top
      // this is +100 because you want to get that extra space to indicate
      // that there is a part moving on (the current y will just be the y of the
      // screen )
      // so this is just to indicate that you are close to the bottom
      if(this.currentY + 100 > this.flatListHeight){
        this.flatList.current.scrollToOffset({
          offset: this.scrollOffset + 5,
          animated: false
        })
      } else if(this.currentY < 100) {
        this.flatList.current.scrollToOffset({
          offset: this.scrollOffset - 20,
          animated: false
        })
      }


      // check y value if you need to reorder
      // check to see if the new y value is in a new index
      const newIndex = this.yToIndex(this.currentY)
      // The current index, since it is a floor value, it will
      //stay on one index long enough to check and compare
      if(this.currentIndex != newIndex ){
        // Now you will call a reorder function
        console.log('reordering')
        // move the old index to the new spot and the new spot tot he old spot

        // it will be a new index is because you are switching with the one
        // you are moving towards
        this.setState({
          data: this.immutableMove(this.state.data,this.currentIndex, newIndex),
          draggingIndex: newIndex
        })

        this.currentIndex = newIndex

      }

      this.animateList()
    })
  }

  // to get the index of the numbers
  yToIndex = (y: number) => {
    // since this value is a floor there will be times that the value will be zero or larger
    // so to cover all the edge cases you will need to put conditionals on
    const value =  Math.floor((this.scrollOffset+ y - this.flatListTopOffset) / this.rowHeight)

    if(value < 0 ){
      return 0;
    }

    if(value > this.state.data.length -1){
      return this.state.data.length -1;
    }

    return value;
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


    const {data, dragging, draggingIndex} = this.state;
    console.log('here in the test')


    // for render times for the parameter that gets passed in, it will be an object
    // and you can get specfic values from the object based on its position
    const renderItem = ({item, index}, noPanResponder = false) =>(
      <View
        onLayout = {e => {
          this.rowHeight = e.nativeEvent.layout.height
        }}
        style = {{
          padding: 22,
          backgroundColor: colorMap[item],
          flexDirection: "row",
          opacity: draggingIndex === index ? 0 : 1,

        }}>
          <View
            {...(noPanResponder ? {} : this.panResponder.panHandlers)}
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

    // so you get the one on the list becaus that is the actual value, the dragging
    // index is jsut the index

    // if you want a reference to any itme, like you want to have functions call from that object
    // you would use new createref

    // ListHeaderComponent will be use to render stuff in the header of the
    // flatlist
    return(
      <SafeAreaView style = {styles.container}>

        {this.state.dragging &&
          <Animated.View style = {{
              position: "absolute",
              backgroundColor: "black",
              zIndex: 2,
              elevation: 99,
              width: "100%",
              top: this.point.getLayout().top,
            }}>

            {renderItem({item: data[draggingIndex], index: -1}, true)}
          </Animated.View>
        }

        <FlatList
          ref = {this.flatList}
          scrollEnabled = {!dragging}
          style = {{width: "100%"}}
          data = {data}

          // has 3 paramters that gets passed in, item, index, separators
          renderItem = {renderItem}
          onScroll = {e =>{
            // this is to see how far down it is
            // to get the current scroll off set
            this.scrollOffset = e.nativeEvent.contentOffset.y
          }}
          onLayout = {e =>{
            // layout helps manage the position of the
            // flat list, helps you get where the object is placed
            // and what not

            // just remember native events, they are important
              this.flatListTopOffset = e.nativeEvent.layout.y
              this.flatListHeight = e.nativeEvent.layout.height
          }}
          scrollEventThrottle = {16}
          keyExtractor = {item => ""+item}
           />
      </SafeAreaView>
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

export default OldTestDrag;
