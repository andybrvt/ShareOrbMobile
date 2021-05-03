import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
 } from 'react-native';
 import { Avatar } from 'react-native-paper';
 import { connect } from "react-redux";
 import FakeRoundedInput from '../RandomComponents/FakeRoundedInput';

 let {height, width} = Dimensions.get('window')

// This function will be used to show the uploading block
// so that you can upload pictures and it will open up a new
// page that allows you to select pictures and upload them causually
class NewsfeedButtonContainer extends React.Component{


  render(){
    

    let profilePic = ""

    if(this.props.profilePic){
      profilePic = this.props.profilePic
    }
    return(
      <View

        style = {styles.container}>

        <View style = {styles.leftContainer}>
          <Avatar.Image
            size = {40}
            source = {{
              url: `${global.IMAGE_ENDPOINT}`+profilePic
            }}
           />

        </View>

       <View style = {styles.rightContainer}>

         <FakeRoundedInput
           onPagePost = {this.props.onPagePost}
            />
       </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    height: 80,
    width: width,
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: "row"
  },
  rightContainer: {
    flex:6,
    justifyContent: "center"
  },
  leftContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },


})

const mapStateToProps = state => {
    return {
      profilePic: state.auth.profilePic
    }
}

export default connect(mapStateToProps)(NewsfeedButtonContainer);
