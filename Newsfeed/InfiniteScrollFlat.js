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


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const {interpolate, Extrapolate} = Animated;
const height = Dimensions.get('window').height;


class InfiniteScrollFlat extends React.Component{


  state = {
    refreshing: false
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

  renderPost = ({item}) => {



    return(

        <SocialNewsfeedPost
          navigation = {this.props.navigation}
          ViewProfile = {this.props.viewProfile}
          data = {item}
          onCommentOpen = {this.props.onCommentOpen}
           />

    )
  }

  render(){

    let post = [];
    if(this.props.socialPosts){
      post = this.props.socialPosts
    }



    const y = this.props.y;
    const top = interpolate(y,{
      inputRange: [0, 50],
      outputRange: [50, 0],
      extrapolate: Extrapolate.CLAMP
    })

    return(
      <Animated.View
        style = {{
          top: top,
        }}
        >
        {
          post.length === 0 ?

          <ScrollView
            showsVerticalScrollIndicator = {false}
              refreshControl = {
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >
            <View style = {{
                top: 50,
                height: height-100,
                alignItems: 'center',
                // justifyContent: 'center'
                // flex: 1,
                  }}>

              <User
                strokeWidth = {1}
                stroke = "black"
                height ={70}
                width = {70}
                />
              <Text>No Posts</Text>
              <TouchableOpacity
                onPress = {() => this.props.navigation.navigate("Explore")}
                >
                <View style = {{
                  backgroundColor: "#1890ff",
                  padding: 15,
                  borderRadius: 15}}>
                  <Text style = {{color: 'white'}}>Let's follow some people</Text>
                </View>
              </TouchableOpacity>

            </View>
          </ScrollView>


          :

          <AnimatedFlatList
            showsVerticalScrollIndicator={false}
            scrollEventThrottle = {16} // important for animation
            onScroll = {onScrollEvent({y})}
            data = {post}
            renderItem = {this.renderPost}
            keyExtractor={item => item.id.toString()}

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
    socialPosts: state.socialNewsfeed.socialPosts
  }
}

export default connect(mapStateToProps, null)(InfiniteScrollFlat);
