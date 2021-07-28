import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import ExploreSearchBar from '../Explore/ExploreSearchBar';
import { Search, ChevronLeft, ArrowLeft } from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import UserListItem from '../RandomComponents/UserListItem';
import { Avatar } from 'react-native-elements';
class FriendPickModal extends React.Component{

  state = {
    input: ""
  }

  renderItem = ({item}) => {
    return(
      <View>
        <UserListItem
          item = {item}
          action = {this.props.action}

           />
      </View>
    )
  }

   render(){
     return(
       <Modal
         style = {{flex: 1}}
         visible = {this.props.visible}>
       <BackgroundContainer>
         <TouchableWithoutFeedback
           onPress = {() => Keyboard.dismiss()}
            style = {{
              flex:1}}>

              <View style = {{flex: 1}}>
                <View style = {{

                    height: 60,
                    justifyContent: 'center',
                    flexDirection: 'row',

                  }}>
                   <TouchableOpacity
                     style = {{
                       width: '10%',
                       height: 60,
                       justifyContent:'center'
                     }}
                     onPress = {this.props.onClose}
                     >
                     <ArrowLeft
                       style={{left:10}}
                       stroke="black" strokeWidth={2.5} width={22.5} height={22.5} />

                   </TouchableOpacity>
                   <View style = {{
                       width: '90%',
                       height: 60,
                       justifyContent: 'center'
                     }}>
                     <View style = {styles.searchText}>

                       <Search
                         style={{marginRight:10, color: 'gray',left:20}}
                         width= {12.5}
                         height= {12.5}
                          />

                       <TextInput
                         value = {this.state.input}
                         onChangeText = {this.props.onChange}
                         // onFocus = {() => this.props.onOpen()}
                         style={{
                           width: "80%",
                           // backgroundColor: 'yellow',
                           left:20}}
                         // underlineColorAndroid = "transparent"
                         placeholder = "Search People"
                         />

                     </View>
                   </View>

                </View>

                <View style = {{
                    flexDirection: 'row',
                  }}>
                  {this.props.invitedPeople.map((people,index) => {
                    return(
                      <View style={{right:10}}>
                      <View
                        style={{marginLeft:20}}
                        key = {index}
                        >
                        <Avatar

                          size={40}
                          rounded
                          source = {{
                            uri: `${global.IMAGE_ENDPOINT}`+people.profile_picture
                          }}
                        />
                        <Text>
                          {people.username}
                        </Text>
                      </View>
                      </View>
                    )
                  })}
                </View>


                <View style = {{
                    flex: 1,
                  }}>
                  <FlatList
                    data = {this.props.following}
                    renderItem = {(item) => this.renderItem(item)}
                    keyExtractor={(item, index) => String(index)}
                     />
                </View>
              </View>


         </TouchableWithoutFeedback>
       </BackgroundContainer>
     </Modal>

     )
   }
}

const styles = StyleSheet.create({
  searchText: {
    flexDirection: 'row',
    height:37.5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    width:'90%',
    alignItems: 'center',


  },
  searchIcon: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: "center"
  },

  searchInput: {
    flex: 1,
    justifyContent: "center",
    flexDirection:'row'
  },


  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
})

export default FriendPickModal;
