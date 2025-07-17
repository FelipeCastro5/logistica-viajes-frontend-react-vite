import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useClienteForm } from "@/hooks/forms copy/useClienteForm"

export default function ClienteForm({ onCreated }: { onCreated?: (data: any) => void }) {
  const { cliente, handleChange, handleSubmit } = useClienteForm({ onCreated })

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
      <div>
        <Label htmlFor="nombre_cliente">Nombre</Label>
        <Input
          id="nombre_cliente"
          name="nombre_cliente"
          placeholder="Nombre del cliente"
          value={cliente.nombre_cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="nit">Nit Cliente</Label>
        <Input
          id="nit"
          name="nit"
          placeholder="Nit del Cliente"
          value={cliente.nit}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="telefono">Teléfono Cliente</Label>
        <Input
          id="telefono"
          name="telefono"
          placeholder="Teléfono del Cliente"
          value={cliente.telefono}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Guardar cliente</Button>
    </form>
  )
}
