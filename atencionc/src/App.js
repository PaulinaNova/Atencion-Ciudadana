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
//import { setAuthToken } from "./helpers/setAuthToken";

function App() {
  /*//check jwt token
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");
  const logIn = localStorage.getItem("logIn");
  if (token) {
    setAuthToken(token);
  }*/

  const isAdmin = localStorage.getItem("isAdmin");
  const [usuario, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const gestor = AuthService.getCurrentUser();

    if (gestor) {
      setCurrentUser(gestor);
    }
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <Navbar isAdmin={isAdmin} />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/seguimiento" element={<Seguimiento />} />
            <Route path="/graficas" element={<Graficas />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/pendientes" exact element={<Pendientes />} />
            <Route path="/gestores" element={<Gestores />} />
            <Route
              path="/gestions/:curp/:nombre/:apellidoPaterno/:apellidoMaterno"
              element={<Gestion />}
            />
            <Route path="/historial/:curp" element={<Historial />} />
            {/*--------------------------------------*/}
            <Route path="/asignadas" element={<Asignadas gestor={usuario} />} />
            <Route path="/buscarGestor" element={<BuscarGestor />} />
            <Route
              path="/historialGestor/:curp"
              element={<HistorialGestor />}
            />
            <Route
              path="/gestionGestor/:curp/:nombre/:apellidoPaterno/:apellidoMaterno"
              element={<GestionGestor />}
            />
            <Route
              path="/seguimientoGestor"
              element={<SeguimientoGestor gestor={usuario} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
