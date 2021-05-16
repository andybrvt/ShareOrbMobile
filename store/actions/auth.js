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
  return(
    type: actionTypes.AUTH_ADD_CUR_LOAD
  )
}

export const authAddTotalLoad = () => {
  // increment the total load by 1
  return (
    type: actionTypes.AUTH_ADD_TOTAL_LOAD
  )
}

export const authZeroCurLoad = () => {
  // zero out the curLoad
  return(
    type: actionTypes.AUTH_ZERO_CUR_LOAD
  )
}

export const authZeroTotalLoad = () => {
  // zero out the totalLoad
  return(
    type: actionTypes.AUTH_ZERO_TOTAL_LOAD
  )
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


      // This auth axios will run and get the token and then you will
      // add the token into the local storage

      // This is to add the token into redux
      dispatch(authSuccess(token))
      // window.location.reload(true);

      // Now we will get the current user

      // return axios.get(`${global.IP_CHANGE}/userprofile/current-user`)

    })

    .catch(err => {
      console.log(err)
      // dispatch(authFail(err));
    })




  }
}

export const logout = () => {
  AsyncStorage.removeItem("token")
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

      if(res === undefined){
        // Check if there is token already existing,
        // if not you will log out
        dispatch(logout());
      } else {


        // if you have a token stored then you will put it into the redux
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
         res.data.date_joined
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
    date_joined: date_joined
  };
};
