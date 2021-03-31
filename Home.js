import React from 'react';
import { Text, View, Button } from 'react-native';
import axios from "axios";


class Home extends React.Component{


  // componentDidMount(){
  //     axios.get("http://127.0.0.1:8000/userprofile/testMobileView")
  //     .then(res => {
  //       (res)
  //     })
  //     .catch(err =>{
  //       (err)
  //     })
  // }

  render(){
  
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
