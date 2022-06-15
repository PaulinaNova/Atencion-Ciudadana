import BasicTable from '../Table/BasicTable'
/*import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";*/
import {Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from 'react'
import FormInput from '../../elementos/FormInput';
import axios from 'axios'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

/*----------CREAR EL FONDO DE LA PANTALLA----------- */

const useStyles=makeStyles((theme)=>({
  modal:{
    position: 'absolute',
    width:1000,
    backgroundColor:'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textfield:{
    width: '100%'
  }
}))


function Buscar() {

const styles = useStyles();

/*----------CONSTANTES PARA ABRIL LA PANTALLA----------- */

const [modal, setModal]=useState(false);

const abrirCerrarModal =()=>{
  setModal(!modal);
}


/*----------DECLARAR LOS VALORES DE LOS CAMPOS----------- */
const [values,setValues]= useState({

  curp:"",
  vacio:"",
  nombre:"",
  ape_paterno:"",
  ape_materno:"",
  fecha_nacimiento:"",
  telefono:"",
  email:"",
  codigoPostal:"",
  municipio:"",
  localidad:"",
  colonia:"",
  calle:"",
  caracteristica:""
  });

    function createPost() {
    axios
      .post('/api/ciudadano/addCiudadano', {
            curp:values.curp,
            nombre:values.nombre,
            ape_paterno:values.ape_paterno,
            ape_materno:values.ape_materno,
            fecha_nacimiento:values.fecha_nacimiento,
            telefono:values.telefono,
            email:values.email,
            codigoPostal:values.codigoPostal,
            municipio:values.municipio,
            localidad:values.localidad,
            colonia:values.colonia,
            calle:values.calle,
            caracteristica:values.caracteristica
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success('El ciudadano fue agregado correctamente', 'Exito');
      });
  }

  const inputs = [

    {
      className:"inpG",
      id:1,
      name:"curp",
      type:"text",
      placeholder:"CURP",
      label:"CURP",    
    },
    {
      className:"inpG2",
      id:2,
      name:"vacio",
      type:"text",
      disabled:"true",  
    },
    {
      className:"inpG2",
      id:3,
      name:"vacio",
      type:"text", 
      disabled:"true",   
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
      name:"fecha_nacimiento",
      type:"date",
      placeholder:"FECHA DE NACIMIENTO",
      label:"FECHA DE NACIMIENTO",      
    },
    {
      className:"inpG",
      id:8,
      name:"telefono",
      type:"number",
      placeholder:"TELÉFONO",
      label:"TELÉFONO",      
    },
    {
      className:"inpG",
      id:14,
      name:"email",
      type:"email",
      placeholder:"CORREO ELECTRÓNICO",
      label:"CORREO ELECTRÓNICO",     
    },
    {
      className:"inpG",
      id:9,
      name:"codigoPostal",
      type:"number",
      placeholder:"CÓDIGO POSTAL",
      label:"CÓDIGO POSTAL",      
    },
    {
      className:"inpG",
      id:10,
      name:"municipio",
      type:"text",
      placeholder:"MUNICIPIO",
      label:"MUNICIPIO",      
    },
    
    {
      className:"inpG",
      id:11,
      name:"localidad",
      type:"text",
      placeholder:"LOCALIDAD",
      label:"LOCALIDAD",     
    },
    {
      className:"inpG",
      id:12,
      name:"colonia",
      type:"text",
      placeholder:"COLONIA",
      label:"COLONIA",      
    },
    {
      className:"inpG",
      id:13,
      name:"calle",
      type:"text",
      placeholder:"CALLE Y NUMERO",
      label:"CALLE Y NÚMERO",     
    },
    {
      className:"inpG",
      id:13,
      name:"caracteristica",
      type:"text",
      placeholder:"CARACTERISTICA",
      label:"CARACTERISTICA",     
    },
    ];
    
    /*-------------------------------------------------- */

    const handleSubmit = (e)=>{
    e.preventDefault();
    };
    
    const onChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value});
    };
    
    console.log(values);

    /*------------CREAR FORMULARIO INTERNO------------- */

      const body=(
        <div className={styles.modal}>
        <div>
    {/*-------------------------------------------------- */}

    <div className='gestores'>
    <div className='CBuscar'>
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
        

        <div className='btnB' >
        <button className='btn' onClick={()=>{createPost();}} type='submit'>AGREGAR CIUDADANO</button>
        <NotificationContainer/>
        <button className='btn' onClick={()=>abrirCerrarModal()}>CANCELAR</button>
          
          
      </div>     
      </form>
      </div>
</div>
  </div>
  </div>
)


  return (
    <div className='buscar'>
       <BasicTable/>
       <div className='btnbuscar'>
       <div >   
       <button className='btn' onClick={()=>abrirCerrarModal()}>Agregar ciudadano</button>
      
       <Modal
        open={modal}
        onClose={abrirCerrarModal}>
          {body}
      </Modal> 
      
      </div>
         </div>
    </div>
  );
}
export default Buscar