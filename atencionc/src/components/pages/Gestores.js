import React from 'react'
//import FormInput from '../../elementos/FormInput';
import "./Gestores.css"
import axios from 'axios'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useFormik} from 'formik';
import {basicSchema} from "../schemas/index.js";


const onSubmit =async (values,actions) => {
  //METER LO DE LA BD
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const Gestores=()=>{

  function createPost() {
    axios
      .post('/api/gestor/addGestor', {
            rfc:values.rfc,
            dependencia:values.dependencia,
            curp:values.curp,
            nombre:values.nombre,
            ape_paterno:values.ape_paterno,
            ape_materno:values.ape_materno,
            telefono:values.telefono,
            municipio:values.municipio,
            localidad:values.localidad,
            codigo_Postal:values.codigo_Postal,
            colonia:values.colonia,
            calle:values.calle,
            email:values.email,
            userName:values.userName,
            password:values.password,
            isAdmin: false
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success('El gestor fue agregado correctamente', 'Exito');
      });
  }

  const {setValues,values,errors,touched,isSubmitting,handleBlur,handleChange, handleSubmit,} = useFormik({
    initialValues:{
      rfc:"",
      dependencia:"",
      curp:"",
      nombre:"",
      ape_paterno:"",
      ape_materno:"",
      telefono:"",
      municipio:"",
      localidad:"",
      codigo_Postal:"",
      colonia:"",
      calle:"",
      email:"",
      userName:"",
      password:"",
    },
    validationSchema:basicSchema,
    onSubmit,
  });

  console.log(errors);

  return (
    <div className='gestores'>
        <div className='CGestor'>
          
            <div className='wrapper'>
 {/*-------------------------------------------------------------------- */}          
 <form onSubmit={handleSubmit} autoComplete='off' className="formulario">

  <div className="groupInput">
    <label htmlFor='rfc'>RFC</label>
      <input
      value={values.rfc}
      onChange={handleChange}
      id="rfc" 
      type="text" 
      placeholder='Ingresa rfc'
      onBlur={handleBlur}
      className={errors.rfc && touched.rfc ? "input-error" : ""}
    />  
      {errors.rfc && touched.rfc && <p className="error">{errors.rfc}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='dependencia'>DEPENDENCIA</label>
      <input
        value={values.dependencia}
        onChange={handleChange}
        id="dependencia" 
        type="text" 
        placeholder='Ingresa dependencia'
        onBlur={handleBlur}
        className={errors.dependencia && touched.dependencia ? "input-error" : ""}
      />  
    {errors.dependencia && touched.dependencia && <p className="error">{errors.dependencia}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='curp'>CURP</label>
      <input
        value={values.curp}
        onChange={handleChange}
        id="curp" 
        type="text" 
        placeholder='Ingresa curp'
        onBlur={handleBlur}
        className={errors.curp && touched.curp ? "input-error" : ""}
      />  
    {errors.curp && touched.curp && <p className="error">{errors.curp}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='nombre'>NOMBRE(S)</label>
      <input
        value={values.nombre}
        onChange={handleChange}
        id="nombre" 
        type="text" 
        placeholder='Ingresa nombre(s)'
        onBlur={handleBlur}
        className={errors.nombre && touched.nombre ? "input-error" : ""}
      />  
    {errors.nombre && touched.nombre && <p className="error">{errors.nombre}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='ape_paterno'>APELLIDO PATERNO</label>
      <input
        value={values.ape_paterno}
        onChange={handleChange}
        id="ape_paterno" 
        type="text" 
        placeholder='Ingresa Apellido Paterno'
        onBlur={handleBlur}
        className={errors.ape_paterno && touched.ape_paterno ? "input-error" : ""}
      />  
    {errors.ape_paterno && touched.ape_paterno && <p className="error">{errors.ape_paterno}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='ape_materno'>APELLIDO MATERNO</label>
      <input
        value={values.ape_materno}
        onChange={handleChange}
        id="ape_materno" 
        type="text" 
        placeholder='Ingresa Apellido Materno'
        onBlur={handleBlur}
        className={errors.ape_materno && touched.ape_materno ? "input-error" : ""}
      />  
    {errors.ape_materno && touched.ape_materno && <p className="error">{errors.ape_materno}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='telefono'>TELEFONO</label>
      <input
        value={values.telefono}
        onChange={handleChange}
        id="telefono" 
        type="number" 
        placeholder='Ingresa no. telefono'
        onBlur={handleBlur}
        className={errors.telefono && touched.telefono ? "input-error" : ""}
      />  
    {errors.telefono && touched.telefono && <p className="error">{errors.telefono}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='municipio'>MUNICIPIO</label>
      <input
        value={values.municipio}
        onChange={handleChange}
        id="municipio" 
        type="text" 
        placeholder='Ingresa municipio'
        onBlur={handleBlur}
        className={errors.municipio && touched.municipio ? "input-error" : ""}
      />  
    {errors.municipio && touched.municipio && <p className="error">{errors.municipio}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='localidad'>LOCALIDAD</label>
      <input
        value={values.localidad}
        onChange={handleChange}
        id="localidad" 
        type="text" 
        placeholder='Ingresa localidad'
        onBlur={handleBlur}
        className={errors.localidad && touched.localidad ? "input-error" : ""}
      />  
    {errors.localidad && touched.localidad && <p className="error">{errors.localidad}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='codigo_Postal'>CODIGO POSTAL</label>
      <input
        value={values.codigo_Postal}
        onChange={handleChange}
        id="codigo_Postal" 
        type="number" 
        placeholder='Ingresa código postal'
        onBlur={handleBlur}
        className={errors.codigo_Postal && touched.codigo_Postal ? "input-error" : ""}
      />  
    {errors.codigo_Postal && touched.codigo_Postal && <p className="error">{errors.codigo_Postal}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='colonia'>COLONIA</label>
      <input
        value={values.colonia}
        onChange={handleChange}
        id="colonia" 
        type="text" 
        placeholder='Ingresa colonia'
        onBlur={handleBlur}
        className={errors.colonia && touched.colonia ? "input-error" : ""}
      />  
    {errors.colonia && touched.colonia && <p className="error">{errors.colonia}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='calle'>CALLE</label>
      <input
        value={values.calle}
        onChange={handleChange}
        id="calle" 
        type="text" 
        placeholder='Ingresa calle'
        onBlur={handleBlur}
        className={errors.calle && touched.calle ? "input-error" : ""}
      />  
    {errors.calle && touched.calle && <p className="error">{errors.calle}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='email'>CORREO ELECTRONICO</label>
      <input
        value={values.email}
        onChange={handleChange}
        id="email" 
        type="email" 
        placeholder='Ingresa correo'
        onBlur={handleBlur}
        className={errors.email && touched.email ? "input-error" : ""}
      />
    {errors.email && touched.email && <p className="error">{errors.email}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='userName'>USUARIO</label>
      <input
        value={values.userName}
        onChange={handleChange}
        id="userName" 
        type="text" 
        placeholder='Ingresa Usuario'
        onBlur={handleBlur}
        className={errors.userName && touched.userName ? "input-error" : ""}
      />  
    {errors.userName && touched.userName && <p className="error">{errors.userName}</p> }
  </div>

  <div className="groupInput">
    <label htmlFor='password'>CONTRASEÑA</label>
      <input
        value={values.password}
        onChange={handleChange}
        id="password" 
        type="password" 
        placeholder='Ingresa contraseña'
        onBlur={handleBlur}
        className={errors.password && touched.password ? "input-error" : ""}
        />  
      {errors.password && touched.password && <p className="error">{errors.password}</p> }
  </div>

    <div className='btnG'>
              <button onClick={createPost} disabled={isSubmitting} className='btn' type='submit' >AGREGAR GESTOR</button> 
              <NotificationContainer/>
            </div>
</form>
 {/*-------------------------------------------------------------------- */}
            </div>
            
        </div>
    </div>
  )
}


export default Gestores