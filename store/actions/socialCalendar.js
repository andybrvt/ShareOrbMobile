import * as actionTypes from "./actionTypes";


// Used to fetch cal cell ifno
export const fetchSocialCalCellPage = (socialCalCellObj) =>{
  //IMPROVED
  console.log(socialCalCellObj)
  return {
    type: actionTypes.FETCH_SOCIAL_CAL_CELL_PAGE,
    socialCalCellObj: socialCalCellObj
  }
}
