import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   TouchableOpacity,
   Animated,
   Image,
   Dimensions } from 'react-native';
import { connect } from "react-redux";
import * as dateFns from 'date-fns';
import authAxios from '../util';
import { ChevronLeft, ChevronRight } from "react-native-feather";
import * as authActions from '../store/actions/auth';



const width = Dimensions.get("window").width

// This social calendar will be used for android
class SocialCalendarTap extends React.Component{

  constructor(props){
    super(props)
    this.state = {
        currentDate: new Date(),
        socialCells: {}
    }
  }

  openCamera = () => {
    this.props.navigation.navigate("Upload")
    this.props.openShowCamera()
  }

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
      const newDateRange = this.grabDateRange()

      console.log(dateRange)
      this.getSocialCells(newDateRange.start, newDateRange.end)
      .then(data => {
        console.log(data.length)
        this.setState({
          socialCells: data
        })

      })
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



  renderHeader(){

    const dateFormat =  "MMMM yyyy"

    return(
      <View style = {styles.monthTitleContainer}>
        <TouchableOpacity
          onPress = {() => this.subMonth()}
          style = {styles.monthLeftContainer}>
          <ChevronLeft />

        </TouchableOpacity>

        <View style = {styles.monthMiddleContainer}>
          <Text style = {styles.monthTitle}>
            {dateFns.format(this.state.currentDate, dateFormat)}
          </Text>
        </View>

        <TouchableOpacity
          onPress = {() => this.addMonth()}
          style = {styles.monthRightContainer}>
          <ChevronRight />
        </TouchableOpacity>

      </View>
    )
  }

  initializedMonth(month, year, cells){

    const curMonth = new Date(year, month, 1);
    const monthStart = dateFns.startOfMonth(curMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const diffWeeks = dateFns.differenceInCalendarWeeks(endDate, startDate)

    const dateFormat = "d";

    const rows = []
    let toDoStuff = []
    let days = []
    let day = startDate;
    let formattedDate = "";

    if(diffWeeks === 4 ){
      while(day<= dateFns.addWeeks(endDate, 1)){

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

        if(toDoStuff.length > 0){
          let info = toDoStuff[0]

          days.push(
            <View

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
                    <Text> {formattedDate}</Text>
                  }
              </View>
            </View>
          )
        } else {
          days.push(
            <View
              // onPress = {() => this.openCamera()}
              style = {[styles.monthCell]}>
              {
                (dateFns.isSameDay(day, new Date()))?
                <TouchableOpacity onPress = {() => this.openCamera()}
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
                <View onPress = {() => this.openCamera()}
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

        toDoStuff = [];
        day= dateFns.addDays(day,1);



    }


  } else if(diffWeeks === 5) {

    let info = toDoStuff[0]

      while(day<= endDate){

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
              style = {[styles.monthCell]}>
              {
                (dateFns.isSameDay(day, new Date()))?
                <TouchableOpacity onPress = {() => this.openCamera()}
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
                <View onPress = {() => this.openCamera()}
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

        toDoStuff = [];
        day= dateFns.addDays(day,1);



    }

    }



    return (
      <Text style = {styles.monthContainer}>{days}</Text>
    )


}

  render(){
    const month = new Date(this.props.year, this.props.month, 1);
    const formatMonth = dateFns.format(month, 'MMMM yyyy');
    const {socialCells} = this.state;
    return(
      <View style = {styles.centerMonth}>
        {/*
        <Text style = {styles.monthTitle}>
          {formatMonth}
        </Text>
        */}
        {this.initializedMonth(this.props.month, this.props.year, socialCells)}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return{
    // userId: state.auth.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openShowCamera: () => dispatch(authActions.openShowCamera()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SocialCalendarTap);



const styles = StyleSheet.create({
  miniBox: {
    backgroundColor:'whitesmoke',
     width:'92.5%', height:'92.5%',
      borderRadius:5,
    alignItems: "center",
  },
  currentMiniBox: {
    backgroundColor:'#1890ff',
     width:'92.5%', height:'92.5%',
      borderRadius:5,
    alignItems: "center",
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
    fontSize:18,
    // color:'red',
    fontWeight:'bold',
  },

  monthContainer: {
    // flexDirection: "column",
    // borderBottomWidth: 0.2,
  },
  // This is for the cell
  // So you want the cells to be square so that you
  // divde the full with by 7 to get the wdith of each cell
  // and then make it the height
  monthCell: {
    width: width/7,
    height: Math.round(Dimensions.get('window').width/7),
    alignItems: "center",
    justifyContent: "center",


    // borderLeftWidth:0.2,
    // borderTopWidth: 0.2,

  },
  monthPicCell: {
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
