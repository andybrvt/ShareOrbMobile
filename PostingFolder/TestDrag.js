import React, { createRef } from "react";
import { View, Text, Dimensions, SafeAreaView } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
import Animated from "react-native-reanimated";


// DRAG AND DROP USING REANIMATED AND RECYCLERLISTVIEW

// So reanimited pretty much is the other version of animiated from react native
// so you will be using it instead

// PanGestureHandler is simlar to that of the panresponder

const colorMap = {}


// This will be used for the recyclerlistview to handle the different types
// of rows
const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
}

const { width } = Dimensions.get("window");

// in this casse you can use reanimted to handle some of the functions
// instead of jsx, this will help incrase efficency
const { cond, eq, add, call, set, Value, event, or } = Animated;

class TestDrag extends React.Component{





  reset = () => {
    // similar to this reset, since the data is now a dataProvider
    // you need to do some new methods to update the values (cloneWithRows)
    this.setState({
       dataProvider: this.state.dataProvider.cloneWithRows(
         this.state.dataProvider.getAllData()
       ),
       dragging: false,
       draggingIndex: -1
     });
     this.scrolling = false;
  }

  // when you do the reanimted call, you have to pass in an array, so you have
  // to declear it as a variable of the content inside
  start = ([y]) => {
    this.currIdx = this.yToIndex(y);
    this.setState({ dragging: true, draggingIndex: this.currIdx });
  };

  updateOrder = y => {
    const newIdx = this.yToIndex(y);

    // Pretty much just update the data provider with
    // stuff switched around in the list
    if (this.currIdx !== newIdx) {
      this.setState({
        dataProvider: this.state.dataProvider.cloneWithRows(
          immutableMove(
            this.state.dataProvider.getAllData(),
            this.currIdx,
            newIdx
          )
        ),
        draggingIndex: newIdx
      });
      this.currIdx = newIdx;
    }


  }

  moveList = amount => {
    if (!this.scrolling) {
      return;
    }

    this.list.current.scrollToOffset(
      this.scrollOffset + amount,
      this.scrollOffset + amount,
      false
    );

    requestAnimationFrame(() => {
      this.moveList(amount);
    });
  };

  move = ([y]) => {
    // this is used scroll the list down whne you get to a certain point
    if (y + 100 > this.flatlistHeight) {
      if (!this.scrolling) {
        this.scrolling = true;
        this.moveList(20);
      }
    } else if (y < 100) {
      if (!this.scrolling) {
        this.scrolling = true;
        this.moveList(-20);
      }
    } else {
      this.scrolling = false;
    }
    this.updateOrder(y);
  };

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
    // First method: given an index, return the type of the item
    // Second method: given the type and object set the height and widht of that object
    // For complex data your layoutprovider will also be complex so use another file
    this.layoutProvider = new LayoutProvider(
      index => {
        // since there is only one type
        return ViewTypes.FULL;
      },
      (type, dim) => {
        // Here is the place that you will be be updaing the
        // dim of the object
        dim.width = width;
        dim.height = 70;
      }
    )

    // this will be used as a reference to the overall list container
    this.listContainer = createRef();

    // the value is also set in reanimated
    this.offY = new Value(0);

    // this add funciton is done in the reanimation
    // this will be the y that you click on
    this.y = add(this.offY, new Value(-this.rowHeight/2));

    // so gestureState --> pretty much similar to that of the gestureState
    // of the panREsponder but now it is seperated
    this.gestureState = new Value(-1);

    // Pretty much when you are dong the event of the reanimiated, you are pretty much
    // maping the value form the native given by the gesture state tot he
    // values you that you map it to
    //In this case we will be storing the absoluteY in offY and
    // state in gestureState
    this.onGestureEvent = event([
      {
        nativeEvent: {
          absoluteY: this.offY,
          state: this.gestureState
        }
      }
    ])



    this.flatListHeight = -1;
    this.flatList  = createRef(),
    this.active = false
    this.currentY = 0;
    this.point = new Animated.ValueXY()
    this.currentIndex = -1;
    this.rowHeight = 0;
    this.flatListTopOffset = 0;
    this.scrollOffset= 0;

    this.lastScrollOffset = -1;
    this.scrolling = false;


    // this helps bind the rowRender to the current object
    this.rowRender = this.rowRender.bind(this);
    // so in addition to row render and layoutprovider, you will
    // need data provider, so you will need to make a data provider object
    // and then add data into it, just to differentiate the rows from each other
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2
    })

    const arr = this.generateArray(20);



    this.state = {
      // So inorder to add stuff into a dataprovider you will
      // need to do cloneWithRows (both for update and add new)
      dataProvider: dataProvider.cloneWithRows(arr) ,

      // point: new Animated.ValueXY(),
      dragging: false,
      draggingIndex: -1,
    }


  }

  generateArray(n){
    return Array.from(Array(n), (_,i) => {
      colorMap[i] = this.getRandomColor()
      return i
    })
  }

  // so you can get passed in the type, data, index, the other two idk
  // This will reder the react copoent for each row
  rowRender(type,data, index, _, nope){

    // Now is when you pick it up, whne you holding it or not
    nope = !!nope;

    return(
      <View
        style = {{
          padding: 16,
         backgroundColor: nope ? "#f2f2f2" : colorMap[data],
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         opacity: !nope && index === this.state.draggingIndex ? 0 : 1
        }}
        >
        {nope ? (
          <View>
            <Text style = {{fontSize: 32}}>@</Text>
          </View>
        ): (
          <PanGestureHandler
            maxPointer = {1}
            onGestureEvent = {this.onGestureEvent}
            onHandlerStateChange = {this.onGestureEvent}
            >
            <Animated.View>

              <Text style = {{fontSize: 32}}>@</Text>
            </Animated.View>

          </PanGestureHandler>
        )}
        <Text style={{ fontSize: 18, textAlign: "center", flex: 1 }}>
          {data}
        </Text>
      </View>
    )
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

  // to get the index of the numbers
  // gotta switch it up a bit because there is no data.length becuase you have
  // dataProvider now
  yToIndex = (y: number) =>  Math.min(
      this.state.dataProvider.getSize() - 1,
      Math.max(
        0,
        Math.floor((y + this.scrollOffset - this.topOffset) / this.rowHeight)
      )
    );

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(){
    // You wont need the renderItem any more because
    // you have the render rows, it should take care of rendering
    // the items

    const {data, dragging, draggingIndex} = this.state;
    console.log('here in the test')

    // You can put code into the tags that will be run to set up
    // the begin, start, end cancel, etc
    // You would do it in animited.code


    return(
      <SafeAreaView style = {styles.container}>

        <Animated.Code>
          { () => cond (
            eq(this.gestureState, State.BEGAN),
            call([this.offY], this.start)
          )}
        </Animated.Code>

        <Animated.Code>
          {() => cod(
            or(
              eq(this.gestureState, State.END),
              eq(this.gestureState, State.CANCELLED),
              eq(this.gestureState, State.FAILED),
              eq(this.gestureState, State.UNDETERMINED)
            ),
            call([], this.reset)
          )}
        </Animated.Code>

        <Animated.Code>
          {() => cond(
            eq(this.gestureState, State.ACTIVE),
          )}
        </Animated.Code>

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

export default TestDrag;
