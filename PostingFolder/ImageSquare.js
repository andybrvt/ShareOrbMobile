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

class ImageSquare extends React.Component{

  render(){
    return(
      <View
        style = {styles.imageContainer}
        key= {this.props.index}
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
