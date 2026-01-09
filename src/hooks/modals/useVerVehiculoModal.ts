import { useEffect, useState } from "react"
import { getVehiculoById, createVehiculo } from "@/services/adapters/vehiculo.adapter"
import { getSegurosByVehiculo } from "@/services/adapters/seguros.adapter"
import { toast } from "sonner"

export type Mode = "ver" | "crear" | "editar"

export type Vehiculo = {
  id_vehiculo: number
  fk_usuario: number
  placa: string
  marca: string
  configuracion: string
  tipo_vehiculo: string
  peso_vacio: number
  peso_remolque: number
}

export type Seguro = {
  id_seguro: number
  fk_vehiculo: number
  tipo_seguro: string
  numero_poliza: string
  aseguradora: string
  fecha_vencimiento: string
  valor: number
}

type Params = {
  idVehiculo: number | null
  open: boolean
  mode: Mode
  onClose: () => void
}

export function useVerVehiculoModal({
  idVehiculo,
  open,
  mode,
  onClose,
}: Params) {
  const [vehiculo, setVehiculo] = useState<Vehiculo>({
    id_vehiculo: 0,
    fk_usuario: 0,
    placa: "",
    marca: "",
    configuracion: "",
    tipo_vehiculo: "",
    peso_vacio: 0,
    peso_remolque: 0,
  })

  const [seguros, setSeguros] = useState<Seguro[]>([])
  const [seguroActivo, setSeguroActivo] = useState<Seguro | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [openCrearSeguro, setOpenCrearSeguro] = useState(false)

  const isReadOnly = mode === "ver"
  const isCreate = mode === "crear"

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const idUsuario = user.id_usuario ?? 0

  // =====================
  // Fetch data
  // =====================
  useEffect(() => {
    if (!open) return

    if (isCreate) {
      setVehiculo({
        id_vehiculo: 0,
        fk_usuario: idUsuario,
        placa: "",
        marca: "",
        configuracion: "",
        tipo_vehiculo: "",
        peso_vacio: 0,
        peso_remolque: 0,
      })
      setSeguros([])
      setSeguroActivo(null)
      return
    }

    if (!idVehiculo) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const resVehiculo = await getVehiculoById(idVehiculo)
        if (resVehiculo.status === 200 && resVehiculo.data) {
          const v = resVehiculo.data
          setVehiculo({
            ...v,
            fk_usuario: v.fk_usuario ?? 0,
            peso_vacio: Number(v.peso_vacio),
            peso_remolque: Number(v.peso_remolque),
          })
        }

        const resSeguros = await getSegurosByVehiculo(idVehiculo)
        if (resSeguros.status === 200 && Array.isArray(resSeguros.data)) {
          const segurosData = resSeguros.data.map((s: any) => ({
            ...s,
            valor: Number(s.valor),
          }))
          setSeguros(segurosData)
          setSeguroActivo(segurosData[0] ?? null)
        } else {
          setSeguros([])
          setSeguroActivo(null)
        }
      } catch (error) {
        console.error("Error cargando vehículo:", error)
        toast.error("Error al cargar los datos del vehículo ❌")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [idVehiculo, open, mode, idUsuario, isCreate])

  // =====================
  // Crear vehículo
  // =====================
  const handleCreateVehiculo = async () => {
    if (!vehiculo.placa || !vehiculo.marca || !vehiculo.tipo_vehiculo) {
      toast.warning("Completa los campos obligatorios ⚠️")
      return
    }

    setSaving(true)
    try {
      const body = { ...vehiculo, fk_usuario: idUsuario }
      const res = await createVehiculo(body)

      if (res.status === 200 || res.status === 201) {
        toast.success(res.msg || "Vehículo creado correctamente ✅")
        onClose()
      } else {
        toast.error(res.msg || "Error al crear el vehículo ❌")
      }
    } catch (error: any) {
      console.error("Error creando vehículo:", error)
      toast.error(
        error?.response?.data?.msg ||
          error?.message ||
          "Error inesperado ❌"
      )
    } finally {
      setSaving(false)
    }
  }

  return {
    vehiculo,
    setVehiculo,
    seguros,
    seguroActivo,
    setSeguroActivo,
    loading,
    saving,
    isReadOnly,
    openCrearSeguro,
    setOpenCrearSeguro,
    handleCreateVehiculo,
  }
}
