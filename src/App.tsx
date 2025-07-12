import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import PrivateRoute from "./pages/routes/PrivateRoute"
import Login from "./pages/public/Login"
import MenuViaje from "./pages/private/MenuViaje"
import MenuPrincipal from "./pages/private/MenuPrincipal"
import PageLayout from "./components/PageLayout"
import NuevoViaje from "./pages/private/NuevoViaje"
import ManifiestoForm from "./pages/private/forms/ManifiestoForm"
import ClienteForm from "./pages/private/forms/ClienteForm"
import DetallesViajeForm from "./pages/private/forms/DetallesViajeForm"
import TablaGastosViaje from "./pages/private/forms/TablaGastos"
import ChatPage from "./pages/private/Chat/ChatPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas dentro de layout */}
        <Route element={<PrivateRoute><PageLayout /></PrivateRoute>}>
          <Route path="/menu-principal" element={<MenuPrincipal />} />
          <Route path="/menu-viaje" element={<MenuViaje />} />
          <Route path="/nuevo-viaje" element={<NuevoViaje />} />

          <Route path="/detalles-viaje" element={<DetallesViajeForm />} />
          <Route path="/info-cliente" element={<ClienteForm />} />
          <Route path="/manifiesto" element={<ManifiestoForm />} />
          <Route path="/total-gastos" element={<TablaGastosViaje />} />
          
          <Route path="/chat-bot" element={<ChatPage />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}
