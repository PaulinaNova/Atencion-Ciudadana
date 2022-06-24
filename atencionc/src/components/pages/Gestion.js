import React, { } from 'react'
import FormInput from '../../elementos/FormInput';
import "./Gestores.css"
import {useState} from "react";
import axios from 'axios'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Gestion = () =>{
  
  const [values,setValues]= useState({

    folio:"",
    nombre_ciudadano:"",
    curp:"",
    descripcion:"",
    fecha:"",
    procedencia:"",
    periodo:"",
    prioridad:"",
    tipo:"",
    dependencia:"",
    registra:"",
    vencimiento:"",
    periodico:"",
    folio_interno:"",
    cant_benef:"",
    evento:"", 
    estado:"",
    presupuesto:"",
    notas:"",

  });

  function createPost() {
    axios
      .post('/api/gestions/addGestion', {
          folio: values.folio,
          nombre_ciudadano: values.nombre_ciudadano,
          curp:values.curp,
          descripcion:values.descripcion,
          fecha:values.fecha,
          procedencia:values.procedencia,
          periodo:values.periodo,
          prioridad:values.prioridad,
          tipo:values.tipo,
          dependencia:values.dependencia,
          registra:values.registra,
          vencimiento:values.vencimiento,
          periodico:values.periodico,
          folio_interno:values.folio_interno,
          cant_benef:values.cant_benef,
          evento:values.evento, 
          estado:values.estado,
          presupuesto:values.presupuesto,
          notas:values.notas,
          seguimiento: {
            fecha_seguimiento:"",
            descripcion_seguimiento:"",
            gestor:""
          }
    
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success('La solicitud fue agregada correctamente', 'Exito');
      });
  }
 
  const inputs = [
    
    {
      className:"inpG",
      id:1,
      name:"folio",
      type:"text",
      label:"FOLIO",    
    },
    {
      className:"inpG",
      id:2,
      name:"nombre_ciudadano",
      type:"text",
      label:"NOMBRE DEL CIUDADANO",    
    },
    {
      className:"inpG",
      id:3,
      name:"curp",
      type:"text",
      label:"CURP",      
    },
    {
      className:"inpG",
      id:4,
      name:"descripcion",
      type:"text",
      label:"DESCRIPCIÓN",   
    },
    {
      className:"inpG",
      id:5,
      name:"fecha",
      type:"date",
      label:"FECHA",      
    },
    {
      className:"inpG",
      id:6,
      name:"procedencia",
      type:"text",
      label:"PROCEDENCIA",      
    },
    {
      className:"inpG",
      id:7,
      name:"periodo",
      type:"text",
      label:"PERIODO",      
    },

    {
      className:"inpG",
      id:8,
      name:"prioridad",
      type:"text",
      label:"PRIORIDAD",      
    },
    {
      className:"inpG",
      id:9,
      name:"tipo",
      type:"text",
      label:"TIPO",     
    },

    {
      className:"inpG",
      id:10,
      name:"dependencia",
      type:"text",
      label:"DEPENDENCIA",      
    },

    {
      className:"inpG",
      id:11,
      name:"registra",
      type:"text",
      label:"REGISTRA",      
    },
    {
      className:"inpG",
      id:12,
      name:"vencimiento",
      type:"date",
      label:"VENCIMIENTO",     
    },

    {
      className:"inpG",
      id:13,
      name:"periodico",
      type:"text",
      label:"PERIODICO",     
    },

    {
      className:"inpG",
      id:14,
      name:"folio_interno",
      type:"number",
      label:"FOLIO INTERNO",     
    },
    {
      className:"inpG",
      id:15,
      name:"cant_benef",
      type:"number",
      label:"PERSONAS BENEFICIADAS",     
    },
      {
        className:"inpG",
        id:16,
        name:"evento",
        type:"text",
        label:"EVENTO",     
      },
      {
        className:"inpG",
        id:17,
        name:"estado",
        type:"text",
        label:"ESTADO",     
      },
      {
        className:"inpG",
        id:18,
        name:"presupuesto",
        type:"number",
        label:"PRESUPUESTO",     
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
              <button className='btn' onClick={createPost} type='submit'>AGREGAR GESTION</button>
              <NotificationContainer/>
          </div>     
          </form>
          </div>
    </div>
  )
}


export default Gestion