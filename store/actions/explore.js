import * as actionTypes from './actionTypes';


export const loadProfile = (profile) => {
  //IMPROVED
  //This will load in the profile for the profile page
  return {
    type: actionTypes.LOAD_PROFILE,
    profile: profile
  }

}


export const changeProfilePic = (profilePic) => {
  console.log('explore actions')
  return {
    type: actionTypes.CHANGE_PROFILE_PIC,
    profilePic: profilePic
  }
}
