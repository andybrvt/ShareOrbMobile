import * as actionTypes from './actionTypes';
// used for the new social group

export const fetchGlobePost = (posts) => {


  return{
    type: actionTypes.FETCH_GLOBE_POST,
    posts: posts
  }
}
