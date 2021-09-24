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
import { Search, PlusCircle, ArrowLeft} from "react-native-feather";
import UserSearchBar from './UserSearchBar'


const width = Dimensions.get("window").width


class SearchResultsMultiple extends React.Component{

  renderItem = ({item}) => {


    return(
      <TouchableOpacity
        onPress = {() => this.props.onSelect(item)}
        >
        <View style={{
           flexDirection:'row',
           padding:15
         }}>
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

  frequentChatPeople=()=>{

    let invited = []
    if(this.props.invited){
      invited = this.props.invited
    }
    return(
      <FlatList
        style = {{

        }}
        data = {invited}
        renderItem = {this.renderInvited}
        keyExtractor={(item, index) => String(index)}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}

         />
    )
    // <ScrollView
    //   showsHorizontalScrollIndicator={false}
    //   horizontal = {true}
    //   style = {styles.frequentPeopleContainer}>
    //   <View style={[styles.column]}>
    //     <Avatar
    //       rounded
    //       source = {{
    //         uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    //       }}
    //       size = {70}
    //     />
    //   </View>
    //
    //   <View style={[styles.column]}>
    //      <Avatar
    //        rounded
    //        source = {{
    //          uri: 'https://images.unsplash.com/photo-1610555248279-adea4c523fb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
    //        }}
    //        size = {70}
    //      />
    //   </View>
    //   <View style={[styles.column]}>
    //     <Avatar
    //       rounded
    //       source = {{
    //         uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    //       }}
    //       size = {70}
    //     />
    //   </View>
    //
    //   <View style={[styles.column]}>
    //     <Avatar
    //       rounded
    //       source = {{
    //         uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    //       }}
    //       size = {70}
    //     />
    //   </View>
    //   <View style={[styles.column]}>
    //     <Avatar
    //       rounded
    //       source = {{
    //         uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    //       }}
    //       size = {70}
    //     />
    //   </View>
    //   <View style={[styles.column]}>
    //     <Avatar
    //       rounded
    //       source = {{
    //         uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    //       }}
    //       size = {70}
    //     />
    //   </View>
    //   <View style={[styles.column]}>
    //     <Avatar
    //       rounded
    //       source = {{
    //         uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    //       }}
    //       size = {70}
    //     />
    //   </View>
    //
    //
    //   <TouchableOpacity
    //
    //     style={[styles.column]}>
    //      <PlusCircle
    //        stroke = "white"
    //        fill = {'gray'}
    //        width = {70}
    //        height = {70}
    //         />
    //     </TouchableOpacity>
    //
    //
    // </ScrollView>

  }



  render(){

    let data = [];
    if(this.props.data){
      data = this.props.data
    }


    return(
      <KeyboardAvoidingView
        behavior = {Platform.OS =='ios'?"padding":""}
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
                data = {data}
                renderItem = {this.renderItem}
                keyExtractor={(item, index) => String(index)}
                 />
            </View>
          }

        <View style = {{
            height: 90,
            width: width,
            bottom: 20
          }}>

          {this.frequentChatPeople()}

        </View>



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
