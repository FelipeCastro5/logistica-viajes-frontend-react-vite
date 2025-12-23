import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { getClientesByUsuario } from "@/services/adapters/clientes.adapter"
import { getAllLugares } from "@/services/adapters/lugares.adapter"

import type { ViajeData } from "./viaje"

// =====================
// Tipos y interfaces
// =====================
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

type DetallesFormMode = "crear" | "editar"

interface UseDetallesViajeFormProps {
  id_viaje: number
  initialData?: Partial<ViajeData>
  modo?: DetallesFormMode
  onChange?: (newData: Partial<ViajeData>) => void
}

// ======================================
// Hook principal: useDetallesViajeForm
// ======================================
export const useDetallesViajeForm = ({
  initialData = {},
  id_viaje,
  modo = "crear",
  onChange,
}: UseDetallesViajeFormProps) => {
  const { user } = useAuth()

  console.log("[HOOK INIT] modo:", modo)
  console.log("[HOOK INIT] user:", user)
  console.log("[HOOK INIT] initialData:", initialData)
  // ================================
  // Estado general del formulario
  // ================================
  const [clientes, setClientes] = useState<ClienteAdaptado[]>([])
  const [lugares, setLugares] = useState<Lugar[]>([])
  const [noClientes, setNoClientes] = useState(false)
  const [noLugares, setNoLugares] = useState(false)
  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteAdaptado | null>(null)

  // ================================
  // Estado del formulario (crear/editar)
  // ================================
  const [form, setForm] = useState<ViajeData>({
    id_viaje,
    fk_usuario: initialData.fk_usuario ?? user?.id_usuario ?? 0,
    fk_manifiesto: initialData.fk_manifiesto ?? 0,
    estado_viaje: initialData.estado_viaje ?? true,

    fk_cliente: initialData.fk_cliente ?? 0,
    fk_origen: initialData.fk_origen ?? 0,
    fk_destino: initialData.fk_destino ?? 0,
    codigo: initialData.codigo ?? "",
    observaciones: initialData.observaciones ?? "",
    producto: initialData.producto ?? "",
    detalle_producto: initialData.detalle_producto ?? "",
    direccion_llegada: initialData.direccion_llegada ?? "",
    fecha_salida: initialData.fecha_salida?.split("T")[0] ?? "",
    fecha_llegada: initialData.fecha_llegada?.split("T")[0] ?? "",
  })

  // ======================================
  // FUNCIONES DE CARGA DE DATOS EXTERNOS
  // ======================================

  // Cargar clientes del usuario autenticado
  // Clientes para modo CREAR
  const fetchClientesCrear = async () => {
    console.log("[FETCH] fetchClientesCrear called")
    if (!user?.id_usuario) {
      console.warn("[FETCH] No user.id_usuario")
      return
    }

    const res = await getClientesByUsuario(user.id_usuario)
    console.log("[FETCH] fetchClientesCrear result:", res)

    if (res.status === 200) {
      const adaptados = res.data.map((cliente: any) => ({
        id_cliente: cliente.id_cliente,
        nombre_cliente: cliente.nombre_cliente,
        nit_cliente: cliente.nit,
        telefono_cliente: cliente.telefono,
      }))
      setClientes(adaptados)
      setNoClientes(false)
    } else {
      setClientes([])
      setNoClientes(true)
    }
  }

  // Clientes para modo EDITAR
  const fetchClientesEditar = async () => {
    console.log("[FETCH] fetchClientesEditar called")

    const idUsuario = initialData.fk_usuario ?? 5
    if (!idUsuario) {
      console.warn("[FETCH] No fk_usuario disponible en modo editar")
      return
    }

    const res = await getClientesByUsuario(idUsuario)
    console.log("[FETCH] fetchClientesEditar result:", res)

    if (res.status === 200) {
      const adaptados = res.data.map((cliente: any) => ({
        id_cliente: cliente.id_cliente,
        nombre_cliente: cliente.nombre_cliente,
        nit_cliente: cliente.nit,
        telefono_cliente: cliente.telefono,
      }))
      setClientes(adaptados)
      setNoClientes(false)
    } else {
      setClientes([])
      setNoClientes(true)
    }
  }



  // Cargar todos los lugares disponibles
  const fetchLugares = async () => {
    const res = await getAllLugares()
    if (res.status === 200) {
      setLugares(res.data)
      setNoLugares(false)
    } else {
      setLugares([])
      setNoLugares(true)
    }
  }

  // ===============================
  // EFECTOS GENERALES (Crear + Editar)
  // ===============================

  // Cargar clientes y lugares al inicio (cuando hay usuario)
  useEffect(() => {
    const fetchData = async () => {
      await fetchLugares()

      if (modo === "editar") {
        if (initialData.fk_usuario) {
          await fetchClientesEditar()
        }
      } else {
        await fetchClientesCrear()
      }
    }

    fetchData()
  }, [user?.id_usuario, modo, initialData.fk_usuario]) // 👈 ojo: se depende de initialData.fk_usuario




  // Notificar cambios en el formulario (a componente padre)
  useEffect(() => {
    if (onChange) {
      onChange(form)
    }
  }, [form])

  // ==================================
  // EFECTOS SOLO PARA MODO "editar"
  // ==================================
  useEffect(() => {
    if (modo === "editar" && initialData && Object.keys(initialData).length > 0) {
      console.log("[FORM INIT] setForm from initialData:", initialData)

      // Rellenar datos iniciales del formulario
      setForm({
        id_viaje,
        fk_usuario: initialData.fk_usuario ?? 0,
        fk_manifiesto: initialData.fk_manifiesto ?? 0,
        estado_viaje: initialData.estado_viaje ?? true,

        fk_cliente: initialData.fk_cliente ?? 0,
        fk_origen: initialData.fk_origen ?? 0,
        fk_destino: initialData.fk_destino ?? 0,
        codigo: initialData.codigo ?? "",
        observaciones: initialData.observaciones ?? "",
        producto: initialData.producto ?? "",
        detalle_producto: initialData.detalle_producto ?? "",
        direccion_llegada: initialData.direccion_llegada ?? "",
        fecha_salida: initialData.fecha_salida?.split("T")[0] ?? "",
        fecha_llegada: initialData.fecha_llegada?.split("T")[0] ?? "",
      })


      // Seleccionar cliente correspondiente
      if (initialData.fk_cliente && clientes.length > 0) {
        const cliente = clientes.find(c => c.id_cliente === initialData.fk_cliente)
        setClienteSeleccionado(cliente ?? null)
      }
    }
  }, [initialData, clientes, modo])

  // ==========================
  // MANEJADORES DE FORMULARIO
  // ==========================

  // Cambios en inputs de texto / textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Cambios en selects (valores numéricos)
  const handleSelectChange = (field: keyof ViajeData, value: string) => {
    setForm(prev => ({ ...prev, [field]: parseInt(value) }))
  }

  // Usado después de crear un nuevo cliente para actualizar la lista
  const handleClienteCreado = async () => {
    if (modo === "editar") {
      await fetchClientesEditar()
    } else {
      await fetchClientesCrear()
    }
  }


  // =============================
  // FUNCIONES AUXILIARES
  // =============================

  // Prepara los datos listos para enviar al backend
  const getFormattedBody = () => {
    const body = {
      ...form,
      fk_usuario: modo === "editar" ? form.fk_usuario ?? 0 : user?.id_usuario ?? 0, // ⚠️ Aquí aún se pisa form.fk_usuario, lo veremos en logs
      fk_manifiesto: 456,
      estado_viaje: true,
      id_viaje,
    }

    console.log("[BODY] getFormattedBody result:", body)
    return body
  }

  // Resetear campos del formulario (solo aplica a modo "crear")
  const resetForm = () => {
    setForm({
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
    setClienteSeleccionado(null)
  }

  // Manejador del envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", getFormattedBody())
  }

  // =============================
  // DERIVADOS DEL ESTADO
  // =============================

  // Filtrar lugares para evitar origen = destino
  const lugaresOrigen = lugares.filter(lugar => lugar.id_lugar !== form.fk_destino)
  const lugaresDestino = lugares.filter(lugar => lugar.id_lugar !== form.fk_origen)

  // =============================
  // Retorno del hook
  // =============================
  return {
    form,
    setForm,
    clientes,
    noClientes,
    lugaresOrigen,
    lugaresDestino,
    noLugares,
    clienteSeleccionado,
    setClienteSeleccionado,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleClienteCreado,
    getFormattedBody,
    resetForm,
    modo,
  }
}
