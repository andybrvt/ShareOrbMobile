import { Animated } from 'react-native';
import Animation from 'lottie-react-native';
import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';


 class FirstPost extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }
   componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2500,
    }).start();
  }

   render(){
     return (
       <BackgroundContainer>
       <Modal

          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
         <View style={{top:10,
           alignItems:'center', textAlign:'center',
           backgroundColor:'#1890ff'}}>
           <Text> Person Profilef</Text>
           <Animation
              style={{
                width: 200,
                height: 200,
              }}
              loop={true}
              autoPlay={true}
              source={require('./data2.json')}
              progress={this.state.progress}
            />
         </View>
        </Modal>
       </BackgroundContainer>
     )
   }
 }

 export default FirstPost;
