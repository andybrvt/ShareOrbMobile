import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
   SafeAreaView,
   FlatList
} from 'react-native';
import { ChevronLeft } from "react-native-feather";
import authAxios from '../util';
import Carousel, { Pagination } from 'react-native-snap-carousel';


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

        <View>
          <Image
              resizeMode = "cover"
              source = {{
                uri: `${global.IMAGE_ENDPOINT}`+item.itemImage
              }}
             />

        </View>
      </View>
    )
  }


  render(){

    const { goal } = this.state;
    console.log(this.props);
    const goalItem = goal.get_socialCalItems
    return(
      <SafeAreaView
        style = {{
          flex: 1
        }}
        >
        <View
          style = {{
            flex: 1
          }}
          >

          <TouchableOpacity
            onPress = {() => this.props.navigation.goBack(0)}
            >
            <ChevronLeft height = {40} width = {40} />

          </TouchableOpacity>

          <Carousel
            data = {goalItem}
            renderItem = {(item) => this.renderItem(item)}
            keyExtractor={(item, index) => String(index)}
            sliderWidth = {100}
            itemWidth = {100}
             />

        </View>

      </SafeAreaView>
    )
  }
}

export default GoalPage;

const styles = StyleSheet.create({
  itemCard: {
    height: 100,
    width: 100,
    backgroundColor: 'gray'
  }
})
