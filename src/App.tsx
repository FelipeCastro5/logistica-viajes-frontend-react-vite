import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import PrivateRoute from "./pages/routes/PrivateRoute"
import Login from "./pages/public/Login"
import MenuPrincipal from "./pages/private/MenuPrincipal"
import PageLayout from "./components/layout/PageLayout"
import NuevoViaje from "./pages/private/NuevoViaje"
import ManifiestoForm from "./components/forms/ManifiestoForm"
import ClienteForm from "./components/forms/ClienteForm"
// import DetallesViajeForm from "./components/forms/DetallesViajeForm"
// import TablaGastosViaje from "./components/tables/TablaGastos"
import ChatPage from "./components/chat/ChatPage"
import ChatListPage from "./components/chat/ChatListPage"
import RecuperarPassword from "./pages/public/RecuperarPassword"
import Viaje from "./pages/private/Viaje"
import TablaDetalleViaje from "./components/tables/TablaDetalleViaje"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />

        {/* Rutas privadas dentro de layout */}
        <Route element={<PrivateRoute><PageLayout /></PrivateRoute>}>
          <Route path="/menu-principal" element={<MenuPrincipal />} />
          <Route path="/nuevo-viaje" element={<NuevoViaje />} />
          <Route path="/viaje/:id" element={<Viaje />} />

          {/* <Route path="/detalles-viaje" element={<DetallesViajeForm />} />
          <Route path="/total-gastos" element={<TablaGastosViaje />} /> */}
          <Route path="/info-cliente" element={<ClienteForm />} />
          <Route path="/manifiesto" element={<ManifiestoForm />} />
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
