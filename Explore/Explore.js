import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';

class Explore extends React.Component{


  render(){
    return  (
      <View>
        <Text> This will be the explore page</Text>
      </View>

    )
  }
}

export default Explore;
