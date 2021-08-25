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
  ActivityIndicator
 } from 'react-native';
import axios from "axios";
import authAxios from '../util';
import NotificationWebSocketInstance from '../Websockets/notificationWebsocket';

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
    }

  }

  componentDidMount(){

    authAxios.get(`${global.IP_CHANGE}`+'/userprofile/configSuggestSuggested')
    .then(res => {
      console.log(res.data)
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

    console.log(item)

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
              <Text style = {{color: 'white'}}>Unfollow</Text>
            </TouchableOpacity>

            :

            <TouchableOpacity
              onPress = {() => this.onFollow(this.props.curId, item.id, item.notificationToken)}
              style = {styles.editButton}>
              <Text style = {{color: 'white'}}>Follow</Text>
            </TouchableOpacity>



          }


        </View>
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
      console.log('try here')
      if(newList[j].id === list1[i].id){
        //f the idea for any of the values exist within
        // the newlist you will stop this current loop
        duplicate = true
        break

      }

      console.log("does hit here")
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
      console.log("does it ever it here")
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
        <Image source={require('./noPosts1.png')} style = {{height: 150, width: 150, resizeMode : 'stretch',}} />

        <Text style = {styles.headerText}>No posts</Text>
      </View>
    )
  }


  render(){

    return(
      <View style = {{
          paddingBottom: 70,
          flex: 1
        }}>
        <FlatList
          ListHeaderComponent = {this.listHeader}
          numColumns = {2}
          data = {this.state.list}
          renderItem = {this.renderItem}
          keyExtractor={(item, index) => String(index)}

          />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  userContainer: {
    width: width/2,
    height: width/2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userCards: {
    width: '95%',
    height: '95%',
    backgroundColor: 'gray',
    borderRadius: 30,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  editButton: {
    position: 'absolute',
    alignItems: 'center',
    paddingVertical: 5,
    width:'90%',
    borderRadius: 20,
    bottom: '5%',
    backgroundColor: '#1890ff',
    alignSelf: 'center',
    alignItems: "center",
    backgroundColor: "#1890ff",
    padding: 10
  },
  headerContainer: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20
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
