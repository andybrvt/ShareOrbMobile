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
 Dimensions,
 AsyncStorage
} from "react-native";
import MainLogo from '../logo.svg';
import TextInputError from '../RandomComponents/TextInputError';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomModal from '../RandomComponents/BottomModal';
import AndroidDateModal from '../RandomComponents/AndroidDateModal';
import {loop, withTimingTransition, mix} from 'react-native-redash/lib/module/v1';
import Animated, {Easing} from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import * as dateFns from 'date-fns';
import { Search, ChevronLeft, ArrowLeft } from "react-native-feather";

const width = Dimensions.get("window").width
const height = Dimensions.get('window').height


const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const { Value, cond, set } = Animated;

// import TimePicker from 'react-native-simple-time-picker';
class Signup extends React.Component{

  slide = new Value(SCREEN_HEIGHT)
  slideAnimation = withTimingTransition(this.slide, {duration: 100});

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
      passwordConfirmError: "",
      showDatePicker: false,
      dob: new Date(),
    }


    this.showDatePicker = new Value(false);
  }

  openDatePicker = () => {
    this.setState({
      showDatePicker: true
    })
    setTimeout(() =>{
      this.showDatePicker.setValue(true);

    }, 100)
  }
  onCloseDatePicker = () => {

    // this.slide.setValue(SCREEN_HEIGHT);
    this.showDatePicker.setValue(false);

    setTimeout(() => {
      this.setState({
        showDatePicker: false
      })
    }, 100);


  }

  onDobChange = (event, selectedDate) => {
    if(selectedDate === undefined){
      this.setState({
        showDatePicker: false
      })
      return
    }

    if(Platform.OS =='ios'){
      this.setState({
        dob: selectedDate,
      })
    }
    else{
      this.setState({
        dob: selectedDate,
        showDatePicker: false
      })
    }

  }


  handleSubmit = () => {
    const {username, firstName, lastName,
    email, password, passwordConfirm, dob} = this.state;

    return axios.post(`${global.IP_CHANGE}/rest-auth/registration/`, {
      username: username,
      first_name: firstName,
      last_name: lastName,
      dob: dateFns.format(dob, "yyyy-MM-dd"),
      email: email,
      password1: password,
      password2: passwordConfirm
    }).then(res =>{
        const token = res.data.key;
        AsyncStorage.setItem('token', token)
        this.props.authSuccess(token);

    }).catch(err => {
      if(err.response){
        this.props.authFail(err.response.data)

        if(err.response.data.email){
          this.setState({
            emailError: err.response.data.email[0]
          })
        }
        if(err.response.data.username){
          this.setState({
            usernameError: err.response.data.username[0]
          })
        }

      } else {

      }

    })

  }

  checkErrors = () => {

    const {usernameError, firstNameError, lastNameError,
    emailError, passwordError, passwordConfirmError} = this.state

    const {username, firstName, lastName,
    email, password, passwordConfirm} = this.state
    if(usernameError || firstNameError || lastNameError ||
      emailError || passwordError || passwordConfirmError
    ){
      return true;
    }

    if(!username || !firstName || !lastName ||
      !email || !password || !passwordConfirm
    ){
      return true;
    }



    return false;
  }

  // this function will be used to validate the values in the
  // sign up page
  validate = (fieldName, value) => {
    if(fieldName === "username"){
      if(!value){
        // check if there are no username
        return "Please input a username"
      }

      if(value.includes("@")){
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
      if(email(value)){
        return "Not a valid email"
      }
    }
    if(fieldName === "password"){
      if(!value){
        return  "Please input a password"
      }
      if(value.length < 9){
        // validate if the password is longer than 8 characters
        return "New password must be at least 10 characters long."
      } else if(value.search(/[A-Z]/)< 0){
        // Validates if it has an uppercase
        return "New password must have an upper case letter."
      } else if(value.search(/[0-9]/)< 0){
        // Validate if it has a number
        return 'New password must have at least one number.'
      }
    }
    if(fieldName === "passwordConfirm"){
      if(!value){
        return  "Please confirm your password";
      }
      if(value !== this.state.password){
        return "Passwords must match";
      }
    }


  }

  render(){
    const dobMonth=this.state.dobMonth;
    const dobDay=this.state.dobDay;
    let showPicker=this.state.showDatePicker
    let error = {}
    if(this.props.errorMessage){
      error = this.props.errorMessage
    }
    const { loading, token } = this.props;


    if(token){
      this.props.navigation.navigate("LoadingScreen");
    }
    return(
      <SafeAreaView style = {{
          flex: 1,
        }}>
        <Animated.Code>
          {() => cond(this.showDatePicker, set(this.slide, SCREEN_HEIGHT-300), set(this.slide, SCREEN_HEIGHT))}
        </Animated.Code>
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()} >

          <KeyboardAvoidingView
            style = {styles.container}
             behavior = {Platform.OS =='ios'?"padding":"height"}>

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
                 <TouchableOpacity >
                   <ArrowLeft
                     onPress = {() => this.props.navigation.navigate("Login")}
                     style={{left:10}}
                     stroke="black" strokeWidth={2.5} width={25} height={25} />
                 </TouchableOpacity>
                 <View style={{left:20}}>
                 <Text style={styles.signUpText}>Sign Up</Text>
                 </View>
               </View>
               <View style = {styles.inputContainer}>
                 <Text style={styles.fieldHeader}>Username </Text>
                   <TextInputError
                     onBlur = {() => this.setState({
                       usernameError: this.validate("username", this.state.username)})}
                     onChangeText = {(value) => this.setState({username: value.trim()})}
                     placeholder = "First Name"
                     error = {this.state.usernameError}
                     />
               </View>
               <View style = {styles.duoInputContainer}>
                 <View style = {styles.smallInputContainer}>
                   <Text style={styles.fieldHeader}>First Name </Text>
                     <TextInputError
                       onBlur = {() => this.setState({
                         firstNameError: this.validate("firstName", this.state.firstName)})}
                       onChangeText = {(value) => this.setState({firstName: value.trim()})}
                       placeholder = "First Name"
                       error = {this.state.firstNameError}
                       />
                 </View>

                 <View style = {[{marginLeft: 5},styles.smallInputContainer]}>
                   <Text style={styles.fieldHeader}>Last Name </Text>
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
                 <Text style={styles.fieldHeader}>Birthday </Text>
                 <TouchableOpacity
                   onPress = {() => this.openDatePicker()}
                   >
                   <View style = {{
                       borderWidth: 2,
                       height: 45,
                       borderRadius: 5,
                       backgroundColor: 'whitesmoke',
                       borderColor: '#1890ff',
                       justifyContent: 'center'
                     }}>
                     <Text style = {{
                         color: 'black'
                       }}> {dateFns.format(this.state.dob, "MM-dd-yyyy")}</Text>
                   </View>
                 </TouchableOpacity>

               </View>

               <View style = {styles.inputContainer}>
                 <Text style={styles.fieldHeader}>Email </Text>
                   <TextInputError
                     onBlur = {() => this.setState({
                       emailError: this.validate("email", this.state.email)})}
                     onChangeText = {(value) => this.setState({email: value.trim()})}
                     placeholder = "Email"
                     error = {this.state.emailError}

                     />
               </View>



               <View style = {styles.inputContainer}>
                 <Text style={styles.fieldHeader}>Password </Text>
                   <TextInputError
                     onBlur = {() => this.setState({
                       passwordError: this.validate("password", this.state.password)})}
                     secureTextEntry={true}
                     onChangeText = {(value) => this.setState({password: value.trim()})}
                     placeholder = "Password"
                     error = {this.state.passwordError}

                   />
               </View>

               <View style = {styles.inputContainer}>
                 <Text style={styles.fieldHeader}>Confirm Password </Text>
                   <TextInputError
                     onBlur = {() => this.setState({
                       passwordConfirmError: this.validate("passwordConfirm", this.state.passwordConfirm)})}
                     onChangeText = {(value) => this.setState({passwordConfirm: value.trim()})}
                     placeholder = "Confirm Password"
                     error = {this.state.passwordConfirmError}
                     secureTextEntry={true}
                   />
               </View>

               {
                 this.checkErrors() ?


                 <View
                   // onPress = {() => this.handleSubmit()}
                   style = {styles.signUpBtn}
                   >
                     <Text style = {{
                         color: 'white'
                       }}>
                       Sign Up
                     </Text>
                 </View>
                 :
                 <TouchableOpacity
                   onPress = {() => this.handleSubmit()}
                   style = {styles.signUpBtnAuth}
                   >
                     <Text style = {{
                         color: 'white'
                       }}>
                       Sign Up
                     </Text>
                 </TouchableOpacity>

               }



             </ScrollView>



          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        {
          Platform.OS === "android" ?
          <View>
          {showPicker?
            <View>
              <DateTimePicker
                testID="dateTimePicker"
                value = {this.state.dob}
                mode="date"
                is24Hour = {true}
                display="default"
                onChange = {this.onDobChange}
                maximumDate = {new Date()}
              />
            </View>
            :
            <View></View>
          }
          </View>


          :

          <BottomModal
            slide = {this.slideAnimation}
            onCancel = {this.onCloseDatePicker}
            visible = {this.state.showDatePicker}
            value = {this.state.dob}
            onChange = {this.onDobChange}
             />


        }


      </SafeAreaView>
    )
  }
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errorMessage: state.auth.error,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: (token) => dispatch(actions.authSuccess(token)),
    addCredentials: (
      username,
      id,
      friends,
      posts,
      first_name,
      last_name,
      profile_picture,
      following,
      followers
    ) => dispatch(actions.addCredentials(
      username,
      id,
      friends,
      posts,
      first_name,
      last_name,
      profile_picture,
      following,
      followers
    )),
    authFail: (err) => dispatch(actions.authFail(err))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);


const styles = StyleSheet.create({
  signUpText:{
    fontSize:20,
    fontWeight:'bold',
  },
  signUpBtn: {
    position: "relative",
    width: "80%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor:'#F0F0F0',
  },
  signUpBtnAuth: {
    position: "relative",
    width: "80%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#1890ff",
  },
  fieldHeader:{
    fontWeight:'bold',
    fontSize:14,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: width
  },
  logoContainer:{
    top:'7.5%',
    width: width*0.8,
    alignItems: 'center',
    flexDirection:'row',
  },
  inputContainer: {
    // height: height*0.09,
    top:'30%',
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
  signUpButtonDisabled:{
    position: "relative",
    width: width*0.8,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gainsboro",
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
