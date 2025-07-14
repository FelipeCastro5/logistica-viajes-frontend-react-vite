import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./config";

export type ApiResponse<T = any> = {
  status: number;
  msg: string;
  data: T;
};

export class AxiosRequest {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(`[Axios Error]`, error.response?.status, error.message);
        return Promise.reject(
          error.response?.data || { message: "Error desconocido" }
        );
      }
    );
  }

  async request<T>(
    url: string,
    method: string,
    data: any = null,
    headers: Record<string, string> = {},
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const isFormData = data instanceof FormData;

    const finalHeaders = isFormData
      ? { ...headers }
      : { "Content-Type": "application/json", ...headers };

    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      headers: finalHeaders,
      ...config
    };

    if (data !== null && method !== "DELETE") {
      axiosConfig.data = data;
    }

    return this.instance.request<ApiResponse<T>>(axiosConfig).then(res => res.data);
  }
}
