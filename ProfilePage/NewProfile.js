import React from 'react';
import {
  Text,
  Platform,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList
 } from 'react-native';
import ProfileHeader from './ProfileHeader';
import BackgroundContainer from "../RandomComponents/BackgroundContainer";
import Constant from 'expo-constants';
import { connect } from "react-redux";
import { Tag, Bookmark, Search, ChevronRight, Settings
  ,MessageCircle, UserPlus, Users, Clock, Grid, Calendar, Clipboard} from "react-native-feather";
import { Avatar } from 'react-native-elements';


class NewProfile extends React.Component{

  listHeader = () => {

    const profile = {
      username: this.props.username,
      profile_picture: this.props.profilePic,
      first_name: this.props.firstName,
      last_name: this.props.lastName,
      get_following: this.props.following,
      id: this.props.currentId,
      bio: this.props.bio,
      get_followers: this.props.followers
    }

    return(
      <View style = {styles.profileHeader}>
        <ProfileHeader
          navigation={this.props.navigation}
          profile = {profile}
          {...this.props}
          />
      </View>
    )
  }

  render(){

    let data=[{'test':'Food'},{'test':'Family'},{'test':'Fitness'},{'test':'NBA'},
      {'test':'Soccer'},{'test':'Entreprenur'},  {'test':'Soccer'},{'test':'Entreprenur'},
    ]

    return(
      <BackgroundContainer>

        <View style={styles.viewStyle}>

          <View style = {styles.topLeft}>

            <View style={{flex:1, justifyContent:'center', paddingLeft: 10}}>
              <Text style={styles.textStyle}>{this.props.username}</Text>
            </View>
          </View>

          <View style = {styles.topRight}>

            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress = {() => this.ViewProfile()}
                // style={{ width:50, height:50, }}
                >
                <Settings
                 stroke="#8c8c8c" strokeWidth={2} width={25} height={25}/>
              </TouchableOpacity>
            </View>

          </View>

        </View>

        <FlatList
          ListHeaderComponent = {this.listHeader}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => {
            return (
               <View style={{width: '50%', justifyContent:'center', alignItems:'center', padding:10}} >
                   <Avatar
                     source = {{
                       uri: 'https://images.unsplash.com/photo-1631798263380-d24c23a9e618?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                     }}
                     rounded
                     size = {150}
                      />
                    <Text>{item.test}</Text>
                    {/*<View style={styles.roundButton1}></View> */}
               </View>
            );
          }}

           />



      </BackgroundContainer>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentId: state.auth.id,
    currentUser: state.auth.username,
    curUserFriend: state.auth.friends,
    curRequested: state.auth.requestList,
    followers: state.auth.followers,
    following: state.auth.following,
    username: state.auth.username,
    profilePic: state.auth.profilePic,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    bio: state.auth.bio,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openShowCamera: () => dispatch(authActions.openShowCamera()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProfile);


const styles = StyleSheet.create({
  roundButton1: {
    width: 150,
    height: 150,

    // padding: 10,
    // borderRadius: 100,
    // backgroundColor: 'white',
  },
  title:{
    color:'red',
  },
  backgroundColor: {
    flex:1,
    backgroundColor:"#1890ff"
  },
  container: {
    marginTop: Constant.statusBarHeight,
    backgroundColor: "white"
  },
  socialCalContainer: {
    flex: Platform.OS === 'ios' ? 1.65: 1.45,
  },
  profileHeader: {
    // left:'12.5%',
    width:'100%',


  },
  viewStyle: {


    height:50,
    paddingTop:0,
    flexDirection:'row',

  },
  textStyle:{
    fontSize:20,
    justifyContent:'flex-start',
    fontFamily:'Nunito-Bold',
  },

  separator: {
    height: 20,
  },
  contentStyle: {
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: 'row',
    elevation:1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    // backgroundColor:'red',
  },
  topLeft: {
    flex:4,
  },
  topRight: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }


})
