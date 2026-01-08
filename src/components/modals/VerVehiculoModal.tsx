import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select"
// mocks
import { VEHICULOS, SEGUROS } from "@/mocks/vehiculos.mock"

// =====================
// Tipos
// =====================

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
    idVehiculo: number
    open: boolean
    onOpenChange: (open: boolean) => void
}

// =====================
// Componente
// =====================

export default function VerVehiculoModal({
    idVehiculo,
    open,
    onOpenChange,
}: Props) {
    const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null)
    const [seguros, setSeguros] = useState<Seguro[]>([])
    const [seguroActivo, setSeguroActivo] = useState<Seguro | null>(null)

    // Simula GET /vehiculo/:id
    useEffect(() => {
        if (!open) return

        const v = VEHICULOS.find(v => v.id_vehiculo === idVehiculo)
        const s = SEGUROS.filter(s => s.fk_vehiculo === idVehiculo)

        if (v) {
            setVehiculo({ ...v })
            setSeguros(s)
            setSeguroActivo(s[0] ?? null)
        }
    }, [idVehiculo, open])

    if (!vehiculo) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Detalle del Vehículo</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6">

                    {/* ===================== */}
                    {/* Vehículo */}
                    {/* ===================== */}
                    <Card>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                            <h3 className="md:col-span-2 text-lg font-semibold">
                                Información del vehículo
                            </h3>

                            <div>
                                <Label>Placa</Label>
                                <Input
                                    value={vehiculo.placa}
                                    onChange={(e) =>
                                        setVehiculo({ ...vehiculo, placa: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Marca</Label>
                                <Input
                                    value={vehiculo.marca}
                                    onChange={(e) =>
                                        setVehiculo({ ...vehiculo, marca: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Tipo</Label>
                                <Input
                                    value={vehiculo.tipo_vehiculo}
                                    onChange={(e) =>
                                        setVehiculo({ ...vehiculo, tipo_vehiculo: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Configuración</Label>
                                <Input
                                    value={vehiculo.configuracion}
                                    onChange={(e) =>
                                        setVehiculo({ ...vehiculo, configuracion: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Peso vacío</Label>
                                <Input
                                    type="number"
                                    value={vehiculo.peso_vacio}
                                    onChange={(e) =>
                                        setVehiculo({
                                            ...vehiculo,
                                            peso_vacio: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>Peso remolque</Label>
                                <Input
                                    type="number"
                                    value={vehiculo.peso_remolque}
                                    onChange={(e) =>
                                        setVehiculo({
                                            ...vehiculo,
                                            peso_remolque: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* ===================== */}
                    {/* Seguros */}
                    {/* ===================== */}
                    <Card>
                        <CardContent className="grid gap-4 pt-6">
                            <h3 className="text-lg font-semibold">Seguros</h3>

                            {seguros.length === 0 && (
                                <p className="text-sm text-gray-500">
                                    Este vehículo no tiene seguros registrados
                                </p>
                            )}

                            {seguros.length > 0 && seguroActivo && (
                                <>
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
                                                    {s.tipo_seguro} · vence {s.fecha_vencimiento}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input value={seguroActivo.aseguradora} />
                                        <Input value={seguroActivo.numero_poliza} />
                                        <Input
                                            type="date"
                                            value={seguroActivo.fecha_vencimiento}
                                        />
                                        <Input type="number" value={seguroActivo.valor} />
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* ===================== */}
                    {/* Acciones */}
                    {/* ===================== */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>

                        <Button className="bg-blue-600 text-white">
                            Guardar cambios
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
