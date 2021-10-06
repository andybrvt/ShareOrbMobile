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
import * as authActions from '../store/actions/auth';
const {width, height} = Dimensions.get('screen')

class NewProfile extends React.Component{
  navSetting = () => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    this.props.navigation.navigate("Settings")
  }
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

  onGroupDirect = (item) => {
    // DO A CHECK HERE TO SEE IF YOU ARE IN THE GROUP YET IF YOU ARE
    // YOU WILL BE DIRECTED INTO THE NEWSFEED AND IF NOT THEN YOU GO TO
    // JOINSCREEN
    console.log("FFFFFFFFFFFFFFFFFFFFF")

    const curId = this.props.curId
    const memberList = item.members
    const groupList=this.props.smallGroups
    console.log(this.props.curId)
    // console.log(item.group_name)
    console.log(memberList)
    let itemIndex=0
    if(memberList.includes(curId)){
      console.log("really")
      // console.log(groupList.indexOf(item))
      for(let i=0; i<groupList.length; i++){
        if(groupList[i].id===item.id){
          this.props.navigation.navigate("Home")
          this.props.authSetActiveNewsfeedSlide(i+1)
        }
      }

    } else {
      this.props.navigation.navigate("JoinScreen", {
        item:item
      })
    }
  }

  renderItem = ({item}) => {

    const pic = `${global.IMAGE_ENDPOINT}` + item.groupPic

    return(
      <View style={{width: width/2, justifyContent:'center', alignItems:'center', padding:10}} >
        <TouchableOpacity
          onPress = {() => this.onGroupDirect(item)}
          >
          <Avatar
            source = {{
              uri: pic
            }}
            rounded
            size = {120}
             />
          </TouchableOpacity>
           <Text style={{fontFamily:'Nunito-SemiBold'}}>{item.group_name}</Text>
           <View>
             <Text>{item.members.length} people</Text>

           </View>

           {/*<View style={styles.roundButton1}></View> */}
      </View>

    )
  }

  renderEmptyContainer(){
    return(
      <View>
        <Text>No orbs here</Text>
      </View>
    )
  }

  render(){

    let data = []
    if(this.props.smallGroups){
      data = this.props.smallGroups
    }

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
                onPress = {() => this.navSetting()}
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
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmptyContainer()}
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
    smallGroups: state.auth.smallGroups,
    curId: state.auth.id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authSetActiveNewsfeedSlide: (index) => dispatch(authActions.authSetActiveNewsfeedSlide(index)),
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

    // backgroundColor: 'red',
    height:50,
    paddingTop:0,
    flexDirection:'row',
    // shadowColor:'black',
    // shadowOffset:{width:0,height:2},
    // shadowOpacity:0.2,
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
    flex:5,
  },
  topRight: {
    marginTop:10,
    flex:1,

    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center'
  }


})
