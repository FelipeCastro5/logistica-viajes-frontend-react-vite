// src/hooks/useAuth.ts
export const useAuth = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const isAuth = localStorage.getItem("auth") === "true"
    return { user, isAuth }
  } catch {
    return { user: {}, isAuth: false }
  }
}
