import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// Since most pages need to have a background and the safe area on top that
// is blue so we can make resuable class that we can just wrap around each component
// so taht we dont have to do it again every time
class BackgroundContainer extends React.Component{


  render(){
    return(
      <SafeAreaView style = {styles.safeArea}>
        <View style = {styles.container}>
          {this.props.children}

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"whitesmoke"
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#1890ff"
  }
})

export default BackgroundContainer;
