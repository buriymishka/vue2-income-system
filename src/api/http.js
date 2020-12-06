import axios from 'axios'
import router from '@/router/index'
import store from '@/store'
import { getAC, setAC } from '@/tokens/index'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true
})

instance.interceptors.request.use(addAccessToken);

instance.interceptors.response.use(response => {
  return response.data
}, async (error) => {
  if (error.response.status === 401) {
    let refresh = await instance.get('tokens/refresh')
    if (refresh.res && refresh.newAccessToken) {
      setAC(refresh.newAccessToken)
      return instance(addAccessToken(error.config));
    } else {
      store.dispatch("globalClear")
      router.push({ name: 'Login' }).catch(() => { });
    }
  }

  if (error.response.data.message) {
    error.message = error.response.data.message
  }
  throw error
})

export default instance

function addAccessToken(request) {
  request.headers.access_token = getAC()

  return request;
}

