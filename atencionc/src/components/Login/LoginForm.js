import React, { useState } from "react";
import logo from "../../images/logo.png";
import "../Login/LoginForm.css";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
//import { setAuthToken } from "../../helpers/setAuthToken";

function LoginForm({ error }) {
  const [details, setDetails] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  /*async function loginUser(e) {
    e.preventDefault();
    //reqres registered sample user
    const loginPayload = {
      userName: details.name,
      password: details.password,
    };

    axios
      .post("/api/login", loginPayload)
      .then((response) => {
        //get token from response
        const token = response.data.token;
        const isAdmin = false;
        //set JWT token to local
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", loginPayload.userName);
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("logIn", true);
        //set token to axios common header
        setAuthToken(token);
        //redirect user to home page
        if (isAdmin) window.location.href = "/pendientes";
        else window.location.href = "/buscarGestor";
      })
      .catch((err) => console.log(err));
  }*/

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(details.userName, details.password).then(
        () => {
          navigate("/pendientes");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="log">
        <div className="form-inner">
          <img className="login" src={logo} alt="logo" />

          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            <label htmlFor="name">Usuario:</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <input type="submit" value="INICIAR SESIÓN" />
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
