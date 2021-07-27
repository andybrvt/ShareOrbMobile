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

export const fetchTimeLineColab = () => {
  authAxios.get(`${global.IP_CHANGE}`+'/colabAlbum/getAlbums')
  .then(res => {

    return {
      type: actionTypes.FETCH_TIMELINE_COLAB,
      albums: res.data
    }


  })
}

export const fetchExpiringColab = () => {
  authAxios.get(`${global.IP_CHANGE}`+'/colabAlbum/getLiveAlbums')
  .then(res => {
    return {
      type: actionTypes.FETCH_EXPIRING_COLAB,
      albums: res.data
    }
  })
}
