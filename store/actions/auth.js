import axios from "axios";
import * as actionTypes from "./actionTypes";
import { AsyncStorage } from 'react-native';
import  authAxios from '../../util';

// import React from 'react';
// // import  { authAxios } from '../../components/util';
//
//
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  }
}

export const authInviteSuccess = (token) => {
  // will be run if you invite is successful
  return {
    type: actionTypes.AUTH_INVITE_SUCCESS,
    token: token
  }
}

export const authDoneLoading = () => {
  return {
    type: actionTypes.AUTH_DONE_LOADING
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authAddCurLoad = () => {
  // increment the cur load by 1
  return{
    type: actionTypes.AUTH_ADD_CUR_LOAD
  }

}

export const authAddTotalLoad = () => {
  // increment the total load by 1
  return {
    type: actionTypes.AUTH_ADD_TOTAL_LOAD

  }

}

export const authZeroCurLoad = () => {
  // zero out the curLoad
  return {
    type: actionTypes.AUTH_ZERO_CUR_LOAD

  }

}

export const authZeroTotalLoad = () => {
  // zero out the totalLoad
  return {
    type: actionTypes.AUTH_ZERO_TOTAL_LOAD

  }

}


export const authInvited = (token) => {
  // used to set the invite token into AsyncStorage

  return dispatch => {
    AsyncStorage.setItem('inviToken', token)
    dispatch(authInviteSuccess(token))

  }

}


export const authLogin = (username, password) => {
  // This function will be used to login in

  return dispatch => {
    dispatch(authStart())
    axios.post(`${global.IP_CHANGE}/rest-auth/login/`, {
        username: username,
        password: password
      })
    .then(res => {
      const token = res.data.key
      AsyncStorage.setItem('token', token)
      dispatch(authSuccess(token))

    })
    .catch(err => {
      console.log(err)
      dispatch(authFail(err));
    })




  }
}

export const logout = () => {
  AsyncStorage.removeItem("token")
  AsyncStorage.removeItem("inviToken")
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

// This is where we check if you are login already or not
export const authCheckState = () => {
  return dispatch => {

    const token = AsyncStorage.getItem("token")
    // since this is async storage and is a promise  you have to
    // do a . then  in order to get the value
  AsyncStorage.getItem('token')
  .then(res => {
      // res here will return the token
      if(res === null){
        // Check if there is token already existing,
        // if not you will log out

        // if the token is not saved on the phone then you will then check
        // if they have the invite key
        AsyncStorage.getItem('inviToken')
        .then(res => {

          if(res === null){
            // if you don't have a invite token saved you will get logged out
            dispatch(logout());
          } else {

            // direct you to the tutorial page by show that you have a invite token
            dispatch(authInviteSuccess(res))
          }



        })

      } else {

        // if you have a token stored then you will put it into the redux
        // AsyncStorage.getItem('inviToken')
        // .then(res => {
        //
        //   if(res === null){
        //     // if you don't have a invite token saved you will get logged out
        //     // dispatch(logout());
        //   } else {
        //
        //     // direct you to the tutorial page by show that you have a invite token
        //     dispatch(authInviteSuccess(res))
        //   }
        //
        //
        //
        // })
        dispatch(authSuccess(res))
        dispatch(grabUserCredentials())

      }
  })
  }
}

export const grabUserCredentials = () => {
  // This function is the one that acutally grabs the users information

  return dispatch => {
    authAxios.get(`${global.IP_CHANGE}/userprofile/grabCurrentUser/`)
      .then(res => {
      // AsyncStorage.setItem("username", username);
      // AsyncStorage.setItem("id", id);
      // AsyncStorage.setItem('firstName', firstName);
      // AsyncStorage.setItem('lastName', lastName);
      // AsyncStorage.setItem('profilePic', profilePic);
      // AsyncStorage.setItem('following', following);
      // AsyncStorage.setItem('followers', followers);
      // AsyncStorage.setItem('email', email);
      // AsyncStorage.setItem('dob', dob);
      // AsyncStorage.setItem('private', privatePro)
      // AsyncStorage.setItem('sentRequestList', sentRequestList)
      // AsyncStorage.setItem('requestList', requestList)
      // AsyncStorage.setItem('showIntialInstructions', showIntialInstructions)
      // AsyncStorage.setItem('notificationSeen', notificationSeen)
      dispatch(addCredentials(
        res.data.username,
         res.data.id,
         res.data.first_name,
         res.data.last_name,
         res.data.profile_picture,
         res.data.get_following,
         res.data.get_followers,
         res.data.email,
         res.data.dob,
         res.data.private,
         res.data.get_sent_follow_request,
         res.data.get_follow_request,
         res.data.showIntialInstructions,
         res.data.notificationSeen,
         res.data.date_joined,
         res.data.bio,
         res.data.dailyNotification,
         res.data.inviteCode,
         res.data.get_small_groups,
         res.data.id_small_groups
      ))
    })
    .catch(err => {
      dispatch(authFail(err));
    })
  }
}

export const addCredentials = (
   username,
   id,
   firstName,
   lastName,
   profilePic,
   following,
   followers,
   email,
   dob,
   privatePro,
   sentRequestList,
   requestList,
   showIntialInstructions,
   notificationSeen,
   date_joined,
   bio,
   dailyNotification,
   inviteCode,
   smallGroups,
   smallGroupIds
 ) => {

  return {
    type: actionTypes.ADD_CREDENTIALS,
    username: username,
    id: id,
    firstName: firstName,
    lastName: lastName,
    profilePic: profilePic,
    following: following,
    followers: followers,
    email:email,
    dob: dob,
    private: privatePro,
    sentRequestList: sentRequestList,
    requestList:requestList,
    showIntialInstructions: showIntialInstructions,
    notificationSeen: notificationSeen,
    date_joined: date_joined,
    bio: bio,
    dailyNotification: dailyNotification,
    inviteCode: inviteCode,
    smallGroups: smallGroups,
    smallGroupIds:smallGroupIds
  };
};


// DELETE
export const changeProfilePicAuth = (profilePic) => {
  return{
    type: actionTypes.CHANGE_PROFILE_PIC_AUTH,
    profilePic: profilePic
  }
}

// this will update the profile information,
// for now it includes firstname, username, bio and profile pic
// the object getting passed in will be consistend of those
// fields listed above
export const changeProfileInfoAuth = (profileInfo) => {

  return {
    type: actionTypes.CHANGE_PROFILE_INFO_AUTH,
    profileInfo: profileInfo
  }
}

// opens and closes the camera
export const openShowCamera = () => {
  return{
    type: actionTypes.OPEN_SHOW_CAMERA,

  }
}

export const closeShowCamera = () => {
  return{
    type: actionTypes.CLOSE_SHOW_CAMERA
  }
}


export const authAddNotificationToken = (token) => {
  return {
    type: actionTypes.AUTH_ADD_NOTIFICATION_TOKEN,
    token: token
  }
}

export const unShowIntialInstructions = (bool) => {
  return {
    type: actionTypes.UNSHOW_INITIAL_INSTRUCTIONS,
    bool: bool
  }
}

export const resetNotificationSeen = () => {
  // this will reset the notification count when you open the notification
  // up
  return {
    type: actionTypes.RESET_NOTIFCATION_SEEN
  }
}

export const authAddUnaddFollowing = (following) => {
  return{
    type: actionTypes.AUTH_ADD_UNADD_FOLLOWING,
    following: following
  }
}

export const setDailyNoti = (bool) => {
  return{
    type: actionTypes.SET_DAILY_NOTI,
    bool: bool
  }
}

export const authShowFirstPostModal =() => {
  return {
    type: actionTypes.AUTH_SHOW_FIRST_POST_MODAL
  }
}

export const authUnshowFirstPostModal =() => {
  return {
    type: actionTypes.AUTH_UNSHOW_FIRST_POST_MODAL
  }
}

export const authAddSmallGroup = (group) => {
  return{
    type: actionTypes.AUTH_ADD_SMALL_GROUP,
    group: group
  }
}

export const authUpdateSmallGroup = (group) => {
  return{
    type: actionTypes.AUTH_UPDATE_SMALL_GROUP,
    group: group
  }
}

export const authUpdateNewsfeedSlide = (index) => {
  return{
    type: actionTypes.AUTH_UPDATE_NEWSFEED_SLIDE,
    index: index
  }
}

export const authSetActiveNewsfeedSlide = (index) => {
  return{
    type: actionTypes.AUTH_SET_ACTIVE_NEWSFEED_SLIDE,
    index: index
  }
}

export const authSetActiveNewsfeedSlideNull = () =>{
  return{
    type: actionTypes.AUTH_SET_ACTIVE_NEWSFEED_SLIDE_NULL
  }
}

export const authUpdateAllSmallGroup = (smallGroups, smallGroupsId) => {
  return{
    type: actionTypes.AUTH_UPDATE_ALL_SMALL_GROUP,
    smallGroups: smallGroups,
    smallGroupsId: smallGroupsId
  }
}
