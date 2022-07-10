import "./App.css";
import React, { useState } from "react";
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

function App() {
  const adminUser = {
    name: "admin",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "" });
  const [error] = useState("");

  const Login = (details) => {
    console.log(details);

    if (details.password === adminUser.password) {
      console.log("Logged in");

      setUser({
        name: details.name,
      });
    } else {
      console.log("Los datos no coinciden");
      /*<div className="error">
        setError("Usuario no reconocido");
        </div>*/
    }
  };

  /*const Logout = () => {
    setUser({name:""});
  }*/

  return (
    <>
      <div className="App">
        {user.name !== "" ? (
          <Router>
            <Navbar />
            <Routes>
              <Route path="/buscar" element={<Buscar />} />
              <Route path="/seguimiento" element={<Seguimiento />} />
              <Route path="/graficas" element={<Graficas />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/" exact element={<Pendientes />} />
              <Route path="/gestores" element={<Gestores />} />
              <Route path="/gestions/:curp/:nombre/:apellidoPaterno/:apellidoMaterno" element={<Gestion />} />
              <Route path="/historial/:curp" element={<Historial />} />
            </Routes>
            {/*<button onClick={Logout}>Logout</button>*/}
          </Router>
        ) : (
          <LoginForm Login={Login} error={error} />
        )}
      </div>
    </>
  );
}

export default App;
