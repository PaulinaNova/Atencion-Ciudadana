import React, { } from 'react'
import FormInput from '../../elementos/FormInput';
import "./Gestores.css"
import {useState} from "react";

const Gestores = () =>{
  
  const [values,setValues]= useState({

    nombre:"",
    ape_paterno:"",
    ape_materno:"",
    rfc:"",
    fecha_naci:"",
    telefono:"",
    calle:"",
    colonia:"",
    caracteristica_g:"",
    localidad:"",
    municipio:"",
    dependencia:""
  });
 
  const inputs = [
    
    {
      className:"inpG",
      id:1,
      name:"nombre",
      type:"text",
      placeholder:"NOMBRE(S)",
      label:"NOMBRE(S)",   
    },

    {
      className:"inpG",
      id:2,
      name:"ape_paterno",
      type:"text",
      placeholder:"APELLIDO PATERNO",
      label:"APELLIDO PATERNO",      
    },

    {
      className:"inpG",
      id:3,
      name:"ape_materno",
      type:"text",
      placeholder:"APELLIDO MATERNO",
      label:"APELLIDO MATERNO",      
    },

    {
      className:"inpG",
      id:4,
      name:"rfc",
      type:"text",
      placeholder:"RFC",
      label:"RFC",    
    },

    {
      className:"inpG",
      id:5,
      name:"fecha_naci",
      type:"date",
      placeholder:"FECHA NACIMIENTO",
      label:"FECHA NACIMIENTO",      
    },

    {
      className:"inpG",
      id:6,
      name:"telefono",
      type:"number",
      placeholder:"TELÉFONO",
      label:"TELÉFONO",      
    },

    {
      className:"inpG",
      id:7,
      name:"calle",
      type:"text",
      placeholder:"CALLE Y NUMERO",
      label:"CALLE Y NÚMERO",     
    },

    {
      className:"inpG",
      id:8,
      name:"colonia",
      type:"text",
      placeholder:"COLONIA",
      label:"COLONIA",      
    },

    {
      className:"inpG",
      id:9,
      name:"caracteristica_g",
      type:"text",
      placeholder:"CARACTERÍSTICA",
      label:"CARACTERÍSTICA",      
    },

    {
      className:"inpG",
      id:10,
      name:"localidad",
      type:"text",
      placeholder:"LOCALIDAD",
      label:"LOCALIDAD",     
    },

    {
      className:"inpG",
      id:11,
      name:"municipio",
      type:"text",
      placeholder:"MUNICIPIO",
      label:"MUNICIPIO",      
    },

    {
      className:"inpG",
      id:12,
      name:"dependencia",
      type:"text",
      placeholder:"DEPENDENCIA",
      label:"DEPENDENCIA",      
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
              <FormInput 
              key={input.id}
              {...input} 
              value={values[input.name]}
              onChange={onChange}
              />
            ))}
            </div>

            <div className='btnG'>
              <button className='btn'>AGREGAR GESTOR</button>
          
          </div>     
          </form>
          </div>
    </div>
  )
}


export default Gestores