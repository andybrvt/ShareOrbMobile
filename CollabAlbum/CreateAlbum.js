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
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { PlusCircle, ArrowRight, XCircle, Unlock, Lock, Users} from "react-native-feather";
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

  InviteFriendsNav = () => {
    this.props.navigation.navigate("InviteFriends",

    );
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
           {/*
           <View><Text style={styles.headerFont}>Title</Text></View>
           */}
            <TextInput
             placeholder="Describe your album"
             autoCapitalize={true}
             numberOfLines={2}
             placeholderTextColor="#d9d9d9"
             autoCorrect={false}
             style={[
               styles.textInput,

             ]}
             onChangeText = {this.handleFirstNameChange}
             value = {firstName}
           />

         </View>
         {/*
         <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.goBioPage()}>
           </TouchableHighlight>*/}

          <View style={styles.action2}>
             <Users stroke="black" strokeWidth={2.5} width={20} height={20} />
             <View style={{width:'65%'}}>
               <Text style={[
                  styles.bioInput,
                  ]}>
                  <Text>Invite Friends</Text>
               </Text>
             </View>
           <TouchableOpacity onPress={() => this.InviteFriendsNav()}>
             <View style={styles.editButton}>
                <Text style={{color:'#595959',}}>@Friends</Text>
              </View>
          </TouchableOpacity>
          {/* <ArrowRight stroke="black" strokeWidth={2.5} width={20} height={20} />*/}
         </View>


         <View style={styles.action3}>
             {this.state.isEnabled?
           <Unlock stroke="black" strokeWidth={2.5} width={20} height={20} />
           :
             <Lock stroke="black" strokeWidth={2.5} width={20} height={20} />
           }
           <View style={{width:'65%'}}>
             <Text style={[
                styles.bioInput,
                ]}>
                {this.state.isEnabled?
                  <Text style={styles.headerFont}>Public</Text>
                :
                <Text style={styles.headerFont}>Private</Text>
                 }
             </Text>
           </View>

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
   editButton: {

     alignItems: 'center',
     paddingVertical: 7.5,

     borderRadius: 5,
     alignItems: "center",
     backgroundColor: "#f0f0f0",
     padding: 15
   },

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

    paddingLeft: 10,
    fontSize:16,
    color:"#666666",

  },
   textInput: {
    flex: 1,

    paddingLeft: 10,
    paddingTop:10,
    fontSize:16

  },
  action2: {
    marginTop:25,
   flexDirection: 'row',
   minHeight:50,
   left:10,
   padding:10,
 },
 action3: {
  flexDirection: 'row',
  height:50,
  // backgroundColor:'red',
  left:10,
  padding:10,
},
   action: {
    flexDirection: 'column',
    marginTop: 10,
    height:100,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
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
