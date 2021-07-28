import * as actionTypes from './actionTypes';
import  authAxios from '../../util';


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

export const fetchTimeLineColab = (albums) => {

  return {
    type: actionTypes.FETCH_TIMELINE_COLAB,
    albums: albums
  }



}

export const fetchExpiringColab = (albums) => {

  return {
    type: actionTypes.FETCH_EXPIRING_COLAB,
    albums: albums
  }

}
