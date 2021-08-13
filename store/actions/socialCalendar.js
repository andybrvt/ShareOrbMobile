import * as actionTypes from "./actionTypes";


// Used to fetch cal cell ifno
export const fetchSocialCalCellPage = (socialCalCellObj) =>{
  //IMPROVED
  return {
    type: actionTypes.FETCH_SOCIAL_CAL_CELL_PAGE,
    socialCalCellObj: socialCalCellObj
  }
}


export const sendSocialCalCellLikeUnlike = (socialItem) => {
  return {
    type: actionTypes.SEND_SOCIAL_CAL_CELL_LIKE_UNLIKE,
    socialItem: socialItem
  }
}
