import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
//
const initialState ={
  token: null,
  notificationToken: "",
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
  showIntialInstructions: true,
  notificationSeen: 0,
  date_joined: null,
  bio: "",
  curLoad: 0,
  totalLoad: 0,
  showCamera: false,
  dailyNotification: true,
  showFirstPostModal: false,
  inviToken: null,
  inviteCode: "",
  smallGroups: [],
  smallGroupIds: [],
  activeSlide: null,
  updateSlide:null,

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

const authInviteSuccess =(state, action) => {
  return updateObject(state, {
    inviToken: action.token
  })
}




const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authAddCurLoad = (state, action) => {
  return updateObject(state, {
    curLoad: state.curLoad + 0.1
  })
}

// DELETE LATER
const authAddTotalLoad = (state, action) => {
  return updateObject(state, {
    totalLoad: state.totalLoad + 1
  })
}

const authZeroCurLoad = (state, action) => {
  return updateObject(state, {
    curLoad: 0
  })
}

// DELETE LATER
const authZeroTotalLoad = (state, action) => {
  return updateObject(state, {
    totalLoad: 0
  })
}



const authLogout = (state, action) => {

  return updateObject(state, {
    token: null,
    notificationToken: "",
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
    showIntialInstructions: true,
    notificationSeen: 0,
    date_joined: null,
    bio: "",
    curLoad: 0,
    totalLoad: 0,
    showCamera: false,
    dailyNotification: true,
    showFirstPostModal: false,
    inviToken: null,
    inviteCode: "",
    smallGroups: [],
    smallGroupIds: [],

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
    bio: action.bio,
    dailyNotification: action.dailyNotification,
    inviteCode: action.inviteCode,
    smallGroups: action.smallGroups,
    smallGroupIds: action.smallGroupIds
  });
};

// DELETE
const changeProfilePicAuth = (state, action) => {
  return updateObject(state, {
    profilePic: action.profilePic
  })
}

const changeProfileInfoAuth = (state, action) => {

  return updateObject(state, {
    profilePic: action.profileInfo.profile_picture,
    firstName: action.profileInfo.first_name,
    username: action.profileInfo.username,
    bio: action.profileInfo.bio
  })
}

const openShowCamera = (state, action) => {
  return updateObject(state, {
    showCamera: true
  })
}

const closeShowCamera = (state, action) => {
  return updateObject(state, {
    showCamera: false
  })
}

const authAddNotificationToken = (state, action) => {
  return updateObject(state, {
    notificationToken: action.token
  })
}

const unShowIntialInstructions = (state, action) => {
  return updateObject(state, {
    showIntialInstructions: action.bool
  })
}

const resetNotificationSeen = (state, action) => {
  return updateObject(state, {
    notificationSeen:  0
  })
}

const authAddUnaddFollowing = (state, action) => {
  return updateObject(state, {
    following: action.following
  })
}

const setDailyNoti = (state, action) => {
  return updateObject(state, {
    dailyNotification: action.bool
  })
}

const authShowFirstPostModal = (state, action) => {
  return updateObject(state, {
    showFirstPostModal: true
  })
}

const authUnshowFirstPostModal = (state, action) => {
  return updateObject(state, {
    showFirstPostModal: false
  })
}

const authAddSmallGroup = (state, action) => {
  var groupId = action.group.id.toString()
  return updateObject(state,{
    smallGroups: [...state.smallGroups, action.group],
    smallGroupIds: [...state.smallGroupIds, groupId]
  })
}

const authUpdateSmallGroup = (state, action) => {
  return updateObject(state, {
    smallGroups: state.smallGroups.map(
      groups => groups.id === action.group.id ? {
        ...action.group
      } : groups

    )
  })
}

const authUpdateNewsfeedSlide = (state, action) => {
  console.log("test")
  console.log(action)
}



const authSetActiveNewsfeedSlide = (state, action) => {
  return updateObject(state, {
    activeSlide: action.index
  })
}

const authSetActiveNewsfeedSlideNull = (state, action) => {
  return updateObject(state, {
    activeSlide: null
  })
}


const reducer = (state = initialState, action) => {
  switch(action.type){

    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_INVITE_SUCCESS:
      return authInviteSuccess(state, action);
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

    // DELETE
    case actionTypes.CHANGE_PROFILE_PIC_AUTH:
      return changeProfilePicAuth(state, action);


    case actionTypes.CHANGE_PROFILE_INFO_AUTH:
      return changeProfileInfoAuth(state, action);
    case actionTypes.OPEN_SHOW_CAMERA:
      return openShowCamera(state,action);
    case actionTypes.CLOSE_SHOW_CAMERA:
      return closeShowCamera(state, action);
    case actionTypes.AUTH_ADD_NOTIFICATION_TOKEN:
      return authAddNotificationToken(state, action);
    case actionTypes.UNSHOW_INITIAL_INSTRUCTIONS:
      return unShowIntialInstructions(state, action);
    case actionTypes.RESET_NOTIFCATION_SEEN:
      return resetNotificationSeen(state, action);
    case actionTypes.AUTH_ADD_UNADD_FOLLOWING:
      return authAddUnaddFollowing(state, action);
    case actionTypes.SET_DAILY_NOTI:
      return setDailyNoti(state, action);
    case actionTypes.AUTH_SHOW_FIRST_POST_MODAL:
      return authShowFirstPostModal(state, action)
    case actionTypes.AUTH_UNSHOW_FIRST_POST_MODAL:
      return authUnshowFirstPostModal(state, action)
    case actionTypes.AUTH_ADD_SMALL_GROUP:
      return authAddSmallGroup(state, action)
    case actionTypes.AUTH_UPDATE_SMALL_GROUP:
      return authUpdateSmallGroup(state, action)
    case actionTypes.AUTH_SET_ACTIVE_NEWSFEED_SLIDE:
      return authSetActiveNewsfeedSlide(state, action)
    case actionTypes.AUTH_UPDATE_NEWSFEED_SLIDE:
      return authUpdateNewsfeedSlide(state, action)
    case actionTypes.AUTH_SET_ACTIVE_NEWSFEED_SLIDE_NULL:
      return authSetActiveNewsfeedSlideNull(state, action)
    default:
      return state;
  }
}

export default reducer;
