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

  return updateObject(state, {
    profile: {
      ...state.profile,
      profile_picture: action.profilePic
    }
  })
}

export const changeProfileInfo = (state, action) => {

  const info = action.profileInfo
  return updateObject(state, {
    profile: {
      ...state.profile,
      profile_picture: info.profile_picture,
      first_name: info.first_name,
      username: info.username
    }
  })
}

export const addFollowerUnfollower = (state, action) => {
  // IMPROVED

  return updateObject(state, {
    profile: {
      ...state.profile,
      get_followers: action.followerList
    }

  })
}


const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.LOAD_PROFILE:
      return loadProfile(state, action)

    // DELETE
    case actionTypes.CHANGE_PROFILE_PIC:
      return changeProfilePic(state, action)

    case actionTypes.CHANGE_PROFILE_INFO:
      return changeProfileInfo(state, action)
    case actionTypes.ADD_FOLLOWER_UNFOLLOWER:
      return addFollowerUnfollower(state, action);
    default:
      return state;
  }
}

export default reducer;
