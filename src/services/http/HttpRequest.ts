// src/http/HttpRequest.ts
import { AxiosRequest } from "./ApiRemote"
import { routes } from "./routes.types" // 👈 ahora importamos desde el .ts

type Routes = typeof routes
type Base = keyof Routes
type Entry<B extends Base> = keyof Routes[B]

type RequestOptions<B extends Base = Base> = {
  base: B
  entry: Entry<B>
  method: "GET" | "POST" | "PUT" | "DELETE"
}

export const RequestHttp = async <B extends Base>(
  data: any,
  { base, entry, method }: RequestOptions<B>,
  params: Record<string, string | number> = {},
  headers: Record<string, string> = {}
) => {
  try {
    const baseRoutes = routes[base]
    const endpoint = baseRoutes[entry] as string

    let finalUrl = endpoint

    // Reemplazar variables dinámicas
    Object.keys(params).forEach((key) => {
      finalUrl = finalUrl.replace(`{${key}}`, String(params[key]))
    })

    return await new AxiosRequest().request(finalUrl, method, data, headers)
  } catch (error) {
    console.error("Error en RequestHttp:", error)
    throw error
  }
}
