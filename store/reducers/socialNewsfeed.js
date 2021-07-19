import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {

  socialPosts: [],
  curSocialCell: {},
  showFinalModal: false,
  socialComments: {},
  commentHost: null,
  cellDate: new Date()
}

const loadSocialPosts = (state, action) => {
  return updateObject(state, {
    socialPosts: action.post
  })
}

const loadMoreSocialPost = (state, action) =>{
  return updateObject(state, {
    socialPosts: [...state.socialPosts, ...action.post]
  })
}

const addSocialPostLike = (state, action) => {
  return updateObject(state, {
    socialPosts: state.socialPosts.map(
      socialPost => socialPost.id === action.postObj.contentTypeId ? {
        ...socialPost,
        post: action.postObj.socialCalCellObj
      } : socialPost
    )
  })
}

const loadCurSocialCell = (state, action) => {

  return updateObject(state, {
    curSocialCell: action.socialCell
  })
}

const addFirstSocialCellPost = (state, action) => {
  return updateObject(state, {
    socialPosts: [action.socialCell, ...state.socialPosts]
  })
}

const updateSocialCellPost = (state, action) => {
  return updateObject(state, {
    socialPosts: state.socialPosts.map(
      socialPost => socialPost.id === action.socialCell.id ?
        action.socialCell : socialPost
    )
  })
}

const finalPostModal = (state, action) => {
  return updateObject(state,{
    showFinalModal: !state.showFinalModal
  })
}

const loadSocialComments = (state, action) => {
  return  updateObject(state, {
    socialComments: action.socialComments.socialComments,
    commentHost: action.socialComments.ownerId,
    cellDate: action.socialComments.cellDate
  })
}

const sendSocialComment =(state, action) => {
  return updateObject(state, {
    socialComments: [...state.socialComments, action.socialComment]
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
    case actionTypes.FINAL_POST_MODAL:
      return finalPostModal(state, action);
    case actionTypes.LOAD_SOCIAL_COMMENTS:
      return loadSocialComments(state, action);
    case actionTypes.SEND_SOCIAL_COMMENT:
      return sendSocialComment(state, action);
    default:
      return state;

  }
}

export default reducer;
