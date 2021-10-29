import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  Pressable
 } from 'react-native';
import WebSocketGlobeInstance from '../../Websockets/globeGroupWebsocket';
import { connect } from 'react-redux';
import NewGlobePost from './NewGlobePost';
import CountDown from 'react-native-countdown-component';
import NoPosts from '../noPosts.svg';
import authAxios from '../../util';
import * as globeGroupActions from '../../store/actions/globeGroup';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Avatar } from 'react-native-elements';
import { Bell,ArrowUpCircle, Plus, Mail, UserPlus, Globe } from "react-native-feather";
import MainLogo from '../../logo.svg';
import { SharedElement } from "react-navigation-shared-element";


const height = Dimensions.get("window").height

class GlobeGroup extends React.Component{

   constructor(props){
       super(props)

       this.initialiseGlobeGroup()

       this.state = {
         refreshing: false,
         start: 6,
         addMore: 5,
         hasMore: true,
       }
    }

    componentDidMount(){


      const onRefresh = this.props.navigation.addListener("focus", () => {

        // this will update the globe group each time
        WebSocketGlobeInstance.fetchGlobePost()

      })
    }


    componentWillUnmount(){
      WebSocketGlobeInstance.disconnect()
    }

    initialiseGlobeGroup(){

      this.waitForGlobeSocketConnection(() => {
        // fetch post here
        WebSocketGlobeInstance.fetchGlobePost()
      })

      WebSocketGlobeInstance.connect()


    }

    waitForGlobeSocketConnection(callback){
      const component = this
      setTimeout(
        function(){
          if(WebSocketGlobeInstance.state() === 1){
            callback()
            return;
          } else {
            component.waitForGlobeSocketConnection(callback);
          }
        }, 100)
    }





    renderItem = ({item}) => {


      return(
          <View>
            {/*
          <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => {

              this.props.navigation.navigate("Story",  {'image':'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'}  );
            }}
          >
            <SharedElement>
          <Image source={require('../../Explore/coffee.jpg')} style = {{height: 175, width: 200,}} />
          </SharedElement>
          </Pressable>
          */}

        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}

          onPress={() => {
            this.props.navigation.navigate("Story",  {'video':`${global.IMAGE_ENDPOINT}`+item.post.video} );
          }}
        >
        <SharedElement>
          <NewGlobePost
            navigation = {this.props.navigation}
            id = {this.props.id}
            data = {item}/>
          </SharedElement>
        </Pressable>

        </View>

      )
    }

    listHeader = () => {
      return(
        <View style = {styles.header}>
          <View style = {styles.sideHeaders}>
            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate("profile")}
              >
              <Avatar
                source = {{
                  uri: `${global.IMAGE_ENDPOINT}` + this.props.profilePic,
                }}
                rounded
                size = {30}
                 />

            </TouchableOpacity>

          </View>

          <View style = {styles.middleHeader}>
            <MainLogo
              height = {"80%"}
              width = {"45%"}
               />
          </View>

          <View style = {styles.sideHeaders}>
            {/*
              <TouchableOpacity
                onPress = {() => this.props.navigation.navigate("notification")}
                >
                <Bell
                  width={20}
                  height={20}
                  stroke = "black"
                  fill = "white"
                  style={{marginRight:5}}
                   />
              </TouchableOpacity>


              */}

          </View>



        </View>
      )
    }

    onRefresh = () => {
      this.setState({refreshing: true})
      WebSocketGlobeInstance.fetchGlobePost()
      this.setState({refreshing: false})
    }

    loadSocialPost = () => {
      const {start, addMore} = this.state;
      if(this.state.hasMore){
        authAxios.get(`${global.IP_CHANGE}/mySocialCal/infiniteGlobe/`+start+"/"+addMore)
        .then(res => {

          const globePost = res.data.globePost;
          const hasMore = res.data.has_more
          this.props.loadMoreGlobePost(globePost)
          this.setState({
            hasMore:hasMore,
            loading: false,
            start: start+addMore
          })


        })
        .catch(err => {
          this.setState({
            error: err.message
          })
        })

      }


    }

    onSwipeLeft(gestureState) {
      this.props.navigation.navigate("Explore")
     }

     onSwipeRight(gestureState) {
       this.props.navigation.navigate("Test1")
     }

    render(){
      let groupPosts = []
      if(this.props.globePosts){
        groupPosts = this.props.globePosts
      }
      return(
          <View style = {{flex: 1}}>



            <FlatList
              stickyHeaderIndices={[0]}
              // contentContainerStyle={{paddingBottom:75}}
              ListHeaderComponent = {this.listHeader}
              showsVerticalScrollIndicator={false}
              style = {{flex: 1}}
              data = {groupPosts}
              renderItem = {this.renderItem}
              keyExtractor={(item, index) => String(index)}
              refreshing = {this.state.refreshing}
              onRefresh = {() => this.onRefresh()}
              onEndReachedThreshold={0.6}
              onEndReached = {() => this.loadSocialPost()}
               />

        </View>
      )
    }

}

const mapStateToProps = state => {
  return{
    globePosts: state.globeGroup.globePosts,
    id: state.auth.id,
    profilePic: state.auth.profilePic
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loadMoreGlobePost: (posts) => dispatch(globeGroupActions.loadMoreGlobePost(posts))
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row'
  },
  sideHeaders:{
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center'
  },
  middleHeader:{
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(GlobeGroup);
