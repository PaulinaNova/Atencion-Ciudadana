import React, { } from 'react'
import FormInput from '../../elementos/FormInput';
import "./Gestores.css"
import {useState} from "react";

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
    colonia:"",
    calle:""
  });
 
  const inputs = [
    
    {
      className:"inpG",
      id:1,
      name:"rfc",
      type:"text",
      placeholder:"RFC",
      label:"RFC",    
    },
    {
      className:"inpG",
      id:2,
      name:"curp",
      type:"text",
      placeholder:"CURP",
      label:"CURP",    
    },
    {
      className:"inpG",
      id:3,
      name:"dependencia",
      type:"text",
      placeholder:"DEPENDENCIA",
      label:"DEPENDENCIA",      
    },
    {
      className:"inpG",
      id:4,
      name:"nombre",
      type:"text",
      placeholder:"NOMBRE(S)",
      label:"NOMBRE(S)",   
    },

    {
      className:"inpG",
      id:5,
      name:"ape_paterno",
      type:"text",
      placeholder:"APELLIDO PATERNO",
      label:"APELLIDO PATERNO",      
    },

    {
      className:"inpG",
      id:6,
      name:"ape_materno",
      type:"text",
      placeholder:"APELLIDO MATERNO",
      label:"APELLIDO MATERNO",      
    },

    {
      className:"inpG",
      id:7,
      name:"telefono",
      type:"number",
      placeholder:"TELÉFONO",
      label:"TELÉFONO",      
    },

    {
      className:"inpG",
      id:8,
      name:"municipio",
      type:"text",
      placeholder:"MUNICIPIO",
      label:"MUNICIPIO",      
    },

    {
      className:"inpG",
      id:9,
      name:"localidad",
      type:"text",
      placeholder:"LOCALIDAD",
      label:"LOCALIDAD",     
    },
    {
      className:"inpG",
      id:10,
      name:"colonia",
      type:"text",
      placeholder:"COLONIA",
      label:"COLONIA",      
    },
    {
      className:"inpG",
      id:11,
      name:"calle",
      type:"text",
      placeholder:"CALLE Y NUMERO",
      label:"CALLE Y NÚMERO",     
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