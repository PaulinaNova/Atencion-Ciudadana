import React, { useState, useEffect, useRef } from "react";
import { slide as Menu } from "react-burger-menu";
import axios from "axios";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useFormik } from "formik";
import "../pages/Seguimiento.css";
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 460,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "16px 52px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textfield: {
    width: "50%",
  },
}));

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export const SlideSeguimiento = (props) => {
  const { abierto, gestion } = props;
  const [seguimientos, setSeguimiento] = useState([]);
  var datos = seguimientos;
  const getData = async () => {
    const res = await axios.get("/api/seguimiento");
    setSeguimiento(res.data);
  };

  datos = datos.filter((entry) => entry.folio === gestion.folio);

  useEffect(() => {
    getData();
  }, []);

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('service_lqchs6j', 'template_swrywx9', e.target, 'ID USUARIO')
        .then(result => {
          alert("Se ha enviado correctamente");
          console.log(result);
        });
    e.target.reset()
    alert("Mensaje enviado");
  }

  function updatePut() {
    axios
      .put("/api/gestions/updtGestion/" + gestion.folio, {
        folio: gestion.folio,
        nombre_ciudadano: gestion.nombre_ciudadano,
        curp: gestion.curp,
        descripcion: gestion.descripcion,
        fecha: gestion.fecha,
        procedencia: gestion.procedencia,
        periodo: gestion.periodo,
        prioridad: gestion.prioridad,
        tipo: gestion.tipo,
        dependencia: gestion.dependencia,
        registra: gestion.registra,
        vencimiento: gestion.vencimiento,
        periodico: gestion.periodico,
        folio_interno: gestion.folio_interno,
        cant_benef: gestion.cant_benef,
        evento: gestion.evento,
        estado: values.estado,
        presupuesto: values.presupuesto,
        notas: gestion.notas,
        gestor: values.gestor,
        seguimiento: {
          fecha_seguimiento: values.fecha_seguimiento,
          descripcion_seguimiento: values.fecha_seguimiento,
        },
      })
      .then((response) => {
        setValues(response.data);
      });
  }

  function createPost() {
    axios
      .post("/api/seguimiento/addSeguimiento", {
        folio: gestion.folio,
        fecha_seguimiento: values.fecha_seguimiento,
        descripcion_seguimiento: values.descripcion_seguimiento,
        gestor: values.gestor,
        presupuesto: values.presupuesto,
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success(
          "El seguimiento fue agregado correctamente",
          "Exito"
        );
      });
    updatePut();
    getData();
  }

  const {
    setValues,
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fecha_seguimiento: "",
      descripcion_seguimiento: "",
      gestor: "",
      estado: "",
      presupuesto: "",
    },
    onSubmit,
  });

  const styles = useStyles();

  /*----------CREAR FORMULARIO----------- */

  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  const body = (
    <div className={styles.modal}>
      <div className="gestores">
        <div className="CBuscar">
          <div className="wrapper2">
            <form
              onSubmit={sendEmail}
              autoComplete="off"
              className="formulario2"
            >
              <div className="inputSeguimiento">
                <label className="lblSeg" htmlFor="fecha_seguimiento">
                  FECHA
                </label>
                <input
                  value={values.fecha_seguimiento}
                  onChange={handleChange}
                  id="fecha_seguimiento"
                  type="date"
                  placeholder="Ingresa Fecha de Seguimiento"
                  onBlur={handleBlur}
                  className={
                    errors.fecha_seguimiento && touched.fecha_seguimiento
                      ? "input-error"
                      : ""
                  }
                />
                {errors.fecha_seguimiento && touched.fecha_seguimiento && (
                  <p className="error">{errors.fecha_seguimiento}</p>
                )}
              </div>

              <div className="inputSeguimiento">
                <label className="lblSeg" htmlFor="descripcion_seguimiento">
                  DESCRIPCIÓN
                </label>
                <input
                  value={values.descripcion_seguimiento}
                  onChange={handleChange}
                  id="descripcion_seguimiento"
                  type="text"
                  placeholder="Ingresa Descripción"
                  onBlur={handleBlur}
                  className={
                    errors.descripcion_seguimiento &&
                    touched.descripcion_seguimiento
                      ? "input-error"
                      : ""
                  }
                />
                {errors.descripcion_seguimiento &&
                  touched.descripcion_seguimiento && (
                    <p className="error">{errors.descripcion_seguimiento}</p>
                  )}
              </div>

              <div className="inputSeguimiento">
                <label className="lblSeg" htmlFor="gestor">
                  GESTOR
                </label>

                <input
                  value={values.gestor}
                  onChange={handleChange}
                  id="gestor"
                  type="email"
                  placeholder="Ingresa Gestor"
                  onBlur={handleBlur}
                  className={
                    errors.gestor && touched.gestor ? "input-error" : ""
                  }
                />
                {errors.gestor && touched.gestor && (
                  <p className="error">{errors.gestor}</p>
                )}
              </div>

              <div className="inputSeguimiento">
                <label className="lblSeg" htmlFor="estado">
                  ESTADO
                </label>

                <input
                  value={values.estado}
                  onChange={handleChange}
                  id="estado"
                  type="text"
                  placeholder="Ingresa Estado"
                  onBlur={handleBlur}
                  className={
                    errors.estado && touched.estado ? "input-error" : ""
                  }
                />
                {errors.estado && touched.estado && (
                  <p className="error">{errors.estado}</p>
                )}
              </div>

              <div className="inputSeguimiento">
                <label className="lblSeg" htmlFor="presupuesto">
                  PRESUPUESTO
                </label>

                <input
                  value={values.presupuesto}
                  onChange={handleChange}
                  id="presupuesto"
                  type="number"
                  placeholder="Ingresa Presupuesto"
                  onBlur={handleBlur}
                  className={
                    errors.presupuesto && touched.presupuesto
                      ? "input-error"
                      : ""
                  }
                />
                {errors.presupuesto && touched.presupuesto && (
                  <p className="error">{errors.presupuesto}</p>
                )}
              </div>

              <div className="btnBu">
                <button
                  onClick={createPost}
                  disabled={isSubmitting}
                  className="btn"
                  type="submit"
                >
                  Agregar seguimiento
                </button>
                <NotificationContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  //////////////////////////////////////////////////////////////////

  return (
    <Menu right customBurgerIcon={false} isOpen={abierto}>
      <div className="detallesG">
        <p className="menu-item">Procedencia: {gestion.procedencia} </p>
        <p className="menu-item">Periodo: {gestion.periodo}</p>
        <p className="menu-item">Prioridad: {gestion.prioridad}</p>
        <p className="menu-item">Tipo: {gestion.tipo} </p>
        <p className="menu-item">Dependencia: {gestion.dependencia}</p>
        <p className="menu-item">Registró: {gestion.registra}</p>
        <p className="menu-item">Vencimiento: {gestion.vencimiento}</p>
        <p className="menu-item">Periodico: {gestion.periodo}</p>
        <p className="menu-item">Folio interno: {gestion.folio_interno}</p>
        <p className="menu-item">Beneficiados: {gestion.cant_benef}</p>
        <p className="menu-item">Evento: {gestion.evento}</p>
        <p className="menu-item">Estado: {gestion.estado}</p>
        <p className="menu-item">Presupuesto: {gestion.presupuesto}</p>
        <p className="menu-item">Notas: {gestion.notas}</p>
        <p className="menu-item">Gestor: {gestion.gestor} </p>
      </div>
      <table className="tseguimiento">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Seguimiento</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((u) => (
            <tr key={u._id}>
              <td>{u.fecha_seguimiento}</td>
              <td>{u.descripcion_seguimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn" onClick={() => abrirCerrarModal()}>
        Agregar seguimiento
      </button>
      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
    </Menu>
  );
};
export default SlideSeguimiento;
