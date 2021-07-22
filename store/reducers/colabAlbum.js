import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


const initialState = {
  curColabAlbum: {}
}

const fetchColabAlbum = (state, action) => {
  return updateObject(state, {
    curColabAlbum: action.album
  })
}

const unfetchColabAlbum = (state, action) => {
  return updateObject(state, {
    curColabAlbum: {}
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_COLAB_ALBUM:
      return fetchColabAlbum(state, action);
    case actionTypes.UNFETCH_COLAB_ALBUM:
      return unfetchColabAlbum(state, action);
    default:
      return state;
  }

}

export default reducer;
