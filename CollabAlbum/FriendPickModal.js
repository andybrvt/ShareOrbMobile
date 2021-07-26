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
import { Search, ChevronLeft } from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import UserListItem from '../RandomComponents/UserListItem';

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
                     <ChevronLeft
                       height = {45}
                       width = {45}
                       />

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
                         placeholder = "Search Chats"
                         />

                     </View>
                   </View>

                </View>

                <View style = {{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                  }}>
                  {this.props.invitedPeople.map((people,index) => {
                    return(
                      <View
                        key = {index}
                        >
                        <Text>
                          {people}
                        </Text>
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

    height: 40,
    backgroundColor: 'whitesmoke',
    borderRadius: 25,
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
