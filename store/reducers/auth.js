import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
//
const initialState ={
  token: null,
  error: null,
  loading: true,
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
  notificationSeen: 0,
  date_joined: null,
  bio: "",
  curLoad: 0,
  totalLoad: 0,
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authDoneLoading = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    // loading: false,
  });
};





const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authAddCurLoad = (state, action) => {
  return updateObject(state, {
    curLoad: state.curLoad + 1
  })
}

const authAddTotalLoad = (state, action) => {
  console.log('in the reducers')
  return updateObject(state, {
    totalLoad: state.totalLoad + 1
  })
}

const authZeroCurLoad = (state, action) => {
  return updateObject(state, {
    curLoad: 0
  })
}

const authZeroTotalLoad = (state, action) => {
  return updateObject(state, {
    totalLoad: 0
  })
}



const authLogout = (state, action) => {
  return updateObject(state, {
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
    notificationSeen: 0,
    date_joined: null,
    bio: ""
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
    notificationSeen: action.notificationSeen,
    date_joined: action.date_joined,
    bio: action.bio
  });
};

const changeProfilePicAuth = (state, action) => {
  console.log('auth reducers')
  return updateObject(state, {
    profilePic: action.profilePic
  })
}

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
    case actionTypes.AUTH_DONE_LOADING:
      return authDoneLoading(state, action);
    case actionTypes.AUTH_ADD_CUR_LOAD:
      return authAddCurLoad(state, action);
    case actionTypes.AUTH_ADD_TOTAL_LOAD:
      return authAddTotalLoad(state, action);
    case actionTypes.AUTH_ZERO_CUR_LOAD:
      return authZeroCurLoad(state, action);
    case actionTypes.AUTH_ZERO_TOTAL_LOAD:
      return authZeroTotalLoad(state, action);
    case actionTypes.CHANGE_PROFILE_PIC_AUTH:
      return changeProfilePicAuth(state, action);
    default:
      return state;
  }
}

export default reducer;
