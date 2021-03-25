import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  background: {
    position: 'relative',
    backgroundColor: '#fafafa',
    height: "100%",
    width: "100%",
    alignItems: 'center'
  },

  image: {
    width: "20%",
    position: "relative"
  },

  inputHolders:{
    alignItems: "center",
    // flex: 1,
    position: "relative",
    // top: "30%",
    height: "10%",
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
    height: "35%"
  },

  loginBtn: {
    position: "relative",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#1890ff",
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
