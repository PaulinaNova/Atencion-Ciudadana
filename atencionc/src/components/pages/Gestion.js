import React, { useState, useEffect } from "react";
import "../TableGestores/TableGestores.css";
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
import * as IoIcons from "react-icons/io";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  }

  //VALIDAR CANTIDAD DE BENEFICIADOS
  if (!values.cant_benef) {
    errores.cant_benef = "CAMPO VACIO";
  }

  //VALIDAR EVENTO
  if (!values.evento) {
    errores.evento = "CAMPO VACIO";
  }

  return errores;
};

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 330,
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

const Gestion = () => {
  const [dependencia, setDependencia] = useState([]);
  const [registra, setRegistra] = useState([]);
  const [evento, setEvento] = useState([]);
  const [procedencia, setProcedencia] = useState([]);
  const [selectedDep, setSelectedDep] = useState([]);
  const [selectedReg, setSelectedReg] = useState([]);
  const [selectedEv, setSelectedEv] = useState([]);
  const [selectedProc, setSelectedProc] = useState([]);
  const [fileAr, setFileAr] = useState("");
  const styles = useStyles();
  const [modal, setModal] = useState(false);
  const abrirCerrarModal = () => {
    setModal(!modal);
  };
  const [modalDep, setModalDep] = useState(false);
  const abrirCerrarModalDep = () => {
    setModalDep(!modalDep);
  };
  const [modalEv, setModalEv] = useState(false);
  const abrirCerrarModalEv = () => {
    setModalEv(!modalEv);
  };

  const onDropdownChangeDep = ({ value }) => {
    setSelectedDep(value);
    values.dependencia = selectedDep
  };
  const onDropdownChangeReg = ({ value }) => {
    setSelectedReg(value);
    values.registra = selectedReg;
  };
  const onDropdownChangeEv = ({ value }) => {
    setSelectedEv(value);
    values.evento = selectedEv;
  };
  const onDropdownChangeProc = ({ value }) => {
    setSelectedProc(value);
    values.procedencia = selectedProc;
  };

  const getData = async () => {
    const resR = await axios.get("/api/gestor");
    setRegistra(resR.data);
    const resD = await axios.get("/api/dependencia/");
    setDependencia(resD.data);
    const respE = await axios.get("/api/evento/");
    setEvento(respE.data);
    const respP = await axios.get("/api/procedencia/");
    setProcedencia(respP.data);
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

  function uploadFile() {
    axios.post("/api/uploadFiles", fileAr).then((response) => {
      setFileAr(response.data);
    });
  }

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
        procedencia: selectedProc,
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
        estado: "ACEPTADA",
        presupuesto: values.presupuesto,
        notas: values.notas,
        gestor: "",
        seguimiento: {
          fecha_seguimiento: "",
          descripcion_seguimiento: "",
        },
        archivo: values.archivo,
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success(
          "La gestión fue agregada correctamente",
          "Exito"
        );
        setTimeout(function() {
          window.location.reload();
        }, 3000);
        if (values.archivo !== "") uploadFile();
      });
  }

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    createPost();
    actions.resetForm();
  };

  function addProcedencia() {
    axios
      .post("/api/procedencia/addProcedencia", {
        nombre_procedencia: values.proc,
      })
      .then((response) => {
        NotificationManager.success(
          "La procedencia fue agregada correctamente",
          "Exito"
        );
      });
    getData();
    setTimeout(function() {
      values.proc = "";
      abrirCerrarModal();
    }, 3000);
  }

  function addDependencia() {
    axios
      .post("/api/dependencia/addDependencia", {
        nombre_dependencia: values.dep,
      })
      .then((response) => {
        NotificationManager.success(
          "La dependencia fue agregada correctamente",
          "Exito"
        );
      });
    getData();
    setTimeout(function() {
      values.dep = "";
      abrirCerrarModalDep();
    }, 3000);
  }

  function addEvento() {
    axios
      .post("/api/evento/addEvento", {
        nombre: values.ev,
      })
      .then((response) => {
        NotificationManager.success(
          "El evento fue agregado correctamente",
          "Exito"
        );
      });
    getData();
    setTimeout(function() {
      values.ev = "";
      abrirCerrarModalEv();
    }, 3000);
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
      archivo: "",
      proc: "",
      dep: "",
      ev: "",
    },
    onSubmit,
    validate
  });

  const body = (
    <div className={styles.modal}>
      <label htmlFor="procedencia">PROCEDENCIA</label>
      <input
        value={values.proc}
        onChange={handleChange}
        id="proc"
        type="text"
        placeholder="Ingrese procedencia"
        onBlur={handleBlur}
      />
      <button className="btn" onClick={() => addProcedencia()}>
        Agregar
      </button>
      <button className="btn" onClick={() => abrirCerrarModal()}>
        Cancelar
      </button>
    </div>
  );

  const bodyDep = (
    <div className={styles.modal}>
      <label htmlFor="dependencia">DEPENDENCIA</label>
      <input
        value={values.dep}
        onChange={handleChange}
        id="dep"
        type="text"
        placeholder="Ingrese dependencia"
        onBlur={handleBlur}
      />
      <button className="btn" onClick={() => addDependencia()}>
        Agregar
      </button>
      <button className="btn" onClick={() => abrirCerrarModalDep()}>
        Cancelar
      </button>
    </div>
  );

  const bodyEv = (
    <div className={styles.modal}>
      <label htmlFor="evento">EVENTO</label>
      <input
        value={values.ev}
        onChange={handleChange}
        id="ev"
        type="text"
        placeholder="Ingrese evento"
        onBlur={handleBlur}
      />
      <button className="btn" onClick={() => addEvento()}>
        Agregar
      </button>
      <button className="btn" onClick={() => abrirCerrarModalEv()}>
        Cancelar
      </button>
    </div>
  );

  return (
    <div className="gestores">
      <div className="CGestor">
        <div className="wrapper">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="formulario"
            encType="multipart/form-data"
          >
            <div className="groupInput">
              <label htmlFor="folio_interno">FOLIO INTERNO</label>
              <input
                value={values.folio_interno}
                onChange={handleChange}
                id="folio_interno"
                type="text"
                placeholder="Ingresa folio interno"
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
              <div className="selectBotones">
                <div className="selectDoble">
                  <Select
                    onBlur={handleBlur}
                    onChange={onDropdownChangeProc}
                    styles={customStyles}
                    options={procedencia.map((mun) => ({
                      label: mun.nombre_procedencia,
                      value: mun.nombre_procedencia,
                    }))}
                  ></Select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    abrirCerrarModal();
                  }}
                  className="addCatalogo"
                >
                  <IoIcons.IoIosAddCircleOutline />
                </button>
                <Modal open={modal} onClose={abrirCerrarModal}>
                  {body}
                </Modal>
              </div>
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
                <option>COMPROMISO</option>
                <option>COMPROMISO PÚBLICO</option>
              </select>
              {errors.tipo && touched.tipo && (
                <p className="error">{errors.tipo}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="dependencia">DEPENDENCIA</label>
              <div className="selectBotones">
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
                <button
                  type="button"
                  onClick={() => {
                    abrirCerrarModalDep();
                  }}
                  className="addCatalogo"
                >
                  <IoIcons.IoIosAddCircleOutline />
                </button>
                <Modal open={modalDep} onClose={abrirCerrarModalDep}>
                  {bodyDep}
                </Modal>
              </div>
              {errors.dependencia && touched.dependencia && (
                <p className="error">{errors.dependencia}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="registra">REGISTRA</label>
              <div className="selectDoble2">
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
              <div className="selectBotones">
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
                <button
                  type="button"
                  onClick={() => {
                    abrirCerrarModalEv();
                  }}
                  className="addCatalogo"
                >
                  <IoIcons.IoIosAddCircleOutline />
                </button>
                <Modal open={modalEv} onClose={abrirCerrarModalEv}>
                  {bodyEv}
                </Modal>
              </div>
              {errors.evento && touched.evento && (
                <p className="error">{errors.evento}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="estado">ESTADO</label>
              <input
                onChange={handleChange}
                value="ACEPTADA"
                id="estado"
                readOnly
                type="text"
                onBlur={handleBlur}
              />
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
              />
            </div>

            <div className="groupInput">
              <label htmlFor="notas">NOTAS</label>
              <textarea
                value={values.notas}
                onChange={handleChange}
                id="notas"
                type="text"
                placeholder="Notas"
                onBlur={handleBlur}
              />
            </div>

            <div className="groupInput">
              <label htmlFor="ARCHIVO">ARCHIVO</label>
              <input
                onChange={(event) => {
                  const fileList = event.target.files;
                  let data = new FormData();
                  const ext = fileList[0].name.split(".").pop();
                  data.append(
                    "archivo",
                    fileList[0],
                    values.folio_interno + "." + ext
                  );
                  setFileAr(data);
                  values.archivo = values.folio_interno + "." + ext;
                }}
                id="archivo"
                type="file"
                name="archivo"
                onBlur={handleBlur}
              />
            </div>

            <div className="btnGE">
              <button className="btn" disabled={isSubmitting} type="submit">
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
