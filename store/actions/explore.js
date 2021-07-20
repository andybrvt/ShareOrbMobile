import * as actionTypes from './actionTypes';


export const loadProfile = (profile) => {
  //IMPROVED
  //This will load in the profile for the profile page
  return {
    type: actionTypes.LOAD_PROFILE,
    profile: profile
  }

}


// DELETE
export const changeProfilePic = (profilePic) => {
  return {
    type: actionTypes.CHANGE_PROFILE_PIC,
    profilePic: profilePic
  }
}

export const changeProfileInfo = (profileInfo) => {
  return{
    type: actionTypes.CHANGE_PROFILE_INFO,
    profileInfo: profileInfo
  }
}

export const addFollowerUnfollower = followerList => {
//IMPROVED
  // This will be for the receiving persopn (both for following and unfollowing)
  return{
    type: actionTypes.ADD_FOLLOWER_UNFOLLOWER,
    followerList: followerList
  }
}
