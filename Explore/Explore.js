import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
   FlatList,
   TouchableHighlight,
   TextInput,
   Keyboard
  } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../RandomComponents/SearchBar';
import authAxios from '../util';
import PictureBox from './PictureBox';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Tag, Bookmark, MapPin, Search, ChevronRight} from "react-native-feather";
import ExploreSearchBar from './ExploreSearchBar';
import TrendingList from './TrendingList';
// import SuggestedList from './SuggestedList';
import SuggestedListGroup from './SuggestedListGroup';
import Animated from 'react-native-reanimated';
import SearchResults from './SearchResults';
import InvitePage from './InvitePage';
import { Avatar } from 'react-native-elements';


const { Value } = Animated;

const {interpolate, Extrapolate, diffClamp, cond, lessOrEq} = Animated;


const {width, height} = Dimensions.get('screen')
// This class will be in charge of managing the explore page,
// the end goal is to show people and a way to find people
// or just browse through cool stuff that happens through out
// the current day

// For this you dont really need real time because you are really not interacting
// with new people but rather just see the trending stuff, so axios calls should
// be ok

class Explore extends React.Component{

  y = new Value(0);

  constructor(props){
    super(props)
    this.state = {
     refreshing: false,
     searchText:'',
     trendingCells: [],
     exploreCells: [],
     showSearch: false,
     searched: [],
     searhcedGroups: [],
     searchValue: "",
     loading: false,
     start: 0,
     addMore: 6,
     hasMore: true
     };
  }

  // So you would need a search here to search up people
  // So you want to render the people's day here and since
  // this is not really interacting with other people it will
  // just be the different days that are happening today and
  // and other people

  // so you are gonna need a search and maybe show trending days
  // and then trending people

  componentDidMount(){
    // so you want to pull the information here like all the trending
    // social cal cell and people
    // axios.get(`${global.IP_CHANGE}`+'/mySocialCal/trendingDay')
    // .then( res => {
    //   this.setState({
    //     trendingCells: res.data
    //   })
    // })
    const {start, addMore} = this.state;
    const end = start + addMore
    axios.get(`${global.IP_CHANGE}/mySocialCal/exploreDay/`+start+'/'+end)
    .then( res => {
      this.setState({
          exploreCells:res.data,
          start: start+ addMore
      })
    })
  }

  loadMore= ()=>{
    const {start, addMore, exploreCells} = this.state;
    const end = start+ addMore;
    axios.get(`${global.IP_CHANGE}/mySocialCal/exploreDay/`+start+'/'+end)
    .then( res => {


      this.setState({
          exploreCells: exploreCells.concat(res.data),
          start: start+addMore
      })
    })
  }

  onShowSearch = () => {
    this.setState({
      showSearch: true
    })
  }

  onCloseSearch =() => {
    Keyboard.dismiss()
    this.setState({
      searchValue: "",
      showSearch: false
    })
  }

  viewProfile = (username) => {
    this.setState({
      searchValue: "",
      showSearch: false
    })
    if(username === this.props.username){
      this.props.navigation.navigate("Profile");
    } else {
      this.props.navigation.navigate("ProfilePage", {
        username: username
      })
    }

  }

  onChangeNewSearch = e => {

   this.setState({
     searchValue: e
   })

   const search = e === undefined ? null : e;

   if(search !== ""){
     this.setState({
       loading: true
     });
   authAxios.get(`${global.IP_CHANGE}/userprofile/userSearch/`, {
     params: {
       search
     }
   }).then(res => {
     this.setState({
       loading: false,
       searched: res.data.users,
       searchedGroups: res.data.groups
     })
   })

 } else {
   this.setState({
     searched:[],

   })
 }

 }

 onRefresh = () => {
 }




  render(){

    const {trendingCells, exploreCells } = this.state;

    // const top = interpolate(this.y, {
    //   inputRange: [0, 500, 600],
    //   outputRange: [60, 60, 0],
    //   extrapolateRight: Extrapolate.CLAMP
    // })
    return  (
      <BackgroundContainer>
        {/*

          <View style={{flexDirection:'column', flex:1}}>
            <View style={{flex:1, backgroundColor:'red'}}><Text>hi</Text></View>
            <View style={{flex:1, backgroundColor:'blue'}}></View>
            <View style={{flex:1}}></View>
          </View>

        */}

        <View style = {{
            flex: 1,
          }}>
          <ExploreSearchBar
            value = {this.state.searchValue}
            onOpen = {this.onShowSearch}
            onClose = {this.onCloseSearch}
            visible = {this.state.showSearch}
            onChange = {this.onChangeNewSearch}
            y = {this.y}
            />

            {/*

              <Animated.View style = {{
                  top: top
                }}>
              <TrendingList
                y = {this.y}
                cells = {trendingCells}
                 />

               </Animated.View>

              */}
          {
            this.state.showSearch ?
            <SearchResults
              viewProfile = {this.viewProfile}
              data = {this.state.searched}
              groupData = {this.state.searchedGroups}
               />

            :
              <SuggestedListGroup
                navigation = {this.props.navigation}
                updateFollowing = {this.props.authAddUnaddFollowing}
                following= {this.props.following}
                curId = {this.props.id}
                username = {this.props.username}
                onRefresh = {this.onRefresh}
                refreshing = {this.state.refreshing}
                inviteCode = {this.props.inviteCode}
                 />
          }
        </View>
    </BackgroundContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    following: state.auth.following,
    id: state.auth.id,
    inviteCode: state.auth.inviteCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authAddUnaddFollowing: (following) => dispatch(authActions.authAddUnaddFollowing(following))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

const styles = StyleSheet.create({



  searchContainer: {
    flex:1,
   paddingLeft: 40,
   top:20,
   fontSize:15,
   padding:10,

    backgroundColor: "#f0f0f0",
    borderRadius:10,
 },
  safeArea: {
    backgroundColor: "#1890ff",
    flex: 1,
  },
  containerContainer: {
    flex:1,
    backgroundColor: 'white'
  },
  container:{
    // backgroundColor: "red",

  },

  topText: {
    color: 'black',
    fontSize: 45,
    fontWeight: "bold"
  },
  suggestedContainer:{
    // backgroundColor: "white",

    padding: 20
  },
  searchHeader:{

    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor:'red',
  },


  circle1: {
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#1890ff',
    left: -150,
    bottom: 40,
    position: 'absolute',
    opacity: 0.1

  },
  circle2: {
    width: 100,
    height: 100,
    right: 10,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#1890ff',
    position: 'absolute',
    opacity: 0.1

  },
  circle3: {
    width: 250,
    height: 250,
    right: -50,
    top: -150,
    borderRadius: 175,
    backgroundColor: '#1890ff',
    position: 'absolute',
    opacity: 0.1

  },
  circle4: {
    width: 150,
    height: 150,
    left: 20,
    top: 50,
    borderRadius: 75,
    backgroundColor: 'red',
    position: 'absolute',
    opacity: 0.1

  },

  circle5: {
    width: 150,
    height: 150,
    right: -40,
    top: 250,
    borderRadius: 75,
    backgroundColor: 'yellow',
    position: 'absolute',
    opacity: 0.1

  }

})
