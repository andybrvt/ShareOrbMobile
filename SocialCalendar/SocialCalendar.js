import React from 'react';
import { Text, View, Button,StyleSheet, ScrollView } from 'react-native';


class SocialCalendar extends React.Component{

  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    showSocialEventPostModal: false,
    showSocialPicPostModal: false,
    events: [],
    animate:true,
    fade:false,
  }

  renderDays(){
    // This will just be used to render the days of the social
    // calendar. Example s m t w t f s
    const dateFormate = "iiiii"
  }

  render(){

    return (
      <View>
        <Text> This will be for the social calendar</Text>
      </View>

    )
  }
}

export default SocialCalendar;
