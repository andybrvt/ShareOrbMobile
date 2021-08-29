import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  scrollView: {
    position: 'relative',
    height: "100%"
  },

  background: {
    position: 'relative',
    backgroundColor: '#fafafa',
    flex: 1,

    alignItems: 'center'
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



  logo: {
    alignItems: "center",
    position: "relative",
    top: "10%",
    height: "35%",
    // flex: 1,
    // backgroundColor: 'red'
  },

  loginBtn: {
    position: "relative",
    width: "70%",
    borderRadius: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#1890ff",
  },

  signUpBtn: {
    position: "relative",
    width: "70%",
    borderRadius: 10,
    height: 35,
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
  inputHolder:{
    width: "80%"
  }


})
