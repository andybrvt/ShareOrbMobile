import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';
import authAxios from '../util';
import * as authActions from '../store/actions/auth';

 class Announcements extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
      contentBio:'',
     }
   }

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   renderSave = () => (
     <View style={{marginRight:10,}}>
       <Button
         onPress = {() =>this.onHandleSaveBio()}
         title = "Save"/>
     </View>
   )

   onBioChange = (e) => {
     this.setState({
       contentBio: e
     })
     if(e !== this.props.bio){
       this.props.navigation.setOptions({
         headerRight: () => this.renderSave()
       })
     } else {
       this.props.navigation.setOptions({
         headerRight: null
       })
     }

   }

   selectItem(item) {
     this.props.navigation.navigate("ProfilePage", {
       username: item.username
     })
   }

   componentDidMount(){

   }


   render(){


     // if(this.props.profile){
     //   if(this.props.profile.get_following){
     //     data = this.props.profile.get_following
     //   }
     // }
     return (
       <BackgroundContainer>
         <View style = {{
             flex: 1,
           }} >

           <View style={styles.addBorder}>
           <TextInput
              style={{fontSize:15}}
              multiline = {true}
              numberOfLines = {2}
              maxLength = {80}
              placeholder='Enter Announcments...'
              value={this.state.contentBio}
              onChangeText={this.onBioChange}
              />

            <View style={styles.characterCount}>
               <Text style={{color:"#666666",}}>

                 {this.state.contentBio.length}/80
               </Text>
             </View>
           </View>

         </View>
       </BackgroundContainer>
     )
   }
 }

 const mapStateToProps = state => {
   return {
     followers:state.auth.followers,
     following:state.auth.following,
     profile: state.explore.profile,
     curId: state.auth.id,
     username: state.auth.username
   }
 }

 const mapDispatchToProps = dispatch => {
   return {
     authAddUnaddFollowing: (following) => dispatch(authActions.authAddUnaddFollowing(following))
   }
 }

 const styles = StyleSheet.create({
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


 export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
