import React from 'react';
import { Text, View, Button,StyleSheet, ScrollView, Dimensions } from 'react-native';
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

    let toDoStuff = []
    let days = []
    // so you watn to start the day off on the start date
    // which will be the start of the month
    let day = startDate;
    let formattedDate = ""

    // Now you will start loop through the days and start making the months

    while(day <= endDate){
      //Now you will loop throug each day of the week end then
      // add them to days and then add the days to the rows
      for(let i = 0; i< 7; i++){


        // you want a cloneDay for each loop so that you can
        // actually get the date or else it will be the final date
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;

        if(toDoStuff.length > 0){
          //  do some stuff here wher you fill in the cover pic

        } else {
          // This is if there are no pictures at that current
          // day
          days.push(
            <View
              key = {i}
              style = {styles.monthCell}>
              {
                dateFns.isSameMonth(day, curMonth) ?

                <Text> {formattedDate}</Text>

                :

                <Text></Text>
              }
            </View>
          )

        }
        // Once the day has ended you would clear out the
        // events that land on this date
        toDoStuff = []
        day = dateFns.addDays(day, 1);
      }

      // Now this is where the week has finished because it went
      // through 7 days, now you have a week saved in a list
      // now you put them in rows now
      rows.push(
        <View
          key = {day}
           style = {styles.monthRow}>
            {days}
        </View>
      )
      // Now clear out the days to start the next week
      days = []

    }


    return (

          <Text style = {styles.monthContainer}> {rows}</Text>

    )
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
    // // Now youw ould wnat to grab the start and previous
    // months of the current so that you can render them

    const repCur = dateFns.format(currentMonth, "MMMM")
    const repPrev = dateFns.format(
      dateFns.subMonths(currentMonth, 1), "MMMM")
    const repNext = dateFns.format(
      dateFns.addMonths(currentMonth, 1), "MMMM")


    const prevMonth = dateFns.subMonths(curMonthStart,1)
    // const startPrevMonth = dateFns.startOfMonth(prevMonth)
    // const endPrevMonth = dateFns.endOfMonth(prevMonth)


    const nextMonth = dateFns.addMonths(curMonthStart, 1)
    // const startNextMonth = dateFns.startOfMonth(nextMonth)
    // const endNextMonth = dateFns.endOfMonth(nextMonth)

    // So you can make a function that handles making the cells
    // here and just pass in the current month

    // now that I have the create cell funciton created
    // you now want to put then together here

    return (
      <ScrollView>
        <View>
          <Text> {repPrev}</Text>
          {this.renderCell(prevMonth)}
        </View>


        <View>
          <Text>{repCur}</Text>
          {this.renderCell(currentMonth)}
        </View>


        <View>
          <Text>{repNext}</Text>
          {this.renderCell(nextMonth)}
        </View>

      </ScrollView>
    )


  }

  render(){

    return (
      <View>
        <View>{this.renderDays()}</View>


        {this.renderAllCells()}

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

const styles = StyleSheet.create({
  allCellContainer: {

  },
  // This will be holding the rows
  monthContainer: {
    flexDirection: "column",
    flex: 1,
    borderBottomWidth: 0.2
  },
  // This is for the cell
  // So you want the cells to be square so that you
  // divde the full with by 7 to get the wdith of each cell
  // and then make it the height
  monthCell: {
    flex: 1,
    height: Math.round(Dimensions.get('window').width/7),
    alignItems: "center",
    justifyContent: "center",
    // borderLeftWidth:0.2,
    // borderTopWidth: 0.2,

  },
  monthRow: {
    width: Math.round(Dimensions.get('window').width),
    // height: 100,
    flexDirection: "row"
  }
})

export default connect(mapStateToProps)(SocialCalendar);
