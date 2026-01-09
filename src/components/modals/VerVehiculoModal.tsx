import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VehiculoForm from "../forms/VehiculoForm"
import SeguroForm from "../forms/SeguroForm"
import CrearSeguroModal from "@/components/modals/CrearSeguroModal" // 🔹 Importamos el nuevo modal
import { getVehiculoById, createVehiculo } from "@/services/adapters/vehiculo.adapter"
import { getSegurosByVehiculo } from "@/services/adapters/seguros.adapter"
import { toast } from "sonner"

type Mode = "ver" | "crear" | "editar"

type Vehiculo = {
    id_vehiculo: number
    fk_usuario: number
    placa: string
    marca: string
    configuracion: string
    tipo_vehiculo: string
    peso_vacio: number
    peso_remolque: number
}

type Seguro = {
    id_seguro: number
    fk_vehiculo: number
    tipo_seguro: string
    numero_poliza: string
    aseguradora: string
    fecha_vencimiento: string
    valor: number
}

type Props = {
    idVehiculo: number | null
    open: boolean
    onOpenChange: (open: boolean) => void
    mode?: Mode
}

export default function VerVehiculoModal({ idVehiculo, open, onOpenChange, mode = "ver" }: Props) {
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
    const [openCrearSeguro, setOpenCrearSeguro] = useState(false) // 🔹 Nuevo estado

    const isReadOnly = mode === "ver"
    const isCreate = mode === "crear"

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const idUsuario = user.id_usuario ?? 0

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

        if (idVehiculo === null) return

        const fetchVehiculo = async () => {
            setLoading(true)
            try {
                const resVehiculo = await getVehiculoById(idVehiculo)
                if (resVehiculo.status === 200 && resVehiculo.data) {
                    const v = resVehiculo.data
                    const vehiculoData: Vehiculo = {
                        ...v,
                        fk_usuario: v.fk_usuario ?? 0,
                        peso_vacio: Number(v.peso_vacio),
                        peso_remolque: Number(v.peso_remolque),
                    }
                    setVehiculo(vehiculoData)

                    const resSeguros = await getSegurosByVehiculo(idVehiculo)
                    if (resSeguros.status === 200 && resSeguros.data) {
                        const segurosData: Seguro[] = resSeguros.data.map((s: any) => ({
                            ...s,
                            valor: Number(s.valor),
                        }))
                        setSeguros(segurosData)
                        setSeguroActivo(segurosData[0] ?? null)
                    } else {
                        setSeguros([])
                        setSeguroActivo(null)
                    }
                }
            } catch (error) {
                console.error("Error al cargar vehículo o seguros:", error)
                toast.error("Error al cargar los datos del vehículo ❌")
            } finally {
                setLoading(false)
            }
        }

        fetchVehiculo()
    }, [idVehiculo, open, mode, isCreate, idUsuario])

    const handleCreateVehiculo = async () => {
        if (!vehiculo.placa || !vehiculo.marca || !vehiculo.tipo_vehiculo) {
            toast.warning("Completa los campos obligatorios del vehículo ⚠️")
            return
        }

        setSaving(true)
        try {
            const body = { ...vehiculo, fk_usuario: idUsuario }
            const res = await createVehiculo(body)

            if (res.status === 200 || res.status === 201) {
                toast.success(res.msg || "Vehículo creado correctamente ✅")
                onOpenChange(false)
            } else {
                toast.error(res.msg || "Error al crear el vehículo ❌")
                console.error("Error creando vehículo:", res)
            }
        } catch (error: any) {
            console.error("Error creando vehículo:", error)
            toast.error(error?.message || "Error inesperado al crear el vehículo ❌")
        } finally {
            setSaving(false)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>
                            {mode === "crear" && "Nuevo Vehículo"}
                            {mode === "editar" && "Editar Vehículo"}
                            {mode === "ver" && "Detalle del Vehículo"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {loading ? (
                            <p className="text-center text-gray-500">Cargando vehículo...</p>
                        ) : (
                            <>
                                <Card>
                                    <CardContent>
                                        <VehiculoForm
                                            vehiculo={vehiculo}
                                            editable={!isReadOnly}
                                            onChange={setVehiculo}
                                        />
                                    </CardContent>
                                </Card>

                                {seguros.length > 0 && (
                                    <Card>
                                        <CardContent>
                                            <SeguroForm
                                                seguros={seguros}
                                                activo={seguroActivo}
                                                editable={!isReadOnly}
                                                onChange={setSeguroActivo}
                                                onSelect={setSeguroActivo}
                                            />
                                        </CardContent>
                                    </Card>
                                )}

                                {/* 🔹 Botón para abrir modal de crear seguro */}
                                {mode === "editar" && (
                                    <Button
                                        className="bg-green-600 text-white mt-2"
                                        onClick={() => setOpenCrearSeguro(true)}
                                    >
                                        Agregar nuevo seguro
                                    </Button>
                                )}

                            </>
                        )}

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Cerrar
                            </Button>

                            {mode === "crear" && (
                                <Button
                                    className="bg-blue-600 text-white"
                                    onClick={handleCreateVehiculo}
                                    disabled={saving}
                                >
                                    {saving ? "Registrando..." : "Registrar vehículo"}
                                </Button>
                            )}

                            {mode === "editar" && (
                                <Button className="bg-blue-600 text-white">
                                    Guardar cambios
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* 🔹 Modal independiente de Crear Seguro */}
            {idVehiculo && (
                <CrearSeguroModal
                    idVehiculo={idVehiculo}
                    open={openCrearSeguro}
                    onOpenChange={setOpenCrearSeguro}
                />
            )}
        </>
    )
}
