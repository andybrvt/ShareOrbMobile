import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Switch
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { PlusCircle} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";

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
     return (
       <BackgroundContainer>
         <View>
            <Text> Title</Text>
         </View>
         <View>
            <Text> Date</Text>
         </View>
         <View>
            <Text> Invite Friends</Text>
         </View>

         <View>
            <Text>Public/Private</Text>
              <Switch
               trackColor={{ false: "#767577", true: "#81b0ff" }}
               thumbColor={this.state.isEnabled ? "#1890ff" : "#f4f3f4"}
               ios_backgroundColor="#3e3e3e"
               onValueChange={this.toggleSwitch}
               value={this.state.isEnabled}
             />
         </View>
         <View>
            <Text>Cover Pic</Text>
         </View>


       </BackgroundContainer>

     )
   }
 }
 const styles = StyleSheet.create({
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
