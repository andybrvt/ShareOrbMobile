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


const width = Dimensions.get("window").width

class NewSocialMonth extends React.PureComponent{

  state = {
    month_array : []
  }

  initializedMonth = (month, year) => {


    const curMonth = new Date(year, month, 1);


    const start = dateFns.startOfMonth(curMonth)
    const end = dateFns.endOfMonth(curMonth)

    const startDate = dateFns.startOfWeek(start)
    const endDate = dateFns.endOfWeek(end)


    const dateFormat = "d";

    const rows = [];

    let toDoStuff = [];
    let days = [];
    let day = startDate;
    let formattedDate = ""


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
                true ?

                <Text> {formattedDate}</Text>

                :

                <Text></Text>
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


    return (
      <Text style = {styles.monthContainer}> {rows}</Text>

    )


  }

  render(){
    const month = new Date(this.props.year, this.props.month, 1);

    const formatMonth = dateFns.format(month, 'yyyy-MMMM-dd')
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
    backgroundColor:'red',
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
