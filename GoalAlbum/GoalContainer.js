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
      <View style={styles.goalCard}>
        {item.get_socialCalItems.map((item2,index) => {
          return(
            <View style={{ }} key = {index}>
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
  goalCard: {
    left:'20%',
    padding:10,
    flexDirection:'row',
    width:'90%',
    borderTopColor:'red',
    borderTopWidth:1 ,
    borderRadius:15,
    borderRightColor:'red',
    borderRightWidth:1,
    borderBottomColor:'red',
    borderBottomWidth:1,
    borderLeftColor:'red',
    borderLeftWidth:1,
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
