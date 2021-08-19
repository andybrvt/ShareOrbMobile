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

  onGoalPageDirect =(goalId) => {

    this.props.navigation.navigate("goalPage", {
      goalId: goalId
    })
  }

  renderItem = ({item}) =>{
    console.log("ITEM!!!!!!!")
    console.log(item)
    return(
      <TouchableOpacity
        onPress = {() => this.onGoalPageDirect(item.id)}
        >
        <View style={styles.goalCard}>
          <View style={{width:'90%', }}>
            <Text style={{padding:10, fontSize:16,}}>{item.goal}</Text>
          </View>
          <View style={{flexDirection:'row', paddingLeft:10,}}>
        {item.get_socialCalItems.map((item2,index) => {
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

      </TouchableOpacity>
          )
  }

  render(){

    return(
      <View>
        <FlatList
          style={{marginTop:10}}
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
    left:'5%',
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,

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
