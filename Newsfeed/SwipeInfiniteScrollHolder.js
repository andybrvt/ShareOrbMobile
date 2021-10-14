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
import { Avatar } from 'react-native-elements';
import ScrollableTabBarNew from './ScrollableTabBarNew';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Header from './Header';
import InfiniteScrollFlatNew from './InfiniteScrollFlatNew';
import { PlusCircle, UserPlus, Info, Users} from "react-native-feather";
import { connect } from 'react-redux';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';
import * as Progress from 'react-native-progress';
import GlobeGroup from './GlobeGroup/GlobeGroup';
import NoPosts from './noPosts.svg';
import * as smallGroupsActions from '../store/actions/smallGroups';


const height = Dimensions.get('window').height


class Page extends React.Component {
  state = {
    list: [1,2,3]
  }

  componentDidUpdate(prevProps) {
    // console.log("hiss")
    // console.log(navGroupIDCondition)
    // console.log("vs")
    // console.log(prevProps.activeTab)
    // if(prevProps.activeTab!=navGroupIDCondition){
    //
    //     this.goToPage(9)
    // }
    // this.props.goToPage(5)
  }


  goToPage(pageId) {
    console.log("PAGE SWITCH!")
    this.props.tabView.goToPage(pageId)
  }

  renderItem = ({item}) => {

    return(
      <View>
        <Text>Hi</Text>
      </View>
    )

  }
    render() {
        return (
                <InfiniteScrollFlatNew />
        )
    }
}

// do a component did mount with this.props.goTo(page number from newsfeedview)
// check index out of all the gorups from the mapstatetoprops and make it mapDispatchToProps
// up to the index passed in from newsfeedview

class SwipeInfiniteScrollHolder extends React.Component{

  navGroupInfo=()=> {
    // this.props.navigation.navigate("JoinScreen"
    this.props.navigation.navigate("GroupInfo",

    );
  }



  onGroupCreateDirect(){
      // this function will direct you to the creating group page
      this.props.navigation.navigate('createSmallGroup')
  }



  render(){

    console.log('-------')
   let smallGroups = []
   if(this.props.smallGroups){
     smallGroups = this.props.smallGroups
   }
   // if(this.props.navGroupIDCondition){
   //   navGroupIDCondition=this.props.navGroupIDCondition
   // }
   // if(this.props.test){
   //   test=this.props.test
   // }

   // console.log("made class")
   // console.log(navGroupIDCondition)

    return(
      <View>

      <ScrollView
        scrollEnabled = {false}
        showsVerticalScrollIndicator={false}
        >


        <View style = {{flex: 1, height:height -10 }}>

            <ScrollableTabView
              ref={(tabView) => { this.tabView = tabView}}
              style={{ marginTop:10 }}
               initialPage={1}
               renderTabBar={() =>
                 <ScrollableTabBarNew
                   tabView={this.tabView}
                   updateSlide={this.props.updateSlide}
                   activeSlide = {this.props.activeSlide}
                   setNull = {this.props.setNull}
                   navigation = {this.props.navigation}
                   curLoad = {this.props.curLoad}
                 />}
              >
              <GlobeGroup
                navigation = {this.props.navigation}
                name = "globe" tabLabel = "globe" />
              {smallGroups.map((group, indx) => {
                const pic = `${global.IMAGE_ENDPOINT}` + group.groupPic
                return(
                  <InfiniteScrollFlatNew
                    navigation = {this.props.navigation}
                    key = {indx}
                    groupId= {group.id}
                    name='tab1' tabLabel={{pic: pic, name:group.group_name}} />

                )


              })}

                <View
                  style = {{
                      alignItems: 'center',
                      // justifyContent: 'center',
                      backgroundColor: '#1890ff',
                      flex: 1}}
                  name = "tab3" tabLabel = "add">

                  <View style ={{
                      top: '15%',
                      alignItems: 'center'
                    }}>
                    <NoPosts width = {150} height = {150} />
                    <View style = {{

                      }}>
                      <Text style = {{
                          top: '15%',
                          color: 'white',
                          fontSize: 28,
                          fontFamily:'Nunito-Bold'
                        }}>Let's create a group</Text>
                    </View>
                    <View style = {{
                        marginTop: 30
                      }}>
                      <TouchableOpacity
                        style = {{
                          borderRadius: 25,
                          width: 250,
                          height: 55,
                          backgroundColor: 'white',
                          justifyContent:'center',
                          alignItems: 'center'

                        }}
                        onPress = {() => this.onGroupCreateDirect()}
                        >
                        <Text style = {{
                          fontWeight: 'bold',
                          color: '#1890ff'}}>Create a group</Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                </View>




            </ScrollableTabView>






        </View>




      </ScrollView>
    </View>

    )
  }
}

const styles = StyleSheet.create({
  roundButton1: {

    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 100,
    left:10,
    bottom:10,
    backgroundColor: '#1890ff',
    elevation:15,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});


const mapStateToProps = state => {

  return{
    isAuthenticated: state.auth.token !== null,
    id: state.auth.id,
    userName: state.auth.username,
    socialPosts: state.socialNewsfeed.socialPosts,
    following: state.auth.following,
    curLoad: state.auth.curLoad,
    groupPost: state.smallGroups.groupPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMoreSmallGroupPost: (posts) => dispatch(smallGroupsActions.loadMoreSmallGroupPost(posts)),
    loadMoreSocialPost: (post) => dispatch(socialNewsfeedActions.loadMoreSocialPost(post)),
    openShowCamera: () => dispatch(authActions.openShowCamera()),
    authAddUnaddFollowing: (following) => dispatch(authActions.authAddUnaddFollowing(following))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SwipeInfiniteScrollHolder);
