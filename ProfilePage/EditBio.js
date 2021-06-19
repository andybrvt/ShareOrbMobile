import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity

 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

 const Tab = createMaterialTopTabNavigator();
 class EditBio extends React.Component{

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   constructor(props) {
   super(props);
   this.state = {
    value:'',
    contentBio:this.props.route.params.bio,
    };
  }

   render(){
     return (
       <BackgroundContainer>
         <View style={styles.addBorder}>
         <TextInput
            style={{fontSize:15}}
            multiline = {true}
            numberOfLines = {2}
            maxLength = {80}
            placeholder='Enter Bio..'
            value={
              (this.props.route.params.bio)?
              this.state.contentBio :
              this.state.value}
            onChangeText={
            (this.props.route.params.bio)?
            (contentBio) => this.setState({contentBio}) :
             (value) => this.setState({value})
            }
            >
          </TextInput>
          <View style={styles.characterCount}>
             <Text style={{color:"#666666",}}>
               {(this.props.route.params.bio)?
               this.state.contentBio.length :
               this.state.value.length}/80
             </Text>
           </View>
         </View>
         <View style={{flexDirection:'row'}}>
           <View style={{flex:4}}></View>
           <View style={{flex:1}}>
             <TouchableOpacity>
             <View style={styles.editButton}>
              <Text style={{color:'white'}}>Submit</Text>
             </View>
             </TouchableOpacity>
            </View>
          </View>
       </BackgroundContainer>
     )
   }
 }
{/*<View
 style={styles.editButton}>
 <Text style={{color:'white'}}>Submit</Text>
</View>
 */}
 export default EditBio;


 const styles = StyleSheet.create({
   editButton: {

     paddingVertical: 5,
     paddingHorizontal: 15,
     borderRadius: 4,
     top:15,
     // backgroundColor: '#1890ff',
     backgroundColor:'coral',
     justifyContent:"center",
     backgroundColor: "#1890ff",
     padding: 10,
     right:25,
   },
   characterCount:{
     flexDirection: "row",
     justifyContent: "flex-end",
     padding:10,

   },
   textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,


  },

  addBorder:{
    padding:30,
    borderTopWidth:1,
    borderTopColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',

  }

 })
