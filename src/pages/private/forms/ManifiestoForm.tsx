import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ManifiestoForm() {
  const [form, setForm] = useState({
    flete_total: "",
    porcentaje_retencion_fuente: "",
    valor_retencion_fuente: "",
    porcentaje_ica: "",
    valor_ica: "",
    deduccion_fiscal: "",
    neto_a_pagar: "",
    anticipo: "",
    saldo_a_pagar: "",
    total_gastos: "",
    queda_al_carro: "",
    a_favor_del_carro: "",
    porcentaje_conductor: "",
    ganacia_conductor: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Manifiesto estético enviado:", form)
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Manifiesto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Flete Total</Label>
            <Input name="flete_total" value={form.flete_total} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>% Retención en la fuente</Label>
            <Input name="porcentaje_retencion_fuente" value={form.porcentaje_retencion_fuente} onChange={handleChange} placeholder="0.0000" />
          </div>
          <div>
            <Label>Valor Retención en la fuente</Label>
            <Input name="valor_retencion_fuente" value={form.valor_retencion_fuente} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>% ICA</Label>
            <Input name="porcentaje_ica" value={form.porcentaje_ica} onChange={handleChange} placeholder="0.0000" />
          </div>
          <div>
            <Label>Valor ICA</Label>
            <Input name="valor_ica" value={form.valor_ica} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>Deducción fiscal</Label>
            <Input name="deduccion_fiscal" value={form.deduccion_fiscal} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>Neto a pagar</Label>
            <Input name="neto_a_pagar" value={form.neto_a_pagar} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>Anticipo</Label>
            <Input name="anticipo" value={form.anticipo} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>Saldo a pagar</Label>
            <Input name="saldo_a_pagar" value={form.saldo_a_pagar} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>Total gastos</Label>
            <Input name="total_gastos" value={form.total_gastos} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>Queda al carro</Label>
            <Input name="queda_al_carro" value={form.queda_al_carro} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>A favor del carro</Label>
            <Input name="a_favor_del_carro" value={form.a_favor_del_carro} onChange={handleChange} placeholder="0.00" />
          </div>
          <div>
            <Label>% Conductor</Label>
            <Input name="porcentaje_conductor" value={form.porcentaje_conductor} onChange={handleChange} placeholder="0.0000" />
          </div>
          <div>
            <Label>Ganancia conductor</Label>
            <Input name="ganacia_conductor" value={form.ganacia_conductor} onChange={handleChange} placeholder="0.00" />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Registrar Manifiesto
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
