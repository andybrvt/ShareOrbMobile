import React from 'react';
import { Text, Dimensions, View, StyleSheet, TouchableOpacity  } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';


let {height, width} = Dimensions.get('window')

class FlashMessage extends React.Component{


  constructor(props){
    super(props)
    this.state = {
      flashMessage: false
    }
  }


  /*
  This will handle the activation of the flashmessage
  */
  onPress(){
    this.setState({
      flashMessage: true,
    }, () => setTimeout(() => this.closeFlashMesage(), 3000))
  }

  closeFlashMesage (){
    this.setState({
      flashMessage: false
    })
  }

  render(){
    return(
      <View style={styles.container}>
        {this.props.children}
        {this.props.showMessage == true ?
          <View style={styles.flashMessage}>
            <Text  style={{color:'white'}}> {this.props.message}</Text>
          </View>
          :
          null
        }


      </View>
    )


  }


}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    // padding: 8,


  },
  flashMessage: {
    position: "absolute",
    backgroundColor:'green',
    width: width ,
    justifyContent:'center',
    alignItems:'center',
    height:40,
    top: 0,
    zIndex: 9,
  }
})


export default FlashMessage;
