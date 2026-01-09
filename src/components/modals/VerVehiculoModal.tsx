import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VehiculoForm from "../forms/VehiculoForm"
import SeguroForm from "../forms/SeguroForm"
import CrearSeguroModal from "@/components/modals/CrearSeguroModal"
import { useVerVehiculoModal, type Mode } from "@/hooks/modals/useVerVehiculoModal"
import { ScrollArea } from "@/components/ui/scroll-area"

type Props = {
    idVehiculo: number | null
    open: boolean
    onOpenChange: (open: boolean) => void
    mode?: Mode
}

export default function VerVehiculoModal({
    idVehiculo,
    open,
    onOpenChange,
    mode = "ver",
}: Props) {
    const {
        vehiculo,
        setVehiculo,
        seguros,
        seguroActivo,
        setSeguroActivo,
        loading,
        saving,
        isReadOnly,
        openCrearSeguro,
        setOpenCrearSeguro,
        handleCreateVehiculo,
    } = useVerVehiculoModal({
        idVehiculo,
        open,
        mode,
        onClose: () => onOpenChange(false),
    })

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

                        <ScrollArea className="max-h-[450px]">
                            {loading ? (
                                <p className="text-center text-gray-500">
                                    Cargando vehículo...
                                </p>
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

                                    {mode === "editar" && (
                                        <Button
                                            className="bg-green-600 text-white"
                                            onClick={() => setOpenCrearSeguro(true)}
                                        >
                                            Agregar nuevo seguro
                                        </Button>
                                    )}
                                </>
                            )}

                            {mode === "crear" && (
                                <div className="flex justify-end">
                                    <Button
                                        className="bg-blue-600 text-white"
                                        onClick={handleCreateVehiculo}
                                        disabled={saving}
                                    >
                                        {saving ? "Registrando..." : "Registrar vehículo"}
                                    </Button>
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </DialogContent>
            </Dialog>

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
