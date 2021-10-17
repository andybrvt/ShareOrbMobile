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
            source={{ uri: "https://shareorb.s3.amazonaws.com/post_pictures/2021/10/5DDDF2CA-9F55-439D-8925-AA7529990BBF.jpg" }}
            />
        </View>

      </View>
    )
  }
}


export default Testing;
