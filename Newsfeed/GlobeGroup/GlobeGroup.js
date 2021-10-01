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


const height = Dimensions.get("window").height

class GlobeGroup extends React.Component{

   constructor(props){
       super(props)

       this.initialiseGlobeGroup()

       this.state = {
         refreshing: false
       }
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
        <NewGlobePost data = {item}/>
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



    render(){

      console.log(this.props, 'globegroup')
      let groupPosts = []
      if(this.props.globePosts){
        groupPosts = this.props.globePosts
      }

      return(
        <View style = {{flex: 1}}>


            <FlatList
              ListHeaderComponent = {this.listHeader}
              style = {{flex: 1}}
              data = {groupPosts}
              renderItem = {this.renderItem}
              keyExtractor={(item, index) => String(index)}
              refreshing = {this.state.refreshing}
              onRefresh = {() => this.onRefresh()}
              
               />


        </View>
      )
    }

}

const mapStateToProps = state => {
  return{
    globePosts: state.globeGroup.globePosts
  }
}


export default connect(mapStateToProps, null)(GlobeGroup);
