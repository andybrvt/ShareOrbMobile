import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
   Image
  } from 'react-native';


class PictureBox extends React.Component{


  render(){
    let coverPic = ''

    if(this.props.cell){
      if(this.props.cell.coverPic){
        coverPic= this.props.cell.coverPic
      }
    }
    console.log(this.props.index)
    return(
      <View
        key = {this.props.index}
        style = {styles.picBoxContainer}>
        <View style = {styles.pictureHolder}>
          <Image
            style = {styles.image}
            resizeMode = "cover"
            source={{ url: `${global.IMAGE_ENDPOINT}${coverPic}` }}
             />
        </View>


      </View>
    )
  }
}

export default PictureBox;

const styles = StyleSheet.create({
  picBoxContainer: {
    height: 250,
    width: 170,
    backgroundColor: "red",
    borderRadius: 25,
    overflow: "hidden"
  },
  pictureHolder: {
    flex: 1,
  },
  image:{
    flex: 1
  }

})
