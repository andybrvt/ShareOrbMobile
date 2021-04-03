import React from 'react';
import MainLogo from '../logo.svg';
import Frame from '../Frame.svg';
import { connect } from "react-redux";

import { View, Text, StyleSheet } from 'react-native';


// This will function as a loading screen while informaiton
// is try to get loaded in

class LoadingScreen extends React.Component{



  render(){

  // The funciton here will be pretty much use to render the info
  // so what happens here is that when you login and authenticated
  // it will lead you here and then you would check if loading is good
  // and then lead to the home page
    if(this.props.username){
      // This function here will turn off the loading
    }

    return (
      <View style = {styles.container}>
        <Frame height = {100} width = {200} />

      </View>
    )
  }

}

const mapStateToProps = state => {
  // you get the token here
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    username: state.auth.username
  };
};

export default connect(mapStateToProps)(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1890ff",
    alignItems: "center",
    justifyContent: "center"
  }

})
