import React from 'react';
import {
  Text,
  Platform,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
 } from 'react-native';
import TextInputError from '../RandomComponents/TextInputError'
import authAxios from '../util';


const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

class InvitePage extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      emailError: [],
      email: ''
    }
  }

  checkErrors = () => {
    const {emailError} = this.state
    const {email} = this.state

    if(emailError){
      return true;
    }

    if(!email){
      return true;
    }

    return false;

  }

  validate = (fieldName, value) => {

    if(fieldName === "email"){

      if(email(value)){
        return "Not a valid email"
      }
    }

  }


  submitInvite = () => {

    const email = this.state.email

    console.log(email);
    authAxios.post(`${global.IP_CHANGE}`+'/userprofile/onInviteListAdd',{
      email: email
    })

  }


   render(){

     return(

       <View style = {styles.container}>



         <TouchableWithoutFeedback
           style = {{flex: 1}}
           onPress = {() =>Keyboard.dismiss()}
           >
           <View style = {{
              flex: 1,
              alignItems: 'center',
              width: '100%'}}>


              <View style = {{
                  top: '20%'
                }}>
                <Text style = {{
                  color: '#1890ff',
                  fontSize:30,
                  // textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  // textShadowColor: 'black',
                  // textShadowOffset: {width: -1, height: 1},
                  // textShadowRadius: 5,
                  fontWeight:'bold',
                  }}>Invite a friend</Text>
              </View>

             <View style ={{
                 width: '80%',
                 top: '30%'
               }}>

               <TextInputError
                 onBlur = {() => this.setState({
                   emailError: this.validate("email", this.state.email)})}
                 onChangeText = {(value) => this.setState({email: value.trim()})}
                 placeholder = "Email"
                 error = {this.state.emailError}

                 />
             </View>

             <View style = {{
                 width: '80%',
                 alignItems: 'center',
                 top: '40%'
               }}>

               {
                 this.checkErrors() ?

                 <View
                    style = {styles.loginBtnDisabled}>
                   <Text style = {styles.loginText}> Login</Text>
                 </View>

                 :

                 <TouchableOpacity
                    onPress = {() => this.submitInvite()}
                    style = {styles.loginBtn}>
                   <Text style = {styles.loginText}> Login</Text>
                 </TouchableOpacity>

               }

             </View>

           </View>

         </TouchableWithoutFeedback>

       </View>

     )
   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loginBtn: {
    position: "absolute",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "#1890ff",
  },
  loginBtnDisabled: {
    position: "absolute",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "gainsboro",
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
})


export default InvitePage;
