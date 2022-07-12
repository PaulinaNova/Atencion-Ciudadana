import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gestores from "./components/pages/Gestores";
import Buscar from "./components/pages/Buscar";
import Seguimiento from "./components/pages/Seguimiento";
import Graficas from "./components/pages/Graficas";
import Reportes from "./components/pages/Reportes";
import Pendientes from "./components/pages/Pendientes";
import Gestion from "./components/pages/Gestion";
import Historial from "./components/pages/Historial";
import LoginForm from "./components/Login/LoginForm";
import Asignadas from "./components/pages/Asignadas";
import BuscarGestor from "./components/pages/BuscarGestor";
import HistorialGestor from "./components/pages/HistorialGestor";
import GestionGestor from "./components/pages/GestionGestor";
import SeguimientoGestor from "./components/pages/SeguimientoGestor";
import AuthService from "./services/auth.service";


function App() {
  const [currentuserName, setCurrentUserName] = useState();
  const [currentPath, setCurrentPath] = useState();


  useEffect(() => {
    const userName = AuthService.getCurrentUserName();
    const pathname = window.location.pathname;
    if (userName) {
      setCurrentUserName(userName);
    }
    setCurrentPath(pathname)
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          {currentPath === "/login" ? null : <Navbar />}
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/seguimiento" element={<Seguimiento />} />
            <Route path="/graficas" element={<Graficas />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/pendientes" exact element={<Pendientes />} />
            <Route path="/gestores" element={<Gestores />} />
            <Route path="/gestions/:curp/:nombre/:apellidoPaterno/:apellidoMaterno" element={<Gestion />} />
            <Route path="/historial/:curp" element={<Historial />} />
            <Route path="/asignadas" element={<Asignadas gestor={currentuserName} />} />
            <Route path="/buscarGestor" element={<BuscarGestor />} />
            <Route path="/historialGestor/:curp" element={<HistorialGestor />} />
            <Route path="/gestionGestor/:curp/:nombre/:apellidoPaterno/:apellidoMaterno" element={<GestionGestor />} />
            <Route path="/seguimientoGestor" element={<SeguimientoGestor gestor={currentuserName} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
