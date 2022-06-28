import React from "react";
import "./Gestores.css";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useFormik } from "formik";
//import {basicSchema} from "../schemas/index.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const Gestion = () => {
  const datosC = useParams();
  const navigate = useNavigate();
  function createPost() {
    axios
      .post("/api/gestions/addGestion", {
        folio: values.folio,
        nombre_ciudadano:
          datosC.nombre + " " + datosC.ape_paterno + " " + datosC.ape_materno,
        curp: datosC.curp,
        descripcion: values.descripcion,
        fecha: values.fecha,
        procedencia: values.procedencia,
        periodo: values.periodo,
        prioridad: values.prioridad,
        tipo: values.tipo,
        dependencia: values.dependencia,
        registra: values.registra,
        vencimiento: values.vencimiento,
        periodico: values.periodico,
        folio_interno: values.folio_interno,
        cant_benef: values.cant_benef,
        evento: values.evento,
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
          "La solicitud fue agregada correctamente",
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
    //validationSchema:basicSchema,
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
                value={values.folio}
                onChange={handleChange}
                id="folio"
                type="text"
                placeholder="Ingresa folio"
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
                  datosC.ape_paterno +
                  " " +
                  datosC.ape_materno
                }
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
              <input
                value={values.procedencia}
                onChange={handleChange}
                id="procedencia"
                type="text"
                placeholder="Ingresa Procedencia"
                onBlur={handleBlur}
                className={
                  errors.procedencia && touched.procedencia ? "input-error" : ""
                }
              />
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
              <input
                value={values.prioridad}
                onChange={handleChange}
                id="prioridad"
                type="text"
                placeholder="Ingresa prioridad"
                onBlur={handleBlur}
                className={
                  errors.prioridad && touched.prioridad ? "input-error" : ""
                }
              />
              {errors.prioridad && touched.prioridad && (
                <p className="error">{errors.prioridad}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="tipo">TIPO</label>
              <input
                value={values.tipo}
                onChange={handleChange}
                id="tipo"
                type="text"
                placeholder="Ingresa tipo"
                onBlur={handleBlur}
                className={errors.tipo && touched.tipo ? "input-error" : ""}
              />
              {errors.tipo && touched.tipo && (
                <p className="error">{errors.tipo}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="dependencia">DEPENDENCIA</label>
              <input
                value={values.dependencia}
                onChange={handleChange}
                id="dependencia"
                type="text"
                placeholder="Ingresa dependencia"
                onBlur={handleBlur}
                className={
                  errors.dependencia && touched.dependencia ? "input-error" : ""
                }
              />
              {errors.dependencia && touched.dependencia && (
                <p className="error">{errors.dependencia}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="registra">REGISTRA</label>
              <input
                value={values.registra}
                onChange={handleChange}
                id="registra"
                type="text"
                placeholder="Ingresa quien registra"
                onBlur={handleBlur}
                className={
                  errors.registra && touched.registra ? "input-error" : ""
                }
              />
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
              <input
                value={values.periodico}
                onChange={handleChange}
                id="periodico"
                type="text"
                placeholder="Ingresa SI/NO"
                onBlur={handleBlur}
                className={
                  errors.periodico && touched.periodico ? "input-error" : ""
                }
              />
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
              <input
                value={values.evento}
                onChange={handleChange}
                id="evento"
                type="text"
                placeholder="Ingresa evento"
                onBlur={handleBlur}
                className={errors.evento && touched.evento ? "input-error" : ""}
              />
              {errors.evento && touched.evento && (
                <p className="error">{errors.evento}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="estado">ESTADO</label>
              <input
                value={values.estado}
                onChange={handleChange}
                id="estado"
                type="text"
                placeholder="ingresa estado"
                onBlur={handleBlur}
                className={errors.estado && touched.estado ? "input-error" : ""}
              />
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
                type="text"
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
              <button
                className="btn"
                onClick={() => navigate("/buscar")}
              >
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
