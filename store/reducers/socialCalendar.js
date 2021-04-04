import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import * as dateFns from 'date-fns';

const initialState = {

  socialDate: new Date(),
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    default:
      return state;
  }
}

export default reducer;
