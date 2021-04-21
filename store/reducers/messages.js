import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';



const initialState = {
  messages:[],
  chats: [],
  curChatId: 0,
  curChat:{},
  unseen: 0,
}

const setChats = (state, action) => {
  let curChat = ""
  console.log(action.chats)
  if(action.chats.chatList.length === 0){
    curChat = 0
  } else {
    curChat = action.chats.chatList[0].id
  }

  return updateObject(state, {
    chats:action.chats.chatList,
    unseen: action.chats.unseen,
    curChatId: curChat
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SET_CHATS:
     return setChats(state,action);
    default:
      return state;
  }
}

export default reducer;
