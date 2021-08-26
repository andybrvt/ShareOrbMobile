import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  FlatList
 } from 'react-native';
import authAxios from '../util';
import * as dateFns from 'date-fns';

class GoalContainer extends React.Component{

  state = {
    goals: []
  }

  componentDidMount(){
    const userId = this.props.userId
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/goalList/`+userId)
    .then( res => {
      this.setState({
        goals: res.data
      })
    })
  }

  onGoalPageDirect =(goalId) => {

    this.props.navigation.navigate("goalPage", {
      goalId: goalId
    })
  }

  renderItem = ({item}) =>{

    let dt=new Date(item.created_at)
    let dtDateOnly1 = dateFns.addHours(new Date(item.created_at), new Date(item.created_at).getTimezoneOffset()/60)
    let utc2=dateFns.format(dtDateOnly1, 'h:mma');
    const socialMonth = dateFns.format(new Date(item.created_at), 'MMMM');
    const socialDay = dateFns.format(new Date(item.created_at), 'dd');
    let cap=item.get_socialCalItems.length-4
    return(
      <TouchableOpacity
        activeOpacity={0.6}
        onPress = {() => this.onGoalPageDirect(item.id)}
        >
        <View style={{flexDirection:'row', height:100, }}>
          <View style={{flexDirection:'column', top:'2.5%', left:'7.5%', right:'5%'}}>
            <View style={{}}>
              <Text style = {{color:'black', fontWeight:'bold', fontSize:20}}>
                {socialMonth.substring(0,3)}
              </Text>
              <Text style ={{color:'black', fontWeight:'bold', fontSize:34}}>
                {socialDay}
              </Text>
              </View>
          </View>
          <View style={styles.goalCard}>

            <View style={{flexDirection:'column'}}>
            <View>
              <Text style={{padding:10, fontSize:16, fontWeight:'bold' }}>{item.goal}</Text>
            </View>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row', paddingLeft:10, paddingBottom:10, width:'80%'}}>
                {item.get_socialCalItems.slice(0,4).map((item2,index) => {
                    return(
                      <View key = {index}>
                        <Image
                          style = {styles.smallImage}
                          resizeMode = "cover"
                          source = {{
                            uri: `${global.IMAGE_ENDPOINT}`+item2.itemImage,
                          }}
                         />
                      </View>
                    )
                  })}

              </View>


            </View>

            </View>

          </View>
          <View>
          { item.get_socialCalItems.length<4?
            <Text></Text>
          :
          <View style={styles.roundButton1}>
          <Text style={{fontSize:15, color:'white'}}>+{item.get_socialCalItems.length}</Text>
          </View>
          }
          </View>
        </View>

    </TouchableOpacity>
    )
  }

  render(){

    return(
      <View>
        
        <FlatList
          style={{marginTop:25}}
          data = {this.state.goals}
          renderItem = {(item) => this.renderItem(item)}
          keyExtractor={(item, index) => String(index)}

           />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  roundButton1: {
    width: 40,
    height: 40,


    padding: 10,

    borderRadius: 100,
    position:'absolute',
    top:'25%',
    right:0,
    backgroundColor: '#1890ff',
  },
  goalCard: {

    bottom:'7.5%',
    left:'5%',
    flexDirection:'row',
    backgroundColor:'#F0F0F0',
    // elevation:25,

    borderRadius:15,
    // borderTopColor:'red',
    // borderTopWidth:1 ,
    // borderRightColor:'red',
    // borderRightWidth:1,
    // borderBottomColor:'red',
    // borderBottomWidth:1,
    // borderLeftColor:'red',
    // borderLeftWidth:1,
    marginTop:5,
  },

  smallImage: {
    marginRight:10,
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    },
})

export default GoalContainer;
