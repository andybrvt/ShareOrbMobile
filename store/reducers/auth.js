import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
//
const initialState ={
  token: null,
  error: null,
  loading: false,
  username: null,
  id: null,
  firstName: '',
  lastName: '',
  profilePic: '',
  following: [],
  followers: [],
  sharedList: [],
  phone_number: "",
  email: "",
  dob: "",
  private: false,
  sentRequestList: [],
  requestList: [],
  showIntialInstructions: false,
  notificationSeen: 0
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};

const addCredentials = (state, action) => {
  return updateObject(state, {
    username: action.username,
    id: action.id,
    firstName: action.firstName,
    lastName: action.lastName,
    profilePic: action.profilePic,
    following: action.following,
    followers: action.followers,
    phone_number: action.phone_number,
    email: action.email,
    dob: action.dob,
    private: action.private,
    sentRequestList: action.sentRequestList,
    requestList: action.requestList,
    showIntialInstructions: action.showIntialInstructions,
    notificationSeen: action.notificationSeen
  });
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START:
      return authStart(state, action);
      case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.ADD_CREDENTIALS:
      return addCredentials(state, action);
    default:
      return state;
  }
}

export default reducer;
