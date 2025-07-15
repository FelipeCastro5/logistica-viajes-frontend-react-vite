// src/hooks/useViajesTable.ts
import { useEffect, useState } from "react"
import { getPaginatedViajesByUsuario } from "@/services/adapters/viajes.adapter"
import { useAuth } from "@/hooks/useAuth"

export const useViajesTable = (itemsPerPage = 10) => {
  const { user } = useAuth()
  const id_usuario = user?.id_usuario

  const [viajes, setViajes] = useState<any[]>([])
  const [errorMsg, setErrorMsg] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (!id_usuario) return

    let isMounted = true

    const fetchViajes = async () => {
      try {
        const res = await getPaginatedViajesByUsuario(id_usuario, page, itemsPerPage)

        if (isMounted) {
          if (res.status === 200) {
            setViajes(res.data.logs)
            setTotalPages(res.data.pagination.total_pages)
            setErrorMsg("")
          } else {
            setErrorMsg(res.msg || "Error desconocido al obtener los viajes")
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setErrorMsg(err?.msg || "Error al conectar con el servidor")
        }
      }
    }

    fetchViajes()

    return () => {
      isMounted = false
    }
  }, [page, id_usuario, itemsPerPage])

  return {
    viajes,
    errorMsg,
    page,
    totalPages,
    setPage,
  }
}
