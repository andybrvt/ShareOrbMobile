import axios from "axios";
import { AsyncStorage } from 'react-native';


export const authAxios = axios.create({
  baseURL: `${global.IP_CHANGE}/userprofile/`,

})

authAxios.interceptors.request.use(
  // This will set the values in the auth axios for the headers
  // For AsyncStorage
  async config => {
    const token = await AsyncStorage.getItem("token")
    if(token){
      config.headers['Authorization'] = `Token ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// export const setClientToken = token => {
//   (token, "it hits here")
//   authAxios.interceptors.request.use(function(config) {
//     config.headers.Authorization = `Token ${token}`;
//
//     (config)
//     return config;
//   });
// };


export default authAxios;
// export const authAxios = AsyncStorage.getItem("token")
// .then(res => {
//   axios.create({
//     baseURL: `${global.IP_CHANGE}/userprofile/`,
//     headers: {
//       Authorization: `Token `+ res
//     }
//   });
//
// })


// export const authAxios = axios.create({
//   baseURL: `${global.IP_CHANGE}/userprofile/`,
//   headers: {
//     Authorization: `Token ${AsyncStorage.getItem("token")
//     .then(res => {
//       return res
//     })}`
//   }
// });
