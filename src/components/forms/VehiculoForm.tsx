import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

type Props = {
    vehiculo: Vehiculo
    editable: boolean
    onChange: (v: Vehiculo) => void
}

const TIPOS_VEHICULO = [
    { value: "Camion rigido", label: "Camión rígido" },
    { value: "Camion sencillo", label: "Camión sencillo" },
    { value: "Camion doble troque", label: "Camión doble troque" },
    { value: "Tractocamion", label: "Tractocamión" },
    { value: "Remolque", label: "Remolque" },
    { value: "Tractomula", label: "Tractomula" },
    { value: "Furgon", label: "Furgón" },
    { value: "Plataforma", label: "Plataforma" },
    { value: "Cisterna", label: "Cisterna" },
    { value: "Semirremolque", label: "Semirremolque" },
    { value: "Portacontenedor", label: "Portacontenedor" },
    { value: "Volqueta", label: "Volqueta" },
    { value: "Jaula", label: "Jaula" },
    { value: "Cama baja (Lowboy)", label: "Cama baja (Lowboy)" },
    { value: "Furgon refrigerado", label: "Furgón refrigerado" },
    { value: "Portavehiculos", label: "Portavehículos" },
    { value: "Grua camionera", label: "Grúa camionera" },
]

export default function VehiculoForm({ vehiculo, editable, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <h3 className="md:col-span-2 text-lg font-semibold">
                Información del vehículo
            </h3>

            {/* PLACA */}
            <div>
                <Label>Placa</Label>
                <Input
                    readOnly={!editable}
                    value={vehiculo.placa}
                    onChange={(e) =>
                        onChange({ ...vehiculo, placa: e.target.value })
                    }
                />
            </div>

            {/* MARCA */}
            <div>
                <Label>Marca</Label>
                <Input
                    readOnly={!editable}
                    value={vehiculo.marca}
                    onChange={(e) =>
                        onChange({ ...vehiculo, marca: e.target.value })
                    }
                />
            </div>

            {/* CONFIGURACIÓN */}
            <div>
                <Label>Configuración</Label>
                <Input
                    readOnly={!editable}
                    value={vehiculo.configuracion}
                    onChange={(e) =>
                        onChange({ ...vehiculo, configuracion: e.target.value })
                    }
                />
            </div>

            {/* 🔹 TIPO DE VEHÍCULO (SELECT) */}
            <div>
                <Label>Tipo de vehículo</Label>
                <Select
                    disabled={!editable}
                    value={vehiculo.tipo_vehiculo}
                    onValueChange={(val) =>
                        onChange({ ...vehiculo, tipo_vehiculo: val })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        {TIPOS_VEHICULO.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                                {t.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* PESO VACÍO */}
            <div>
                <Label>Peso vacío (kg)</Label>
                <Input
                    type="number"
                    readOnly={!editable}
                    value={vehiculo.peso_vacio}
                    onChange={(e) =>
                        onChange({
                            ...vehiculo,
                            peso_vacio: Number(e.target.value),
                        })
                    }
                />
            </div>

            {/* PESO REMOLQUE */}
            <div>
                <Label>Peso remolque (kg)</Label>
                <Input
                    type="number"
                    readOnly={!editable}
                    value={vehiculo.peso_remolque}
                    onChange={(e) =>
                        onChange({
                            ...vehiculo,
                            peso_remolque: Number(e.target.value),
                        })
                    }
                />
            </div>
        </div>
    )
}
