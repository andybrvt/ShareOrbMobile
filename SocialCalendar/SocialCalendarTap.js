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

  addMonth = ()=>{
    // this function will increaes month by one
    this.setState({
      currentDate: dateFns.addMonths(this.state.currentDate, 1),
      socialCells: {}
    }, () => {
      const range = this.grabMonth()
      this.getSocialCells(range.start, range.end)
    })

  }

  subMonth =() =>{
    // this function will decrase the month by one
    this.setState({
      currentDate: dateFns.subMonths(this.state.currentDate, 1),
      socialCells: {}
    }, () => {
      const range = this.grabMonth()
      this.getSocialCells(range.start, range.end)

    })

  }

  getSocialCells(start,end){
    const userId = this.props.userId;
    const newStart = dateFns.format(start, "yyyy-MM-dd")
    const newEnd = dateFns.format(end, "yyyy-MM-dd")
    return authAxios.get(`${global.IP_CHANGE}/mySocialCal/filterCells/`+userId+"/"+ newStart+`/`+newEnd)
    .then(res => {
      this.setState({
        socialCells: res.data
      })
    })
  }

  grabMonth(){
    const startMonth = dateFns.startOfMonth(this.state.currentDate)
    const endMonth = dateFns.endOfMonth(this.state.currentDate)

    const start = dateFns.startOfWeek(startMonth);
    const end = dateFns.endOfWeek(endMonth);

    const diffWeeks = dateFns.differenceInCalendarWeeks(end, start)

    if(diffWeeks === 4){
      return{
        start: start,
        end: dateFns.addWeeks(end,1)
      }
    }

    return{
      start: start,
      end: end
    }
  }

  componentDidMount(){

    const range = this.grabMonth(this.state.currentDate)
    this.getSocialCells(range.start, range.end)


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
        formattedDate = dateFns.format(day, dateFormat);


        days.push(
          <View
            // onPress = {() => this.props.navigation.navigate("PostingPage")}
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

        day= dateFns.addDays(day,1);



    }


    } else {
      while(day<= endDate){
        formattedDate = dateFns.format(day, dateFormat);


        days.push(
          <View
            // onPress = {() => this.props.navigation.navigate("PostingPage")}
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
        <Text style = {styles.monthTitle}>
          {formatMonth}
        </Text>
        {this.initializedMonth(this.props.month, this.props.year, socialCells)}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return{
    userId: state.auth.id
  }
}


export default connect(mapStateToProps)(SocialCalendarTap);



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
