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

      <View style={styles.goalCard}>
        <View style={{flexDirection:'column', position:'absolute', top:'10%'}}>
            <Text style = {{color:'black', fontWeight:'bold', fontSize:24}}>
              {socialMonth.substring(0,3)}
            </Text>
            <Text style ={{color:'black', fontWeight:'bold', fontSize:34}}>
              {socialDay}
            </Text>
        </View>
        <View style={{flexDirection:'column'}}>
        <View style={{marginLeft:'15%', width:'90%', backgroundColor:'green' }}>
          <Text style={{padding:10, fontSize:18, fontWeight:'bold' }}>{item.goal}</Text>
        </View>
        <View style={{marginLeft:'15%',flexDirection:'row', backgroundColor:'blue'}}>



          <View style={{flexDirection:'row', paddingLeft:20, width:'75%'}}>
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
          <View style={{alignItems:'center'}}>{ cap>0?
            <Text>+{cap}</Text>
          :
          <Text style={{fontSize:20, color:'black'}}>{item.get_socialCalItems.length}</Text>
          }
          </View>
        </View>

        </View>

      </View>
    </TouchableOpacity>
    )
  }

  render(){

    return(
      <View>
        <FlatList

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
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    right:10,
    bottom:10,
    backgroundColor: '#1890ff',
  },
  goalCard: {
    left:'5%',
    flexDirection:'row',
    backgroundColor:'#F0F0F0',
    elevation:50,
    width:'90%',
    borderRadius:15,
    // borderTopColor:'red',
    // borderTopWidth:1 ,
    // borderRightColor:'red',
    // borderRightWidth:1,
    // borderBottomColor:'red',
    // borderBottomWidth:1,
    // borderLeftColor:'red',
    // borderLeftWidth:1,
    marginTop:15,
  },

  smallImage: {
    marginRight:10,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    },
})

export default GoalContainer;
