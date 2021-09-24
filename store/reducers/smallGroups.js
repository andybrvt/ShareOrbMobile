import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


// The group post is probally gonna be a dictionary
// where each group post is rep by its id and it will just
// match that of the group itself
const initialState = {
  groupPosts: {}
}

const loadSmallGroupsPost = (state, action) => {


  state.groupPosts[action.posts.groupId]  = action.posts.groupPosts
  const dict = state.groupPosts
  console.log(dict)
  return updateObject(state, {
    groupPosts: dict
  })
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.LOAD_SMALL_GROUPS_POST:
      return loadSmallGroupsPost(state, action)
    default:
      return state;
  }
}

export default reducer;
