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

    // 🆕 NUEVOS CAMPOS
    latitud_origen: initialData.latitud_origen ?? 0,
    longitud_origen: initialData.longitud_origen ?? 0,
    latitud_destino: initialData.latitud_destino ?? 0,
    longitud_destino: initialData.longitud_destino ?? 0,

    hora_salida: initialData.hora_salida ?? "", // ahora tipo: "2025-07-08T08:10"
    hora_llegada: initialData.hora_llegada ?? "",

    horas_pactadas_cargue: initialData.horas_pactadas_cargue ?? 0,
    horas_pactadas_descargue: initialData.horas_pactadas_descargue ?? 0,

    exoneracion_legal: initialData.exoneracion_legal ?? "",
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
      onChange(getFormattedBody())
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
        // 🆕 NUEVOS CAMPOS
        latitud_origen: initialData.latitud_origen ?? 0,
        longitud_origen: initialData.longitud_origen ?? 0,
        latitud_destino: initialData.latitud_destino ?? 0,
        longitud_destino: initialData.longitud_destino ?? 0,

        hora_salida: initialData.hora_salida
          ? initialData.hora_salida.slice(0, 5)
          : "",
        hora_llegada: initialData.hora_llegada
          ? initialData.hora_llegada.slice(0, 5)
          : "",

        horas_pactadas_cargue: initialData.horas_pactadas_cargue ?? 0,
        horas_pactadas_descargue: initialData.horas_pactadas_descargue ?? 0,

        exoneracion_legal: initialData.exoneracion_legal ?? "",
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
  const buildISOFromDateAndTime = (fecha?: string, hora?: string) => {
    if (!fecha || !hora) return undefined

    // hora = "08:10"
    const [hours, minutes] = hora.split(":")

    const date = new Date(fecha)
    date.setHours(Number(hours), Number(minutes), 0, 0)

    return date.toISOString()
  }


  const getFormattedBody = () => {

    const body = {
      id_viaje,
      fk_usuario: modo === "editar" ? Number(form.fk_usuario) : Number(user?.id_usuario),
      fk_manifiesto: Number(form.fk_manifiesto ?? 0),
      estado_viaje: true,
      fk_cliente: Number(form.fk_cliente),
      fk_origen: Number(form.fk_origen),
      fk_destino: Number(form.fk_destino),
      codigo: form.codigo,
      observaciones: form.observaciones,
      producto: form.producto,
      detalle_producto: form.detalle_producto,
      direccion_llegada: form.direccion_llegada,
      fecha_salida: form.fecha_salida || undefined,
      fecha_llegada: form.fecha_llegada || undefined,
      latitud_origen: Number(form.latitud_origen),
      longitud_origen: Number(form.longitud_origen),
      latitud_destino: Number(form.latitud_destino),
      longitud_destino: Number(form.longitud_destino),
      horas_pactadas_cargue: Number(form.horas_pactadas_cargue),
      horas_pactadas_descargue: Number(form.horas_pactadas_descargue),
      exoneracion_legal: form.exoneracion_legal,
      hora_salida: buildISOFromDateAndTime(
        form.fecha_salida,
        form.hora_salida
      ),
      hora_llegada: buildISOFromDateAndTime(
        form.fecha_llegada,
        form.hora_llegada
      ),
    }

    console.log("BODY REAL A ENVIAR:", body)
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
    const body = getFormattedBody()
    console.log("FORM BODY FINAL:", body)
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
