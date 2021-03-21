import React from 'react';
import { Text, View, Button } from 'react-native';

class Home extends React.Component{


  render(){
    console.log(this.props)
    return(
      <View>
        <Text>
         This is our home

        </Text>
        <Button
          title = "Friends"
          onPress = {() =>this.props.navigation.navigate('Friends')}
        />



      </View>
    )
  }
}

export default Home;
