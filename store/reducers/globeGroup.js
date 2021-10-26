import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


const initialState = {
  globePosts: [],
  globeComments: [],
  closeOrb: null
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

const loadMoreGlobePost = (state, action) => {
  return updateObject(state, {
    globePosts: [...state.globePosts, ...action.posts]
  })
}

const addCloseOrb = (state, action) => {
  return updateObject(state, {
    closeOrb: action.orb
  })
}

const nullCloseOrb = (state, action) => {
  return updateObject(state, {
    closeOrb: null
  })
}



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
    case actionTypes.LOAD_MORE_GLOBE_POST:
      return loadMoreGlobePost(state, action)
    case actionTypes.ADD_CLOSE_ORB:
      return addCloseOrb(state, action)
    case actionTypes.NULL_CLOSE_ORB:
      return nullCloseOrb(state, action)
    default:
      return state;
  }
}

export default reducer;
