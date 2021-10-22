import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
 } from 'react-native';
 import { Avatar } from 'react-native-elements';

class NavPicComment extends React.PureComponent {
  render(){
    const item = this.props.item
    const profilePic = `${global.IMAGE_ENDPOINT}`+item.commentUser.profile_picture
    const user = item.commentUser
    return(
      <View style = {styles.container}>
        <View style = {styles.leftContainer}>
          <Avatar
            size = {35}
            rounded
            source = {{
              uri: profilePic
            }}
            />
        </View>
        <View style = {styles.rightContainer}>
          <View>
            <Text style = {styles.nameText}>{user.username+" "}</Text>
            <Text style = {styles.mainText}>{item.body} </Text>
          </View>
          <View style={{flexDirection:'row', marginTop:5}}>
            <Text style = {styles.timeText}>{global.RENDER_TIMESTAMP(item.created_on)}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    flex: 1,
    padding:5,
  },
  leftContainer:{
    width: "15%",
    marginTop: 5,
    // backgroundColor:'red',
    alignItems: "center",
  },
  rightContainer: {

    width: "75%",
    left:'5%',
  },
  timeText: {
    color: 'gray',
    fontSize: 11,
    fontFamily:'Nunito-SemiBold',
  },
  mainText:{
    marginTop:2.5,
    fontSize: 13,
    color: 'black',
    fontFamily:'Nunito-SemiBold',
  },
  nameText: {
    marginTop:2.5,
    fontSize: 13.5,
    color: "black",
    fontFamily:'Nunito-Bold',
  }
})

export default NavPicComment;
