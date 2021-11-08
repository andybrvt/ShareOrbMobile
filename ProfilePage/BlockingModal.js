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
  Modal,
  FlatList
 } from 'react-native';
 import { Avatar } from 'react-native-elements';
 import { Circle } from "react-native-feather";


 class BlockingModal extends React.Component{

   // the different props
   // onCancel
   // onAction
   // visible
   // height
   // width
   // information
   //
   state = {
     selectedItems: []
   }


   addSelectedItem = (orbId) =>{


     if(!this.state.selectedItems.includes(orbId)){
       this.setState({
         selectedItems: [...this.state.selectedItems, orbId]
       })
     } else {
       const items = this.state.selectedItems.filter(item => item !== orbId)
       this.setState({
         selectedItems: items
       })


     }



   }



   onCancel = () => {
     this.props.onCancel()
   }

   onAction = () => {
     this.props.onAction()
   }


   renderItem = ({item}) => {

     console.log(item)

     const selectedItems = this.state.selectedItems
     return(
       <TouchableOpacity style = {{
           height: 60,
           width: '100%',
           flexDirection: "row",
           alignItems: 'center',
           padding: 10,
           borderRadius: 10,

         }}

         onPress = {() => this.addSelectedItem(item.id) }
         >

         <View style = {{
             marginRight: 10
           }}>
           <Avatar

             size = {35}
             rounded
             source = {{
               uri: `${global.IMAGE_ENDPOINT}`+item.groupPic
             }}
             />
         </View>

         <View >
           <Text>{item.group_name}</Text>
         </View>


         <View style = {{
             position:'absolute',
             right: 10,

           }}>
           {
             selectedItems.includes(item.id) ?

             <Circle fill = "#1890ff"/>

             :

             <Circle/>

           }

         </View>



       </TouchableOpacity>
     )
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
                 flex: "1",
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

                 <FlatList

                   style = {{
                     backgroundColor: 'whitesmoke',
                     width: '100%',
                     height: 250}}
                   data = {this.props.yourGroup}
                   keyExtractor={(item, index) => String(index)}
                   renderItem = {this.renderItem}
                    />
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

export default BlockingModal;
