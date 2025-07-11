import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import PrivateRoute from "./pages/routes/PrivateRoute"
import Login from "./pages/public/Login"
import MenuViaje from "./pages/private/MenuViaje"
import MenuPrincipal from "./pages/private/MenuPrincipal"
import PageLayout from "./components/PageLayout"
import NuevoViaje from "./pages/private/NuevoViaje"

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
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}
