import axios from "axios";
import * as actionTypes from "./actionTypes";
import { AsyncStorage } from 'react-native';
import  { authAxios } from '../../util';

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
      // This auth axios will run and get the token and then you will
      // add the token into the local storage
      AsyncStorage.setItem('token', token)

      // This is to add the token into redux
      dispatch(authSuccess(token))
      // window.location.reload(true);

      // Now we will get the current user

      // return axios.get(`${global.IP_CHANGE}/userprofile/current-user`)

    })
    // .then(res => {
    //   console.log(res.data)
    //   const username = res.data.username;
    //   const id = res.data.id;
    //
    //
    //   console.log(username, id)
    // })

    .catch(err => {
      console.log(err)
    })




  }
}

export const logout = () => {

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

// This is where we check if you are login already or not
export const authCheckState = () => {
  console.log('auth check state hit')
  return dispatch => {
    const token = AsyncStorage.getItem("token");
    if(token === undefined){
      // Check if there is token already existing,
      // if not you will log out
      dispatch(logout());
    } else {
      console.log('here is the token')
      console.log(token)
      // if you have a token stored then you will put it into the redux
      dispatch(authSuccess(token))
      dispatch(grabUserCredentials())
      // dispatch()

    }



  }
}

export const grabUserCredentials = () => {
  // This function is the one that acutally grabs the users information

  return dispatch => {
    authAxios.get(`${global.IP_CHANGE}/userprofile/current-user`)
    .then(res => {
      console.log(res.data)
    })
  }
}
