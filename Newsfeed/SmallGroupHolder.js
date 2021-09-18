import React from 'react';
import { Text,
   Dimensions,
   View,
   Button,
   StyleSheet,
   TextInput,
   Switch,
   FlatList,
   TouchableWithoutFeedback } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';

const width = Dimensions.get("window").width


// this file will be used to hold the different small groups

class SmallGroupHolder extends React.Component{

  constructor(props){

    super(props)

    this.state = {
      list: [1, 2 ,3 ]
    }
  }


  renderItem = ({item}) => {

    return(
      <View style = {styles.listItem}>
        <Avatar
          rounded
          source = {{
            uri: "https://pixabay.com/photos/tree-sunset-clouds-sky-silhouette-736885/"
          }}
           />
      </View>
    )
  }

  render(){

    return(
      <View style = {styles.container} >
        <FlatList
          horizontal={true}

          // onRefresh = {()=> this.props.onRefresh()}
          // refreshing = {this.props.refreshing}
          // ListHeaderComponent = {this.listHeader}
          // numColumns = {2}
          data = {this.state.list}
          renderItem = {this.renderItem}
          keyExtractor={(item, index) => String(index)}
          // onEndReachedThreshold = {0.2}
          // onEndReached = {()=> this.onLoadMorePeople()}
          // showsVerticalScrollIndicator={false}
           />
      </View>


    )
  }
}

export default SmallGroupHolder;

const styles = StyleSheet.create({

  container: {
    width: width,
    height: 50,
  },
  listItem: {
    width: width/5,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
