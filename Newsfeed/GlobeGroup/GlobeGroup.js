import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
 } from 'react-native';


class GlobeGroup extends React.Component{

   constructor(props){
       super(props)

    }

    render(){

      return(
        <View>
          <Text>This will be the globe hub</Text>
        </View>
      )
    }

}


export default GlobeGroup;
