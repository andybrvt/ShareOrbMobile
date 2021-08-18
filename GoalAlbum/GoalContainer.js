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


class GoalContainer extends React.Component{

  state = {
    goals: []
  }

  componentDidMount(){
    const userId = this.props.userId
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/goalList/`+userId)
    .then( res => {
      console.log(res.data)
      this.setState({
        goals: res.data
      })
    })
  }

  renderItem = ({item}) =>{

    return(
      <View>
        <Text> stuff here </Text>
      </View>
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

export default GoalContainer;
