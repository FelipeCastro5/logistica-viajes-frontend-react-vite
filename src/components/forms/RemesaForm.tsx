import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import { REMESAS_MOCK } from "./remesas.mock"

type RemesaFormProps = {
    initialData?: any
    onChange?: (data: any) => void
}

export default function RemesaForm({ initialData }: RemesaFormProps) {
    const { user } = useAuth()
    const isContador = user?.nombre_rol === "Contador"

    const [remesaId, setRemesaId] = useState<string>("")

    const [form, setForm] = useState({
        numero_remesa: "",
        numero_autorizacion: "",
        tipo_empaque: "",
        naturaleza_carga: "",
        codigo_armonizado: "",
        cantidad: "",
        unidad_medida: "",
        peso_total: "",
        mercancia_peligrosa: false,
        observaciones: "",

        // campos conceptuales de mercancía peligrosa
        codigo_un: "",
        grupo_riesgo: "",
        caracteristica_peligrosidad: "",
        embalaje_envase: "",
    })
    /* ===============================
       CARGAR REMESA DESDE SELECT
    =============================== */

    useEffect(() => {
        if (!remesaId) return

        const remesa = REMESAS_MOCK.find(r => r.id === remesaId)
        if (remesa) {
            setForm(prev => ({
                ...prev,
                ...remesa,
            }))
        }
    }, [remesaId])

    useEffect(() => {
        if (initialData) {
            setForm((prev) => ({ ...prev, ...initialData }))
        }
    }, [initialData])

    /* ===============================
       HANDLERS
    =============================== */

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSelect = (name: string, value: string) => {
        setForm({ ...form, [name]: value })
    }

    const handleBooleanChange = (name: string, value: boolean) => {
        setForm({ ...form, [name]: value })
    }

    return (
        <form className="grid gap-4 max-w-4xl mx-auto">

            {/* ===================== */}
            {/* SELECTOR DE REMESA */}
            {/* ===================== */}
            <div>
                <Label>Remesas del viaje</Label>
                <Select value={remesaId} onValueChange={setRemesaId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona una remesa" />
                    </SelectTrigger>
                    <SelectContent>
                        {REMESAS_MOCK.map(r => (
                            <SelectItem key={r.id} value={r.id}>
                                {r.nombre}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* ===================== */}
            {/* FORMULARIO */}
            {/* ===================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Identificación */}
                <div>
                    <Label>Número de Remesa</Label>
                    <Input
                        name="numero_remesa"
                        disabled={isContador}
                        value={form.numero_remesa}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label>Número de Autorización</Label>
                    <Input
                        name="numero_autorizacion"
                        disabled={isContador}
                        value={form.numero_autorizacion}
                        onChange={handleChange}
                    />
                </div>

                {/* Naturaleza */}
                <div>
                    <Label>Naturaleza de la Carga</Label>
                    <Select
                        disabled={isContador}
                        value={form.naturaleza_carga}
                        onValueChange={(v) => handleSelect("naturaleza_carga", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona naturaleza" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Perecedera">Perecedera</SelectItem>
                            <SelectItem value="Peligrosa">Peligrosa</SelectItem>
                            <SelectItem value="Fragil">Frágil</SelectItem>
                            <SelectItem value="Granel">Granel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Tipo de Empaque</Label>
                    <Select
                        disabled={isContador}
                        value={form.tipo_empaque}
                        onValueChange={(v) => handleSelect("tipo_empaque", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona empaque" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Caja">Caja</SelectItem>
                            <SelectItem value="Saco">Saco</SelectItem>
                            <SelectItem value="Pallet">Pallet</SelectItem>
                            <SelectItem value="Contenedor">Contenedor</SelectItem>
                            <SelectItem value="Cisterna">Cisterna</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Medidas */}
                <div>
                    <Label>Cantidad</Label>
                    <Input
                        type="number"
                        step="0.01"
                        name="cantidad"
                        disabled={isContador}
                        value={form.cantidad}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label>Unidad de Medida</Label>
                    <Select
                        disabled={isContador}
                        value={form.unidad_medida}
                        onValueChange={(v) => handleSelect("unidad_medida", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona unidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="kg">Kg</SelectItem>
                            <SelectItem value="ton">Toneladas</SelectItem>
                            <SelectItem value="cajas">Cajas</SelectItem>
                            <SelectItem value="unidades">Unidades</SelectItem>
                            <SelectItem value="litros">Litros</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Peso Total</Label>
                    <Input
                        type="number"
                        step="0.01"
                        name="peso_total"
                        disabled={isContador}
                        value={form.peso_total}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label>Código Armonizado (HS)</Label>
                    <Input
                        name="codigo_armonizado"
                        disabled={isContador}
                        value={form.codigo_armonizado}
                        onChange={handleChange}
                    />
                </div>

                {/* Mercancía peligrosa */}
                <div className="col-span-full">
                    <Label>¿Mercancía peligrosa?</Label>
                    <Select
                        disabled={isContador}
                        value={form.mercancia_peligrosa ? "si" : "no"}
                        onValueChange={(v) =>
                            handleBooleanChange("mercancia_peligrosa", v === "si")
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="si">Sí</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* BLOQUE CONDICIONAL */}
                {form.mercancia_peligrosa && (
                    <div className="col-span-full border rounded-md p-4 bg-yellow-50 dark:bg-yellow-900/20">
                        <h4 className="font-semibold mb-3 text-yellow-700 dark:text-yellow-400">
                            ⚠️ Información de Mercancía Peligrosa
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Código UN</Label>
                                <Input
                                    name="codigo_un"
                                    value={form.codigo_un}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>Grupo de Riesgo</Label>
                                <Input
                                    name="grupo_riesgo"
                                    value={form.grupo_riesgo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>Característica de Peligrosidad</Label>
                                <Input
                                    name="caracteristica_peligrosidad"
                                    value={form.caracteristica_peligrosidad}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>Embalaje / Envase</Label>
                                <Input
                                    name="embalaje_envase"
                                    value={form.embalaje_envase}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <Label>Observaciones</Label>
                <Textarea
                    name="observaciones"
                    disabled={isContador}
                    value={form.observaciones}
                    onChange={handleChange}
                    className="min-h-[80px]"
                />
            </div>
        </form>
    )
}
