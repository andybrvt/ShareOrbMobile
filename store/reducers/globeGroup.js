import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


const initialState = {
  globePosts: [],
  globeComments: []
}


const fetchGlobePost = (state, action) => {
  return updateObject(state, {
    globePosts: action.posts
  })
}

const sendGlobePostLike = (state, action) => {
  return updateObject(state, {
    globePosts: state.globePosts.map(
      globePost => globePost.id === action.post.id ? {
        ...action.post
      } : globePost
    )
  })
}

const fetchGlobeItemComment = (state, action) =>{

  return updateObject(state, {
    globeComments: action.comments
  })
}

const sendGlobeItemComment = (state, action) => {
  return updateObject(state, {
    globeComments: [...state.globeComments, action.comment]
  })
}

// const updateSingleGlobeItem = (state, action) => {
//   return updateObject(state, {
//
//   })
// }

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.FETCH_GLOBE_POST:
      return fetchGlobePost(state, action)
    case actionTypes.SEND_GLOBE_POST_LIKE:
      return sendGlobePostLike(state, action)
    case actionTypes.FETCH_GLOBE_ITEM_COMMENT:
      return fetchGlobeItemComment(state, action)
    case actionTypes.SEND_GLOBE_ITEM_COMMENT:
      return sendGlobeItemComment(state, action)
    case actionTypes.UPDATE_SINGLE_GLOBE_ITEM:
      return updateSingleGlobeItem(state, action)
    default:
      return state;
  }
}

export default reducer;
