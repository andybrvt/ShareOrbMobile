import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   TouchableOpacity,
   Animated,
   Platform,
   Dimensions } from 'react-native';
import { connect } from "react-redux";
import * as dateFns from 'date-fns';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import  authAxios from '../util';
import { PanGestureHandler, State } from "react-native-gesture-handler";
// import Animated, {Easing} from 'react-native-reanimated';
import NewSocialMonth from './NewSocialMonth';
import SocialCalendarTap from './SocialCalendarTap';
import * as Animatable from 'react-native-animatable';


let {height, width} = Dimensions.get('window')

// unfinished and still thinking but this will be another way of doing social
// calendar where you will use 3 views and use pangesture and reanimate
// to make the infintie scrolling affect
// https://medium.com/@minhchinhduong97/infinitely-scrolling-calendar-in-react-2ca9f44c2d8f


class SocialCalendarVonly extends React.Component{


  dimension_width = width; // width of the page for each month

  // record the last transitionx
  old_translateX = 0;
  // keep track of the current item
  main_index = 0;
  translateX_array = [new Animated.Value(0), new Animated.Value(this.dimension_width), new Animated.Value(-this.dimension_width)]

  // will used as a number bc animated value is not a number
  record_translateX_array = [0, this.dimension_width, -this.dimension_width]
  opacity_array = [new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]

  state = {
      month_array: [0, 0, 0], // hold month data accordingly to each View component
      year_array: [0, 0, 0], // hold the numbers of year accordingly to each View component
      currentMonth: new Date(),

  }

  componentDidMount(){
    // set up order as 2 0 1
    // index 2 prev, 0 current, 1 is next
    // settting up the months


    let current_month = new Date().getMonth(),
           current_year = new Date().getFullYear(),
           month_array = [], year_array = []

    // if current month is January
    if(current_month === 0){
       month_array = [current_month, current_month + 1, 11]
       year_array = [current_year, current_year, current_year - 1]

    }
    // check if the current month is December or not
   else if (current_month === 11) {
       month_array = [current_month, 0, current_month - 1]
       year_array = [current_year, current_year + 1, current_year]
   }

   // if both cases are not met, proceed as normal
   else {
       month_array = [current_month, current_month + 1, current_month - 1]
       year_array = [current_year, current_year, current_year]
   }

   this.setState({
        month_array: [...month_array],
        year_array: [...year_array]
    })


  }


  handleMonthYearWhenSwipe = (swipe_direction, main_index) => {
    let month_array = [... this.state.month_array],
            year_array = [... this.state.year_array]


    // swipe to the right ==> go back
    if(swipe_direction === 1 ){
      //  2 0 1 --> 1 2 0
      const backMonth = dateFns.subMonths(this.state.currentMonth, 1)
      // let utc2=dateFns.format(backMonth, 'MM yyyy');
      this.setState({
        currentMonth: backMonth
      })
      this.openTime()

      if(month_array[main_index] === 0){

        // What is currently visible
        // if current month is jan --> then previous month will be
        // december and year will decrease by 1
        // if the index is 0 then to the left woudl be 2
        if(main_index === 0){
          month_array[2] = 11;
          year_array[2] = year_array[main_index] -1
        }

        // if main index is 2 or 1
        // remember the indexs move in order
        // if the index is 1 then to the left would be 0
        // if the index is 2 to the left would be 1
        else {
          month_array[(main_index -1) % 3] = 11;
          year_array[(main_index -1)% 3] = year_array[main_index] - 1
        }


      }


      else {
        // when at 0 the order would be 2 0 1 so you just change the 2
        if(main_index === 0){
          month_array[2] = month_array[main_index]-1
          year_array[2] = year_array[main_index]
        }

        else {
          month_array[(main_index - 1) % 3] = month_array[main_index] - 1
                  year_array[(main_index - 1) % 3] = year_array[main_index]
        }

      }

    }


    // this is for swiping left --> go into the future
    else {
      // 2 0 1 --> 0 1 2
      const nextMonth = dateFns.addMonths(this.state.currentMonth, 1)
      this.setState({
        currentMonth: nextMonth
      })
      this.openTime()



      // if the month is december then you switch years
      // since this is adding one so you good
      if(month_array[main_index] === 11){
        month_array[(main_index + 1) % 3] = 0
        year_array[(main_index + 1) % 3] = year_array[main_index] + 1
      }

      else {
        month_array[(main_index + 1) % 3] = month_array[main_index] + 1
        year_array[(main_index + 1) % 3] = year_array[main_index]
      }

    }


    // Now you set the state monht_aray and year_arary to the new

    this.setState({
        month_array: [...month_array],
        year_array: [...year_array]
    })

  }


  _onGestureEvent = Animated.event(
    [{}],
    {
      useNativeDriver: false,
      // fading and scrolling

      // for each method runs a provided function once for each array element
      // similar to a loop
      listener: ({nativeEvent}) => {
        // this is to set the real value

        this.record_translateX_array.forEach((translate, index, arr) => {
          arr[index] += nativeEvent.translationX - this.old_translateX
        })


        // set the Animated Value to actually make components move.
        this.translateX_array.forEach((translate, index, arr) => {
            arr[index].setValue(this.record_translateX_array[index])
        })

        // record the last occurring translation.
        this.old_translateX = nativeEvent.translationX

        this.opacity_array[this.main_index].setValue((this.dimension_width - Math.abs(this.record_translateX_array[this.main_index])) / (this.dimension_width * 1.3))


        if (this.record_translateX_array[this.main_index] >= -120 && this.record_translateX_array[this.main_index] <= 120) {
            this.opacity_array[(this.main_index + 1) % 3].setValue(1)

            if (this.main_index === 0) {
                this.opacity_array[2].setValue(1)
            }
            else {
                this.opacity_array[(this.main_index - 1) % 3].setValue(1)
            }
        }


      }

    },


  )


  // snapping animation here, set between -10 and 10 for safe and no snapping

  handleAnimation = (main_index) => {

    // so the values in record_translateX_array is changed in the guestevent
    // so that will be reflected on handle animations here so that you cna check
    // if it is larger or smaller than a certain range

    if(this.record_translateX_array[main_index] >= -10 && this.record_translateX_array[main_index] <= 10){
      this.opacity_array[main_index].setValue(1)

      this.record_translateX_array[main_index] = 0

      this.record_translateX_array[(main_index + 1) % 3] = this.dimension_width


      // if main_index === 0, then the left most will have index of 2 ((6-1) % 3 = 2)
       if (main_index - 1 < 0) {
           main_index = 6
       }

     this.record_translateX_array[(main_index - 1) % 3] = - this.dimension_width

     let animation_array = this.translateX_array.map((translate, index) =>
          Animated.spring(this.translateX_array[index], {
              toValue: this.record_translateX_array[index],
              useNativeDriver: false // Add This line

          })
      )

      // the reason this works is because you already set the values in
      // record_translateX_array to its destinated value so you just snap back

      Animated.parallel(
           animation_array,
           {
               stopTogether: true,
               useNativeDriver: false // Add This line

           }
       ).start()

    }


    // snap to the left
    else if(this.record_translateX_array[main_index] < -10){
      this.record_translateX_array[main_index] = - this.dimension_width

      this.record_translateX_array[(main_index + 1) % 3] = 0

      if (main_index - 1 < 0) {
           main_index = 6
       }

       // the left most component will be the right most component.
       this.record_translateX_array[(main_index - 1) % 3] = this.dimension_width

       // You dont need an animation for this one bc nobody is gonna see it
       // you just get the right and the middle
       this.translateX_array[(main_index - 1) % 3].setValue(this.dimension_width)

       let animation_array = this.translateX_array.map((translate, index) => {
           if (index !== (main_index - 1) % 3)
               return (
                   Animated.spring(this.translateX_array[index], {
                       toValue: this.record_translateX_array[index],
                       useNativeDriver: false // Add This line

                   })
               )
       })

       Animated.parallel(
           animation_array,
           {
               stopTogether: true,
               useNativeDriver: false // Add This line

           }
       ).start()


       // don't forget to handle the month & year data
     this.handleMonthYearWhenSwipe(-1, this.main_index)

     // because we swipe to the left, main_index will be the index of the right most component since it will be the present.
     this.main_index = (main_index + 1) % 3

    }

    else if(this.record_translateX_array[main_index] > 10){


      this.record_translateX_array[main_index] = this.dimension_width

      this.record_translateX_array[(main_index + 1) % 3] = - this.dimension_width

      // since this is on the right, you don't really need animation for it
      this.translateX_array[(main_index + 1) % 3].setValue(-this.dimension_width)

      if (main_index - 1 < 0) {
               main_index = 6
           }
     this.record_translateX_array[(main_index - 1) % 3] = 0

     let animation_array = this.translateX_array.map((translate, index) => {
         if (index !== (main_index + 1) % 3)
             return (
                 Animated.spring(this.translateX_array[index], {
                     toValue: this.record_translateX_array[index],
                     useNativeDriver: false // Add This line

                 })
             )
     })

     Animated.parallel(
         animation_array,
         {
             stopTogether: true,
             useNativeDriver: false // Add This line

         }
     ).start()

     this.handleMonthYearWhenSwipe(1, this.main_index)

     this.main_index = (main_index - 1) % 3

    }

  }


  _onHandlerStateChange = ({ nativeEvent }) => {


       if (nativeEvent.state === State.END) {
           // make sure to reset the tracking translateX value to get exact translation differentiate in the next scrolling/panning/swipping.
           this.old_translateX = 0

           this.handleAnimation(this.main_index)
       }
   }

  constructor(props){
    super(props)

  }

  openTime(){

      this.setState({
        condition: true,
      }, () => setTimeout(() => this.closeTime(), 300))

  }

  closeTime(){
      this.setState({
        condition: false,
      })
  }

  render(){

    // So you are gonna handle the pangesture for each of the squares and it will
    // just loop through each one
    let test=dateFns.format(this.state.currentMonth, "MMMM yyyy")

    return(
      <View
        style = {{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",

          position: "relative",
        }}
        >
        {this.state.condition?
          <View style={{zIndex:99}}>
            <Animatable.Text animation={"fadeOut"} style = {styles.monthTitle}>{test}</Animatable.Text>


          </View>

        :
        <Text></Text>

      }

        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
          >

          <Animated.View
              style={{
                  // backgroundColor: "orange",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  position: 'absolute',
                  transform: [{ translateX: this.translateX_array[0] }],
                  opacity: this.opacity_array[0],
              }}

            >
            {
              Platform.OS === "ios" ?

              <NewSocialMonth
                openShowCamera = {this.props.openShowCamera}
                month = {this.state.month_array[0]}
                year = {this.state.year_array[0]}
                navigation = {this.props.navigation}
                userId = {this.props.userId}
                currentId = {this.props.currentId}
                navigation = {this.props.navigation}
                 />

               :

               <SocialCalendarTap
                 openShowCamera = {this.props.openShowCamera}
                 month = {this.state.month_array[0]}
                 year = {this.state.year_array[0]}
                 navigation = {this.props.navigation}
                 userId = {this.props.userId}
                 currentId = {this.props.currentId}
                 navigation = {this.props.navigation}
                 />


            }

          </Animated.View>
        </PanGestureHandler>

        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
          >
          <Animated.View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ translateX: this.translateX_array[1] }],
                position: "absolute",
                // backgroundColor: "pink",
                opacity: this.opacity_array[1],
            }}
            >

            {
              Platform.OS === "ios" ?

              <NewSocialMonth
                openShowCamera = {this.props.openShowCamera}
                month = {this.state.month_array[1]}
                year = {this.state.year_array[1]}
                navigation = {this.props.navigation}
                userId = {this.props.userId}
                currentId = {this.props.currentId}
                navigation = {this.props.navigation}
                 />

               :

               <SocialCalendarTap
                 openShowCamera = {this.props.openShowCamera}
                 month = {this.state.month_array[1]}
                 year = {this.state.year_array[1]}
                 navigation = {this.props.navigation}
                 userId = {this.props.userId}
                 currentId = {this.props.currentId}
                 navigation = {this.props.navigation}
                 />


            }
          </Animated.View>

        </PanGestureHandler>

        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
          >
          <Animated.View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ translateX: this.translateX_array[2] }],
                position: "absolute",
                // backgroundColor: "gainsboro",
                opacity: this.opacity_array[2],
            }}
            >
            {
              Platform.OS === "ios" ?

              <NewSocialMonth
                openShowCamera = {this.props.openShowCamera}
                month = {this.state.month_array[2]}
                year = {this.state.year_array[2]}
                navigation = {this.props.navigation}
                userId = {this.props.userId}
                currentId = {this.props.currentId}
                navigation = {this.props.navigation}
                 />

               :

               <SocialCalendarTap
                 openShowCamera = {this.props.openShowCamera}
                 month = {this.state.month_array[2]}
                 year = {this.state.year_array[2]}
                 navigation = {this.props.navigation}
                 userId = {this.props.userId}
                 currentId = {this.props.currentId}
                 navigation = {this.props.navigation}
                  />


            }
          </Animated.View>

        </PanGestureHandler>

      </View>


    )

  }
}

 const styles = StyleSheet.create({
   monthTitle: {
     fontSize:25,
     color:'#1890ff',
     fontFamily:'Nunito-SemiBold',
     fontWeight:'bold',
   },

 });


export default SocialCalendarVonly;
