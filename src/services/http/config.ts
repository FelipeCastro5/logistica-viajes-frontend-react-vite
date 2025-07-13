const ENV = import.meta.env.VITE_ENV || "local"

const API_BASE_URLS: Record<string, string> = {
  local: import.meta.env.VITE_API_LOCAL || "http://localhost:3000/api",
  dev: import.meta.env.VITE_API_DEV || "",
  prod: import.meta.env.VITE_API_PROD || ""
}

export const BASE_URL = API_BASE_URLS[ENV]
