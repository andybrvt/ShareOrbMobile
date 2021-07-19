import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";


const initialState = {
  notifications: [],
  showNotification: false
};

const setNotifications = (state, action) => {
  return updateObject(state, {
    notifications: action.notifications
  });
};

const newNotification = (state, action) => {
  console.log(action)
  return updateObject(state, {
    notifications: [action.notification, ...state.notifications]
  })
}

const reducer = (state = initialState, action ) => {
  switch(action.type) {
    case actionTypes.NEW_NOTIFICATION:
      return newNotification(state,action);
    case actionTypes.SET_NOTIFICATIONS:
      return setNotifications(state,action);
    // case actionTypes.DELETE_NOTIFICATION:
    //   return deleteNotification(state, action);
    // case actionTypes.OPEN_NOTIFICATION:
    //   return openNotification(state,action);
    // case actionTypes.CLOSE_NOTIFICATION:
    //   return closeNotification(state, action)
    // case actionTypes.CLEAR_NOTIFICATION:
    //   return clearNotification(state, action)
    default:
      return state;
  }
};
export default reducer;
