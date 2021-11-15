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
  TouchableWithoutFeedback,
  Modal
 } from 'react-native';


 class FlagModal extends React.Component{

   // the different props
   // onCancel
   // onAction
   // visible
   // height
   // width
   // information
   //

   onCancel = () => {
     this.props.onCancel()
   }

   onAction = () => {
     this.props.onAction()
   }

   render(){
     return(
       <View>
         <Modal
           transparent = {true}
           visible = {this.props.visible}
           >
           <TouchableWithoutFeedback
              onPress = {() =>this.onCancel()}>
             <View
               onPress = {() => this.onCancel()}
               style = {{
                 backgroundColor: "#000000aa",
                 flex: 1,
                 alignItems: 'center',
                 justifyContent: 'center'
               }}>
               <View style = {{
                   backgroundColor: "#ffffff",
                   // margin: 50,
                   padding: 30,
                   borderRadius: 15,
                   height: this.props.height,
                   width: this.props.width,
                   alignItems: 'center'
                   // flex: 1
                 }}>
                 <Text style = {{
                     textAlign: 'center',
                     fontSize: 25,
                     marginBottom: 10
                   }}>{this.props.title}</Text>
                 <Text style = {{
                    textAlign: "center",
                    fontSize: 16}}>
                   {this.props.information}
                 </Text>
                 <TouchableOpacity
                   onPress = {() => this.onAction()}
                   style = {styles.button}
                   >
                   <Text
                     style = {styles.buttonText}
                     >{this.props.acceptText}</Text>
                 </TouchableOpacity>

                 <View
                   style = {styles.cancelText}>
                   <Text
                     onPress = {() => this.onCancel()}

                     >{this.props.cancelText}</Text>
                 </View>

               </View>
             </View>
           </TouchableWithoutFeedback>

         </Modal>
       </View>
     )
   }
 }

const styles = StyleSheet.create({
  button: {
    position: "relative",
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#1890ff",

  },
  buttonText: {
    color: 'white',
    fontSize: 14
  },
  cancelText: {
    marginTop: 20,
  }
})

export default FlagModal;
