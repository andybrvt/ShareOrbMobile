import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback
 } from 'react-native';
import axios from "axios";
import authAxios from '../util';
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';
import InvitePage from './InvitePage';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as authActions from '../store/actions/auth';
import { UserCheck, UserPlus} from "react-native-feather";
import Carousel, { Pagination } from 'react-native-snap-carousel';
 // used in conjuction with the newsfeed view so that you
 // can folow people
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const data2=[
    {
        "itemImage": "https://images.unsplash.com/photo-1634467164575-74a2a342b43e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
    },
    {
        "itemImage": "https://images.unsplash.com/photo-1634407605474-9143e0e16673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80"
    },
    {
        "itemImage": "https://images.unsplash.com/photo-1634488991132-2ba3aad8c1a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
    },
    {
        "itemImage": "https://images.unsplash.com/photo-1634323026799-f2351f5f3a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80"
    },
]

class SuggestedListGroup extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      list: [1, 2, 3,],
      loading: false,
      itemLoading: 0,
      start: 10,
      addMore: 6,
      disabled:false,
      curIndex:0,
    }
  }

  componentDidMount(){
    authAxios.get(`${global.IP_CHANGE}`+'/mySocialCal/suggestedGroups')
    .then(res => {
      this.setState({
        list: res.data
      })
    })
  }

  renderItem2 = ({item}) => {
    return(
      <View>

        <View style = {{
            height: width/2,
            width: '100%',

            borderRadius: 10,
            overflow: "hidden"
          }}>

      <Image
        style = {{
          width: '100%',
          height: '100%'
        }}
          resizeMode = "cover"
          source = {{
            uri: item.itemImage
          }}
         />
       </View>
       </View>
    )
  }

  onGroupDirect = (item) => {
    // DO A CHECK HERE TO SEE IF YOU ARE IN THE GROUP YET IF YOU ARE
    // YOU WILL BE DIRECTED INTO THE NEWSFEED AND IF NOT THEN YOU GO TO
    // JOINSCREEN
    const curId = this.props.curId
    const memberList = item.members
    const groupList=this.props.smallGroups
    // console.log(item.group_name)
    // console.log(groupList)
    let itemIndex=0
    if(memberList.includes(curId)){
      // console.log("really")
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

  onFollow = (follower, following, notiToken) => {
    this.setState({
      loading: true,
      itemLoading: following
    })
    authAxios.post(`${global.IP_CHANGE}/userprofile/onFollow`, {
      follower: follower,
      following: following
    })
    .then(res => {
      const notificationObject = {
        command: "send_follow_notification",
        actor: follower,
        recipient: following
      }
      NotificationWebSocketInstance.sendNotification(notificationObject);
      global.SEND_FOLLOW_NOTIFICAITON(
        notiToken,
        this.props.username,
        this.props.curId
      )
      this.props.updateFollowing(res.data)
      this.setState({
        loading: false,
        itemLoading: 0
      })
    })
  }

  joinGroup = (groupId) => {
    const userId = this.props.curId
    this.setState({
      loading: true,
      disabled:true,
    })
    // for this you just need group id and userid
    authAxios.post(`${global.IP_CHANGE}`+"/mySocialCal/joinSmallGroup/"+groupId+'/'+userId)
    .then(res => {
      // direct this group to newsfeed and then add it to auth
      this.setState({
        loading: false
      })
      this.props.authAddSmallGroup(res.data)


      this.props.navigation.navigate("Home")
      this.props.authSetActiveNewsfeedSlide(this.props.smallGroups.length)
    })

    // enable after 5 second
    setTimeout(()=>{
       this.setState({
        disabled: false,
      });
    }, 2500)
  }






  frequentChatPeople = (posts) => {
    // this function will be used to render the headers of the
    // chats
    return (
      <View style = {styles.frequentPeopleContainer}>
        {posts.map((item, index) => {
          const image = `${global.IMAGE_ENDPOINT}`+ item.itemImage
          return(
            <View
              key = {index}
              style={[styles.column]}>
              <Avatar
                source = {{
                  uri: image
                }}
                size = {70}
              />
            </View>

          )
        })}
      </View>
    )
  }

  onLoadMorePeople = () => {
    const {start, addMore} = this.state;
    authAxios.get(`${global.IP_CHANGE}/userprofile/loadMoreSuggested/`+start+'/'+addMore)
    .then( res => {

      const oldList = this.state.list
      const newList = this.onRemoveDuplicates(oldList, res.data)
      this.setState({
        list: newList,
        start: start+addMore
      })
    })

  }

  ViewProfile = (username) => {
    // This fucntion will be used to navigate to the post page
    // that you can use to post pictures and write caption
    if(username !== this.props.username){
      this.props.navigation.navigate("ProfilePage", {
        username: username
      })
    } else {
      this.props.navigation.navigate("Profile")
    }

  }

  onUnfollow =(follower, following) => {

    this.setState({
      loading: true,
      itemLoading: following
    })
    authAxios.post(`${global.IP_CHANGE}/userprofile/onUnfollow`, {
      follower: follower,
      following: following
    })
    .then(res => {


      this.props.updateFollowing(res.data)
      this.setState({
        loading: false,
        itemLoading: 0
      })
    })
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          marginTop:10,
          marginBottom:10,
          height: 1,
          width: "100%",
          backgroundColor: "#f0f0f0",
        }}
      />
    );
  }

  renderItem = ({item}) => {
    const groupPic = `${global.IMAGE_ENDPOINT}`+item.groupPic
    let title = ""
    let temp=""
    let post = []
    let groupId = ""
    if(item.group_name){
      title = item.group_name
    }
    if(item.get_socialCalItems){
      post = item.get_socialCalItems
    }
    if(item.members){
      temp=item.members
    }
    if(item.id){
      groupId = item.id
    }


    const groupsId = this.props.smallGroupIds
    // console.log(item.members.includes(1))
    return(
      <View>
        <View style={{marginLeft:'3.5%', marginBottom:'1%' }}>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontFamily:'Nunito-Bold', fontSize:16 }}>{global.CAPITALIZE(title)}</Text>
              {(groupsId.includes(groupId.toString()))?
                <View style={styles.inviteButton}>
                  <UserCheck
                    style={{marginRight:5}}
                    stroke = "white"
                    strokeWidth = {2}
                    height = {12.5}
                    width = {12.5}
                     />
                  <Text style={{fontFamily:'Nunito-SemiBold', fontSize:12, color:'white' }}>Joined</Text>
                </View>
              :
              <TouchableOpacity activeOpacity={0.8} style={styles.inviteButton} disabled={this.state.disabled}
                onPress = {() =>
                  this.joinGroup(item.id)
                }>
                <UserPlus
                  style={{marginRight:5}}
                  stroke = "white"
                  strokeWidth = {2}
                  height = {12.5}
                  width = {12.5}
                   />
                <Text style={{fontFamily:'Nunito-SemiBold', fontSize:12, color:'white' }}>Join</Text>
              </TouchableOpacity>

              }
          </View>
        </View>
        <TouchableOpacity
          onPress = {() => this.onGroupDirect(item)}
          style={{flexDirection:'row', marginLeft:'2.5%' }}>
          <View style={{zIndex:99, borderWidth: 2, borderColor: '#2f54eb', borderRadius:75,}}>
            <Avatar
              source = {{
                uri: groupPic
              }}
              rounded
              size = {85}
               />
           </View>
           <ScrollView
             style={{right:20, bottom:'10%'}}
             showsHorizontalScrollIndicator={false}
             horizontal = {true}>
             {this.frequentChatPeople(post)}
           </ScrollView>
         </TouchableOpacity>
      </View>
    )
  }

  onRemoveDuplicates = (list1, list2 ) => {
    let newList = []
    let duplicate = false
    for(let i = 0; i< list1.length; i++){
      // check if the value of list1 is duplicate
      const length = newList.length
      for(let j = 0; j< length; j++){
        if(newList[j].id === list1[i].id){
          //f the idea for any of the values exist within
          // the newlist you will stop this current loop
          duplicate = true
          break

        }

        //if it makes it to the end without breaking then
        // add it in


      }
      if(duplicate === false){
          newList.push(list1[i])
      } else {
        duplicate = false
      }

    }

    let duplicate2 = false
    for(let i = 0; i< list2.length; i++){
      // check if the value of list1 is duplicate
      const length = newList.length
      for(let j = 0; j< length; j++){
        if(newList[j].id === list2[i].id){
          //f the idea for any of the values exist within
          // the newlist you will stop this current loop

          duplicate2 = true
          break
        }


      }
      if(duplicate2 === false){
          newList.push(list2[i])
      } else {
        duplicate2 = false
      }



    }

    return newList
  }

  listHeader = () => {

    return(
        <InvitePage />

    )
  }


  render(){

    {/*
    <FlatList
      // onRefresh = {()=> this.props.onRefresh()}
      // refreshing = {this.props.refreshing}
      ListHeaderComponent = {this.listHeader}
      numColumns = {2}
      data = {this.state.list}
      renderItem = {this.renderItem}
      keyExtractor={(item, index) => String(index)}
      onEndReachedThreshold = {0.2}
      onEndReached = {()=> this.onLoadMorePeople()}
      showsVerticalScrollIndicator={false}

      />
      */}


    return(
      <ScrollView style = {{flex:1}}>
        <View style={{height:'35%',  justifyContent:'center',}}>
          <View style={{ alignItems:'center'}}>
        <Carousel
          layout={'default'}
          autoplayInterval={3500}
          data = {data2}
          autoplay={true}
          renderItem = {(item) => this.renderItem2(item)}
          keyExtractor={(item, index) => String(index)}
          sliderWidth = {width}
          itemWidth = {width*0.85}
          onSnapToItem={(index) => this.setState({curIndex:index}) }
          />
        </View>
        <View style={{position:'absolute', top:'70%', left:'35%', borderRadius:25}}>
            <Pagination
              activeDotIndex = {this.state.curIndex}
              dotsLength = {4}
              dotColor ={'white'}
              inactiveDotColor = {'white'}
              // dotStyle={{width:10, height:10}}
               />
          </View>
        </View>
        <FlatList
          style = {{
            flex: 1,
          }}
          ItemSeparatorComponent = { this.FlatListItemSeparator }
          initialNumToRender={2}
          ListHeaderComponent = {this.listHeader}
          data={this.state.list.slice(0, 5)}
          contentContainerStyle={{paddingBottom:25}}
          renderItem = {this.renderItem}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold = {0.2}
          // onEndReached = {()=> this.onLoadMorePeople()}
          showsVerticalScrollIndicator={false}

           />
        {/*
          <InvitePage />
          <View style={{marginLeft:'7.5%', marginBottom:'2.5%'}}>
            <Text style={{fontFamily:'Nunito-Bold', fontSize:18}}>Food</Text>
          </View>
          <View style={{flex:1, }}>
            <View style={{flexDirection:'row', marginLeft:'2.5%' }}>
              <View style={{zIndex:99}}>
                <Avatar
                  source = {{
                    uri: 'https://images.unsplash.com/photo-1631798263380-d24c23a9e618?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                  }}
                  rounded
                  size = {105}
                   />
               </View>
               <ScrollView
                 style={{right:20}}
                 showsHorizontalScrollIndicator={false}
                 horizontal = {true}>
                 {this.frequentChatPeople()}
               </ScrollView>
             </View>
             <View style={{top:'5%'}}>
               <View style={{marginLeft:'7.5%', marginBottom:'2.5%'}}>
                 <Text style={{fontFamily:'Nunito-Bold', fontSize:18}}>Fitness</Text>
               </View>
               <View style={{flexDirection:'row', marginLeft:'2.5%', }}>
                 <View style={{zIndex:99}}>
                   <Avatar
                     source = {{
                       uri: 'https://images.unsplash.com/photo-1631798263380-d24c23a9e618?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                     }}
                     rounded
                     size = {105}
                      />
                  </View>
                  <ScrollView
                    style={{right:20}}
                    showsHorizontalScrollIndicator={false}
                    horizontal = {true}>
                    {this.frequentChatPeople()}
                  </ScrollView>
                </View>
              </View>
              <View style={{top:'10%'}}>
                <View style={{marginLeft:'7.5%', marginBottom:'2.5%'}}>
                  <Text style={{fontFamily:'Nunito-Bold', fontSize:18}}>NBA</Text>
                </View>
                <View style={{flexDirection:'row', marginLeft:'2.5%', }}>
                  <View style={{zIndex:99}}>
                    <Avatar
                      source = {{
                        uri: 'https://images.unsplash.com/photo-1631798263380-d24c23a9e618?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                      }}
                      rounded
                      size = {105}
                       />
                   </View>
                   <ScrollView
                     style={{right:20}}
                     showsHorizontalScrollIndicator={false}
                     horizontal = {true}>
                     {this.frequentChatPeople()}
                   </ScrollView>
                 </View>
               </View>
            </View>





          */}


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  inviteButton: {
    position:'absolute',
    top:'1%',
    right:'5%',
    borderRadius: 20,
    height:25,
    width: 100,
    elevation:5,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1890ff",
    flexDirection:'row'
  },
  frequentPeopleContainer: {
    marginTop:20,
    height: 65,
    flexDirection: 'row',
  },
  column:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',       //THIS LINE HAS CHANGED
    marginRight:2.5,
    justifyContent:'center',

  },
  userContainer: {
    width: width/2,
    height: width/2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userCards: {
    width: '92.5%',
    height: '90%',
    backgroundColor: 'gray',
    borderRadius: 20,
    overflow: 'hidden'
  },
  userImage: {
    height: '100%',
    width: '100%'
  },
  userName: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: "20%"
  },
  textName: {
    fontSize: 18,
     fontFamily:'Nunito-Bold',
    color: 'white',
    marginBottom:10,
  },
  editButton: {
    position: 'absolute',
    alignItems: 'center',
    paddingVertical: 5,
    width:'60%',
    borderRadius: 20,
    bottom: '5%',
    backgroundColor: '#1890ff',
    alignSelf: 'center',
    alignItems: "center",
    backgroundColor: "#1890ff",
    padding: 10
  },
  headerContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    width: '100%',
    color: '#1890ff',
    fontWeight: 'bold',
    fontSize: 25,
  }

})

const mapStateToProps = state => {
  return {
    followers:state.auth.followers,
    following:state.auth.following,
    profile: state.explore.profile,
    curId: state.auth.id,
    username: state.auth.username,
    smallGroups: state.auth.smallGroups,
    smallGroupIds: state.auth.smallGroupIds
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authAddSmallGroup: (group) => dispatch(authActions.authAddSmallGroup(group)),
    authSetActiveNewsfeedSlide: (index) => dispatch(authActions.authSetActiveNewsfeedSlide(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedListGroup);
