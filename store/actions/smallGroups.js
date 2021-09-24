import * as actionTypes from './actionTypes';

export const loadSmallGroupsPost = (posts) => {
   return{
     type: actionTypes.LOAD_SMALL_GROUPS_POST,
     posts: posts
   }
}
