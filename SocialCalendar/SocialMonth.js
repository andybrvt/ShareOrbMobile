import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   Dimensions
    } from 'react-native';
import * as dateFns from 'date-fns';

// this class will be use to render the month of the flat list
// the reason fro this is becasue each month needs to be a pure
// component or else it will keep re rendering every time we
// updat the states and this can get inefficent


// you need to to be the react pure componet when you are using flat list
// is because when ever you update the month it will cause all of the flat
// list to rerender and because of that you would need to make
// you items PureComponent so that it wont rerender every time
class SocialMonth extends React.PureComponent{

  renderCell(curMonth){

    // now this is where you will start trying to get the month
    // along with the social cal events

    // since this will not be real time, in the sense that it will just be
    // rendering the picture then we cna just use authaxios use a get fucntion
    // Gotta grab the month and month range and then do axios call to grab the
    // user information

    const start = dateFns.startOfMonth(curMonth)
    const end = dateFns.endOfMonth(curMonth)

    const formatStart = dateFns.format(start, "yyyy-MM-dd")
    const formatEnd = dateFns.format(end, 'yyyy-MM-dd')

    let events = []




      // Move everything in here, pretty much now when it comes to rendering the
      // months it will be a promise

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

          // Now we will try to render in the soical cal cell according to the right
          // date


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

  render(){
    console.log('itmes in social month')
    console.log(this.props.item)
    return (
      <View style = {styles.monthTitle}>
        <Text> {this.props.item.rep}</Text>
        {this.renderCell(this.props.item.month)}
      </View>
    )
  }
}

export default SocialMonth;


const styles = StyleSheet.create({
  monthTitle: {
    alignItems: 'center'
  },
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
  },
})
