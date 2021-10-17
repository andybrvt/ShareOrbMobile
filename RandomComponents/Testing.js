import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback
 } from 'react-native';

class Testing extends React.Component{

  render(){

    return(
      <View>

        <View style = {{
            height: 200,
            width: 200,
            backgroundColor: 'red'
          }}>
          <Image
            style={{
              position: "relative",
              height: 200,
              shadowColor: '#000',
              width:"100%",
            }}
            resizeMode = "cover"
            // source={{ uri: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" }}
            source={{ uri: "http://206.207.51.100:19000/media/post_pictures/2021/10/CE53AA90-8610-4FA5-AB46-4D4617CB6EF7.jpg" }}
            />
          <Image
            style={{
              position: "relative",
              height: 200,
              shadowColor: '#000',
              width:"100%",
            }}
            resizeMode = "cover"
            // source={{ uri: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" }}
            source={{ uri: "http://206.207.51.100:19000/media/post_pictures/2021/10/CE53AA90-8610-4FA5-AB46-4D4617CB6EF7.jpg" }}
            />
          <Image
            style={{
              position: "relative",
              height: 200,
              shadowColor: '#000',
              width:"100%",
            }}
            resizeMode = "cover"
            // source={{ uri: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" }}
            source={{ uri: "http://206.207.51.100:19000/media/post_pictures/2021/10/CE53AA90-8610-4FA5-AB46-4D4617CB6EF7.jpg" }}
            />
          <Image
            style={{
              position: "relative",
              height: 200,
              shadowColor: '#000',
              width:"100%",
            }}
            resizeMode = "cover"
            // source={{ uri: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" }}
            source={{ uri: "http://206.207.51.100:19000/media/post_pictures/2021/10/CE53AA90-8610-4FA5-AB46-4D4617CB6EF7.jpg" }}
            />
        </View>

      </View>
    )
  }
}


export default Testing;
