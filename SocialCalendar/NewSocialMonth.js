import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
    } from 'react-native';
import * as dateFns from 'date-fns';
import DayAlbum from './DayAlbum';
import  authAxios from '../util';


const width = Dimensions.get("window").width

class NewSocialMonth extends React.PureComponent{

  state = {
    month_array : [],
    socialCells: []
  }



  componentDidMount(){
    // For component did mount you will get the items of that month
    const curMonth = new Date(this.props.year, this.props.month, 1);


    const start = dateFns.startOfMonth(curMonth)
    const end = dateFns.endOfMonth(curMonth)

    const startDate = dateFns.startOfWeek(start)
    const endDate = dateFns.endOfWeek(end)

    const formatStart = dateFns.format(startDate, 'yyyy-MM-dd')
    const formatEnd = dateFns.format(endDate, 'yyyy-MM-dd')

    this.getSocialCells(formatStart, formatEnd)
    .then(data => {
      this.setState({
        socialCells: data
      })
    })
  }


  componentDidUpdate(prevProps){
    // when it updates and is on a new months you will get the items of the new
    // month

    if(this.props.month !== prevProps.month){
      const curMonth = new Date(this.props.year, this.props.month, 1);

      const start = dateFns.startOfMonth(curMonth)
      const end = dateFns.endOfMonth(curMonth)

      const startDate = dateFns.startOfWeek(start)
      const endDate = dateFns.endOfWeek(end)

      const formatStart = dateFns.format(startDate, 'yyyy-MM-dd')
      const formatEnd = dateFns.format(endDate, 'yyyy-MM-dd')

      this.getSocialCells(formatStart, formatEnd)
      .then(data => {
        this.setState({
          socialCells: data
        })

      })

    }

  }


  getSocialCells(start, end){
    return authAxios.get(`${global.IP_CHANGE}/mySocialCal/filterCells/`+ start+`/`+end)
    .then(res => {
        return res.data
    })
  }

  initializedMonth = (month, year) => {


    const curMonth = new Date(year, month, 1);


    const start = dateFns.startOfMonth(curMonth)
    const end = dateFns.endOfMonth(curMonth)

    const startDate = dateFns.startOfWeek(start)
    const endDate = dateFns.endOfWeek(end)

    const diffWeeks = dateFns.differenceInCalendarWeeks(endDate, startDate)
    console.log(diffWeeks)

    const dateFormat = "d";

    const rows = [];

    let toDoStuff = [];
    let days = [];
    let day = startDate;
    let formattedDate = ""

    if(diffWeeks === 4){
      // only 5 weeks then you will add another week
      while(day <= dateFns.addWeeks(endDate, 1)){


        for(let i = 0; i< 7; i++){
          formattedDate = dateFns.format(day, dateFormat);
          const cloneDay = day;

          if(toDoStuff.length > 0){

            let test1=toDoStuff
            days.push(
              <View
                key = {i}
                style = {[styles.monthPicCell, dateFns.isSameDay(day, new Date()) ?
                  styles.selected : null
                ]}>
                {
                  dateFns.isSameMonth(day, curMonth) ?

                  <View style = {styles.imageHolder}>
                    {
                      toDoStuff[0].coverPic ?
                        <View>
                          <TouchableOpacity  onPress={() => this.ViewDay(test1)}>
                            <Image
                              style = {styles.smallImage}
                              resizeMode = "cover"
                              source={{ uri: `${global.IMAGE_ENDPOINT}${toDoStuff[0].coverPic}` }}
                              />
                          </TouchableOpacity>
                        </View>
                      :

                        <Text> {formattedDate}</Text>

                      }
                  </View>


                  :

                  <Text></Text>
                }
              </View>
            )

          } else {
            days.push(
              <View
                key = {i}
                style = {[styles.monthCell, dateFns.isSameDay(day, new Date())
                  && dateFns.isSameMonth(day, curMonth) ?
                  styles.selected : null
                ]}>
                {
                  dateFns.isSameMonth(day, curMonth) ?

                  <Text style = {{
                      color: 'black',
                      fontWeight: 'bold'
                    }}> {formattedDate}</Text>

                  :

                  <Text style = {{
                      color: "#8c8c8c"
                    }}>{formattedDate}</Text>
                }
              </View>
            )
          }

          toDoStuff = []
          day = dateFns.addDays(day, 1);

        }


        rows.push(
          <View
            key = {day}
             style = {styles.monthRow}>
              {days}
          </View>
        )

        days = []

      }


    } else if(diffWeeks === 5){
      while(day <= endDate){


        for(let i = 0; i< 7; i++){
          formattedDate = dateFns.format(day, dateFormat);
          const cloneDay = day;

          if(toDoStuff.length > 0){

            let test1=toDoStuff
            days.push(
              <View
                key = {i}
                style = {[styles.monthPicCell, dateFns.isSameDay(day, new Date()) ?
                  styles.selected : null
                ]}>
                {
                  dateFns.isSameMonth(day, curMonth) ?

                  <View style = {styles.imageHolder}>
                    {
                      toDoStuff[0].coverPic ?
                        <View>
                          <TouchableOpacity  onPress={() => this.ViewDay(test1)}>
                            <Image
                              style = {styles.smallImage}
                              resizeMode = "cover"
                              source={{ uri: `${global.IMAGE_ENDPOINT}${toDoStuff[0].coverPic}` }}
                              />
                          </TouchableOpacity>
                        </View>
                      :

                        <Text> {formattedDate}</Text>

                      }
                  </View>


                  :

                  <Text></Text>
                }
              </View>
            )

          } else {
            days.push(
              <View
                key = {i}
                style = {[styles.monthCell, dateFns.isSameDay(day, new Date())
                  && dateFns.isSameMonth(day, curMonth) ?
                  styles.selected : null
                ]}>
                {
                  dateFns.isSameMonth(day, curMonth) ?

                  <Text style = {{
                      color: 'black',
                      fontWeight: 'bold'
                    }}> {formattedDate}</Text>

                  :

                  <Text style = {{
                      color: "#8c8c8c"
                    }}>{formattedDate}</Text>
                }
              </View>
            )
          }

          toDoStuff = []
          day = dateFns.addDays(day, 1);

        }


        rows.push(
          <View
            key = {day}
             style = {styles.monthRow}>
              {days}
          </View>
        )

        days = []

      }

    }


    return (
      <Text style = {styles.monthContainer}> {rows}</Text>

    )


  }

  render(){
    const month = new Date(this.props.year, this.props.month, 1);

    const formatMonth = dateFns.format(month, 'MMMM yyyy')
    return(

      <View style = {styles.centerMonth}>

          <Text style = {styles.monthTitle}>
            {formatMonth}
          </Text>
          {this.initializedMonth(this.props.month, this.props.year)}




      </View>

    )
  }
}

export default NewSocialMonth;


const styles = StyleSheet.create({
  centerMonth: {
    alignItems: 'center',
    width: width,
  },
  monthTitle: {
    paddingTop:10,
    fontSize:15,
  },
  monthContainer: {
    flexDirection: "column",
    flex: 1,
    borderBottomWidth: 0.2,
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
  monthPicCell: {
    flex: 1,
    height: Math.round(Dimensions.get('window').width/7),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'red',
    // borderLeftWidth:0.2,
    // borderTopWidth: 0.2,
  },
  monthRow: {
    width: Math.round(Dimensions.get('window').width),
    // height: 100,
    flexDirection: "row"
  },
  selected: {
    borderWidth: 1,
    // backgroundColor: 'blue'
  },
  noImageCell: {
    width: Math.round(Dimensions.get('window').width/8),
    height: Math.round(Dimensions.get('window').width/8),
    backgroundColor:'red',
    borderRadius:10,
  },
  smallImage: {
    width: Math.round(Dimensions.get('window').width/8),
    height: Math.round(Dimensions.get('window').width/8),
    borderRadius: 10,
  },
  imageHolder: {

  }


})
