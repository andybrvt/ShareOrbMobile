import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';

class InfiniteScroll extends React.Component{

  render(){
    
    return (
      <View>
        <Text> This will be the InfiniteScroll </Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.id,
    userName: state.auth.username,
    socialPosts: state.socialNewsfeed.socialPosts
  }
}



export default connect(mapStateToProps, null)(InfiniteScroll);
