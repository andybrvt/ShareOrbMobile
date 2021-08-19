import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
   SafeAreaView,
   FlatList,
   StatusBar
} from 'react-native';
import { ChevronLeft, ArrowLeft } from "react-native-feather";
import authAxios from '../util';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Avatar } from 'react-native-elements';
import * as dateFns from 'date-fns';


const width = Dimensions.get("window").width

class GoalPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      goal: {}
    }
  }

  componentDidMount(){
    const goalId = this.props.route.params.goalId;
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/getGoal/`+goalId)
    .then(res => {
      this.setState({
        goal: res.data
      })
    })

  }

  componentWillUnmount(){
    this.setState({
      goal: {}
    })
  }

  renderItem = ({item}) => {

    return(
      <View style = {styles.itemCard}>

        <View style = {{
            height: width*0.8,
            width: '100%',
            backgroundColor: 'pink'
          }}>
          <Image
            style = {{
              width: '100%',
              height: '100%'
            }}
              resizeMode = "cover"
              source = {{
                uri: `${global.IMAGE_ENDPOINT}`+item.itemImage
              }}
             />

        </View>

        <View>
          <Text>item.caption</Text>
        </View>
      </View>
    )
  }


  render(){

    const { goal } = this.state;
    console.log(this.state);
    let goalTitle = '';
    let goalItem = [];
    let goalAvatar = '';
    let firstName = "";
    let lastName = "";
    let goalOwnerUsername = "";
    if(goal.goal){
      goalTitle = goal.goal;
    }
    if(goal.get_socialCalItems){
      goalItem = goal.get_socialCalItems;
    }
    if(goal.owner){
      if(goal.owner.username){
        goalOwnerUsername = goal.owner.username;
      }
      if(goal.owner.profile_picture){
        goalAvatar = `${global.IMAGE_ENDPOINT}`+goal.owner.profile_picture;
      }
      if(goal.owner.first_name){
        firstName = goal.owner.first_name;
      }
      if(goal.owner.last_name){
        lastName = goal.owner.last_name;
      }

    }


    return(
      <SafeAreaView
        style = {{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}
        >

        <StatusBar
          barStyle="light-content"
          />

        <View
          style = {{
            flex: 1
          }}
          >

          <View style = {styles.header}>


            <View style = {styles.chatInfoHolder} >
              <TouchableOpacity
                style = {{
                }}
                onPress = {() => this.props.navigation.goBack(0)}
                >
                <ArrowLeft
                  stroke = "white"
                  height = {40}
                  width = {40} />

              </TouchableOpacity>
              <Avatar

              rounded
                source = {{
                  uri: goalAvatar,
                }}
                size = {40}
                 />


               <View style = {styles.chatInfo}>
                 <View style = {styles.chatNameContainer}>
                   <Text style = {styles.chatName}>{goalOwnerUsername}</Text>
                 </View>
                 <Text style = {styles.chatText}> {firstName+" "+lastName} </Text>
               </View>
            </View>

            <View style = {{
                flex:1,
                right: 20
              }}>
              <View style = {{
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}>
                <Text style = {styles.videoFooterUserName}>
                  August
                </Text>
                <Text style = {styles.dayNumTag}>
                  20
                </Text>
              </View>

            </View>

          </View>

          <View style ={styles.middle}>
            <View>
              <Text style = {styles.goalTitle}>
                {global.CAPITALIZE(goalTitle)}
              </Text>
            </View>

            <View style = {{
                alignItems:'center',
                marginTop: 20,
              }}>
              <Text style = {styles.goalLength}>{goalItem.length} entries</Text>
              <Text style = {styles.goalStart}>Started: 8-9-2021</Text>

            </View>


          </View>

          <View style = {styles.bottom}>
            <Carousel
              data = {goalItem}
              renderItem = {(item) => this.renderItem(item)}
              keyExtractor={(item, index) => String(index)}
              sliderWidth = {width}
              itemWidth = {width*0.8}
               />

          </View>

        </View>

      </SafeAreaView>
    )
  }
}

export default GoalPage;

const styles = StyleSheet.create({
  itemCard: {
    height: '70%',
    width: '100%',
    backgroundColor: 'gray'
  },
  header: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
    alignItems:'center'
  },
  middle: {
    flex:1,
    alignItems: 'center'
  },
  bottom: {
    flex:3
  },
  videoFooterUserName: {
    color:'white',
    fontSize:14,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    // fontWeight:'bold',
  },
  dayNumTag: {
    color:'white',
    fontSize:30,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    // fontWeight:'bold',

  },
  goalTitle: {
    color: 'white',
    fontSize:30,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },
  goalLength:{
    color: 'white',
    fontSize: 15,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
  },
  goalStart: {
    color: 'white',
    fontSize: 15,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',

  },
  chatInfoHolder:{
    left:10,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
  },

  chatInfo: {
    justifyContent: "center",
    marginLeft: 10,
    // backgroundColor:'red',
  },
  chatNameContainer: {
    flexDirection: "row"
  },
  chatName: {
    fontSize: 18,
    color: 'white',
    fontWeight:'bold',

    left:5,
  },

  chatText: {
    marginTop: 0,
    color: 'white',
    fontWeight: '400'
  },
})
