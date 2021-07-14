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
 TouchableWithoutFeedback,
 KeyboardAvoidingView,
 Dimensions
} from "react-native";
import MainLogo from '../logo.svg';
import TextInputError from '../RandomComponents/TextInputError';
import { SafeAreaView } from 'react-native-safe-area-context';

const width = Dimensions.get("window").width
const height = Dimensions.get('window').height


// import TimePicker from 'react-native-simple-time-picker';
class Signup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dobMonth: 0,
      dobDay: 0,
      dobYear: 0,
      username: '',
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm:""
    }
  }


  handleSubmit = () => {
    console.log('stuff here')
    console.log(this.state)
  }

  render(){
    const dobMonth=this.state.dobMonth;
    const dobDay=this.state.dobDay;
    console.log(this.state)
    return(
      <SafeAreaView style = {{
          flex: 1,
        }}>
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()} >

          <KeyboardAvoidingView
            style = {styles.container}
             behavior = "padding">

             <ScrollView
               contentContainerStyle = {{
                 alignItems: 'center'
               }}
               style = {{
                 width: width,
               }}
               showsVerticalScrollIndicator = {false}
               >
               <View style = {styles.logoContainer}>
                 <MainLogo height = {100}  width = {200} />

                 <Text>
                   Sign up
                 </Text>

               </View>

               <View style = {styles.inputContainer}>
                 <Text>Username </Text>
                   <TextInputError
                     placeholder = {"Username"}
                     onChangeText = {(value) => this.setState({username: value.trim()})}
                      />
               </View>

               <View style = {styles.duoInputContainer}>
                 <View style = {styles.smallInputContainer}>
                   <Text >First Name </Text>
                     <TextInputError
                       onChangeText = {(value) => this.setState({firstName: value.trim()})}
                       placeholder = "First Name"
                       />
                 </View>

                 <View style = {[{marginLeft: 5},styles.smallInputContainer]}>
                   <Text >Last Name </Text>
                     <TextInputError
                       onChangeText = {(value) => this.setState({lastName: value.trim()})}
                       placeholder = "Last Name"
                       />
                 </View>

               </View>



               <View style = {styles.inputContainer}>
                 <Text>Email </Text>
                   <TextInputError
                     onChangeText = {(value) => this.setState({email: value.trim()})}
                     placeholder = "Email"
                     />
               </View>

               <View style = {styles.inputContainer}>
                 <Text>Birthday </Text>
                   <TextInputError
                     // onChangeText = {(value) => this.setState({username: value.trim()})}
                     placeholder = "Birthday"
                     />
               </View>

               <View style = {styles.inputContainer}>
                 <Text >Password </Text>
                   <TextInputError
                     onChangeText = {(value) => this.setState({password: value.trim()})}
                     placeholder = "Password"
                   />
               </View>

               <View style = {styles.inputContainer}>
                 <Text >Password </Text>
                   <TextInputError
                     onChangeText = {(value) => this.setState({passwordConfirm: value.trim()})}
                     placeholder = "Confirm Password"
                   />
               </View>

               <TouchableOpacity
                 onPress = {() => this.handleSubmit()}
                 style = {styles.signUpButton}
                 >
                   <Text style = {{
                       color: 'white'
                     }}>
                     Sign Up
                   </Text>
               </TouchableOpacity>


               <TouchableOpacity>
                 <View>
                   <Button
                     onPress = {() => this.props.navigation.navigate("Login")}
                     title = "Login"
                      />
                 </View>
               </TouchableOpacity>
             </ScrollView>



          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>



      </SafeAreaView>
    )
  }
}

export default Signup;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: width
  },
  logoContainer:{
    width: width*0.8,
    alignItems: 'center'
  },
  inputContainer: {
    // height: height*0.09,
    width: width*0.8,
    position: 'relative'
    // alignItems: 'center'

  },
  signUpButton:{
    position: "relative",
    width: width*0.8,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1890ff",
    marginTop: 10,
  },
  duoInputContainer: {
    flexDirection: 'row'
  },
  smallInputContainer: {
    width: width*0.4,
    position: 'relative'
  }

})
