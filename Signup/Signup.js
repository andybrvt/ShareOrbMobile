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


const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

// import TimePicker from 'react-native-simple-time-picker';
class Signup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dobMonth: 0,
      dobDay: 0,
      dobYear: 0,
      username: '',
      usernameError: "",
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      passwordConfirm:"",
      passwordConfirmError: ""
    }
  }


  handleSubmit = () => {
    console.log('stuff here')
    console.log(this.state)
  }

  // this function will be used to validate the values in the
  // sign up page
  validate = (fieldName, value) => {
    if(fieldName === "username"){
      if(!value){
        // check if there are no username
        return "Please input a username"
      }

      if(values.includes("@")){
        return "You cannot have an @ in your username."
      }

    }

    if(fieldName === "firstName"){
      if(!value){
        return  "Please input your first name"
      }
    }

    if(fieldName === "lastName"){
      if(!value){
        return  "Please input your last name"
      }
    }
    if(fieldName === "email"){
      if(!value){
        return  "Please input your email"
      }
    }
    if(fieldName === "password"){
      if(!value){
        return  "Please input a password"
      }
      if(values.length < 9){
        // validate if the password is longer than 8 characters
        return "New password must be at least 10 characters long."
      } else if(values.search(/[A-Z]/)< 0){
        // Validates if it has an uppercase
        return "New password must have an upper case letter."
      } else if(values.search(/[0-9]/)< 0){
        // Validate if it has a number
        return 'New password must have at least one number.'
      }
    }
    if(fieldName === "passwordConfirm"){
      if(!value){
        return  "Please confirm your password"
      }
    }


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
                     onBlur = {() => this.setState({
                       usernameError: this.validate("username", this.state.username)})}
                     placeholder = {"Username"}
                     onChangeText = {(value) => this.setState({username: value.trim()})}
                     error = {this.state.usernameError}
                      />
               </View>

               <View style = {styles.duoInputContainer}>
                 <View style = {styles.smallInputContainer}>
                   <Text >First Name </Text>
                     <TextInputError
                       onBlur = {() => this.setState({
                         firstNameError: this.validate("firstName", this.state.firstName)})}
                       onChangeText = {(value) => this.setState({firstName: value.trim()})}
                       placeholder = "First Name"
                       error = {this.state.firstNameError}
                       />
                 </View>

                 <View style = {[{marginLeft: 5},styles.smallInputContainer]}>
                   <Text >Last Name </Text>
                     <TextInputError
                       onBlur = {() => this.setState({
                         lastNameError: this.validate("lastName", this.state.lastName)})}
                       onChangeText = {(value) => this.setState({lastName: value.trim()})}
                       placeholder = "Last Name"
                       error = {this.state.lastNameError}
                       />
                 </View>

               </View>



               <View style = {styles.inputContainer}>
                 <Text>Email </Text>
                   <TextInputError
                     onBlur = {() => this.setState({
                       emailError: this.validate("email", this.state.email)})}
                     onChangeText = {(value) => this.setState({email: value.trim()})}
                     placeholder = "Email"
                     error = {this.state.emailError}

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
                     onBlur = {() => this.setState({
                       passwordError: this.validate("password", this.state.password)})}

                     onChangeText = {(value) => this.setState({password: value.trim()})}
                     placeholder = "Password"
                     error = {this.state.passwordError}

                   />
               </View>

               <View style = {styles.inputContainer}>
                 <Text >Password </Text>
                   <TextInputError
                     onBlur = {() => this.setState({
                       passwordConfirmError: this.validate("passwordConfirm", this.state.passwordConfirm)})}
                     onChangeText = {(value) => this.setState({passwordConfirm: value.trim()})}
                     placeholder = "Confirm Password"
                     error = {this.state.passwordConfirmError}

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
