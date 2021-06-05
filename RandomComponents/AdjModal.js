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
  Modal
 } from 'react-native';


 class AdjModal extends React.Component{



   render(){
     return(
       <View>
         <Modal
           transparent = {true}
           visible = {true}
           >
           <View style = {{
               backgroundColor: "#000000aa",
               flex: "1",
               alignItems: 'center',
               justifyContent: 'center'
             }}>
             <View style = {{
                 backgroundColor: "#ffffff",
                 // margin: 50,
                 padding: 30,
                 borderRadius: 10,
                 height: 230,
                 width: 300,
                 alignItems: 'center'
                 // flex: 1
               }}>
               <Text style = {{
                  textAlign: "center",
                  fontSize: 20}}>
                 Are you sure you want to delete this photo?
               </Text>
               <TouchableOpacity
                 style = {styles.button}
                 >
                 <Text
                   style = {styles.buttonText}
                   >Accept</Text>
               </TouchableOpacity>

               <View style = {styles.cancelText}>
                 <Text> Nope, I'm good </Text>
               </View>

             </View>
           </View>
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

export default AdjModal;
