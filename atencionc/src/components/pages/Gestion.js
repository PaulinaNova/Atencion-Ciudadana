import React from "react";
import "./Gestores.css";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {NotificationContainer,NotificationManager,} from "react-notifications";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const validate=(values)=>{
  let errores ={};

  //VALIDAR FOLIO
  if(!values.folio){
    errores.folio = "CAMPO VACIO"
  } else if(!/^([0-9])*$/.test(values.folio)){
    errores.folio = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR NOMBRE CIUDADANO
  if(!values.nombre_ciudadano){
    errores.nombre_ciudadano = "CAMPO VACIO"
  } else if(!/^([A-Z])*$/.test(values.nombre_ciudadano)){
    errores.nombre_ciudadano = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR CURP
  if(!values.curp){
    errores.curp = "CAMPO VACIO"
  } else if(!/^([A-Z]{4})([0-9]{6})([A-Z]{6})([0-9]{2})$/.test(values.curp)){
    errores.curp = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR DESCRIPCION
  if(!values.descripcion){
    errores.descripcion = "CAMPO VACIO"
  } 

   //VALIDAR FECHA
   if(!values.fecha){
    errores.fecha = "CAMPO VACIO"
  } 

  //VALIDAR PROCEDENCIA
  if(!values.procedencia){
    errores.procedencia = "CAMPO VACIO"
  }

   //VALIDAR PERIODO
   if(!values.periodo){
    errores.periodo = "CAMPO VACIO"
  } else if(!/^([A-Z])*$/.test(values.periodo)){
    errores.periodo = "INGRESA CORRECTAMENTE"
  }

   //VALIDAR PRIORIDAD
  if(!values.prioridad){
    errores.prioridad = "CAMPO VACIO"
  } else if(!/^([A-Z])*$/.test(values.prioridad)){
    errores.prioridad = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR TIPO
  if(!values.tipo){
    errores.tipo = "CAMPO VACIO"
  }

  //VALIDAR DEPENDENCIA
  if(!values.dependencia){
    errores.dependencia = "CAMPO VACIO"
  }

  //VALIDAR REGISTRA
  if(!values.registra){
    errores.registra = "CAMPO VACIO"
  } else if(!/^([A-Z])*$/.test(values.registra)){
    errores.registra = "INGRESA CORRECTAMENTE"
  }
  
   //VALIDAR VENCIMIENTO
   if(!values.vencimiento){
    errores.vencimiento = "CAMPO VACIO"
  } 

  //VALIDAR PERIODICO
  if(!values.periodico){
    errores.periodico = "CAMPO VACIO"
  }

  //VALIDAR FOLIO_INTERNO
  if(!values.folio_interno){
    errores.folio_interno = "CAMPO VACIO"
  } else if(!/^([0-9])*$/.test(values.folio_interno)){
    errores.folio_interno = "INGRESA CORRECTAMENTE"
  }

   //VALIDAR CANTIDAD DE BENEFICIADOS
   if(!values.cant_benef){
    errores.cant_benef = "CAMPO VACIO"
  } else if(!/^([0-9])*$/.test(values.cant_benef)){
    errores.cant_benef = "INGRESA CORRECTAMENTE"
  }

   //VALIDAR EVENTO
   if(!values.evento){
    errores.evento = "CAMPO VACIO"
  } else if(!/^([A-Z])*$/.test(values.evento)){
    errores.evento = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR ESTADO
  if(!values.estado){
    errores.estado = "CAMPO VACIO"
  } else if(!/^(([A-Z])|([0-9]))*$/.test(values.estado)){
    errores.estado = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR PRESUPUESTO
   if(!values.presupuesto){
    errores.presupuesto = "CAMPO VACIO"
  } else if(!/^([0-9])*$/.test(values.presupuesto)){
    errores.presupuesto = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR NOTAS
  if(!values.notas){
    errores.notas = "CAMPO VACIO"
  } 

  return errores;
};
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
          "La gestión fue agregada correctamente","Exito"
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
    validate,
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
              
              <select id="procedencia" className="slcG"
                onBlur={handleBlur}
                onChange={handleChange}>
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
              <select id="tipo" className="slcG"
              onBlur={handleBlur}
              onChange={handleChange}>
                <option value="1">Ingresa tipo</option>
                <option value="2">ORDINARIO</option>
                </select>
              {errors.tipo && touched.tipo && (<p className="error">{errors.tipo}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="dependencia">DEPENDENCIA</label>
              <select id="dependencia" className="slcG"
              onBlur={handleBlur}
              onChange={handleChange}>
                <option value="SEP">SEP</option>
                <option value="1">SECRETARIA DE SALUD</option>
                <option value="3">Secretaria de Desarrollo Rural</option>
                <option value="4">Secretaria de Desarrollo Económico</option>
              </select>
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
              <select id="periodico" className="slcG"
              onBlur={handleBlur}
              onChange={handleChange}>
                <option value="1">Ingresa SI/NO</option>
                <option value="2">SI</option>
                <option value="3">NO</option>
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
              <select id="estado" className="slcG"
                onBlur={handleBlur}
                onChange={handleChange}>
                <option value="1">Ingresa Estado</option>
                <option value="2">SEGUIMIENTO</option>
                <option value="3">CONCLUIDA</option>
                <option value="4">CANCELADA</option>
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
