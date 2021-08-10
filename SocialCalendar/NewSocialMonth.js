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
import * as Animatable from 'react-native-animatable';

const width = Dimensions.get("window").width

class NewSocialMonth extends React.PureComponent{

  state = {
    month_array : [],
    socialCells: [],
  }


  initialProps = {
    userId: 0
  }

// the way the mount works vs when it updates is when you first
// open up the page the month and year is 0, its not until the values
// start hitting up you will get the number in the componentdidupdate
// and every time you scroll to a differnet page is also updates the
// componentdidupdate



  viewDay = (cellId) => {

      this.props.navigation.navigate("DayAlbum", {
        cellId: cellId
      })
  }


  componentDidMount(){
    const dateRange = this.grabDateRange()

    if(this.props.userId !== 'undefined' && this.props.userId !== ""){
      this.getSocialCells(dateRange.start, dateRange.end)
      .then(data => {
        this.setState({
          socialCells: data
        })

      })
    }



    const onRefresh = this.props.navigation.addListener("focus", () =>{
      console.log('on refresh here')

      console.log(this.grabDateRange())
      // this.getSocialCells(dateRange.start, dateRange.end)
      // .then(data => {
      //   console.log(data.length)
      //   this.setState({
      //     socialCells: data
      //   })
      //
      // })
    })


  }


  componentDidUpdate(prevProps){
    // when it updates and is on a new months you will get the items of the new
    // month

    if(this.props !== prevProps){
      if(this.props.month !== prevProps.month){
        if(this.props.userId !== ""){
          const dateRange = this.grabDateRange()
          this.getSocialCells(dateRange.start, dateRange.end)
          .then(data => {
            this.setState({
              socialCells: data
            })
          })
        }
      } else if(this.props.userId !== "") {

        const dateRange = this.grabDateRange()
        this.getSocialCells(dateRange.start, dateRange.end)
        .then(data => {
          this.setState({
            socialCells: data
          })
        })
      }
    }





  }

  grabDateRange(){
    // this function is used to get the end range of the month
    const curMonth = new Date(this.props.year, this.props.month, 1);
    const start = dateFns.startOfMonth(curMonth)
    const end = dateFns.endOfMonth(curMonth)
    const startDate = dateFns.startOfWeek(start)
    const endDate = dateFns.endOfWeek(end)
    const diffWeeks = dateFns.differenceInCalendarWeeks(endDate, startDate)
    if(diffWeeks === 4 ){
      // increase the range by a week
      const newEndDate = dateFns.addWeeks(endDate, 1);
      const formatStart = dateFns.format(startDate, 'yyyy-MM-dd')
      const formatEnd = dateFns.format(newEndDate, 'yyyy-MM-dd')
      return {start: formatStart, end: formatEnd}
    } else {
      const formatStart = dateFns.format(startDate, 'yyyy-MM-dd')
      const formatEnd = dateFns.format(endDate, 'yyyy-MM-dd')
      return {start: formatStart, end: formatEnd}
    }
  }


  getSocialCells(start, end){
    const userId = this.props.userId;
    return authAxios.get(`${global.IP_CHANGE}/mySocialCal/filterCells/`+userId+"/"+ start+`/`+end)
    .then(res => {
      return res.data
    })
  }

  initializedMonth = (month, year, cells) => {

    const curMonth = new Date(year, month, 1);
    const start = dateFns.startOfMonth(curMonth)
    const end = dateFns.endOfMonth(curMonth)
    const startDate = dateFns.startOfWeek(start)
    const endDate = dateFns.endOfWeek(end)
    const diffWeeks = dateFns.differenceInCalendarWeeks(endDate, startDate)
    const dateFormat = "d";
    const rows = [];
    const items = []
    let toDoStuff = [];
    let days = [];
    let day = startDate;
    let formattedDate = ""

    if(diffWeeks === 4){
      // only 5 weeks then you will add another week
      while(day <= dateFns.addWeeks(endDate, 1)){
        for(let i = 0; i< 7; i++){
          for(let item = 0; item < cells.length; item++){
            const date = new Date(cells[item].socialCaldate)
            const utc = dateFns.addHours(date, date.getTimezoneOffset()/60)
            // console.log(date,utc)
            // console.log("LLLLLLLLLLLLL")
            if(dateFns.isSameDay(utc, day)){
              toDoStuff.push(
                cells[item]
              )
            }
          }

          formattedDate = dateFns.format(day, dateFormat);
          const cloneDay = day;
          if(toDoStuff.length > 0){
            let info = toDoStuff[0]
            days.push(
              <View
                key = {i}
                style={styles.monthPicCell}
                >
                <View style = {styles.imageHolder}>
                  {
                    toDoStuff[0].coverPic ?
                      <View>
                        <TouchableOpacity  onPress={() => this.viewDay(info.id)}>
                          <View style={styles.miniBox}>
                            <Text style = {styles.formatDateImage}> {formattedDate}</Text>
                            <Image
                              style = {dateFns.isSameDay(day, new Date()) ?
                                styles.smallImageGlow : styles.smallImage
                              }

                              resizeMode = "cover"
                              source={{ uri: `${global.IMAGE_ENDPOINT}${toDoStuff[0].coverPic}` }}
                              />
                          </View>

                        </TouchableOpacity>
                      </View>
                    :
                      <Text style = {{color: 'red'}}> {formattedDate}</Text>
                    }
                </View>
              </View>
            )
          } else {
            days.push(
              <View
                key = {i}
                style = {[styles.monthCell
                ]}>
                {
                  (dateFns.isSameDay(day, new Date()))?
                  <TouchableOpacity onPress = {() => this.props.navigation.navigate("PostingPage")}
                    style = {styles.currentMiniBox}>
                  <View>
                    {
                      dateFns.isSameMonth(day, curMonth) ?
                      <Text style = {{
                          fontSize:12,
                          color: 'black',
                          fontWeight: 'bold'
                        }}> {formattedDate}</Text>
                      :
                      <Text style = {{
                          fontSize:12,
                          color: "#8c8c8c"
                        }}>{formattedDate}</Text>
                    }
                    </View>
                    </TouchableOpacity>
                  :
                  <View onPress = {() => this.props.navigation.navigate("PostingPage")}
                    style = {styles.miniBox}>
                  <View>
                  {
                    dateFns.isSameMonth(day, curMonth) ?
                    <Text style = {{
                        fontSize:12,
                        color: 'black',
                        fontWeight: 'bold'
                      }}> {formattedDate}</Text>
                    :
                    <Text style = {{
                        fontSize:12,
                        color: "#8c8c8c"
                      }}>{formattedDate}</Text>
                  }
                  </View>
                  </View>
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
          for(let item = 0; item < cells.length; item++){
            const date = new Date(cells[item].socialCaldate)
            const utc = dateFns.addHours(date, date.getTimezoneOffset()/60)

            if(dateFns.isSameDay(utc, day)){
              toDoStuff.push(
                cells[item]
              )
            }
          }
          formattedDate = dateFns.format(day, dateFormat);
          const cloneDay = day;
          if(toDoStuff.length > 0){
            days.push(
              <View
                key = {i}
                style = {[styles.monthPicCell]}>
                <View style = {[dateFns.isSameDay(day, new Date()) ?
                  styles.currentMiniBox : styles.miniBox
                ]}>
                  {
                    toDoStuff[0].coverPic ?
                      <View>
                        <TouchableOpacity  onPress={() => this.ViewDay(toDoStuff.id)}>
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
              </View>
            )
          } else {
            days.push(
              <View
                // onPress = {() => this.props.navigation.navigate("PostingPage")}
                key = {i}
                style = {[styles.monthCell]}>
                {
                  (dateFns.isSameDay(day, new Date()))?
                  <TouchableOpacity onPress = {() => this.props.navigation.navigate("PostingPage")}
                    style = {styles.currentMiniBox}>
                  <View>
                    {
                      dateFns.isSameMonth(day, curMonth) ?
                      <Text style = {{
                          fontSize:12,
                          color: 'black',
                          fontWeight: 'bold'
                        }}> {formattedDate}</Text>
                      :
                      <Text style = {{
                          fontSize:12,
                          color: "#8c8c8c"
                        }}>{formattedDate}</Text>
                    }
                    </View>
                    </TouchableOpacity>
                  :
                  <View onPress = {() => this.props.navigation.navigate("PostingPage")}
                    style = {styles.miniBox}>
                  <View>
                  {
                    dateFns.isSameMonth(day, curMonth) ?
                    <Text style = {{
                        fontSize:12,
                        color: 'black',
                        fontWeight: 'bold'
                      }}> {formattedDate}</Text>
                    :
                    <Text style = {{
                        fontSize:12,
                        color: "#8c8c8c"
                      }}>{formattedDate}</Text>
                  }
                  </View>
                  </View>
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
    const formatMonth = dateFns.format(month, 'MMMM yyyy');
    const {socialCells} = this.state;
    return(
      <View style = {styles.centerMonth}>
          <Text style = {styles.monthTitle}>
            {formatMonth}
          </Text>
          {this.initializedMonth(this.props.month, this.props.year, socialCells)}
      </View>
    )
  }
}

export default NewSocialMonth;

const styles = StyleSheet.create({
  miniBox: {
    backgroundColor:'whitesmoke',
     width:'92.5%', height:'92.5%',
      borderRadius:5,
    alignItems: "center", padding:2
  },
  currentMiniBox: {
    backgroundColor:'#1890ff',
     width:'92.5%', height:'92.5%',
      borderRadius:5,
    alignItems: "center", padding:2
  },
  formatDateImage:{
    position: 'absolute',
    fontSize:12,
    color: 'white',
    fontWeight: 'bold',
    zIndex:99,
  },
  centerMonth: {
    alignItems: 'center',
    width: width,
  },
  monthTitle: {
    top:20,
    fontSize:18,
    // color:'red',
    fontWeight:'bold',
  },
  monthContainer: {
    flexDirection: "column",
    flex: 1,
    // borderBottomWidth: 0.2,
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
    // backgroundColor:'red',


    // borderLeftWidth:0.2,
    // borderTopWidth: 0.2,

  },
  monthPicCell: {
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
  selected: {
    borderWidth: 1,
    backgroundColor: '#1890ff'
  },

  smallImage: {
    width: Math.round(Dimensions.get('window').width/7.5),
    height: Math.round(Dimensions.get('window').width/7.5),
    borderRadius:5,
  },

  smallImageGlow: {
    width: Math.round(Dimensions.get('window').width/7.5),
    height: Math.round(Dimensions.get('window').width/7.5),
    borderRadius:5,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#1890ff"
  },
  imageHolder: {
  }
})
