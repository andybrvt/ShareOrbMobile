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
 import WebSocketGlobeInstance from '../../Websockets/globeGroupWebsocket';


class GlobeGroup extends React.Component{

   constructor(props){
       super(props)

       this.initialiseGlobeGroup()
    }

    initialiseGlobeGroup(){

      this.waitForGlobeSocketConnection(() => {
        // fetch post here

      })

      WebSocketGlobeInstance.connect()


    }

    waitForGlobeSocketConnection(callback){
      const component = this
      setTimeout(
        function(){
          if(WebSocketGlobeInstance.state() === 1){
            callback()
            return;
          } else {
            component.waitForGlobeSocketConnection(callback);
          }
        }, 100)
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
