import React from 'react';
import { Text, View, Button,StyleSheet, ScrollView } from 'react-native';
import { connect } from "react-redux";
import * as dateFns from 'date-fns';


class SocialCalendar extends React.Component{

  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    showSocialEventPostModal: false,
    showSocialPicPostModal: false,
    events: [],
    animate:true,
    fade:false,
  }

  renderDays(){
    // This will just be used to render the days of the social
    // calendar. Example s m t w t f s
    const dateFormat = "iiiii"
    const days = []
    let startDate = dateFns.startOfWeek(this.props.currentDate);


    // This function will loop through form 0-6 and then
    // add the day of the week in
    for(let i = 0; i< 7; i++){
      days.push(
        <View  key = {i}>
          <Text>{dateFns.format(dateFns.addDays(startDate, i), dateFormat)}</Text>
        </View>
      )
    }



    return (
        <Text> {days}</Text>
    )




  }

  render(){

    return (
      <View>
        <View>{this.renderDays()}</View>
      </View>

    )
  }
}

const mapStateToProps = state => {
  return {
    currentDate: state.socialCal.socialDate
  }
}

export default connect(mapStateToProps)(SocialCalendar);
