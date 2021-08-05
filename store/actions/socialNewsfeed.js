import * as actionTypes from './actionTypes';
// This will be used for the new social newsfeed
export const loadSocialPosts = post =>{

  return {
    type: actionTypes.LOAD_SOCIAL_POSTS,
    post: post
  }
}

export const loadMoreSocialPost = post => {
  // This function will add additional post to the end
  // of the post list
  return {
    type: actionTypes.LOAD_MORE_SOCIAL_POST,
    post: post
  }
}


export const addSocialPostLike = postObj => {
  return {
    type: actionTypes.ADD_SOCIAL_POST_LIKE,
    postObj: postObj
  }
}

export const loadCurSocialCell = socialCell => {
  return {
    type: actionTypes.LOAD_CUR_SOCIAL_CELL,
    socialCell: socialCell
  }
}

export const addFirstSocialCellPost = socialCell => {
  // this function will add in the new social cal cell if its newly
  // creatd
  return {
    type: actionTypes.ADD_FIRST_SOCIAL_CELL_POST,
    socialCell: socialCell
  }
}

export const updateSocialCellPost = socialCell => {
  // this will update the exisiting social cal cell
  return {
    type: actionTypes.UPDATE_SOCIAL_CELL_POST,
    socialCell: socialCell
  }
}

export const finalPostModal = () => {
  // indicate that you open the final modal
  return{
    type: actionTypes.FINAL_POST_MODAL
  }
}

export const loadSocialComments = (socialComments) => {
  // load the comments for a specific post
  return {
    type: actionTypes.LOAD_SOCIAL_COMMENTS,
    socialComments: socialComments
  }
}

export const sendSocialComment = (socialComment) => {
  return {
    type: actionTypes.SEND_SOCIAL_COMMENT,
    socialComment: socialComment
  }
}

export const unloadSocialComments = () => {
    // use to unload the social comments
    return{
      type: actionTypes.UNLOAD_SOCIAL_COMMENTS,
      
    }
}
