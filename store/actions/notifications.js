import * as actionTypes from "./actionTypes";


export const setNotifications = notifications => {
  return {
    type: actionTypes.SET_NOTIFICATIONS,
    notifications: notifications
  };
};

export const newNotification = notification => {
  return {
    type: actionTypes.NEW_NOTIFICATION,
    notification: notification
  };
};
