import axios from "axios";
import { AsyncStorage } from 'react-native';


export const authAxios = axios.create({
  baseURL: `${global.IP_CHANGE}/userprofile/`,
  headers: {
    Authorization: `Token ${AsyncStorage.getItem("token")}`
  }
});
