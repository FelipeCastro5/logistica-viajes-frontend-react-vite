import axios from "axios";
import type { AxiosInstance } from "axios";
import { BASE_URL } from "./config"

export type ApiResponse<T = any> = {
  status: number
  msg: string
  data: T
}

export class AxiosRequest {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })

    this.instance.interceptors.response.use(
      response => response,
      error => {
        console.error(`[Axios Error]`, error.response?.status, error.message)
        return Promise.reject(error.response?.data || { message: "Error desconocido" })
      }
    )
  }

  async request<T>(url: string, method: string, data: any = null, headers: any = {}): Promise<ApiResponse<T>> {
    const isFormData = data instanceof FormData

    const finalHeaders = isFormData
      ? { ...headers }
      : { "Content-Type": "application/json", ...headers }

    return this.instance.request<ApiResponse<T>>({
      url,
      method,
      data,
      headers: finalHeaders
    }).then(res => res.data)
  }
}

// import axios from "axios"
// import type { AxiosInstance } from "axios"
// import { BASE_URL } from "./config"

// export class AxiosRequest {
//   private instance: AxiosInstance

//   constructor() {
//     this.instance = axios.create({
//       baseURL: BASE_URL,
//       timeout: 5000
//       // No pongas headers aquí
//     })

//     this.instance.interceptors.response.use(
//       response => response,
//       error => {
//         console.error(`[Axios Error]`, error.response?.status, error.message)
//         return Promise.reject(error.response?.data || { message: "Error desconocido" })
//       }
//     )
//   }

//   async request<T>(url: string, method: string, data: any = null, headers: any = {}): Promise<T> {
//     const isFormData = data instanceof FormData

//     const finalHeaders = isFormData
//       ? { ...headers } // no sobrescribas Content-Type
//       : { "Content-Type": "application/json", ...headers }

//     return this.instance.request({
//       url,
//       method,
//       data,
//       headers: finalHeaders
//     }).then(res => res.data)
//   }
// }
