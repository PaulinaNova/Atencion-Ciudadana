import React, { useState } from "react";
import logo from "../../images/logo.png";
import "../Login/LoginForm.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 380,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textfield: {
    width: "100%",
  },
}));

function LoginForm() {
  const [details, setDetails] = useState({ name: "", password: "" });
  const navigate = useNavigate();
  const [errors, setError] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(details.name, details.password).then(
        (res) => {
          const isAdmin = localStorage.getItem("isAdmin");
          if (isAdmin === "true") {
            navigate("/pendientes");
          } else if (isAdmin === "false") {
            navigate("/asignadas");
          }
          window.location.reload();
        },
        (error) => {
          abrirCerrarModal();
          setError(error.response.data.errors[0].msg);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const styles = useStyles();
  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };
  const body = (
    <div className={styles.modal}>
      <h2>Parece que hubo un error</h2>
      <br/>
      <p>{errors}</p>
    </div>
  );

  return (
    <form onSubmit={handleLogin}>
      <div className="log">
        <div className="form-inner">
          <img className="login" src={logo} alt="logo" />
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

          <Modal open={modal} onClose={abrirCerrarModal}>
            {body}
          </Modal>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
