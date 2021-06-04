import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   Dimensions } from 'react-native';
import { connect } from "react-redux";
import * as dateFns from 'date-fns';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import  authAxios from '../util';
import SocialMonth from './SocialMonth';

let {height, width} = Dimensions.get('window')


class SocialCalendar extends React.Component{


  // When adding values in the monthList it will be in the format of
  //  { rep: <stuff here>, month: <stuff here>}
  constructor(props){
    super(props)

    this.state = {

      currentDate: new Date(),
      curTop: new Date(),
      // curBottom will be for when you hit near the bottom
      curBottom: new Date(),
      showSocialEventPostModal: false,
      showSocialPicPostModal: false,
      events: [],
      animate:true,
      fade:false,
      monthList: [],
      pageOffsetY: 0,
      curMonthCells: []
    }

  }

  componentDidMount(){
    // This fucntion will be use to update scroll list
    // for the intial render
    this.renderAllCells()

  }

  renderItem = ({item}) => {
    // this can be use to render your specific months, so what
    // we cna do is put the dates inside the list and then
    // render the months in this list


    // return(
    //   <View style = {styles.monthTitle}>
    //     <Text> {item.rep}</Text>
    //     {this.renderCell(item.month)}
    //   </View>
    // )


    return (
      <SocialMonth
        navigation={this.props.navigation}
        item = {item}/>
    )
  }

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

  // This function will be used for writing a promise to send the next month in order
  // to load in more months
  // How many more months will there be here
  loadPrevMonths = (numMonths) => {
    // wiritng a promise
    // so pretty much a promise consist of 2 parts, one for resolving and reject,
    // resolve is for when the thing goes well and you can return the infomration
    // where as reject is when there is an error
    return new Promise((resolve) => {
      // now you would write a function here an then wrap whatever you want to return
      // inside a resolve

      // this will be the months
      const moreMonths = [];

      // add 3 more monhts at a time ( you will be changing the n to change number of
    // months you want to add )

      const curDate = this.state.curTop
      let startCur = dateFns.startOfMonth(curDate)
      for(let i = 0; i< numMonths; i++){
        // pretty much it will be like on top but you will be adding more months
        // in

        // so we have a current month, a top month and a bottom month, the
        // top month will be in charge of handling the month at the top edge
        // end month will be in charge of handling the month at the bottom edge

        // now you will get the prev month and represent it too
        // as text

        startCur = dateFns.subMonths(startCur, 1);


        // now you want to run the api in order to get the cells for the month
        const curMonthStart = dateFns.startOfMonth(startCur)
        const curMonthEnd = dateFns.endOfMonth(curMonthStart)
        // Now format it for the backend

        const formatStart = dateFns.format(curMonthStart, "yyyy-MM-dd")
        const formatEnd = dateFns.format(curMonthEnd, 'yyyy-MM-dd')

        this.getSocialCells(formatStart, formatEnd)
        .then( data => {
          // Now you can do a set state here since this one will
          // lag behind a bit
          const repCur = dateFns.format(startCur, "MMMM yyyy")
          // Now you want to make a new object for the month, find the month
          // that fits this one using the rep, and then replace it
          const updateMonth = {
            rep: repCur,
            month: curMonthStart,
            cells: data
          }

          // Now that you have the month object you want to pass in
          // now when you set state make sure you replace it


          const list = this.state.monthList.map(month =>
            month.rep === repCur ? updateMonth : month
          )
          this.setState({
            monthList: list
          })


        })
        // sinc eyou can pull the date in here you can try to grab the date here and then push
        // it out

        const repPrev = dateFns.format(startCur, "MMMM yyyy");

        const month = {
          rep: repPrev,
          month: startCur
        }

        moreMonths.push(month)

      }
      // now set the state for the top edge
      this.setState({
        curTop: startCur
      })

      // so you want to use this as a way to grab the months when you try to
      // load more on top that is why you want to return it
      // Now wrap the more months around resolve
      resolve(moreMonths)

    })
  }

  loadFutureMonths = (numMonths) => {
    //This fucntion will load the future months comming up in the calendar
    // this will also be a promise as well similar to that of the loadPrevMonths

    return new Promise((resolve) => {
      // so you want to get the future months using the curBottom


      const moreMonths = []
      const curDate = this.state.curBottom
      let startCur = dateFns.startOfMonth(curDate)

      // now add more months accordingly
      for(let i = 0; i< numMonths; i++){

        // similar to loadPrevMonths but now you are going forward into the
        // months
        // Sicne it is for the future months you do not need to have the api
        // call for the month because you cannot post on future dates

        startCur = dateFns.addMonths(startCur, 1);
        const repPrev = dateFns.format(startCur, "MMMM yyyy");


        const month = {
          rep: repPrev,
          month: startCur
        }

        moreMonths.push(month)
      }


      this.setState({
        curBottom: startCur
      })


      // now resolve the list of future months
      resolve(moreMonths)

    })
  }

  onTopHit = async() => {
    // we will turn this into an await async because now inorder to load more of
    // the data you have to wait for a promise
    const moreMonths = await this.loadPrevMonths(1)
    const curMonths = this.state.monthList
    this.setState({
      monthList: moreMonths.concat(curMonths)
    })

  }

  onBottomHit = async() => {
    // pretty much similar to that of the onTopHit
    const moreMonths = await this.loadFutureMonths(1)
    const curMonths = this.state.monthList
    this.setState({
      monthList: curMonths.concat(moreMonths)
    })

  }


  getSocialCells(start, end){
    return authAxios.get(`${global.IP_CHANGE}/mySocialCal/filterCells/`+ start+`/`+end)
    .then(res => {
        return res.data
    })
  }

  renderAllCells(){

    // So the way the months is gonna work is that it will be a
    // bi directional list where the first date will be the date
    // that you joined in from ... so that will be the limit when you
    // scroll all the way up. And whne you scroll down
    // it will go on forever. So the way it will start is that
    // it will be the current date before and after and when you scroll up
    // and down it will render the date accordingly

    // So you want to grab the current month first
    let currentMonth = this.state.currentDate;
    const curMonthStart = dateFns.startOfMonth(currentMonth);
    const curMonthEnd = dateFns.endOfMonth(curMonthStart)
    // // Now youw ould wnat to grab the start and previous
    // months of the current so that you can render them

    const formatStart = dateFns.format(curMonthStart, "yyyy-MM-dd")
    const formatEnd = dateFns.format(curMonthEnd, 'yyyy-MM-dd')

    // since this portion here only has a set state and dont need a return
    // we cna try to pull it by months here

    this.getSocialCells(formatStart, formatEnd)
    .then( data => {
      const repCur = dateFns.format(currentMonth, "MMMM yyyy")

      let initialList = [

        {
            rep: repCur,
            month: currentMonth,
            cells: data
        }

      ]

      this.setState({
        monthList: initialList
      })
    })


    // So in order to get the value initally you would wnat to
    // first put in an empty one and then once the info loads
    // in you will update it with the new stuff
    const repCur = dateFns.format(currentMonth, "MMMM yyyy")

    let initialList = [

      {
          rep: repCur,
          month: currentMonth,
      }

    ]

    this.setState({
      monthList: initialList
    })



  }

  componentDidUpdate(oldProps){
  }

  render(){

    // Notes; onMomentumScrollEnd is when you scroll really fast
    // or hard to the end of the list

    const listData = this.state.monthList

    let socialCalCell = []
    if(this.props.profile){
      if(this.props.profile.get_socialCal){
        socialCalCell = this.props.profile.get_socialCal
      }
    }

    return (
      <View style = {styles.allCellContainer}>
        <View style = {styles.dayContainer}>{this.renderDays()}</View>

        <View style = {styles.monthsContainer}>
          <FlatList
            data = {listData}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.rep}
            onStartReached = {this.onTopHit}
            onEndReached = {this.onBottomHit}
            onStartReachedThreshold={10}
            onEndReachedThreshold={10}
            />

        </View>


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
    flex: 1,
  },
  monthsContainer: {
    flex: 10,
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
  },

  dayContainer:{
    flex: 1,

    width: Math.round(Dimensions.get('window').width)
  },

  dayHeaders: {
    flexDirection: "row",
    width: '102%',

    // backgroundColor: 'red'
  },

  // this will be in charge of the day squares
  weekDay: {
    width: Math.round(Dimensions.get('window').width/7),
    // backgroundColor: 'red',
    alignItems: "center",
  },

  monthTitle: {
    alignItems: 'center'
  }


})

export default connect(mapStateToProps)(SocialCalendar);
