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
 import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


 class FinalPostingPage extends React.Component{

   componentDidMount(){
     this.props.navigation.setOptions({
       title: "Some stuff"
     })
   }

   render(){

     return (
       <View>
         <Modal
           animationType = "slide"
           visible = {this.props.visible}
           >

           <SafeAreaView
             style = {styles.container}
             >
             <View
               style = {styles.topContainer}>
               <Text> Arrange pictures here </Text>
             </View>
             <View
               style = {styles.bottomContainer}
               >
               <TextInput
                 style = {{
                   fontSize: 25
                 }}
                placeholder="Write something about your day..."
                placeholderTextColor="lightgray"

              />
             </View>

           </SafeAreaView>

         </Modal>

       </View>


     )

   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 2,
    backgroundColor: 'green'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'pink'
  }


})

 export default FinalPostingPage;
