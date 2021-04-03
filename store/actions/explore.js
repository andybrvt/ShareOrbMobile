import * as actionTypes from './actionTypes';


export const loadProfile = (profile) => {
  //IMPROVED
  //This will load in the profile for the profile page
  return {
    type: actionTypes.LOAD_PROFILE,
    profile: profile
  }

}
 
