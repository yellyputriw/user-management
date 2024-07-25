import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import notification from './notification'

import { BASE_URL } from './environment'

const axiosApi = axios.create({
  baseURL: BASE_URL,
})

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear()
      notification('login_expired', 'error', 3000)
      setTimeout(function () {
        window.location.replace('/login')
      }, 2500)
    }
    return Promise.reject(error)
  },
)

export async function get<T>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  return axiosApi
    .get(url, config)
    .then((response: AxiosResponse<T>) => response.data)
}
export async function post<T>(
  url: string,
  data: unknown,
  config: AxiosRequestConfig = {},
): Promise<T> {
  return axiosApi
    .post(url, data, config)
    .then((response: AxiosResponse<T>) => response.data)
}

export async function put<T>(
  url: string,
  data: unknown,
  config: AxiosRequestConfig = {},
): Promise<T> {
  return await axiosApi
    .put(url, { data }, { ...config })
    .then((response: AxiosResponse<T>) => response.data)
}

export async function del<T>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data)
}
