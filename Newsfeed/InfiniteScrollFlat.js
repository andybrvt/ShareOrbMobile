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
  RefreshControl
 } from 'react-native';
import axios from "axios";
import Header from './Header';
import WebSocketSocialNewsfeedInstance from '../Websockets/socialNewsfeedWebsocket';
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import NewsfeedButtonContainer from './NewsfeedButtonContainer';
import SocialNewsfeedPost from './SocialNewsfeedPost';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash/lib/module/v1';
import { User } from "react-native-feather";
import * as dateFns from 'date-fns';
import  authAxios from '../util';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import NoPosts from './noPosts.svg';
import SuggestedList from './SuggestedList';
import FirstPost from './FirstPost';



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const {interpolate, Extrapolate, interpolateColors} = Animated;
const height = Dimensions.get('window').height;

class InfiniteScrollFlat extends React.Component{
  state = {
    refreshing: false,
    start: 6,
    addMore: 5,
    hasMore: true,
    currentMonth: dateFns.format(new Date(), "MMMM"),
    currentDay: dateFns.format(new Date(), "d")
  }

  onRefresh = () => {
    this.setState({refreshing: true})
    const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
    WebSocketSocialNewsfeedInstance.fetchSocialPost(
      this.props.id,
      curDate,
      6
    )
    this.setState({refreshing: false});
  }

  openCamera = () => {
    this.props.navigation.navigate("Upload")
    this.props.openShowCamera()
  }

  loadSocialPost = () => {
    const {start, addMore} = this.state;
    const curDate = dateFns.format(new Date(), "yyyy-MM-dd")
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/infiniteSocial/`+curDate+"/"+start+'/'+addMore)
    .then( res => {
      this.props.loadMoreSocialPost(res.data.socialPost)
      const hasMore = res.data.has_more;
      this.setState({
        hasMore:hasMore,
        loading: false,
        start: start+addMore
      })

    })
    .catch( err => {
      this.setState({
        error: err.message
      })
    })
  }

  renderPost = ({item}) => {
    return(
        <SocialNewsfeedPost
          y = {this.props.y}
          navigation = {this.props.navigation}
          ViewProfile = {this.props.ViewProfile}
          data = {item}
          onCommentOpen = {this.props.onCommentOpen}

           />

    )
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if(viewableItems && viewableItems.length > 0){

      if(viewableItems[1]){
        const currentItem = viewableItems[1];
        if(currentItem.isViewable){
          if(currentItem.isViewable === true){
            const date= viewableItems[1].item.created_at
            const offSet = new Date().getTimezoneOffset()/60;
            const newDate = dateFns.addHours(new Date(date), offSet)
            this.setState({
              currentMonth: dateFns.format(newDate, "MMMM"),
              currentDay: dateFns.format(newDate, "d")
            })
          }
        }

      }


    }



   // console.log("Changed in this iteration", changed);
 }

  render(){
    let post = [];
    if(this.props.socialPosts){
      post = this.props.socialPosts
    }
    const y = this.props.y;
    // const top = interpolate(y,{
    //   inputRange: [0, 50],
    //   outputRange: [50, 0],
    //   extrapolate: Extrapolate.CLAMP
    // })
    const backgroundGradient = interpolateColors(y, {
      inputRange: [0, 400, 600],
      outputColorRange: ["rgba(0, 0, 0, 0.85)", "skyblue", "white"],

    })

    // this will just be the scroll view for whne it is empty
  //   <ScrollView
  //     showsVerticalScrollIndicator = {false}
  //     refreshControl = {
  //     <RefreshControl
  //     refreshing={this.state.refreshing}
  //     onRefresh={this.onRefresh}
  //     />
  //   }>
  //   <View style = {{
  //       top: '20%',
  //       height: height-100,
  //       alignItems: 'center',
  //       // justifyContent: 'center'
  //       // flex: 1,
  //         }}>
  //         <Image source={require('./noPosts1.png')} style = {{height: 200, width: 250, resizeMode : 'stretch',}} />
  //     <TouchableOpacity
  //       onPress = {() => this.openCamera()}
  //       >
  //       <View style = {{
  //         backgroundColor: "#1890ff",
  //         padding: 15,
  //         borderRadius: 15}}>
  //         <Text style = {{color: 'white'}}>Be the first one to post</Text>
  //       </View>
  //     </TouchableOpacity>
  //
  //   </View>
  // </ScrollView>

    return(

      <Animated.View
        style = {{
          height: height,
          paddingBottom: 100

        }}
        >


        <Header
          currentMonth = {this.state.currentMonth}
          currentDay = {this.state.currentDay}
          curLoad = {this.props.curLoad}
           />
        {
          post.length === 0 ?

          <ScrollView
            refreshControl = {
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                />
              }
            style = {{top: 70}}
            // style = {{top: 130}}
            >
            <View style = {{
                alignItems: 'center'
              }}>
              <NoPosts width = {250} height = {250} />
                <Text style = {{fontSize:25}}>No post</Text>

          </View>

          </ScrollView>

          :


          <AnimatedFlatList
            // onViewableItemsChanged={this.onViewableItemsChanged }
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle = {16} // important for animation
            onScroll = {onScrollEvent({y})}
            data = {post}
            renderItem = {this.renderPost}
            keyExtractor={(item, index) => String(index)}
            onEndReachedThreshold={0.5}
            onEndReached = {() => this.loadSocialPost()}
            onRefresh = {() => this.onRefresh()}
            refreshing = {this.state.refreshing}
            // style={{top:130,}}
            style={{top:70,}}
             />
        }

       </Animated.View>
    )
  }



}

const mapStateToProps = state => {
  return{
    id: state.auth.id,
    userName: state.auth.username,
    socialPosts: state.socialNewsfeed.socialPosts,
    following: state.auth.following,
    curLoad: state.auth.curLoad
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMoreSocialPost: (post) => dispatch(socialNewsfeedActions.loadMoreSocialPost(post)),
    openShowCamera: () => dispatch(authActions.openShowCamera()),
    authAddUnaddFollowing: (following) => dispatch(authActions.authAddUnaddFollowing(following))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollFlat);
