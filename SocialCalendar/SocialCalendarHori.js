import React from 'react';
import {
  FlatList,
  Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   LayoutAnimation,
   Platform,
   UIManager,
   Dimensions } from 'react-native';
import { connect } from "react-redux";
import * as dateFns from 'date-fns';
import  authAxios from '../util';
import SocialMonth from './SocialMonth';
import Indicator from './Indicator';
import ChildItem from './ChildItem';

let {height, width} = Dimensions.get('window')


// LayoutAnimation pretty much puts the animation when changing the views
// or l ayout position
// For this to work on android you h ave to use setLayoutAnimationEnabledExperimental

class SocialCalendarHori extends React.Component{

  slider = React.createRef();


  // if the props are not passed in this will be the
  // default so that it doesnt become undefined
  static defaultProps = {
    data: [];
    imageKey: 'image',
    local: false,
    width: Math.round(Dimensions.get('window').width),
    height: 230,
    separatorWidth: 0;
    loop: true,
    indicator: true,
    indicatorStyle: {},
    indicatorContainerStyle: {},
    indicatorActiveColor: '#3498db',
    indicatorInActiveColor: '#bdc3c7',
    indicatorActiveWidth: 6,
    nimation: true,
    autoscroll: true,
    timer: 3000,
    onPress: {},
    contentContainerStyle: {},
    component: <ChildItem/>,
  }

  constructor(props){
    super(props)


    this.state= {
      currentDate: new Date(),
      index: 0,
      data: this.props.data,
    }
  }

  componentDidMount(){
    if(this.props.autoscroll){
      this.startAutoPlay();
    }
  }

  componentWillUnmount(){
    if(this.props.autoscroll){
      this.stopAutoPlay();
    }
  }


  // checks if you want animation and then
  // configue the next
  // index increases by 1 and then the slider will scroll to that
  // index 
  changeSliderListIndex = () => {
    if (this.props.animation) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
    }
    this.setState({index: this.state.index + 1});
    this.slider.current.scrollToIndex({
      index: this.state.index,
      animated: true,
    });
  };

  // the function setInterval inside react allows us to
  // exceute a funciton or code at specific intervals in side
  // a component
  startAutoPlay = () =>{

    // in this case you will be running changesliderlistindex
    // every time for the props timer
    this.sliderTimer = setInterval(
      this.changeSliderListIndex,
      this.props.timer
    )
  }

  // This fucntion pretty much clears out the timer
  // and then set the timer to be null
  stopAutoPlay = () => {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
    }
  };

  renderDays(){
    // This will just be used to render the days of the social
    // calendar. Example s m t w t f s
    const dateFormat = "iii"
    const days = []
    let startDate = dateFns.startOfWeek(this.props.currentDate);


    // This function will loop through form 0-6 and then
    // add the day of the week in
    for(let i = 0; i< 7; i++){
      days.push(
        <View
          style = {styles.weekDay}
          key = {i}>
          <Text key = {i}>{dateFns.format(dateFns.addDays(startDate, i), dateFormat)}</Text>
        </View>
      )
    }



    return (
        <Text
          style = {styles.dayHeaders}
          > {days}</Text>
    )
  }


  // used to detect the current visible index
  onViewableItemsChanged = ({viewableItems, changed}) => {

    if(viewableItems.length > 0){
      let currentIndex = viewableItems[0].index
      if(
        currentIndex % this.props.data.length === this.props.data.length - 1 &&
        this.props.loop
      ){
        this.setState({
          index: currentIndex,
          data: [...this.state.data, ...this.props.data],
        });
      } else {
        this.setState({index: currentIndex})
      }

      if(this.props.currentIndexCallback){
        this.props.currentIndexCallback(currentIndex);
      }

    }
  };

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  }





  render(){

    return(
      <View>
        <Text> some stuff </Text>
      </View>
    )
  }
}

export default SocialCalendarHori;
