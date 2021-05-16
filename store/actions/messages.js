import * as actionTypes from "./actionTypes";


// this function will be used to initally
// render all the chats
export const setChats = chats => {
  return {
    type: actionTypes.SET_CHATS,
    chats: chats
  }
}
