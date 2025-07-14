// src/http/HttpRequest.ts
import { AxiosRequest } from "./ApiRemote"
import { routes } from "./routes.types"

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
    const endpointTemplate = routes[base][entry] as string

    // Buscar parámetros usados en la ruta (ej: {id})
    const usedKeys: string[] = []
    let finalUrl = endpointTemplate.replace(/\{(\w+)\}/g, (_, key) => {
      usedKeys.push(key)
      return String(params[key])
    })

    // Los parámetros que no se usaron en el path van al query
    const queryParams = Object.keys(params)
      .filter((key) => !usedKeys.includes(key))
      .reduce((acc, key) => {
        acc[key] = params[key]
        return acc
      }, {} as Record<string, string | number>)

    const queryString = new URLSearchParams(queryParams as any).toString()
    if (queryString) {
      finalUrl += `?${queryString}`
    }

    return await new AxiosRequest().request(finalUrl, method, data, headers)
  } catch (error) {
    console.error("Error en RequestHttp:", error)
    throw error
  }
}
