import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Switch,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { PlusCircle, ArrowRight, XCircle} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { moderateScale } from 'react-native-size-matters';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
const width=SCREEN_WIDTH;
const coverScale = 1.7;
const col = 3;
class CreateAlbum extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isEnabled:false,

    }
  }

  toggleSwitch = () => {

    this.setState({
      isEnabled:!this.state.isEnabled,
    })

  }
   render(){
     const {firstName, lastName, username} = this.state
     return (
       <BackgroundContainer>
         <View style={styles.action}>

           <View><Text style={styles.headerFont}>Title</Text></View>

            <TextInput
             placeholder=""
             placeholderTextColor="#666666"
             autoCorrect={false}
             style={[
               styles.textInput,

             ]}
             onChangeText = {this.handleFirstNameChange}
             value = {firstName}
           />

         </View>
         <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.goBioPage()}>
          <View style={styles.action2}>

           <View style={{width:'90%'}}>

           <Text  style={[
              styles.bioInput,
              ]}>
                  <Text>Invite Friends</Text>
           </Text>
           </View>

           <ArrowRight stroke="black" strokeWidth={2.5} width={20} height={20} />
         </View>
         </TouchableHighlight>

         <View>
            <Text style={{padding:20}}>Public/Private</Text>
              <Switch
               style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
               trackColor={{ false: "#767577", true: "#81b0ff" }}
               thumbColor={this.state.isEnabled ? "#1890ff" : "#f4f3f4"}
               ios_backgroundColor="#3e3e3e"
               onValueChange={this.toggleSwitch}
               value={this.state.isEnabled}
             />
         </View>
         <View style={{alignItems:'center', top:'12.5%'}}>
            <Text style={{fontSize:18, bottom:30}}>Cover Pic</Text>
            <View style={styles.bigImageContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress = {this.handleChoosePhoto}
                style = {styles.addSmallImage}>
                <PlusCircle
                  height = {50}
                  width = {50}
                  stroke = "lightgray"
                  fill= "white" />

              </TouchableOpacity>
            </View>
         </View>


       </BackgroundContainer>

     )
   }
 }
 const styles = StyleSheet.create({
   addSmallImage: {
     width: "90%",
     height: "90%",
     borderWidth: 3,
     borderRadius: 15,
     borderStyle: 'dashed',
     borderColor: 'lightgray',
     alignItems: "center",
     justifyContent: "center"
     // backgroundColor: 'lightgray'

   },
   bigImageContainer:{
     width: Math.round(SCREEN_WIDTH/3)*coverScale,
     height: Math.round(SCREEN_WIDTH/3)*coverScale,
     // backgroundColor:'red',
     overflow:"hidden",
     alignItems: 'center',
     justifyContent: "center",
     position: "absolute",
     shadowColor:'black',
     shadowOffset:{width:0,height:2},
     shadowOpacity:0.2,
   },
   bioInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,
    fontSize:16,
    color:"#666666",

  },
   textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,
    paddingTop:10,
    fontSize:16

  },
  action2: {
   flexDirection: 'row',
   marginTop: 25,
   height:50,
   borderBottomWidth: 1,
   borderBottomColor: '#f2f2f2',

   padding:10,
 },
   action: {
    flexDirection: 'column',
    marginTop: 25,
    height:75,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',

    padding:10,
  },
  headerFont:{
    paddingLeft:10, fontSize:15, color:"#666666",
  },
   trendingText: {
     color: "black",
     fontSize: 18,
     fontWeight: 'bold',
     padding:10
   },
   trendingDaysContainer: {
     height: "82%",
   },
 })

 export default CreateAlbum;
