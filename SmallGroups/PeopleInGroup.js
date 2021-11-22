import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   TouchableOpacity,
   TouchableHighlight,
   ActivityIndicator,
   FlatList
 } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';
import authAxios from '../util';
import * as authActions from '../store/actions/auth';

 class PeopleInGroup extends React.Component{
   constructor(props){
     super(props)
     this.state = {
       loading: false,
       itemLoading: 0,
       members: []
     }
   }

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   selectItem(item) {

     console.log(item)
     if(item.id === this.props.curId){
       this.props.navigation.navigate("Profile");
     } else {
       this.props.navigation.navigate("ProfilePage", {
         userId: item.id
       })
     }
   }

   componentDidMount(){

     const groupId = this.props.route.params.groupId
     authAxios.get(`${global.IP_CHANGE}`+"/mySocialCal/grabMembers/"+groupId)
     .then(res => {
       console.log(res.data)
       this.setState({

         members: res.data
       })
     })
   }

   onUnfollow = (follower, following) => {
     this.setState({
       loading: true,
       itemLoading: following
     })

     authAxios.post(`${global.IP_CHANGE}/userprofile/onUnfollow`, {
       follower: follower,
       following: following
     })
     .then(res => {
       this.props.authAddUnaddFollowing(res.data)
       this.setState({
         loading: false,
         itemLoading: 0
       })
     })
   }

   renderItem = ({item}) => {
     return (
       <TouchableHighlight underlayColor="#f0f0f0" onPress={() => this.selectItem(item)}>
         <View style = {styles.chatBox}>
           <View style={{flexDirection:'row'}}>
             <View style = {styles.chatInfoHolder} >
               <Avatar
               rounded
                 source = {{
                   uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture
                 }}
                 size = {50}
                  />
                <View style = {styles.chatInfo}>
                  <View style = {styles.chatNameContainer}>
                    <Text style = {styles.chatName}>{item.username}</Text>
                  </View>
                  <Text style = {styles.chatText}> {item.first_name+" "+item.last_name} </Text>
                </View>
             </View>

          </View>
         </View>
       </TouchableHighlight>
     )
   }

   render(){
     let num=this.state.members.length
     this.props.navigation.setOptions({
        title: `${num} people`,
     })
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

         <FlatList
           keyExtractor={(item, index) => String(index)}
           style = {{marginTop:5}}
           data = {this.state.members}
           renderItem = {this.renderItem}
           ItemSeparatorComponent = { this.FlatListItemSeparator }
           />
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
   editButton: {
     alignItems: 'center',
     paddingVertical: 7.5,
     paddingHorizontal: 20,
     borderRadius: 4,
     top:5,
     alignItems: "center",
     backgroundColor: "#1890ff",
     padding: 10
   },

   column:{
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',       //THIS LINE HAS CHANGED
     paddingLeft: 35,
     justifyContent:'center',

 },

   container: {
     backgroundColor: "white",
     flex: 1,
   },
   chatBox: {
     flex: 1,
     height: 70,
     justifyContent: 'center',
     padding: 15,
     // backgroundColor:'green',
   },
   chatInfoHolder:{
     display: 'flex',
     flexDirection: 'row',
     flex:1,
   },
   chatInfo: {
     justifyContent: "center",
     marginLeft: 10,
     // backgroundColor:'red',
   },
   chatNameContainer: {
     flexDirection: "row"
   },
   chatName: {
     fontSize: 15,
     color: 'black',
     fontFamily:'Nunito-Bold',
     left:5,
   },

   chatText: {
     marginTop: 0,
     color: 'gray',
     fontFamily:'Nunito-SemiBold'
   },

 })


 export default connect(mapStateToProps, mapDispatchToProps)(PeopleInGroup);
