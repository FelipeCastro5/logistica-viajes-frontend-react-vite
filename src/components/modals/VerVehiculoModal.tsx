import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

import { VEHICULOS, SEGUROS } from "@/mocks/vehiculos.mock"

// =====================
// Tipos
// =====================

type Mode = "ver" | "crear" | "editar"

type Vehiculo = {
    id_vehiculo: number
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

// =====================
// Helpers
// =====================

const emptyVehiculo = (): Vehiculo => ({
    id_vehiculo: 0,
    placa: "",
    marca: "",
    configuracion: "",
    tipo_vehiculo: "",
    peso_vacio: 0,
    peso_remolque: 0,
})

const emptySeguro = (): Seguro => ({
    id_seguro: 0,
    fk_vehiculo: 0,
    tipo_seguro: "",
    numero_poliza: "",
    aseguradora: "",
    fecha_vencimiento: "",
    valor: 0,
})

// =====================
// Componente
// =====================

export default function VerVehiculoModal({
    idVehiculo,
    open,
    onOpenChange,
    mode = "ver",
}: Props) {
    const [vehiculo, setVehiculo] = useState<Vehiculo>(emptyVehiculo)
    const [seguros, setSeguros] = useState<Seguro[]>([])
    const [seguroActivo, setSeguroActivo] = useState<Seguro | null>(null)

    const isReadOnly = mode === "ver"
    const isCreate = mode === "crear"

    // =====================
    // Cargar datos
    // =====================
    useEffect(() => {
        if (!open) return

        if (isCreate) {
            setVehiculo(emptyVehiculo())
            setSeguros([])
            setSeguroActivo(null)
            return
        }

        if (idVehiculo === null) return

        const v = VEHICULOS.find(v => v.id_vehiculo === idVehiculo)
        const s = SEGUROS.filter(s => s.fk_vehiculo === idVehiculo)

        if (v) {
            setVehiculo({ ...v })
            setSeguros(s)
            setSeguroActivo(s[0] ?? null)
        }
    }, [idVehiculo, open, mode])

    // =====================
    // Render
    // =====================
    return (
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

                    {/* Vehículo */}
                    <Card>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                            <h3 className="md:col-span-2 text-lg font-semibold">
                                Información del vehículo
                            </h3>

                            {Object.entries(vehiculo).map(([key, value]) =>
                                key !== "id_vehiculo" && (
                                    <div key={key}>
                                        <Label>{key.replace("_", " ")}</Label>
                                        <Input
                                            readOnly={isReadOnly}
                                            value={value}
                                            onChange={(e) =>
                                                setVehiculo({
                                                    ...vehiculo,
                                                    [key]:
                                                        typeof value === "number"
                                                            ? Number(e.target.value)
                                                            : e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                )
                            )}
                        </CardContent>
                    </Card>

                    {/* Seguros (solo si existen) */}
                    {seguros.length > 0 && seguroActivo && (
                        <Card>
                            <CardContent className="grid gap-4 pt-6">
                                <h3 className="text-lg font-semibold">Seguro</h3>

                                {seguros.length > 1 && (
                                    <div>
                                        <Label>Seleccionar seguro</Label>
                                        <Select
                                            value={seguroActivo.id_seguro.toString()}
                                            onValueChange={(val) =>
                                                setSeguroActivo(
                                                    seguros.find(s => s.id_seguro === Number(val)) ?? null
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {seguros.map(s => (
                                                    <SelectItem
                                                        key={s.id_seguro}
                                                        value={s.id_seguro.toString()}
                                                    >
                                                        {s.tipo_seguro || "Seguro sin tipo"}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Aseguradora</Label>
                                        <Input readOnly={isReadOnly} value={seguroActivo.aseguradora} />
                                    </div>

                                    <div>
                                        <Label>Número de póliza</Label>
                                        <Input readOnly={isReadOnly} value={seguroActivo.numero_poliza} />
                                    </div>

                                    <div>
                                        <Label>Fecha de vencimiento</Label>
                                        <Input
                                            readOnly={isReadOnly}
                                            type="date"
                                            value={seguroActivo.fecha_vencimiento}
                                        />
                                    </div>

                                    <div>
                                        <Label>Valor</Label>
                                        <Input
                                            readOnly={isReadOnly}
                                            type="number"
                                            value={seguroActivo.valor}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Acciones */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cerrar
                        </Button>

                        {mode !== "ver" && (
                            <Button className="bg-blue-600 text-white">
                                {mode === "crear" && "Registrar vehículo"}
                                {mode === "editar" && "Guardar cambios"}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
