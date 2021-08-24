import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,

  TextInput,
  TouchableHighlight
 } from 'react-native';
import { ArrowRightCircle, Plus, Smile} from "react-native-feather";
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import EmojiPicker from 'rn-emoji-keyboard';
import {TouchableOpacity} from 'react-native-gesture-handler';
 class RealRoundedInput extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       isOpen:false,
       setIsOpen:false,
     }
   }
   onSubmit = () => {
     this.props.onCommentSubmit()
   }

   onCommentFocus = () => {
     this.props.onCommentFocus()
   }


   render(){
     return (
       <TouchableHighlight
         // onPress = {() => this.props.onPagePost()}
         style = {{
           // backgroundColor: 'red',
           position: 'relative',
           width: "100%",
           height: '4.5%',
           alignItems: "center",

           justifyContent: 'center',
         }}
         underlayColor = "gray"
         >
         <View style = {styles.wholeContainer}>
           <View style={{width:'12.5%'}}>
             <Avatar
               size={35}
               rounded
               source = {{
                 uri: `${global.IMAGE_ENDPOINT}`+this.props.profilePic
               }}
             />
           </View>

           <View style={{justifyContent:'center', width:'10%'}}>
             <TouchableOpacity onPress={() => this.setState({isOpen:true})}>
               <Smile
                 stroke = "#f0f0f0"
                 fill="white"
                 width = {25}
                 height = {25}
                  />
             </TouchableOpacity>
             <EmojiPicker
               onEmojiSelected = {(e) => this.props.onEmojiChange(e)}
               open={this.state.isOpen}
               onClose={() => this.setState({isOpen: false})} />
          </View>
         <View style = {styles.midContainer}>
             <View
                style = {styles.inputContainer}>
                <TextInput
                  style = {{
                    height: 55,
                  }}
                  onFocus = {() => this.onCommentFocus()}
                  placeholder = "Write a comment..."
                  value = {this.props.value}
                  onChangeText = {(e) => this.props.onChange(e)}
                 />
              </View>
           </View>
           {/*
             <Button
               disabled = {this.props.value.length > 0 ? false : true}
               onPress = {() => this.onSubmit()}
               title = "send"
                />

             */}
            {
             this.props.value.length > 0 ?
             <TouchableOpacity
               onPress = {() => this.onSubmit()}
               style = {styles.rightContainer}>
               <ArrowRightCircle fill = "#1890ff" stroke = "white" width = {35} height = {35}/>
             </TouchableOpacity>
             :
             <View
               style = {styles.rightContainer}>
               <ArrowRightCircle fill = "gray" stroke = "white" width = {35} height = {35}/>
             </View>
           }
         </View>
       </TouchableHighlight>
     )
   }
 }

const styles = StyleSheet.create({
  wholeContainer: {
    flexDirection: 'row',
    borderTopWidth:1,
    borderColor: '#f0f0f0',
    paddingTop:10,
    backgroundColor:'white'
    // backgroundColor:'red',
  },
  leftContainer: {
    // backgroundColor: "pink",
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  midContainer: {
    // backgroundColor: "blue",
    width: "65%",

  },
  rightContainer: {
    // backgroundColor: "yellow",

    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    // borderWidth: 1,
    color: "gray",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    height: 35,
    justifyContent: "center",
    paddingLeft: 10
  },
  postInputText: {
    marginLeft: 10,
  },
})

const mapStateToProps = state => {
  return {
    profilePic: state.auth.profilePic
  }
}

export default connect(mapStateToProps)(RealRoundedInput);
