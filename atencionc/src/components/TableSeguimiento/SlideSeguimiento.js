import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import axios from "axios";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "react-notifications/lib/notifications.css";
import {NotificationContainer,NotificationManager,} from "react-notifications";
import { useFormik } from "formik";
import "./TableSeguimiento.css";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "4%",
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
  const [selectedValue, setSelectedValue] = useState([]);
  const { abierto, gestion } = props;
  const [gestores, setGestor] = useState([]);
  const [seguimientos, setSeguimiento] = useState([]);
  var datos = seguimientos;

  const getData = async () => {
    const res = await axios.get("/api/seguimiento");
    setSeguimiento(res.data);
    const respG = await axios.get("/api/gestor/");
    setGestor(respG.data);
  };

  datos = datos.filter((entry) => entry.folio === gestion._id);

  useEffect(() => {
    getData();
  }, []);


  function updatePut() {
    axios
      .put("/api/gestions/updtGestion/" + gestion.folio, {
        folio: gestion._id,
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
        estado: values.estadoS,
        presupuesto: values.presupuestoS,
        notas: gestion.notas,
        gestor: selectedValue,
        seguimiento: {
          fecha_seguimiento: values.fecha_seguimientoS,
          descripcion_seguimiento: values.fecha_seguimientoS,
        },
      })
      .then((response) => {
        setValues(response.data);
      });
  }

  function createPost() {
    axios
      .post("/api/seguimiento/addSeguimiento", {
        folio: gestion._id,
        fecha_seguimiento: values.fecha_seguimientoS,
        descripcion_seguimiento: values.descripcion_seguimiento,
        gestor: selectedValue,
        presupuesto: values.presupuestoS,
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success(
          "El seguimiento fue agregado correctamente",
          "Exito"
        );
      });
    axios.post("/api/sendEmail", {
      gestor: selectedValue,
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
      fecha_seguimientoS: "",
      descripcion_seguimiento: "",
      gestorS: "",
      estadoS: "",
      presupuestoS: "",
    },
    onSubmit,
  });

  const styles = useStyles();

  /*----------CREAR FORMULARIO----------- */

  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  const onDropdownChange = ({ value }) => {
    setSelectedValue(value)
  };

  //------------COMBOBOX----------------------------
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 42,
      borderRadius:10
    }),
  };
  
  const body = (
    <div className={styles.modal}>
      <div className="seguimiento">
        <div className="CSegumiento">
          <div className="wrapper2">
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="formulario2"
            >
              <div className="inputSeguimiento">
                <label className="lblSeg" htmlFor="fecha_seguimientoS">
                  FECHA
                </label>
                <input
                  value={values.fecha_seguimientoS}
                  onChange={handleChange}
                  id="fecha_seguimientoS"
                  type="date"
                  placeholder="Ingresa Fecha de Seguimiento"
                  onBlur={handleBlur}
                  className={
                    errors.fecha_seguimientoS && touched.fecha_seguimientoS
                      ? "input-error"
                      : ""
                  }
                />
                {errors.fecha_seguimientoS && touched.fecha_seguimientoS && (
                  <p className="error">{errors.fecha_seguimientoS}</p>
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
                <label className="lblSeg" htmlFor="gestorS">
                  GESTOR
                </label>

                <div className="selectDoble">
                  <Select
                    onBlur={handleBlur}
                    onChange={onDropdownChange}
                    styles={customStyles}
                    options={gestores.map((ges) => ({
                      label: ges.email,
                      value: ges.email,
                    }))}
                  ></Select>
                </div>
                {errors.gestorS && touched.gestor && (
                  <p className="error">{errors.gestorS}</p>
                )}
              </div>

              <div className="inputSeguimiento">
                <label className="lblSeg" htmlFor="estadoS">
                  ESTADO
                </label>
                <select
                id="estadoS"
                className="slcG"
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option value="1">Ingresa Estado</option>
                <option value="2">ASIGNADA</option>
                <option value="3">ACEPTADA</option>
                <option value="4">SEGUIMIENTO</option>
                <option value="5">CONCLUIDA</option>
                <option value="6">CANCELADA</option>
              </select>
                {errors.estadoS && touched.estadoS && (
                  <p className="error">{errors.estadoS}</p>
                )}
              </div>

              <div className="inputSeguimiento">
                <label className="lblSeg" htmlFor="presupuesto">
                  PRESUPUESTO
                </label>

                <input
                  value={values.presupuestoS}
                  onChange={handleChange}
                  id="presupuestoS"
                  type="number"
                  placeholder="Ingresa Presupuesto"
                  onBlur={handleBlur}
                  className={
                    errors.presupuestoS && touched.presupuestoS
                      ? "input-error"
                      : ""
                  }
                />
                {errors.presupuestoS && touched.presupuestoS && (
                  <p className="error">{errors.presupuestoS}</p>
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
        <p className="menu-item">Procedencia: </p>
        <p className="pSeguimiento">{gestion.procedencia}</p>
        <p className="menu-item">Periodo: </p>
        <p className="pSeguimiento">{gestion.periodo}</p>
        <p className="menu-item">Prioridad: </p>
        <p className="pSeguimiento">{gestion.prioridad}</p>
        <p className="menu-item">Tipo: </p>
        <p className="pSeguimiento">{gestion.tipo}</p>
        <p className="menu-item">Dependencia: </p>
        <p className="pSeguimiento">{gestion.dependencia}</p>
        <p className="menu-item">Registró: </p>
        <p className="pSeguimiento">{gestion.registra}</p>
        <p className="menu-item">Vencimiento: </p>
        <p className="pSeguimiento">{gestion.vencimiento}</p>
        <p className="menu-item">Periodico: </p>
        <p className="pSeguimiento">{gestion.periodo}</p>
        <p className="menu-item">Folio interno: </p>
        <p className="pSeguimiento">{gestion.folio_interno}</p>
        <p className="menu-item">Beneficiados: </p>
        <p className="pSeguimiento">{gestion.cant_benef}</p>
        <p className="menu-item">Evento: </p>
        <p className="pSeguimiento">{gestion.evento}</p>
        <p className="menu-item">Estado: </p>
        <p className="pSeguimiento">{gestion.estado}</p>
        <p className="menu-item">Presupuesto: </p>
        <p className="pSeguimiento">{gestion.presupuesto}</p>
        <p className="menu-item">Notas: </p>
        <p className="pSeguimiento">{gestion.notas}</p>
        <p className="menu-item">Gestor: </p>
        <p className="pSeguimiento">{gestion.gestor}</p>
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