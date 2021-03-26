import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
//
const initialState ={
  token: null,
  error: null,
  test: "test1"
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};


const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START:
      return authStart(state, action);

    default:
      return state;
  }
}

export default reducer;
