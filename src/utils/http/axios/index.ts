import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { showMessage } from './status'
import { IResponse, ILogin, RequestOptions } from './type'
import { API_BASE_URL } from '../../../../config/constant'
import { getToken, TokenPrefix } from '@/utils/auth'

// 如果請求話費了超過 `timeout` 的時間，請求將被中斷
axios.defaults.timeout = 5000
// 表示跨域請求時是否需要使用憑證
axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
// 允許跨域
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL + '',
  // transformRequest: [
  //   function (data) {
  //     //由於使用的 form-data傳數據所以要格式化
  //     delete data.Authorization
  //     data = qs.stringify(data)
  //     return data
  //   },
  // ],
})

// axios實例攔截響應
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else if (response.data && response.data.token) {
    //   localStorage.setItem('app_token', response.data.token)
    // }

    if (response.status === 200) {
      return response
    }
    showMessage(response.status)
    return response
  },
  // 請求失敗
  (error: any) => {
    const { response } = error
    if (response) {
      // 請求已發出，但是不在2xx的範圍
      showMessage(response.status)
      return Promise.reject(response.data)
    }
    showMessage('網絡連接異常,請稍後再試!')
  },
)

// axios實例攔截請求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `${TokenPrefix}${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

const request = <T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> => {
  const conf = config
  return new Promise((resolve, reject) => {
    axiosInstance
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        // resolve(res as unknown as Promise<T>);
        const {
          data: { result },
        } = res
        resolve(result as T)
      })
  })
}

// const request = <T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
//   if (typeof config === 'string') {
//     if (!options) {
//       return axiosInstance.request<T, T>({
//         url: config,
//       });
//       // throw new Error('請配置正確的請求參數');
//     } else {
//       return axiosInstance.request<T, T>({
//         url: config,
//         ...options,
//       });
//     }
//   } else {
//     return axiosInstance.request<T, T>(config);
//   }
// };

export function get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
  return request({ ...config, method: 'GET' }, options)
}

export function post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
  return request({ ...config, method: 'POST' }, options)
}

export default request
export type { AxiosInstance, AxiosResponse }
/**
 * @description: 用戶登錄案例
 * @params {ILogin} params
 * @return {Promise}
 */
// export const login = (params: ILogin): Promise<IResponse> => {
//     return axiosInstance.post('user/login', params).then(res => res.data);
// };
