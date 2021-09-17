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


class SearchResults extends React.Component{




  renderItem = ({item}) => {


    return(
      <TouchableOpacity
        onPress = {() => this.props.viewProfile(item.username)}
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
            <Text style = {{fontFamily:'Nunito-Bold'}}>{global.NAMEMAKE(item.first_name, item.last_name, 20)} </Text>
          </View>
          <Text style={{fontFamily:'Nunito-SemiBold'}}>{item.username}</Text>



        </View>
      </View>
      </TouchableOpacity>
    )
  }

  render(){

    let data = [];
    if(this.props.data){
      data = this.props.data
    }

    return(
      <KeyboardAvoidingView
        behavior = "padding"
        style = {{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {
          data.length === 0 ?

          <View style = {{
              height: 100,
              width: 200,
              alignItems: 'center',
              justifyContent: 'center',
              top:50,
            }}>
            <Search
              stroke = "gainsboro"
              strokeWidth = {2}
              height = {60}
              width = {60}
               />
             <Text
               style ={{color: 'gainsboro', fontFamily:'Nunito-Bold', fontSize:18}}
               >Looking for someone?</Text>
          </View>

          :

          <View style = {{
              height: 200,
              width: "100%",
              flex: 1,

            }}>
            <FlatList
              data = {data}
              renderItem = {this.renderItem}
              keyExtractor={(item, index) => String(index)}

               />
          </View>
        }

      </KeyboardAvoidingView>
    )
  }
}




export default SearchResults;
