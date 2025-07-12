import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import PrivateRoute from "./pages/routes/PrivateRoute"
import Login from "./pages/public/Login"
import MenuViaje from "./pages/private/pages/MenuViaje"
import MenuPrincipal from "./pages/private/pages/MenuPrincipal"
import PageLayout from "./components/layout/PageLayout"
import NuevoViaje from "./pages/private/pages/NuevoViaje"
import ManifiestoForm from "./pages/private/forms/ManifiestoForm"
import ClienteForm from "./pages/private/forms/ClienteForm"
import DetallesViajeForm from "./pages/private/forms/DetallesViajeForm"
import TablaGastosViaje from "./pages/private/tables/TablaGastos"
import ChatPage from "./pages/private/Chat/ChatPage"
import ChatListPage from "./pages/private/Chat/ChatListPage"
import RecuperarPassword from "./pages/public/RecuperarPassword"
import Viaje from "./pages/private/pages/Viaje"
import TablaDetalleViaje from "./pages/private/tables/TablaDetalleViaje"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />

        {/* Rutas privadas dentro de layout */}
        <Route element={<PrivateRoute><PageLayout /></PrivateRoute>}>
          <Route path="/menu-principal" element={<MenuPrincipal />} />
          <Route path="/menu-viaje" element={<MenuViaje />} />
          <Route path="/nuevo-viaje" element={<NuevoViaje />} />
          <Route path="/viaje" element={<Viaje />} />

          <Route path="/detalles-viaje" element={<DetallesViajeForm />} />
          <Route path="/info-cliente" element={<ClienteForm />} />
          <Route path="/manifiesto" element={<ManifiestoForm />} />
          <Route path="/total-gastos" element={<TablaGastosViaje />} />
          <Route path="/tabla-viaje" element={<TablaDetalleViaje />} />

          <Route path="/chat-bot" element={<ChatListPage />} />
          <Route path="/chat-bot/:chatId" element={<ChatPage />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}
