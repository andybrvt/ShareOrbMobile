import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
    } from 'react-native';
import * as dateFns from 'date-fns';
import DayAlbum from './DayAlbum';


class NewSocialMonth extends React.PureComponent{



  render(){

    return(

      <View>
        <Text>
          {this.props.month}
        </Text>
        <Text>
          {this.props.year}
        </Text>

      </View>

    )
  }
}

export default NewSocialMonth;
