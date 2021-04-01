import React from 'react';
import { Text, View, Button,StyleSheet, Image, FlatList } from 'react-native';

class NewsfeedSpecCarousel extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      index: 0,

    }
  }


  renderPictures = picture => {
    // Since we are using a flatlist then you would instead of
    // rendering the whole list and the put it in we would do it
    // item by item and make sure we need to cover for clipped pictures
    // too

    return (
      <View>
        <Image
          style = {{width: 200, height: 200}}
          resizeMode = "contain"
          source = {{
            url: `${global.IMAGE_ENDPOINT}`+picture.itemImage
          }}

          />

      </View>
    )
  }





  render(){
    console.log(this.props)

    return (
    <View>

      <FlatList
        data = {this.props.items}
        style= {{ flex: 1}}
        pagingEnabled = {true}
        horizontal = {true}
        showsHorizontalScrollIndicator = {false}
        renderItem = { ({item}) => {
          return this.renderPictures(item)
        }}
        />

    </View>


    )
  }
}

export default NewsfeedSpecCarousel;
