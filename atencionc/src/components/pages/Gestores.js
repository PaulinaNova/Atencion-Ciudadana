import React, {useState} from 'react'
import FormInput from '../../elementos/FormInput';
import "./Gestores.css"
import axios from 'axios'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Gestores = () =>{
  const [values,setValues]= useState({
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
    isAdmin: false 
  });

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

 
  const inputs = [
    {
      className:"inpG",
      id:1,
      name:"rfc",
      type:"text",
      placeholder:"PELJ850625",
      label:"RFC",    
    },
    {
      className:"inpG",
      id:2,
      name:"curp",
      type:"text",
      placeholder:"PELJ850625HNTVRL05",
      label:"CURP",    
    },
    {
      className:"inpG",
      id:3,
      name:"dependencia",
      type:"text",
      placeholder:"SEP",
      label:"DEPENDENCIA",      
    },
    {
      className:"inpG",
      id:4,
      name:"nombre",
      type:"text",
      placeholder:"Juan Armando",
      label:"NOMBRE(S)",   
    },

    {
      className:"inpG",
      id:5,
      name:"ape_paterno",
      type:"text",
      placeholder:"Pérez",
      label:"APELLIDO PATERNO",      
    },

    {
      className:"inpG",
      id:6,
      name:"ape_materno",
      type:"text",
      placeholder:"López",
      label:"APELLIDO MATERNO",      
    },

    {
      className:"inpG",
      id:7,
      name:"telefono",
      type:"number",
      placeholder:"3117464442",
      label:"TELÉFONO",      
    },

    {
      className:"inpG",
      id:8,
      name:"municipio",
      type:"text",
      placeholder:"Tepic",
      label:"MUNICIPIO",      
    },

    {
      className:"inpG",
      id:9,
      name:"localidad",
      type:"text",
      placeholder:"Tepic",
      label:"LOCALIDAD",     
    },

    {
      className:"inpG",
      id:10,
      name:"codigo_Postal",
      type:"number",
      placeholder:"63175",
      label:"CÓDIGO POSTAL",      
    },

    {
      className:"inpG",
      id:11,
      name:"colonia",
      type:"text",
      placeholder:"Valle Alto",
      label:"COLONIA",      
    },
    {
      className:"inpG",
      id:12,
      name:"calle",
      type:"text",
      placeholder:"Lucio Cabañas #107",
      label:"CALLE Y NÚMERO",     
    },

    {
      className:"inpG",
      id:13,
      name:"email",
      type:"email",
      placeholder:"juanperez@hotmail.com",
      label:"CORREO ELECTRÓNICO",     
    },

    {
      className:"inpG",
      id:14,
      name:"userName",
      type:"text",
      placeholder:"juanperez",
      label:"NOMBRE DE USUARIO",     
    },
    {
      className:"inpG",
      id:15,
      name:"password",
      type:"password",
      placeholder:"******",
      label:"CONTRASEÑA",     
    },
  ];

  const handleSubmit = (e)=>{
    e.preventDefault();
  };

  const onChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value});
  };

  console.log(values);
  return (
    <div className='gestores'>
        <div className='CGestor'>
          <form onSubmit={handleSubmit}>
            <div className='wrapper'>
            {inputs.map((input) => (
              <FormInput key={input.id}
              {...input} 
              value={values[input.name]}
              onChange={onChange}
              />
            ))}
            </div>
            <div className='btnG'>
              <button className='btn' onClick={createPost} type='submit'>AGREGAR GESTOR</button> 
              <NotificationContainer/>
            </div>   
          </form>
        </div>
    </div>
  )
}


export default Gestores