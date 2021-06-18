import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView
 } from 'react-native';
import axios from "axios";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';



class NewsfeedComment extends React.Component{

  constructor(props){
    super(props)

    this.scrollRef = React.createRef()


  }

  renderHeader = () => (
   <View style={styles.header}>
     <View style={styles.panelHeader}>
       <View style={styles.panelHandle} />
     </View>
   </View>
 );

 renderContent = () => {
   <View style = {{
       backgroundColor: "red",
       height: 200,
     }}>
     <Text> this is some text </Text>
   </View>
 }


  render(){

    return(
      <View style = {{position:'absolute'}}>
        <Button
          title = "open"
           />
        <BottomSheet
          ref = {this.scrollRef}
          snapPoints = {["80%","0%"]}
          initialSnap = {true ? 0 : 1}
          borderRadius = {10}
          renderHeader ={this.renderHeader}
          renderContent = {this.renderContent}
           />

      </View>

    )
  }
}

const styles = StyleSheet.create({
  header: {
  backgroundColor: '#FFFFFF',
  shadowColor: '#333333',
  shadowOffset: {width: -1, height: -3},
  shadowRadius: 2,
  shadowOpacity: 0.4,
  // elevation: 5,
  paddingTop: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
panelHeader: {
  alignItems: 'center',
},
panelHandle: {
  width: 40,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#00000040',
  marginBottom: 10,
},
  container: {

  paddingLeft: 15,
  paddingRight: 16,
  paddingVertical: 14,
  flexDirection: 'row',
  alignItems: 'flex-start',
  // backgroundColor:'red',
},
captionBody: {
  fontSize:20,
},
commentBody: {
  fontSize:12,
},
content: {
  marginLeft: 16,
  flex: 1,
},
contentHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  // backgroundColor:'red',
},
separator: {
  height: 1,
  backgroundColor: "#CCCCCC"
},
image:{


  marginLeft:1
},
time:{
  fontSize:11,
  color:"#808080",
},
name:{
  fontSize:16,
  fontWeight:"bold",
},
})


export default NewsfeedComment;
