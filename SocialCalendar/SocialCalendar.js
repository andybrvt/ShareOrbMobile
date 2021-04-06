import React from 'react';
import { Text, View, Button,StyleSheet, ScrollView } from 'react-native';
import { connect } from "react-redux";
import * as dateFns from 'date-fns';


class SocialCalendar extends React.Component{

  state = {

    currentDate: new Date(),
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

  renderCell(curMonth){
    // this function will render the month and then you will
    // just combine the months when you make them

    // Now you will get get the start of the month and the end of the
    // month and then start rendering through each of the months
    const startMonth = dateFns.startOfMonth(curMonth)
    const endMonth = dateFns.endOfMonth(curMonth)

    // Now get the start date and end date of the month
    const startDate = dateFns.startOfWeek(startMonth)
    const endDate = dateFns.endOfWeek(endMonth)


    // Now you will start going through your dates and make it into a
    // calendar

    const dateFormat = "d";
    const rows = []

  }

  renderAllCells(events){
    // So the way the months is gonna work is that it will be a
    // bi directional list where the first date will be the date
    // that you joined in from ... so that will be the limit when you
    // scroll all the way up. And whne you scroll down
    // it will go on forever. So the way it will start is that
    // it will be the current date before and after and when you scroll up
    // and down it will render the date accordingly


    // So you want to grab the current month first
    const currentMonth = this.state.currentDate;

    const curMonthStart = dateFns.startOfMonth(currentMonth);
    const curMonthEnd = dateFns.endOfMonth(curMonthStart)
    // Now youw ould wnat to grab the start and previous
    // months of the current so that you can render them

    const prevMonth = dateFns.subMonths(curMonthStart)
    const startPrevMonth = dateFns.startOfMonth(prevMonth)
    const endPrevMonth = dateFns.endOfMonth(prevMonth)


    const nextMonth = dateFns.addMonths(curMonthStart)
    const startNextMonth = dateFns.startOfMonth(nextMonth)
    const endNextMonth = dateFns.endOfMonth(nextMonth)

    // So you can make a function that handles making the cells
    // here and just pass in the current month


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
    currentDate: state.socialCal.socialDate,
    date_joined: state.auth.date_joined
  }
}

export default connect(mapStateToProps)(SocialCalendar);
