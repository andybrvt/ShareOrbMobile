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

export const changeProfilePic = (state, action) => {

  console.log('explore reducers')
  console.log(action.profilePic)
  return updateObject(state, {
    profile: {
      ...state.profile,
      profile_picture: action.profilePic
    }
  })
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.LOAD_PROFILE:
      return loadProfile(state, action)
    case actionTypes.CHANGE_PROFILE_PIC:
      return changeProfilePic(state, action)
    default:
      return state;
  }
}

export default reducer;
