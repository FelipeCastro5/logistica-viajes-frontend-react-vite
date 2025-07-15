import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import { getClientesByUsuario } from "@/services/adapters/clientes.adapter"
import NuevoClienteModal from "../modals/NuevoClienteModal"
import { getAllLugares } from "@/services/adapters/lugares.adapter"

export default function DetallesViajeForm() {
  const { user } = useAuth()

  const [clientes, setClientes] = useState<{ id_cliente: number; nombre_cliente: string, nit_cliente: number, telefono_cliente: number }[]>([])
  const [noClientes, setNoClientes] = useState(false)

  const [lugares, setLugares] = useState<{ id_lugar: number; nombre_lugar: string }[]>([])
  const [noLugares, setNoLugares] = useState(false)

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

  const [clienteSeleccionado, setClienteSeleccionado] = useState<null | {
    id_cliente: number
    nombre_cliente: string
    nit_cliente: number
    telefono_cliente: number
  }>(null)

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

  useEffect(() => {
    fetchClientes()
  }, [user?.id_usuario])

  useEffect(() => {
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


  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cliente */}
        <div>
          <Label>Cliente</Label>
          <Select
            onValueChange={(val) => {
              handleSelectChange("fk_cliente", val)
              const cliente = clientes.find(c => c.id_cliente === parseInt(val))
              setClienteSeleccionado(cliente ?? null)
            }}
          >

            <SelectTrigger>
              <SelectValue placeholder="Selecciona un cliente" />
            </SelectTrigger>
            <SelectContent>
              {noClientes ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No hay clientes disponibles</div>
              ) : (
                clientes.map((cliente) => (
                  <SelectItem key={cliente.id_cliente} value={cliente.id_cliente.toString()}>
                    {cliente.nombre_cliente}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Crear un nuevo Cliente (opcional)</Label>
          <NuevoClienteModal onClienteCreado={fetchClientes} />
        </div>
        <div>
          <Label htmlFor="nit_cliente">NIT Cliente</Label>
          <Input id="nit_cliente" name="nit_cliente" placeholder="NIT Cliente" value={clienteSeleccionado?.nit_cliente ?? ""} readOnly />
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono Cliente</Label>
          <Input id="telefono" name="telefono" placeholder="Teléfono" value={clienteSeleccionado?.telefono_cliente ?? ""} readOnly />
        </div>


        {/* Origen */}
        <div>
          <Label>Origen</Label>
          <Select onValueChange={(val) => handleSelectChange("fk_origen", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona origen" />
            </SelectTrigger>
            <SelectContent>
              {noLugares ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No hay lugares disponibles</div>
              ) : (
                lugaresOrigen.map((lugar) => (
                  <SelectItem key={lugar.id_lugar} value={lugar.id_lugar.toString()}>
                    {lugar.nombre_lugar}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

        </div>

        {/* Destino */}
        <div>
          <Label>Destino</Label>
          <Select onValueChange={(val) => handleSelectChange("fk_destino", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona destino" />
            </SelectTrigger>
            <SelectContent>
              {noLugares ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No hay lugares disponibles</div>
              ) : (
                lugaresDestino.map((lugar) => (
                  <SelectItem key={lugar.id_lugar} value={lugar.id_lugar.toString()}>
                    {lugar.nombre_lugar}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

        </div>
        <div>
          <Label htmlFor="codigo">Código de viaje</Label>
          <Input name="codigo" placeholder="Código de viaje" value={form.codigo} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="producto">Nombre del Producto</Label>
          <Input name="producto" placeholder="Producto" value={form.producto} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="detalle_producto">Detalle del producto</Label>
          <Input name="detalle_producto" placeholder="Detalle del producto" value={form.detalle_producto} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="direccion_llegada">Dirección de llegada</Label>
          <Input name="direccion_llegada" placeholder="Dirección de llegada" value={form.direccion_llegada} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="fecha_salida">Fecha de salida</Label>
          <Input type="date" name="fecha_salida" value={form.fecha_salida} onChange={handleChange} />

        </div>
        <div>
          <Label htmlFor="fecha_llegada">Fecha de llegada</Label>
          <Input type="date" name="fecha_llegada" value={form.fecha_llegada} onChange={handleChange} />
        </div>

      </div>

      <Label htmlFor="observaciones">Observaciones</Label>
      <Textarea
        name="observaciones"
        placeholder="Observaciones"
        value={form.observaciones}
        onChange={handleChange}
        className="min-h-[80px]"
      />

      {/* <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Registrar viaje
      </Button> */}
    </form>
  )
}

// {/* Origen */}
// <div>
//   <Label>Origen</Label>
//   <Select onValueChange={(val) => handleSelectChange("fk_origen", val)}>
//     <SelectTrigger>
//       <SelectValue placeholder="Selecciona origen" />
//     </SelectTrigger>
//     <SelectContent>
//       {noLugares ? (
//         <div className="px-4 py-2 text-sm text-muted-foreground">No hay lugares disponibles</div>
//       ) : (
//         lugares.map((lugar) => (
//           <SelectItem key={lugar.id_lugar} value={lugar.id_lugar.toString()}>
//             {lugar.nombre_lugar}
//           </SelectItem>
//         ))
//       )}
//     </SelectContent>
//   </Select>
// </div>

// {/* Destino */}
// <div>
//   <Label>Destino</Label>
//   <Select onValueChange={(val) => handleSelectChange("fk_destino", val)}>
//     <SelectTrigger>
//       <SelectValue placeholder="Selecciona destino" />
//     </SelectTrigger>
//     <SelectContent>
//       {noLugares ? (
//         <div className="px-4 py-2 text-sm text-muted-foreground">No hay lugares disponibles</div>
//       ) : (
//         lugares.map((lugar) => (
//           <SelectItem key={lugar.id_lugar} value={lugar.id_lugar.toString()}>
//             {lugar.nombre_lugar}
//           </SelectItem>
//         ))
//       )}
//     </SelectContent>
//   </Select>
// </div>