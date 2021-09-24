import * as actionTypes from './actionTypes';

export const loadSmallGroupsPost = (posts) => {
  console.log("small gorup action")
   return{
     type: actionTypes.LOAD_SMALL_GROUPS_POST,
     posts: posts
   }
}
