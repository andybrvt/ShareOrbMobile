import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const height = Dimensions.get("window").height

// Since most pages need to have a background and the safe area on top that
// is blue so we can make resuable class that we can just wrap around each component
// so taht we dont have to do it again every time
class BackgroundContainer extends React.Component{


  render(){
    return(
      <SafeAreaView style = {styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          />


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
    backgroundColor:"white",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white"
  }
})

export default BackgroundContainer;
