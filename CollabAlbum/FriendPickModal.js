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
  TouchableWithoutFeedback
} from 'react-native';
import ExploreSearchBar from '../Explore/ExploreSearchBar';
import { Search, ChevronLeft } from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';


class FriendPickModal extends React.Component{



   render(){
     return(
       <Modal
         style = {{flex: 1}}
         visible = {this.props.visible}>
       <BackgroundContainer>
         <TouchableWithoutFeedback
           onPress = {() => Keyboard.dismiss()}
            style = {{
              backgroundColor: 'blue',
              flex:1}}>

              <View style = {{flex: 1}}>
                <View style = {{

                    backgroundColor: 'pink',
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
                         value = {this.props.value}
                         onChangeText = {this.props.onChange}
                         // onFocus = {() => this.props.onOpen()}
                         style={{
                           width: "80%",
                           // backgroundColor: 'yellow',
                           left:20}}
                         underlineColorAndroid = "transparent"
                         placeholder = "Search Chats"/>

                     </View>
                   </View>

                </View>


              </View>

             {/*
               <View style = {{
                   flexDirection: 'row',
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: 'pink'
                 }}>


                 <View style = {{
                     width: this.props.visible ? '75%' : '90%',
                   }}>

                   <View style = {styles.searchText}>

                     <Search
                       style={{marginRight:10, color: 'gray',left:20}}
                       width= {12.5}
                       height= {12.5}
                        />

                     <TextInput
                       value = {this.props.value}
                       onChangeText = {this.props.onChange}
                       onFocus = {() => this.props.onOpen()}
                       style={{
                         width: "80%",
                         // backgroundColor: 'yellow',
                         left:20}}
                       underlineColorAndroid = "transparent"
                       placeholder = "Search Chats"></TextInput>

                   </View>
                 </View>
                 {
                   this.props.visible ?

                   <View style = {{
                       width:'20%'
                     }}>
                     <Button
                       onPress = {() => this.props.onClose()}
                       color="white"
                       title = "cancel"
                        />
                   </View>

                   : null
                 }



               </View>


               */}

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
