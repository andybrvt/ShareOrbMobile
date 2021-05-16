import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import axios from "axios";
import * as authActions from '../store/actions/auth';
import { connect } from 'react-redux';
import SocialNewsfeedPost from './SocialNewsfeedPost';
import NewsfeedButtonContainer from './NewsfeedButtonContainer';

// This will be the list of all the newsfeed items
// Everyone's day

class InfiniteScroll extends React.Component{

  render(){

  
    let post = []

    if(this.props.socialPosts){
      post = this.props.socialPosts
    }



    return (
      <View>


          {
              (post.length!=0) ?
              <View>
                {post.map((j,index) => {
                  return(
                    <View style={{top:25}} key = {index}>
                      {
                        j.post.get_socialCalItems ?

                         <SocialNewsfeedPost

                           ViewProfile = {this.props.ViewProfile}
                           data = {j}

                           />

                       :

                       <Text
                         > There is no post here</Text>
                      }
                    </View>
                  )
                  })}
                </View>

              :


              <View>
                <Text> There are no post</Text>
              </View>


            }

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
