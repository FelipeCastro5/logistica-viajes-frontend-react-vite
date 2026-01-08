const ENV = import.meta.env.VITE_ENV || "dev"

const API_BASE_URLS: Record<string, string> = {
  local: import.meta.env.VITE_API_LOCAL || "",
  dev: import.meta.env.VITE_API_DEV || "https://logistica-viajes-backend-nest-remesa.onrender.com/",
  prod: import.meta.env.VITE_API_PROD || ""
}

export const BASE_URL = API_BASE_URLS[ENV]
