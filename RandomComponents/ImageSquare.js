import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  Animated,
  StyleSheet
} from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get("window").width


// this will be used for the images in the posting
// whenever you want to have animation in your views
// you will use animated.view
class ImageSquare extends React.Component{


  // So when you are doing the simple calls you will need
  // to do the values in the ui reanimated. You will do it
  // in the jsx for now but whne you start moving stuff around
  // you want to put the calculations inside the ui reanimated run

  // order will be a number that represent the index of the picture
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


    const index = this.props.index
    return(
      <View
        style = {[{
          transform: [
            {translateX: this.getPosition(index).x}
          ]
        },styles.imageContainer]}
        key = {this.props.index}
        >
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
    backgroundColor: 'red'
   // padding: 10,
  },
  imageHolder: {

  },
  smallImage: {
    width: "80%",
    height: "80%",
    borderRadius: 15

  }


})

export default ImageSquare;
