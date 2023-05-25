import axios from 'axios'
import setInterceptors from '@/api/common/interceptors'

// 로그인시 인증 토큰 필요없는 기본 axios
// 기본
function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  })
}

// 각각의 모듈에따라 정리한  axios
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  })
  return setInterceptors(instance) // 인터셉터가 셋업된 인스턴스
}

export const accountApi = createInstanceWithAuth('/acc')
export const logiApi = createInstanceWithAuth('/logi')
export const hrApi = createInstanceWithAuth('/hr')
export const sys = createInstanceWithAuth('/sys')
export const instance = createInstance()
