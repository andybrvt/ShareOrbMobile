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
  TouchableOpacity,

 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { ArrowRight, XCircle, Unlock, Lock, Users, X, Search} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { moderateScale } from 'react-native-size-matters';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
const width=SCREEN_WIDTH;
const coverScale = 1.7;
const col = 3;
class InviteFriends extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isEnabled:false,

    }
  }

  renderClose = () => {
    return (
      <TouchableOpacity
      onPress = {() => this.props.navigation.goBack(0)}
      >
        <X
          height = {25}
          width = {25}
          style={{left:'50%'}}
          stroke = "black"
          />

     </TouchableOpacity>

    )
  }


   render(){
     this.props.navigation.setOptions({
       headerLeft: () => this.renderClose(),
      })
     const {firstName, lastName, username} = this.state
     return (
       <BackgroundContainer>
         <View style={{flexDirection:'row', top:10}}>
           <View style={{flex:1, position:'absolute', zIndex:99, left:'5%', top:'30%'}}>
             <Search
               strokeWidth={2}
               height = {17.5}
               width = {17.5}
               style={{left:10}}
               stroke = "#bfbfbf"
               />
           </View>

           <View style={{flex:10}}>
               <View
                 style={{alignItems:'center'}}
                 >

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                // value={query}
                // onChangeText={queryText => handleSearch(queryText)}
                placeholder="Search"
                style={{ backgroundColor: '#f0f0f0',
                  width:'90%',
                  paddingHorizontal: 40,
                  paddingVertical:5,
                }}>
              </TextInput>
            </View>
          </View>
      </View>

         {/*
         <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.goBioPage()}>
           </TouchableHighlight>*/}
       </BackgroundContainer>

     )
   }
 }
 const styles = StyleSheet.create({
   searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
},
searchIcon: {
    padding: 10,
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

 export default InviteFriends;
