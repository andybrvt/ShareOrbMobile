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
  ScrollView,
  Dimensions
 } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Search, PlusCircle, ArrowLeft, CheckCircle} from "react-native-feather";
import UserSearchBar from './UserSearchBar'


const width = Dimensions.get("window").width


class SearchResultsMultiple extends React.Component{
  constructor(props){
    super(props)
    this.state = {
     refresh:false,
     };
  }
  renderItem = ({item}) => {


    return(
      <TouchableOpacity
        onPress = {() => this.props.onSelect(item)}
        >
        <View style={{
           flexDirection:'row',
           padding:15
         }}>
          <View>
            <Avatar
              size={40}
              rounded
              source = {{
                uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture
              }}
            />
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{
                width:'50%',
                marginLeft:10,
                flexDirection:'column',
                }}>
              <View style = {{flexDirection: 'row'}}>
                <Text style = {{fontFamily:'Nunito-Bold'}}>{global.NAMEMAKE(item.first_name, item.last_name, 20)} </Text>
              </View>
              <Text style={{fontFamily:'Nunito-SemiBold'}}>{item.username}</Text>
            </View>
            <View style={{width:'50%', alignItems:'center', justifyContent:'center' }}>
              {this.props.invited.includes(item)?
                <CheckCircle
                  stroke = "#52c41a"
                  strokeWidth = {2}
                  height = {25}
                  width = {25}
                   />
                :
                <Text></Text>
              }
            </View>
          </View>
      </View>
      </TouchableOpacity>
    )
  }

  renderInvited = ({item}) => {
    const pic = `${global.IMAGE_ENDPOINT}`+item.profile_picture
    return(
      <View style={[styles.column]}>
         <Avatar
           rounded
           source = {{
             uri:pic
           }}
           size = {70}
         />
       <Text>{item.first_name} {item.last_name}</Text>
       </View>
    )
  }



  render(){

    let data = [];
    if(this.props.data){
      data = this.props.data
    }


    return(
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS =='ios'?0:-300}
        behavior = {Platform.OS =='ios'?"padding":"height"}
        style = {{
          flex: 1,
          alignItems: 'center',
        }}>

        <View style = {{
            alignItems: 'center',
          }}>

          <View style={{flexDirection:'row'}}>
            <UserSearchBar
              value = {this.props.searchValue}
              onChange = {this.props.onSearchChange}
              onClose = {this.props.onClose}
              />
          </View>

          {
            data.length === 0 ?
            <View style = {{
                flex:1,
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Search
                stroke = "gainsboro"
                strokeWidth = {2}
                height = {50}
                width = {50}
                 />
               <Text
                 style ={{color: 'gainsboro', fontFamily:'Nunito-Bold', fontSize:18}}
                 >Looking for someone?</Text>
            </View>

            :

            <View style = {{
                width: width,
                flex: 1,
              }}>
              <FlatList
                extraData={this.props.invited}
                data = {data}

                renderItem = {this.renderItem}
                keyExtractor={(item, index) => String(index)}
                 />
            </View>
          }
        {/*
        <View style = {{
            width: width,
            bottom: 20
          }}>
          {this.frequentChatPeople()}
        </View>
        */}


        </View>



      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  frequentPeopleContainer: {
    width: width,
  },
  column:{
    alignItems: 'center',       //THIS LINE HAS CHANGED
    marginLeft:15,
    justifyContent:'center',

  },
})

export default SearchResultsMultiple;
