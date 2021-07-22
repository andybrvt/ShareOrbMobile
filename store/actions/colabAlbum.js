import * as actionTypes from './actionTypes';


export const fetchColabAlbum = album => {

  return {
    type: actionTypes.FETCH_COLAB_ALBUM,
    album: album
  }
}

export const unfetchColabAlbum = () => {
  return {
    type: actionTypes.UNFETCH_COLAB_ABLUM,
    
  }
}
