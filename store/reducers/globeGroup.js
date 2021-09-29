import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


const initialState = {
  globePosts: []
}


const fetchGlobePost = (state, action) => {
  return updateObject(state, {
    globePosts: action.posts
  })
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.FETCH_GLOBE_POST:
      return fetchGlobePost(state, action)
    default:
      return state;
  }
}

export default reducer;
