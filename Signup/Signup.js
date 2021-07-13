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
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style = {{
          flex: 1,
        }}>
        <ScrollView style = {{
            flex: 1
          }}>

            <View style = {styles.usernameSignup}>
              <Text > Username </Text>
                <TextInput
                  placeholder = "Username"
                  />
            </View>

            <View style = {styles.usernameSignup}>
              <Text > First Name </Text>
                <TextInput
                  placeholder = "First Name"
                  />
            </View>

            <View style = {styles.usernameSignup}>
              <Text > Last Name </Text>
                <TextInput
                  placeholder = "Last Name"
                  />
            </View>

            <View style = {styles.usernameSignup}>
              <Text> Email </Text>
                <TextInput
                  placeholder = "Email"
                  />
            </View>

            <View style = {styles.usernameSignup}>
              <Text> Birthday </Text>
                <TextInput
                  placeholder = "Birthday"
                  />
            </View>

            <View style = {styles.usernameSignup}>
              <Text > Password </Text>
                <TextInput
                  placeholder = "Password"
                />
            </View>

            <View style = {styles.usernameSignup}>
              <Text > Password </Text>
                <TextInput
                  placeholder = "Confirm Password"
                />
            </View>


        </ScrollView>

      </SafeAreaView>
    )
  }
}

export default Signup;
