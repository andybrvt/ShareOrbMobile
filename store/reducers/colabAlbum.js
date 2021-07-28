import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


const initialState = {
  curColabAlbum: {},
  expiring: [],
  timeLine: []
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

const fetchTimeLineColab = (state, action) => {
  return updateObject(state, {
    timeLine: action.albums
  })
}

const fetchExpiringColab = (state, action) => {

  return updateObject(state, {
    expiring: action.albums
  })
}

const updateExpiringColab = (state, action) => {
  return updateObject(state, {
    expiring: [...state.expiring, action.album]
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_COLAB_ALBUM:
      return fetchColabAlbum(state, action);
    case actionTypes.UNFETCH_COLAB_ALBUM:
      return unfetchColabAlbum(state, action);
    case actionTypes.FETCH_TIMELINE_COLAB:
      return fetchTimeLineColab(state, action);
    case actionTypes.FETCH_EXPIRING_COLAB:
      return fetchExpiringColab(state, action);
    case actionTypes.UPDATE_EXPIRING_COLAB:
      return updateExpiringColab(state, action);
    default:
      return state;
  }

}

export default reducer;
