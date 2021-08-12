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
            {/*
              {global.NAMEMAKE(
                  user.first_name,
                  user.last_name,
                  30
                )}
            */}
            <Text style = {styles.nameText}>{user.username+" "}</Text>
            <Text style = {styles.mainText}>{item.body} </Text>
          </View>



          <View style={{flexDirection:'row', marginTop:5}}>
            <Text style = {styles.timeText}>{global.RENDER_TIMESTAMP(item.created_on)}</Text>
            <Text style={{fontWeight:'bold',fontSize:12,  color:'gray', marginLeft:10}}>Reply</Text>
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
    padding:12.5,
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
    fontSize: 12
  },
  mainText:{
    marginTop:5,
    fontSize: 14,
    color: 'black',

  },
  nameText: {
    fontSize: 14,
    color: "black",
    fontWeight:'bold',
  }
})

export default SingleComment;
