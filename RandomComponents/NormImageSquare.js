import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
} from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get("window").width

// This will be used mostly for the static images, where as the imageSquare
// will be the moving one
class NormImageSquare extends React.Component{

  constructor(props){
    super(props)


    this.x = this.getPosition(this.props.index).x
    this.y = this.getPosition(this.props.index).y
  }

  getPosition = (order: number) => {

    const col = this.props.col
    const size = this.props.size

    // so you want to return the x and y of the images
    return{
      x: (order % col) * size, // pretty much if 0 or 1, row would be 0
      y: Math.floor(order / col) * size
    }
  }


  render(){

    return (
      <View
        key = {this.props.index}
        style = {[{
          transform:[
            {translateX: this.x},
            {translateY: this.y}
          ]
        },
          styles.imageContainer]}>
        <Image
          style = {styles.smallImage}
          resizeMode = "cover"
          source = {{
            uri: this.props.images
          }}
           />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  imageContainer: {
    width: Math.round(width/3),
    height: Math.round(width/3),
    overflow:"hidden",
    alignItems: 'center',
    justifyContent: "center",
    position: "absolute",
    // backgroundColor: 'red'
   // padding: 10,
  },
  imageHolder: {

  },
  smallImage: {
    width: "90%",
    height: "90%",
    borderRadius: 15

  }
})

export default NormImageSquare;
