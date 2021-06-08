import React from 'react';
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
 } from 'react-native';
 import Animated from 'react-native-reanimated';
 import {withTimingTransition} from 'react-native-redash/lib/module/v1';
 const { useCode, cond, sub,divide, eq, add, call, set, Value, event, or } = Animated;


export default function Test(){

  const scale = new Value(0);
  const scaleAnimation = withTimingTransition(scale, {duration: 1000})

  useCode(() => cond(eq(scale, 0), set(scale, 1)), [])

  return(
    <View>
      <Animated.View  style = {{
          height: 100,
          width: 100,
          backgroundColor: "black",
          transform: [
            {scale: scaleAnimation}
          ]
        }}>

      </Animated.View>

    </View>


  )


}
