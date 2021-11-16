import { StyleSheet } from 'react-native';

export default StyleSheet.create({


  scrollView: {
    position: 'relative',
    height: "100%"
  },

  background: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    flex:1,
  },

  image: {
    width: "20%",
    position: "relative"
  },

  inputHolders:{
    alignItems: "center",
    // flex: 1,
    // top: "30%",
    width: "80%",
    // backgroundColor:'red'
  },

  titleText: {
    fontSize: 15,
    color: "#1890ff"
  },


  loginBtn1: {
    marginTop:10,
    width: "65%",
    borderRadius: 5,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1890ff",
    flexDirection:'row',
    // backgroundColor: "pink",
  },

  btn: {
    flexDirection:'row',
    borderRadius: 5,
    backgroundColor: 'orange',
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  regSignup:{
    position: "absolute",
    right:25,
    width: "20%",
    borderRadius: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#2f54eb",
  },

  logo: {
    alignItems: "center",
    position: "relative",
    height: "20%",
    marginTop:'25%',
    // flex: 1,
  },

  loginBtn: {
    position: "relative",
    width: "50%",
    borderRadius: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "#2f54eb",
    // backgroundColor: "pink",
  },

  signUpBtn: {
    flexDirection: 'row',
    position: "relative",
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#d9d9d9",
  },
  loginText: {
    color: 'white',
    fontSize: 14
  },

  inputBox:{
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "gainsboro",

  },
  inviteInput: {
    width: "75%",
    height: 40,
    marginLeft:20,

  },
  inputHolder:{
    width: "80%"
  }


})
