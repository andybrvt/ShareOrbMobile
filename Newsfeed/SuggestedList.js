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
import InvitePage from '../Explore/InvitePage';
import { Avatar } from 'react-native-elements';
 // used in conjuction with the newsfeed view so that you
 // can folow people
const width = Dimensions.get("window").width


class SuggestedList extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      list: [],
      loading: false,
      itemLoading: 0,
      start: 10,
      addMore: 6,
    }

  }



  componentDidMount(){

    authAxios.get(`${global.IP_CHANGE}`+'/userprofile/configSuggestSuggested')
    .then(res => {
      const newList = this.onRemoveDuplicates(res.data.focusList, res.data.userList)
      this.setState({
          list:newList,
       });

    })

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

  frequentChatPeople = () => {
    // this function will be used to render the headers of the
    // chats

    return (

      <View style = {styles.frequentPeopleContainer}>
        <View style={[styles.column]}>
          <Avatar
            source = {{
              uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            }}
            size = {80}
          />
        </View>

        <View style={[styles.column]}>
           <Avatar
             source = {{
               uri: 'https://images.unsplash.com/photo-1610555248279-adea4c523fb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
             }}
             size = {80}
           />
        </View>

        <View style={[styles.column]}>
          <Avatar
            source = {{
              uri: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
            }}
            size = {80}
           />
        </View>

        <View style={[styles.column]}>
           <Avatar
             source = {{
               uri: 'https://images.unsplash.com/photo-1610490689129-26c48e3cb975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
             }}
             size = {80}
           />
        </View>
        <View style={[styles.column]}>
           <Avatar
             source = {{
               uri: 'https://images.unsplash.com/photo-1618125857227-df2ded76ec2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
             }}
             size = {80}
           />
        </View>
        <View style={[styles.column]}>
           <Avatar
             source = {{
               uri: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80'
             }}
             size = {80}
           />
        </View>
        <View style={[styles.column]}>
           <Avatar
             source = {{
               uri: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
             }}
             size = {80}
           />
        </View>
        <View style={[styles.column]}>
           <Avatar
             source = {{
               uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
             }}
             size = {80}
           />
        </View>


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

  renderItem = ({item, index}) => {

    // if(index === 0){
    //   return(
    //     <View>
    //       <Text>There are no post. Lets go follow some people</Text>
    //     </View>
    //   )
    // }


    const following = [];
    const firstName = item.first_name
    const lastName = item.last_name

    if(this.props.following){
      for(let i = 0; i< this.props.following.length; i++){
        following.push(
          this.props.following[i].id
        )
      }
    }


    return(
      <View style = {styles.userContainer}>
        <TouchableWithoutFeedback onPress = {() => this.ViewProfile(item.username)}>

        <View style = {styles.userCards}>
            <Image
              style = {styles.userImage}
              resizeMode = "cover"
              source = {{uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture}}
              />
            <View style = {styles.userName}>
              <Text style = {styles.textName}>{firstName} {lastName}</Text>
            </View>



          {
            this.state.loading=== true && this.state.itemLoading === item.id ?

            <View
              style = {styles.editButton}>
              <ActivityIndicator />
            </View>

            :

            following.includes(item.id) ?

            <TouchableOpacity
              onPress = {() => this.onUnfollow(this.props.curId, item.id)}
              style = {styles.editButton}>
              <Text style = {{color: 'white', fontFamily:'Nunito-Bold'}}>Unfollow</Text>
            </TouchableOpacity>

            :

            <TouchableOpacity
              onPress = {() => this.onFollow(this.props.curId, item.id, item.notificationToken)}
              style = {styles.editButton}>
              <Text style = {{color: 'white',  fontFamily:'Nunito-Bold'}}>Follow</Text>
            </TouchableOpacity>



          }


        </View>
      </TouchableWithoutFeedback>

      </View>
    )
  }

  onRemoveDuplicates = (list1, list2 ) => {
  // This will remove all the dumplicates from the
  // list


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
      <View style = {styles.headerContainer}>
      <InvitePage
        inviteCode = {this.props.inviteCode}
         />
      </View>
    )
  }


  render(){

    return(
      <View style = {{
        }}>
        <InvitePage></InvitePage>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

export default SuggestedList;
