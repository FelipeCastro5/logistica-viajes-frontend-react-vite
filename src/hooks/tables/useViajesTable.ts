// src/hooks/useViajesTable.ts
import { useEffect, useState } from "react"
import { getPaginatedViajesByUsuario } from "@/services/adapters/viajes.adapter"

export const useViajesTable = (idUsuario: number, itemsPerPage = 10) => {
  const [viajes, setViajes] = useState<any[]>([])
  const [errorMsg, setErrorMsg] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (!idUsuario) return

    let isMounted = true

    const fetchViajes = async () => {
      try {
        const res = await getPaginatedViajesByUsuario(idUsuario, page, itemsPerPage)

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
  }, [page, idUsuario, itemsPerPage])

  return {
    viajes,
    errorMsg,
    page,
    totalPages,
    setPage,
  }
}
