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
 } from 'react-native';
import WebSocketGlobeInstance from '../../Websockets/globeGroupWebsocket';
import { connect } from 'react-redux';
import NewGlobePost from './NewGlobePost';
import CountDown from 'react-native-countdown-component';
import NoPosts from '../noPosts.svg';
import authAxios from '../../util';
import * as globeGroupActions from '../../store/actions/globeGroup';

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
        <NewGlobePost
          navigation = {this.props.navigation}
          id = {this.props.id}
          data = {item}/>
      )
    }

    listHeader = () => {

      return(
        <View style = {{padding: 30}}>
          <CountDown
            until={60 * 10 + 30}
            size={30}
            onFinish={() => alert('Finished')}
            digitStyle={{backgroundColor: '#1890ff'}}
            digitTxtStyle={{color: 'white'}}
            timeToShow={["H",'M', 'S']}
            timeLabels={{h:'hour',m: 'min', s: 'sec'}}
             />
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

    render(){
      let groupPosts = []
      if(this.props.globePosts){
        groupPosts = this.props.globePosts
      }
      console.log(groupPosts)
      return(
        <View style = {{flex: 1}}>
          <Text>testtt</Text>
            <FlatList
              contentContainerStyle={{paddingBottom:75}}
              // ListHeaderComponent = {this.listHeader}
              style = {{flex: 1}}
              data = {groupPosts}
              renderItem = {this.renderItem}
              keyExtractor={(item, index) => String(index)}
              refreshing = {this.state.refreshing}
              onRefresh = {() => this.onRefresh()}
              onEndReachedThreshold={0.5}
              onEndReached = {() => this.loadSocialPost()}
               />
        </View>
      )
    }

}

const mapStateToProps = state => {
  return{
    globePosts: state.globeGroup.globePosts,
    id: state.auth.id
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loadMoreGlobePost: (posts) => dispatch(globeGroupActions.loadMoreGlobePost(posts))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GlobeGroup);
