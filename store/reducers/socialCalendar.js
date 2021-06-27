import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import * as dateFns from 'date-fns';

const initialState = {

  socialDate: new Date(),
  socialCalCellInfo: {}
}


const fetchSocialCalCellPage = (state, action) => {
  return updateObject (state, {
    socialCalCellInfo: action.socialCalCellObj
  })
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.FETCH_SOCIAL_CAL_CELL_PAGE:
      return fetchSocialCalCellPage(state, action);
    default:
      return state;
  }
}

export default reducer;
