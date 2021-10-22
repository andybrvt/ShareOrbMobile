import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Image
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
// import Share from 'react-native-share';

const Testing  = () => {
  return (
    <View>
      <Text>stuff here</Text>
    </View>
  )
}

class Testing1 extends React.Component{

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
