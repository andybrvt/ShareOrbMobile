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
    height: "25%",
    // flex: 1,
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
