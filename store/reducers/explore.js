import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


// Profiles will be all the profiles and profile (no s) will be the current user
// profile
const initialState = {
  profile: {},

}


export const loadProfile = (state, action) => {
  //IMPROVED

  return updateObject(state, {
    profile: action.profile
  })
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.LOAD_PROFILE:
      return loadProfile(state, action)
    default:
      return state;
  }
}

export default reducer;
