import BasicTable from "../Table/BasicTable";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useFormik } from "formik";
import "../Table/Table.css";
import Select from "react-select";

/*----------CREAR EL FONDO DE LA PANTALLA----------- */

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 1000,
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

const validate = (values) => {
  let errores = {};

  //VALIDAR CURP
  if (!values.curp) {
    errores.curp = "CAMPO VACIO";
  } else if (!/^([A-Z]{4})([0-9]{6})([A-Z]{6})([0-9]{2})$/.test(values.curp)) {
    errores.curp = "INGRESA CORRECTAMENTE";
  }

  //VALIDAR NOMBRE
  if(!values.nombre){
    errores.nombre = "CAMPO VACIO"
  } 

  //VALIDAR APELLIDO PATERNO
  if(!values.apellidoPaterno){
    errores.apellidoPaterno = "CAMPO VACIO"
  } 

  //VALIDAR APELLIDO MATERNO
  if(!values.apellidoMaterno){
    errores.apellidoMaterno = "CAMPO VACIO"
  }
   //VALIDAR FECHA
   if(!values.fechaNacimiento){
    errores.fechaNacimiento = "CAMPO VACIO"
  } 

  //VALIDAR TELEFONO
  if (!values.telefono) {
    errores.telefono = "CAMPO VACIO";
  } else if (!/^([0-9]{10})$/.test(values.telefono)) {
    errores.telefono = "INGRESA CORRECTAMENTE";
  }

  //VALIDAR EMAIL
  if (!values.email) {
    errores.email = "CAMPO VACIO";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )
  ) {
    errores.email = "INGRESA CORRECTAMENTE";
  }

  //VALIDAR CODIGO POSTAL
  if (!values.codigoPostal) {
    errores.codigoPostal = "CAMPO VACIO";
  } else if (!/^([0-9]{5})$/.test(values.codigoPostal)) {
    errores.codigoPostal = "INGRESA CORRECTAMENTE";
  }

  //VALIDAR MUNICIPIO
  if(!values.municipio){
    errores.municipio = "CAMPO VACIO"
  }

  //VALIDAR LOCALIDAD
  if(!values.localidad){
    errores.localidad = "CAMPO VACIO"
  }

  //VALIDAR COLONIA
  if(!values.colonia){
    errores.colonia = "CAMPO VACIO"
  }

  //VALIDAR CALLE
  if(!values.calle){
    errores.calle = "CAMPO VACIO"
  }

  //VALIDAR CARACTERISTICA
  if (!values.caracteristica) {
    errores.caracteristica = "CAMPO VACIO";
  }

  return errores;
};

const onSubmit = async (values, actions) => {
  //METER LO DE LA BD
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const Buscar = () => {

  const [localidad, setLocalidad] = useState([]);
  const [municipios, setMunicipio] = useState([]);

  const getData = async () => {
    const res = await axios.get("/api/municipio");
    setMunicipio(res.data);
    
    const respL = await axios.get("/api/localidad/");
    setLocalidad(respL.data);
  
  };
  

  useEffect(() => {
    getData();
  }, []);

  const [selectedMun, setSelectedMun] = useState([]);
  const [selectedLoc, setSelectedLoc] = useState([]);
  var loc = localidad;
  
  const onDropdownChangeMun = ({ value }) => {
    setSelectedMun(value);
  };
  const onDropdownChangeLoc = ({ value }) => {
    setSelectedLoc(value);
  };

  if (selectedMun === "ACAPONETA") {
    loc = loc.filter((entry) => entry.clave.startsWith("180010"));
  } else if (selectedMun === "AHUACATLAN") {
    loc = loc.filter((entry) => entry.clave.startsWith("180020"));
  } else if (selectedMun === "AMATLAN") {
    loc = loc.filter((entry) => entry.clave.startsWith("180030"));
  } else if (selectedMun === "COMPOSTELA") {
    loc = loc.filter((entry) => entry.clave.startsWith("180040"));
  } else if (selectedMun === "HUAJICORI") {
    loc = loc.filter((entry) => entry.clave.startsWith("180050"));
  } else if (selectedMun === "IXTLAN") {
    loc = loc.filter((entry) => entry.clave.startsWith("180060"));
  } else if (selectedMun === "JALA") {
    loc = loc.filter((entry) => entry.clave.startsWith("180070"));
  } else if (selectedMun === "XALISCO") {
    loc = loc.filter((entry) => entry.clave.startsWith("180080"));
  } else if (selectedMun === "DEL NAYAR") {
    loc = loc.filter((entry) => entry.clave.startsWith("180090"));
  } else if (selectedMun === "ROSAMORADA") {
    loc = loc.filter((entry) => entry.clave.startsWith("180100"));
  } else if (selectedMun === "RUIZ") {
    loc = loc.filter((entry) => entry.clave.startsWith("180110"));
  } else if (selectedMun === "SAN BLAS") {
    loc = loc.filter((entry) => entry.clave.startsWith("180120"));
  } else if (selectedMun === "SAN PEDRO") {
    loc = loc.filter((entry) => entry.clave.startsWith("180130"));
  } else if (selectedMun === "SAMAO") {
    loc = loc.filter((entry) => entry.clave.startsWith("180140"));
  } else if (selectedMun === "SANTIAGO") {
    loc = loc.filter((entry) => entry.clave.startsWith("180150"));
  } else if (selectedMun === "TECUALA") {
    loc = loc.filter((entry) => entry.clave.startsWith("180160"));
  } else if (selectedMun === "TEPIC") {
    loc = loc.filter((entry) => entry.clave.startsWith("180170"));
  } else if (selectedMun === "TUXPAN") {
    loc = loc.filter((entry) => entry.clave.startsWith("180180"));
  } else if (selectedMun === "YESCA") {
    loc = loc.filter((entry) => entry.clave.startsWith("180190"));
  } else if (selectedMun === "BAHIA") {
    loc = loc.filter((entry) => entry.clave.startsWith("180200"));
  }

  
  //------------COMBOBOX----------------------------
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 42,
      borderRadius:10
    }),
  };
  
  function createPost() {
    axios
      .post("/api/ciudadano/addCiudadano", {
        curp: values.curp,
        nombre: values.nombre,
        apellidoPaterno: values.apellidoPaterno,
        apellidoMaterno: values.apellidoMaterno,
        fechaNacimiento: values.fechaNacimiento,
        telefono: values.telefono,
        email: values.email,
        codigoPostal: values.codigoPostal,
        municipio: selectedMun,
        localidad: selectedLoc,
        colonia: values.colonia,
        calle: values.calle,
        caracteristica: values.caracteristica,
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success(
          "El ciudadano fue agregado correctamente",
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
      curp: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      fechaNacimiento: "",
      telefono: "",
      email: "",
      codigoPostal: "",
      municipio: "",
      localidad: "",
      colonia: "",
      calle: "",
      caracteristica: "",
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
<form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="formularioModCiudadano"
      >
        <div className="groupInput">
          <label htmlFor="curp">CURP</label>
          <input
            value={values.curp}
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
                <div className="groupInput2">
                  <label htmlFor="vacio1"></label>
                </div>
                <div className="groupInput2">
                  <label htmlFor="vacio2"></label>
                </div>

                <div className="groupInput">
                  <label htmlFor="nombre">NOMBRE(S)</label>
                  <input
                    value={values.nombre}
                    onChange={handleChange}
                    id="nombre"
                    type="text"
                    placeholder="Ingresa nombre(s)"
                    onBlur={handleBlur}
                    className={
                      errors.nombre && touched.nombre ? "input-error" : ""
                    }
                  />
                  {errors.nombre && touched.nombre && (
                    <p className="error">{errors.nombre}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="apellidoPaterno">APELLIDO PATERNO</label>
                  <input
                    value={values.apellidoPaterno}
                    onChange={handleChange}
                    id="apellidoPaterno"
                    type="text"
                    placeholder="Ingresa Apellido Paterno"
                    onBlur={handleBlur}
                    className={
                      errors.apellidoPaterno && touched.apellidoPaterno
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.apellidoPaterno && touched.apellidoPaterno && (
                    <p className="error">{errors.apellidoPaterno}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="apellidoMaterno">APELLIDO MATERNO</label>
                  <input
                    value={values.apellidoMaterno}
                    onChange={handleChange}
                    id="apellidoMaterno"
                    type="text"
                    placeholder="Ingresa Apellido Materno"
                    onBlur={handleBlur}
                    className={
                      errors.apellidoMaterno && touched.apellidoMaterno
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.apellidoMaterno && touched.apellidoMaterno && (
                    <p className="error">{errors.apellidoMaterno}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="fechaNacimiento">FECHA NACIMIENTO</label>
                  <input
                    value={values.fechaNacimiento}
                    onChange={handleChange}
                    id="fechaNacimiento"
                    type="date"
                    placeholder="Ingresa Fecha Nacimiento"
                    onBlur={handleBlur}
                    className={
                      errors.fechaNacimiento && touched.fechaNacimiento
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.fechaNacimiento && touched.fechaNacimiento && (
                    <p className="error">{errors.fechaNacimiento}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="telefono">TELEFONO</label>
                  <input
                    value={values.telefono}
                    onChange={handleChange}
                    id="telefono"
                    type="number"
                    placeholder="Ingresa no. telefono"
                    onBlur={handleBlur}
                    className={
                      errors.telefono && touched.telefono ? "input-error" : ""
                    }
                  />
                  {errors.telefono && touched.telefono && (
                    <p className="error">{errors.telefono}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="email">CORREO ELECTRONICO</label>
                  <input
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="Ingresa correo"
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "input-error" : ""
                    }
                  />
                  {errors.email && touched.email && (
                    <p className="error">{errors.email}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="codigoPostal">CODIGO POSTAL</label>
                  <input
                    value={values.codigoPostal}
                    onChange={handleChange}
                    id="codigoPostal"
                    type="number"
                    placeholder="Ingresa código postal"
                    onBlur={handleBlur}
                    className={
                      errors.codigoPostal && touched.codigoPostal
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.codigoPostal && touched.codigoPostal && (
                    <p className="error">{errors.codigoPostal}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="municipio">MUNICIPIO</label>
                  <div className="selectDoble">
                    <Select
                      onBlur={handleBlur}
                      onChange={onDropdownChangeMun}
                      styles={customStyles}
                      options={municipios.map((mun) => ({
                        label: mun.nombre,
                        value: mun.nombre,
                      }))}
                    ></Select>
                  </div>
                  {errors.municipio && touched.municipio && (
                    <p className="error">{errors.municipio}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="localidad">LOCALIDAD</label>
                  
                  <div className="selectDoble">
                  <Select
                      onBlur={handleBlur}
                      onChange={onDropdownChangeLoc}
                      styles={customStyles}
                      options={loc.map((mun) => ({
                        label: mun.nombre,
                        value: mun.nombre,
                      }))}
                    ></Select>
                </div>
                  {errors.localidad && touched.localidad && (
                    <p className="error">{errors.localidad}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="colonia">COLONIA</label>
                  <input
                    value={values.colonia}
                    onChange={handleChange}
                    id="colonia"
                    type="text"
                    placeholder="Ingresa colonia"
                    onBlur={handleBlur}
                    className={
                      errors.colonia && touched.colonia ? "input-error" : ""
                    }
                  />
                  {errors.colonia && touched.colonia && (
                    <p className="error">{errors.colonia}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="calle">CALLE</label>
                  <input
                    value={values.calle}
                    onChange={handleChange}
                    id="calle"
                    type="text"
                    placeholder="Ingresa calle"
                    onBlur={handleBlur}
                    className={
                      errors.calle && touched.calle ? "input-error" : ""
                    }
                  />
                  {errors.calle && touched.calle && (
                    <p className="error">{errors.calle}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="caracteristica">CARACTERISTICA</label>
                  <input
                    value={values.caracteristica}
                    onChange={handleChange}
                    id="caracteristica"
                    type="text"
                    placeholder="Ingresa caracteristica"
                    onBlur={handleBlur}
                    className={
                      errors.caracteristica && touched.caracteristica
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.caracteristica && touched.caracteristica && (
                    <p className="error">{errors.caracteristica}</p>
                  )}
                </div>

                <div className="btnB">
                  <button
                    onClick={createPost}
                    disabled={isSubmitting}
                    className="btn"
                    type="submit"
                  >
                    Agregar ciudadano
                  </button>
                  <NotificationContainer />
                  <button className="btn" onClick={() => abrirCerrarModal()}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
  );

  return (
    <div className="buscar">
      <div className="CBuscar">
        <BasicTable />
        <div className="btnbuscar">
          <button className="btn" onClick={() => abrirCerrarModal()}>
            Agregar ciudadano
          </button>
          <Modal open={modal} onClose={abrirCerrarModal}>
            {body}
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Buscar;
