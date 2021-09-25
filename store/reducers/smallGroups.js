import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


// The group post is probally gonna be a dictionary
// where each group post is rep by its id and it will just
// match that of the group itself
const initialState = {
  groupPosts: {}
}

const loadSmallGroupsPost = (state, action) => {


  // state.groupPosts[action.posts.groupId]  = action.posts.groupPosts
  // const dict = state.groupPosts
  // THE REASON YOU HAVE TO DO THIS IS BECAUSE YOU CANNOT CHANGE THE
  // STATE DIRECTY (THIS ALSO APPLIES TO REDUX TOO)
  return updateObject(state, {
    groupPosts: {
      ...state.groupPosts,
      [action.posts.groupId.toString()]: action.posts.groupPosts
    }
  })
}

const sendGroupPost = (state, action) => {

  console.log(state.groupPosts[action.post.groupId.toString()], 'stufff her ')
  return updateObject(state, {
    groupPosts: {
      ...state.groupPosts,
      [action.post.groupId.toString()]:[
        action.post.groupPost,
        ...state.groupPosts[action.post.groupId.toString()],
      ]
    }
  })
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.LOAD_SMALL_GROUPS_POST:
      return loadSmallGroupsPost(state, action)
    case actionTypes.SEND_GROUP_POST:
      return sendGroupPost(state, action)
    default:
      return state;
  }
}

export default reducer;
