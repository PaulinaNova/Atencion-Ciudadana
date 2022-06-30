import React,{useState,useEffect} from "react";
import "./Gestores.css";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {NotificationContainer, NotificationManager} from "react-notifications";
import { useFormik } from "formik";
import Select from 'react-select';


const validate=(values)=>{
  let errores ={};

  //VALIDAR RFC
  if(!values.rfc){
    errores.rfc = "CAMPO VALIO"
  } else if(!/^([A-Z]{4})([0-9]{6})(([A-Z]|[0-9]){3})$/.test(values.rfc)){
    errores.rfc = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR DEPENDENCIA
  if(!values.dependencia){
    errores.dependencia = "CAMPO VACIO"
  } else if(!/^(([A-Z])|([0-9]))*$/.test(values.dependencia)){
    errores.dependencia = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR CURP
  if(!values.curp){
    errores.curp = "CAMPO VACIO"
  } else if(!/^([A-Z]{4})([0-9]{6})([A-Z]{6})([0-9]{2})$/.test(values.curp)){
    errores.curp = "INGRESA CORRECTAMENTE"

  }

  //VALIDAR NOMBRE
  if(!values.nombre){
    errores.nombre = "CAMPO VACIO"
  } else if(!/^([A-Z])*$/.test(values.nombre)){
    errores.nombre = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR APELLIDO PATERNO
  if(!values.apellidoPaterno){
    errores.apellidoPaterno = "CAMPO VACIO"
  } else if(!/^([A-Z])*$/.test(values.apellidoPaterno)){
    errores.apellidoPaterno = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR APELLIDO MATERNO
  if(!values.apellidoMaterno){
    errores.apellidoMaterno = "CAMPO VACIO"
  } else if(!/^([A-Z])*$/.test(values.apellidoMaterno)){
    errores.apellidoMaterno = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR TELEFONO
  if(!values.telefono){
    errores.telefono = "CAMPO VACIO"
  } else if(!/^([0-9]{10})$/.test(values.telefono)){
    errores.telefono = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR MUNICIPIO
  if(!values.municipio){
    errores.municipio = "CAMPO VACIO"
  } else if(!/^(([A-Z])|([0-9]))*$/.test(values.municipio)){
    errores.municipio = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR LOCALIDAD
  if(!values.localidad){
    errores.localidad = "CAMPO VACIO"
  } else if(!/^(([A-Z])|([0-9]))*$/.test(values.localidad)){
    errores.localidad = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR CODIGO POSTAL
  if(!values.codigoPostal){
    errores.codigoPostal = "CAMPO VACIO"
  }else if(!/^([0-9]{5})$/.test(values.codigoPostal)){
    errores.codigoPostal = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR COLONIA
  if(!values.colonia){
    errores.colonia = "CAMPO VACIO"
  }else if(!/^(([A-Z])|([0-9]))*$/.test(values.colonia)){
    errores.colonia = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR CALLE
  if(!values.calle){
    errores.calle = "CAMPO VACIO"
  } else if(!/^(([A-Z])|([0-9]))*$/.test(values.calle)){
    errores.calle = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR EMAIL
  if(!values.email){
    errores.email = "CAMPO VACIO"
  } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
    errores.email = "INGRESA CORRECTAMENTE"
  }

  //VALIDAR USUARIO
  if(!values.userName){
    errores.userName = "CAMPO VACIO"
  }

  //VALIDAR CONTRASEÑA
  if(!values.password){
    errores.password = "CAMPO VACIO"
  }

  return errores;
};

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  actions.resetForm();
};

const Gestores = () => {


  const getData = async () => {
    const res = await axios.get("/api/municipio");
    setMunicipio(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  function createPost() {
    axios
      .post("/api/gestor/addGestor", {
        rfc: values.rfc,
        dependencia: values.dependencia,
        curp: values.curp,
        nombre: values.nombre,
        apellidoPaterno: values.apellidoPaterno,
        apellidoMaterno: values.apellidoMaterno,
        telefono: values.telefono,
        municipio: values.municipio,
        localidad: values.localidad,
        codigoPostal: values.codigoPostal,
        colonia: values.colonia,
        calle: values.calle,
        email: values.email,
        userName: values.userName,
        password: values.password,
        isAdmin: false,
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success(
          "El gestor fue agregado correctamente",
          "Exito"
        );
      });
  }

  const [municipios, setMunicipio] = useState([]);

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
      rfc: "",
      dependencia: "",
      curp: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      telefono: "",
      municipio: "",
      localidad: "",
      codigoPostal: "",
      colonia: "",
      calle: "",
      email: "",
      userName: "",
      password: "",
    },
    validate,
    onSubmit,
  });
const onDropdownChange = ({value})=>{
    console.log(value);
  }
 return (
    <div className="gestores">
      <div className="CGestor">
        <div className="wrapper">
          {/*-------------------------------------------------------------------- */}
        <>  
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="formulario"
          >
            <div className="groupInput">
              <label htmlFor="rfc">RFC</label>
              <input
                value={values.rfc}
                onChange={handleChange}
                id="rfc"
                type="text"
                placeholder="Ingresa rfc"
                onBlur={handleBlur}
                className={errors.rfc && touched.rfc ? "input-error" : ""}
              />
              {touched.rfc && errors.rfc && <div className="error">{errors.rfc}</div>
              }
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

            <div className="groupInput">
              <label htmlFor="nombre">NOMBRE(S)</label>
              <input
                value={values.nombre}
                onChange={handleChange}
                id="nombre"
                type="text"
                placeholder="Ingresa nombre(s)"
                onBlur={handleBlur}
                className={errors.nombre && touched.nombre ? "input-error" : ""}
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
              <label htmlFor="municipio">MUNICIPIO</label>
              <div className="selectDoble"
              >
              <Select 
                onBlur={handleBlur}
                onChange={onDropdownChange}
                options={municipios.map(mun => ({label:mun.nombre, value:mun.nombre}))}
                >
              </Select>
              </div>
              {errors.municipio && touched.municipio && (
                <p className="error">{errors.municipio}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="localidad">LOCALIDAD</label>
              <input
                value={values.localidad}
                onChange={handleChange}
                id="localidad"
                type="text"
                placeholder="Ingresa localidad"
                onBlur={handleBlur}
                className={
                  errors.localidad && touched.localidad ? "input-error" : ""
                }
              />
              {errors.localidad && touched.localidad && (
                <p className="error">{errors.localidad}</p>
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
                className={errors.calle && touched.calle ? "input-error" : ""}
              />
              {errors.calle && touched.calle && (
                <p className="error">{errors.calle}</p>
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
                className={errors.email && touched.email ? "input-error" : ""}
              />
              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="userName">USUARIO</label>
              <input
                value={values.userName}
                onChange={handleChange}
                id="userName"
                type="text"
                placeholder="Ingresa Usuario"
                onBlur={handleBlur}
                className={
                  errors.userName && touched.userName ? "input-error" : ""
                }
              />
              {errors.userName && touched.userName && (
                <p className="error">{errors.userName}</p>
              )}
            </div>

            <div className="groupInput">
              <label htmlFor="password">CONTRASEÑA</label>
              <input
                value={values.password}
                onChange={handleChange}
                id="password"
                type="password"
                placeholder="Ingresa contraseña"
                onBlur={handleBlur}
                className={
                  errors.password && touched.password ? "input-error" : ""
                }
              />
              {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}
            </div>

            <div className="btnG">
              <button
                onClick={createPost}
                disabled={isSubmitting}
                className="btn"
                type="submit"
              >
                Agregar gestor
              </button>
              <NotificationContainer />
            </div>
          </form>
          </>
          {/*-------------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Gestores;
