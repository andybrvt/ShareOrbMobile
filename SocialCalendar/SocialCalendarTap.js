import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   TouchableOpacity,
   Animated,
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
        currentDate: new Date()
    }


  }

  addMonth = ()=>{
    // this function will increaes month by one
    this.setState({
      currentDate: dateFns.addMonths(this.state.currentDate, 1),
    })
  }

  subMonth =() =>{
    // this function will decrase the month by one
    this.setState({
      currentDate: dateFns.subMonths(this.state.currentDate, 1)
    })
  }

  renderHeader(){

    const dateFormat =  "MMMM"

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

  initializedMonth(){

    const curMonth = this.state.currentDate;
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

    if(diffWeeks === 4){

      while(day<= dateFns.addWeeks(endDate, 1)){

        for(let i = 0; i< 7; i++){

          // put the for loop for the items here

          formattedDate = dateFns.format(day, dateFormat);
          const cloneDay = day;

          if(toDoStuff.length > 0){
            let info = toDoStuff[0];
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

          toDoStuff = [];
          day= dateFns.addDays(day,1);
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

    const month = dateFns.format(this.state.currentDate, "MMMM yyyy")
    return(
      <View style = {styles.centerMonth}>

        {this.renderHeader()}
        {this.initializedMonth()}
      </View>
    )
  }
}

export default SocialCalendarTap;

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
  monthTitleContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  monthLeftContainer: {
    flex:1,
    alignItems: 'center'
  },
  monthRightContainer: {
    flex: 1,
    alignItems: 'center'
  },
  monthMiddleContainer: {
    flex: 3,
    alignItems: 'center',
  },
  monthContainer: {
    flexDirection: "column",
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
