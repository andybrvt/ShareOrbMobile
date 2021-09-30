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
import  authAxios from '../util';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import * as authActions from '../store/actions/auth';

const Tab = createMaterialTopTabNavigator();
class EditBio extends React.Component{

  constructor(props) {
   super(props);
   this.state = {
     contentBio:this.props.bio,
    }
  }

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

  onHandleSaveBio = () => {

    const userId = this.props.userId
    const username = this.props.username
    var data = new FormData();
    data.append('bio', this.state.contentBio)
    data.append('username', username )
    authAxios.put(`${global.IP_CHANGE}/userprofile/profile/update/`+userId,
      data,
    ).then(res => {
      const pic = res.data.profile_picture.replace(global.IP_CHANGE, "")

      const profileInfo = {
        first_name: res.data.first_name,
        username: res.data.username,
        profile_picture: pic,
        bio: res.data.bio
      }

      this.props.changeProfileInfoAuth(profileInfo);

      this.props.navigation.navigate("Profile")
    })

  }

  renderSave = () => (
    <View style={{marginRight:10,}}>
      <Button
        onPress = {() =>this.onHandleSaveBio()}
        title = "Save"/>
    </View>
  )

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
            value={this.state.contentBio}
            onChangeText={this.onBioChange}
            />

          <View style={styles.characterCount}>
             <Text style={{color:"#666666",}}>

               {this.state.contentBio.length}/80
             </Text>
           </View>
         </View>

         {/*
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
           */}

       </BackgroundContainer>
     )
   }
 }



const mapStateToProps = state => {
  return{
    bio: state.auth.bio,
    userId: state.auth.id,
    username:state.auth.username,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    changeProfileInfoAuth: (profileInfo) => dispatch(authActions.changeProfileInfoAuth(profileInfo)),
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(EditBio);


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
