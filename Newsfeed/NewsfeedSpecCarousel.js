import React from 'react';
import { Text, View, Button,StyleSheet, Image, FlatList, Dimensions } from 'react-native';




class NewsfeedSpecCarousel extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      index: 0,
    }
  }



  onScrollChange = (event) => {
    // This function will be use mostly for on change
    // everytime you scroll

    // The slide size is pretty teh size of the sldie in widht
    const slideSize = event.nativeEvent.layoutMeasurement.width;

    // The index you pretty much get how much you are off from the start and
    // then divide by the slide size to get you an esistatemnate
    const index = event.nativeEvent.contentOffset.x/slideSize;
    // Then you round to to get the index
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index )

    // This is if you just have a tiny tap and everything m moves
    const isNoMansLand = 0.4< distance;

    // Nwo you will check the state to see if it is different,
    // if it is then  you will change the index
    if(roundIndex !== this.state.index && !isNoMansLand){
      this.setState({
        index: roundIndex
      })

    }

  }


  renderPictures = picture => {
    // Since we are using a flatlist then you would instead of
    // rendering the whole list and the put it in we would do it
    // item by item and make sure we need to cover for clipped pictures
    // too

    return (
      <View style = {{
          width: Math.round(Dimensions.get('window').width),
          height: 400,
          position: "relative"
        }}>
        <Image
          style = {{ flex: 1,  width: undefined, height: undefined}}
          resizeMode = "cover"
          source = {{
            url: `${global.IMAGE_ENDPOINT}`+picture.itemImage
          }}

          />

      </View>
    )
  }







  render(){
    console.log(this.props)

    const flatListOptimizaitonProps = {
      initialNumToRender: 0,
     maxToRenderPerBatch: 1,
     removeClippedSubviews: true,
     scrollEventThrottle: 16,
     windowSize: 2,
     // keyExtractor: React.useCallback(e => e.id, []),
     // getItemLayout: React.useCallback(
     //   (_, index) => ({
     //     index,
     //     length: windowWidth,
     //     offset: index * windowWidth,
     //   }),
     //   []
     // ),
    }

    return (


      <FlatList
        data = {this.props.items}
        style= {{
          flex: 1,
          position: "relative"
        }}
        pagingEnabled = {true}
        horizontal = {true}
        showsHorizontalScrollIndicator = {false}
        renderItem = { ({item}) => {
          return this.renderPictures(item)
        }}
        onScroll= {this.onScrollChange}
        />



    )
  }
}

export default NewsfeedSpecCarousel;
