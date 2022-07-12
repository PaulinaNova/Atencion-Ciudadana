import React, { useState, useEffect } from "react";
import "./Gestores.css";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const validate = (values) => {
  let errores = {};

  //VALIDAR DESCRIPCION
  if (!values.descripcion) {
    errores.descripcion = "CAMPO VACIO";
  }

  //VALIDAR FECHA
  if (!values.fecha) {
    errores.fecha = "CAMPO VACIO";
  }

  //VALIDAR PROCEDENCIA
  if (!values.procedencia) {
    errores.procedencia = "CAMPO VACIO";
  }

  //VALIDAR PERIODO
  if (!values.periodo) {
    errores.periodo = "CAMPO VACIO";
  }

  //VALIDAR PRIORIDAD
  if (!values.prioridad) {
    errores.prioridad = "CAMPO VACIO";
  }

  //VALIDAR TIPO
  if (!values.tipo) {
    errores.tipo = "CAMPO VACIO";
  }

  //VALIDAR DEPENDENCIA
  if (!values.dependencia) {
    errores.dependencia = "CAMPO VACIO";
  }

  //VALIDAR REGISTRA
  if (!values.registra) {
    errores.registra = "CAMPO VACIO";
  }

  //VALIDAR VENCIMIENTO
  if (!values.vencimiento) {
    errores.vencimiento = "CAMPO VACIO";
  }

  //VALIDAR PERIODICO
  if (!values.periodico) {
    errores.periodico = "CAMPO VACIO";
  }

  //VALIDAR FOLIO_INTERNO
  if (!values.folio_interno) {
    errores.folio_interno = "CAMPO VACIO";
  } else if (!/^([0-9])*$/.test(values.folio_interno)) {
    errores.folio_interno = "INGRESA CORRECTAMENTE";
  }

  //VALIDAR CANTIDAD DE BENEFICIADOS
  if (!values.cant_benef) {
    errores.cant_benef = "CAMPO VACIO";
  } else if (!/^([0-9])*$/.test(values.cant_benef)) {
    errores.cant_benef = "INGRESA CORRECTAMENTE";
  }

  //VALIDAR EVENTO
  if (!values.evento) {
    errores.evento = "CAMPO VACIO";
  }

  //VALIDAR ESTADO
  if (!values.estado) {
    errores.estado = "CAMPO VACIO";
  }

  //VALIDAR PRESUPUESTO
  if (!values.presupuesto) {
    errores.presupuesto = "CAMPO VACIO";
  } else if (!/^([0-9])*$/.test(values.presupuesto)) {
    errores.presupuesto = "INGRESA CORRECTAMENTE";
  }

  //VALIDAR NOTAS
  if (!values.notas) {
    errores.notas = "CAMPO VACIO";
  }

  return errores;
};

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const Gestion = () => {
  const [dependencia, setDependencia] = useState([]);
  const [registra, setRegistra] = useState([]);
  const [evento, setEvento] = useState([]);
  const [selectedDep, setSelectedDep] = useState([]);
  const [selectedReg, setSelectedReg] = useState([]);
  const [selectedEv, setSelectedEv] = useState([]);

  const onDropdownChangeDep = ({ value }) => {
    setSelectedDep(value);
  };
  const onDropdownChangeReg = ({ value }) => {
    setSelectedReg(value);
  };
  const onDropdownChangeEv = ({ value }) => {
    setSelectedEv(value);
  };

  const getData = async () => {
    const resR = await axios.get("/api/gestor");
    setRegistra(resR.data);
    const resD = await axios.get("/api/dependencia/");
    setDependencia(resD.data);
    const respE = await axios.get("/api/evento/");
    setEvento(respE.data);
  };

  useEffect(() => {
    getData();
  }, []);

  //------------COMBOBOX----------------------------
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 42,
      borderRadius: 10,
    }),
  };

  const datosC = useParams();
  const navigate = useNavigate();
  function createPost() {
    axios
      .post("/api/gestions/addGestion", {
        nombre_ciudadano:
          datosC.nombre +
          " " +
          datosC.apellidoPaterno +
          " " +
          datosC.apellidoMaterno,
        curp: datosC.curp,
        descripcion: values.descripcion,
        fecha: values.fecha,
        procedencia: values.procedencia,
        periodo: values.periodo,
        prioridad: values.prioridad,
        tipo: values.tipo,
        dependencia: selectedDep,
        registra: selectedReg,
        vencimiento: values.vencimiento,
        periodico: values.periodico,
        folio_interno: values.folio_interno,
        cant_benef: values.cant_benef,
        evento: selectedEv,
        estado: values.estado,
        presupuesto: values.presupuesto,
        notas: values.notas,
        seguimiento: {
          fecha_seguimiento: "",
          descripcion_seguimiento: "",
          gestor: "",
        },
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success(
          "La gestión fue agregada correctamente",
          "Exito"
        );
      });
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
      folio: "",
      nombre_ciudadano: "",
      curp: "",
      descripcion: "",
      fecha: "",
      procedencia: "",
      periodo: "",
      prioridad: "",
      tipo: "",
      dependencia: "",
      registra: "",
      vencimiento: "",
      periodico: "",
      folio_interno: "",
      cant_benef: "",
      evento: "",
      estado: "",
      presupuesto: "",
      notas: "",
    },
    onSubmit,
  });

  console.log(errors);

  return (
    <div className="gestores">
      <div className="CGestor">
        <div className="wrapper">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="formulario"
          >
            <div className="groupInput">
              <label htmlFor="folio">FOLIO</label>
              <input
                readOnly
                value={values.folio}
                onChange={handleChange}
                id="folio"
                type="text"
                onBlur={handleBlur}
                className={errors.folio && touched.folio ? "input-error" : ""}
              />
              {errors.folio && touched.folio && (
                <p className="error">{errors.folio}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="nombre_ciudadano">NOMBRE(S)</label>
              <input
                value={
                  datosC.nombre +
                  " " +
                  datosC.apellidoPaterno +
                  " " +
                  datosC.apellidoMaterno
                }
                readOnly
                onChange={handleChange}
                id="nombre_ciudadano"
                type="text"
                placeholder="Ingresa nombre(s)"
                onBlur={handleBlur}
                className={
                  errors.nombre_ciudadano && touched.nombre_ciudadano
                    ? "input-error"
                    : ""
                }
              />
              {errors.nombre_ciudadano && touched.nombre_ciudadano && (
                <p className="error">{errors.nombre_ciudadano}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="curp">CURP</label>
              <input
                value={datosC.curp}
                onChange={handleChange}
                id="curp"
                type="text"
                readOnly
                placeholder="Ingresa curp"
                onBlur={handleBlur}
                className={errors.curp && touched.curp ? "input-error" : ""}
              />
              {errors.curp && touched.curp && (
                <p className="error">{errors.curp}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="descripcion">DESCRIPCION</label>
              <input
                value={values.descripcion}
                onChange={handleChange}
                id="descripcion"
                type="text"
                placeholder="Ingresa descripcion"
                onBlur={handleBlur}
                className={
                  errors.descripcion && touched.descripcion ? "input-error" : ""
                }
              />
              {errors.descripcion && touched.descripcion && (
                <p className="error">{errors.descripcion}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="fecha">FECHA</label>
              <input
                value={values.fecha}
                onChange={handleChange}
                id="fecha"
                type="date"
                placeholder="Ingresa Fecha"
                onBlur={handleBlur}
                className={errors.fecha && touched.fecha ? "input-error" : ""}
              />
              {errors.fecha && touched.fecha && (
                <p className="error">{errors.fecha}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="procedencia">PROCEDENCIA</label>

              <select
                id="procedencia"
                className="slcG"
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option value="1">Ingresa Procedencia</option>
                <option value="2">REDES SOCIALES</option>
              </select>
              {errors.procedencia && touched.procedencia && (
                <p className="error">{errors.procedencia}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="periodo">PERIODO</label>
              <input
                value={values.periodo}
                onChange={handleChange}
                id="periodo"
                type="text"
                placeholder="Ingresa Periodo"
                onBlur={handleBlur}
                className={
                  errors.periodo && touched.periodo ? "input-error" : ""
                }
              />
              {errors.periodo && touched.periodo && (
                <p className="error">{errors.periodo}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="prioridad">PRIORIDAD</label>
              <select
                id="prioridad"
                className="slcG"
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option>Ingresa prioridad</option>
                <option>ALTA</option>
                <option>BAJA</option>
              </select>
              {errors.prioridad && touched.prioridad && (
                <p className="error">{errors.prioridad}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="tipo">TIPO</label>
              <select
                id="tipo"
                className="slcG"
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option>Ingresa tipo</option>
                <option>ORDINARIO</option>
              </select>
              {errors.tipo && touched.tipo && (
                <p className="error">{errors.tipo}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="dependencia">DEPENDENCIA</label>
              <div className="selectDoble">
                <Select
                  onBlur={handleBlur}
                  onChange={onDropdownChangeDep}
                  styles={customStyles}
                  options={dependencia.map((mun) => ({
                    label: mun.nombre_dependencia,
                    value: mun.nombre_dependencia,
                  }))}
                ></Select>
              </div>
              {errors.dependencia && touched.dependencia && (
                <p className="error">{errors.dependencia}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="registra">REGISTRA</label>
              <div className="selectDoble">
                <Select
                  onBlur={handleBlur}
                  onChange={onDropdownChangeReg}
                  styles={customStyles}
                  options={registra.map((mun) => ({
                    label: mun.nombre,
                    value: mun.nombre,
                  }))}
                ></Select>
              </div>
              {errors.registra && touched.registra && (
                <p className="error">{errors.registra}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="vencimiento">VENCIMIENTO</label>
              <input
                value={values.vencimiento}
                onChange={handleChange}
                id="vencimiento"
                type="date"
                placeholder="Ingresa vencimiento"
                onBlur={handleBlur}
                className={
                  errors.vencimiento && touched.vencimiento ? "input-error" : ""
                }
              />
              {errors.vencimiento && touched.vencimiento && (
                <p className="error">{errors.vencimiento}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="periodico">PERIODICO</label>
              <select
                id="periodico"
                className="slcG"
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option>Ingresa SI/NO</option>
                <option>SI</option>
                <option>NO</option>
              </select>

              {errors.periodico && touched.periodico && (
                <p className="error">{errors.periodico}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="folio_interno">FOLIO INTERNO</label>
              <input
                value={values.folio_interno}
                onChange={handleChange}
                id="folio_interno"
                type="number"
                placeholder="folio_interno"
                onBlur={handleBlur}
                className={
                  errors.folio_interno && touched.folio_interno
                    ? "input-error"
                    : ""
                }
              />
              {errors.folio_interno && touched.folio_interno && (
                <p className="error">{errors.folio_interno}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="cant_benef">NO. BENEFICIADOS</label>
              <input
                value={values.cant_benef}
                onChange={handleChange}
                id="cant_benef"
                type="number"
                placeholder="Ingresa no. beneficiados"
                onBlur={handleBlur}
                className={
                  errors.cant_benef && touched.cant_benef ? "input-error" : ""
                }
              />
              {errors.cant_benef && touched.cant_benef && (
                <p className="error">{errors.cant_benef}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="evento">EVENTO</label>
              <div className="selectDoble">
                <Select
                  onBlur={handleBlur}
                  onChange={onDropdownChangeEv}
                  styles={customStyles}
                  options={evento.map((mun) => ({
                    label: mun.nombre,
                    value: mun.nombre,
                  }))}
                ></Select>
              </div>
              {errors.evento && touched.evento && (
                <p className="error">{errors.evento}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="estado">ESTADO</label>
              <select
                id="estado"
                className="slcG"
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option>Ingresa Estado</option>
                <option>ACEPTADA</option>
              </select>
              {errors.estado && touched.estado && (
                <p className="error">{errors.estado}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="presupuesto">PRESUPUESTO</label>
              <input
                value={values.presupuesto}
                onChange={handleChange}
                id="presupuesto"
                type="number"
                placeholder="Presupuesto"
                onBlur={handleBlur}
                className={
                  errors.presupuesto && touched.presupuesto ? "input-error" : ""
                }
              />
              {errors.presupuesto && touched.presupuesto && (
                <p className="error">{errors.presupuesto}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="notas">NOTAS</label>
              <input
                value={values.notas}
                onChange={handleChange}
                id="notas"
                type="text"
                placeholder="Notas"
                onBlur={handleBlur}
                className={errors.notas && touched.notas ? "input-error" : ""}
              />
              {errors.notas && touched.notas && (
                <p className="error">{errors.notas}</p>
              )}
            </div>

            <div className="btnGE">
              <button
                className="btn"
                disabled={isSubmitting}
                onClick={createPost}
                type="submit"
              >
                Agregar gestion
              </button>
              <NotificationContainer />
              <button className="btn" onClick={() => navigate("/buscar")}>
                Regresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gestion;
