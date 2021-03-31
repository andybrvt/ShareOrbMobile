import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {

  socialPosts: [],
  curSocialCell: {}
}

const loadSocialPosts = (state, action) => {
  return updateObject(state, {
    socialPosts: action.post
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_SOCIAL_POSTS:
      return loadSocialPosts(state, action);
    case actionTypes.LOAD_MORE_SOCIAL_POST:
      return loadMoreSocialPost(state, action);
    case actionTypes.ADD_SOCIAL_POST_LIKE:
      return addSocialPostLike(state, action);
    case actionTypes.LOAD_CUR_SOCIAL_CELL:
      return loadCurSocialCell(state, action)
    case actionTypes.ADD_FIRST_SOCIAL_CELL_POST:
      return addFirstSocialCellPost(state, action)
    case actionTypes.UPDATE_SOCIAL_CELL_POST:
      return updateSocialCellPost(state, action)
    default:
      return state;

  }
}

export default reducer;
