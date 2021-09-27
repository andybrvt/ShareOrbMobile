import React from 'react';
import {
  Text,
  Platform,
  SafeAreaView,
  View,
  Share,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
 } from 'react-native';
import TextInputError1 from '../RandomComponents/TextInputError1'
import authAxios from '../util';
import { connect } from "react-redux";

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

class InvitePage extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      emailError: [],
      email: '',
      inviteLeft: 0,
      infoText: "",
      inviteNum:0
    }
  }

  componentDidMount() {
    authAxios.get(`${global.IP_CHANGE}`+'/userprofile/getInvitedNum')
    .then( res => {
      this.setState({
        inviteLeft: res.data
      })
    })

    this.getWaitListNum()
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

  shareMessage = (codeInvite) => {
    //Here is the Share API
    Share.share({
      // message: inputValue.toString(),
      message:"Join ShareOrb with my code: "+ codeInvite+"\nIOS:"+" https://testflight.apple.com/join/v58j1FSw"
      + "\nAndroid: "+"https://play.google.com/store/apps/details?id=com.pinghsu520.ShareOrbMobile"

    })
      //after successful share return result
      .then((result) => console.log(result))
      //If any thing goes wrong it comes here
      .catch((errorMsg) => console.log(errorMsg));
  };




  submitInvite = () => {

    const email = this.state.email

    authAxios.post(`${global.IP_CHANGE}`+'/userprofile/onInviteListAdd',{
      email: email
    }).then(res => {
      if(res.data.created === false){
        // this is if the email is created already
        this.setState({
          infoText: "You use this email already"
        })
      } else {

        // put the automated email send here


        this.setState({
          infoText: "Invite sent successfully",
          inviteLeft: res.data.num,
          email: ''
        })


        setTimeout(() => this.setState({infoText: ''}), 5000)
      }
    })

  }

  getWaitListNum = () => {
    authAxios.get(`${global.IP_CHANGE}`+'/userprofile/onWaitListGet')
    .then( res => {
      this.setState({
        inviteNum: res.data
      })
    })
  }


   render(){
     let codeInvite=this.props.inviteCode
     // You will need to get the current number of poeple on the wait list
     return(
       <View style = {styles.container}>
         {
           this.state.inviteLeft === 0 ?
           <View style = {{
               flex: 1,
               alignItems: 'center',
               justifyContent: 'center'
             }}>
             <Text style = {{
                 fontSize: 20,
                 fontFamily: 'Nunito-Bold'
               }}>Out of invites</Text>
             <Text>{this.state.infoText}</Text>

         </View>

           :


           <TouchableWithoutFeedback
             style = {{flex: 1}}
             onPress = {() =>Keyboard.dismiss()}
             >
             <View style = {{
                flex: 1,
                alignItems: 'center',
                width: '100%'}}>

                {/*
                <View style = {{

                    padding:25,
                    // backgroundColor:'red',
                  }}>
                  <Text style = {{
                    color: '#1890ff',
                    fontSize:30,
                    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    // textShadowColor: 'black',
                    // textShadowOffset: {width: -1, height: 1},
                    // textShadowRadius: 5,
                    fontFamily:'Nunito-Bold',
                    paddingLeft:20,
                    paddingRight:20,
                  }}>Invite a friend</Text>
                  <Text style = {{
                    color: '#1890ff',
                    fontSize:30,
                    fontFamily:'Nunito-Bold',
                  }}>
                   Skip the waitlist
                 </Text>
                 <View>
                   <Text style = {styles.welcomeText}>
                     Your Code:&nbsp;
                     <Text>{this.props.inviteCode}</Text>
                   </Text>
                 </View>
                </View>

                <TouchableOpacity onPress={()=>this.shareMessage(codeInvite)} style={styles.loginBtn1}>
                  <Text style={{color:'white'}}>Invite</Text>

                </TouchableOpacity>
                */}

                {/*
               <View style ={{
                   width: '80%',
                 }}>
                 <View style = {{
                     height: 40,
                     borderRadius: 10,
                     overflow: "hidden",
                     width: '100%',
                     flexDirection: 'row'}}>
                   <TextInputError1
                     onBlur = {() => this.setState({
                       emailError: this.validate("email", this.state.email)})}
                     onChangeText = {(value) => this.setState({email: value.trim()})}
                     placeholder = "Email"
                     error = {this.state.emailError}
                     value = {this.state.email}
                     />
                   {
                     this.checkErrors() ?
                     <View
                        style = {styles.loginBtnDisabled}>
                       <Text style = {styles.loginText}> Invite</Text>
                     </View>
                     :
                     <TouchableOpacity
                        onPress = {() => this.submitInvite()}
                        style = {styles.loginBtn}>
                       <Text style = {styles.loginText}> Invite</Text>
                     </TouchableOpacity>
                   }
                 </View>
               </View>
               */}

               {/*
               <View style = {{
                   width: '80%',
                   alignItems: 'center',
                   top: '5%'
                 }}>
                 <Text style = {{fontFamily:'Nunito-SemiBold',
                     textAlign: 'center',}}>There are currently {this.state.inviteNum} people in line!</Text>
                     <Text style = {{
                         fontFamily:'Nunito-Bold',
                         textAlign: 'center',
                         fontSize: 15,
                       }}>{this.state.inviteLeft} invites left</Text>
                 <Text style = {{
                     textAlign: 'center'
                   }}>{this.state.infoText}</Text>
               </View>
               */}
             </View>
           </TouchableWithoutFeedback>
         }
       </View>
     )
   }
 }

 const mapStateToProps = state => {
   return {
     inviteCode: state.auth.inviteCode
   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  welcomeText: {
  padding:5,
    color: "#1890ff",
    fontSize: 27.5,
    top: '7%',
    textAlign: 'center',
    fontFamily:'Nunito-SemiBold',
  },
  loginBtn1: {
    width: "75%",
    borderRadius: 25,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "#40a9ff",
  },
  loginBtn: {
    width: "20%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "#1890ff",
  },
  loginBtnDisabled: {
    width: "20%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "gainsboro",
  },
  loginText: {
    color: 'white',
    fontSize: 14,
    fontFamily:'Nunito-SemiBold',
  },
})

export default connect(mapStateToProps)(InvitePage);
