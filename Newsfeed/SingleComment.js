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


class SingleComment extends React.PureComponent{


  render(){
    const item = this.props.item
    const profilePic = `${global.IMAGE_ENDPOINT}`+item.commentUser.profile_picture
    const user = item.commentUser

    return(
      <View style = {styles.container}>

        <View style = {styles.leftContainer}>
          <Avatar
            size = {40}
            rounded
            source = {{
              uri: profilePic
            }}
            />
        </View>

        <View style = {styles.rightContainer}>
          <View>
            <Text style = {styles.nameText}>{global.NAMEMAKE(
                user.first_name,
                user.last_name,
                30
              )}</Text>

          </View>

          <View style = {{marginTop: 5, marginBottom: 2}}>
            <Text style = {styles.mainText}>{item.body} </Text>

          </View>

          <View>
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
    marginTop: 10
  },
  leftContainer:{
    width: "15%",
    alignItems: "center",
  },
  rightContainer: {
    width: "70%"
  },
  timeText: {
    color: 'gray',
    fontSize: 12
  },
  mainText:{
    fontSize: 16,
    color: 'black',

  },
  nameText: {
    fontSize: 14,
    color: "black"
  }
})

export default SingleComment;
