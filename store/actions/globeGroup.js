import * as actionTypes from './actionTypes';
// used for the new social group

export const fetchGlobePost = (posts) => {


  return{
    type: actionTypes.FETCH_GLOBE_POST,
    posts: posts
  }
}

export const sendGlobePostLike = (post)=> {

  return{
    type: actionTypes.SEND_GLOBE_POST_LIKE,
    post: post
  }
}

export const fetchGlobeItemComment = (comments) => {

  return{
    type: actionTypes.FETCH_GLOBE_ITEM_COMMENT,
    comments: comments
  }
}

export const sendGlobeItemComment = (comment) => {
  return {
    type: actionTypes.SEND_GLOBE_ITEM_COMMENT,
    comment: comment
  }
}
