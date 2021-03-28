import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
 TouchableWithoutFeedback

} from "react-native";
// import TimePicker from 'react-native-simple-time-picker';
import styles from './SignupStyle';
class Signup extends React.Component{
  state = {
    dobMonth: 0,
    dobDay: 0,
    dobYear: 0.
  }

  render(){
    const dobMonth=this.state.dobMonth;
    const dobDay=this.state.dobDay;
    return(
      <View>
        <Text> Email </Text>
          <TextInput
            placeholder = "Email"
            />
          <View style = {styles.usernameSignup}>
            <Text > Username </Text>
              <TextInput
                placeholder = "Username"
                />
          </View>
          <View style = {styles.usernameSignup}>
            <Text > Password </Text>
              <TextInput
                placeholder = "Password"
              />
          </View>
          <View style = {styles.usernameSignup}>
            <Text > Username </Text>
              <TextInput
                placeholder = "Date Of Birth"
                />
              { /*
                // <TimePicker
                //   dobMonth={dobMonth}
                //   //initial Hourse value
                //   dobDay={dobDay}
                //   //initial Minutes value
                //   onChange={(month, day) => {
                //     this.setState({
                //       dobMonth: month,
                //       dobD: day,
                //
                //     })
                //   }}
                // />
                */}
          </View>

      </View>
    )
  }
}

export default Signup;
