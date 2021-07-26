import React from 'react';
import { Text,
   View,
  Button,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
 } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Search,} from "react-native-feather";

class UserListItem extends React.Component{

  // viewProfile = (username) => {
  //   this.props.navigation.navigate('ProfilePage',{
  //     username: username
  //   })
  // }

  render(){

    let item = {}

    if(this.props.item){
      item = this.props.item
    }

    return(
      <TouchableOpacity
        onPress = {() => this.props.action(item.username)}
        >
        <View style={{
           flexDirection:'row',
           padding:15}}>
          <View style={{flex:1}}>
            <Avatar
              size={40}
              rounded
              source = {{
                uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture
              }}
            />
          </View>
        <View style={{

            flex:6,
            flexDirection:'column',
            }}>
          <View style = {{flexDirection: 'row'}}>
            <Text style = {{fontWeight: 'bold'}}>{global.NAMEMAKE(item.first_name, item.last_name, 20)} </Text>
          </View>
          <Text>{item.username}</Text>



        </View>
      </View>
      </TouchableOpacity>
    )
  }
}

export default UserListItem;
