import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { getClientesByUsuario } from "@/services/adapters/clientes.adapter"
import { getAllLugares } from "@/services/adapters/lugares.adapter"

type ClienteAdaptado = {
  id_cliente: number
  nombre_cliente: string
  nit_cliente: number
  telefono_cliente: number
}

type Lugar = {
  id_lugar: number
  nombre_lugar: string
}

export const useDetallesViajeForm = () => {
  const { user } = useAuth()

  const [clientes, setClientes] = useState<ClienteAdaptado[]>([])
  const [lugares, setLugares] = useState<Lugar[]>([])
  const [noClientes, setNoClientes] = useState(false)
  const [noLugares, setNoLugares] = useState(false)

  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteAdaptado | null>(null)

  const [form, setForm] = useState({
    id_viaje: 1,
    fk_usuario: user?.id_usuario ?? 0,
    fk_manifiesto: 456,
    estado_viaje: true,
    fk_cliente: 0,
    fk_origen: 0,
    fk_destino: 0,
    codigo: "",
    observaciones: "",
    producto: "",
    detalle_producto: "",
    direccion_llegada: "",
    fecha_salida: "",
    fecha_llegada: "",
  })

  const fetchClientes = async () => {
    if (!user?.id_usuario) return
    const res = await getClientesByUsuario(user.id_usuario)

    if (res.status === 200) {
      const adaptados = res.data.map((cliente: any) => ({
        id_cliente: cliente.id_cliente,
        nombre_cliente: cliente.nombre_cliente,
        nit_cliente: cliente.nit,
        telefono_cliente: cliente.telefono,
      }))
      setClientes(adaptados)
      setNoClientes(false)
    } else if (res.status === 404) {
      setClientes([])
      setNoClientes(true)
    }
  }

  const fetchLugares = async () => {
    const res = await getAllLugares()
    if (res.status === 200) {
      setLugares(res.data)
      setNoLugares(false)
    } else if (res.status === 404) {
      setLugares([])
      setNoLugares(true)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [user?.id_usuario])

  useEffect(() => {
    fetchLugares()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: parseInt(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", form)
  }

  const lugaresOrigen = lugares.filter(lugar => lugar.id_lugar !== form.fk_destino)
  const lugaresDestino = lugares.filter(lugar => lugar.id_lugar !== form.fk_origen)

  return {
    form,
    clientes,
    noClientes,
    lugaresOrigen,
    lugaresDestino,
    noLugares,
    clienteSeleccionado,
    setClienteSeleccionado,
    fetchClientes,
    handleChange,
    handleSelectChange,
    handleSubmit,
  }
}
