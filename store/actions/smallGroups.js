import * as actionTypes from './actionTypes';

export const loadSmallGroupsPost = (posts) => {
  console.log("small gorup action")
   return{
     type: actionTypes.LOAD_SMALL_GROUPS_POST,
     posts: posts
   }
}

export const sendGroupPost = (post) => {
  return{
    type: actionTypes.SEND_GROUP_POST,
    post: post
  }
}

export const sendGroupPostLike = (post) => {
  return{
    type: actionTypes.SEND_GROUP_POST_LIKE,
    post: post
  }
}


export const loadMoreSmallGroupPost = (posts) => {
  return{
    type: actionTypes.LOAD_MORE_SMALL_GROUP_POST,
    posts: posts
  }
}
