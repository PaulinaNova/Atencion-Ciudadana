import React, {useState, useEffect} from 'react'
import { slide as Menu } from 'react-burger-menu';
import axios from 'axios'
import {Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useFormik} from 'formik';
import '../pages/Seguimiento.css'

const useStyles=makeStyles((theme)=>({
  modal:{
    position: 'absolute',
    width:460,
    backgroundColor:'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: "16px 52px 24px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textfield:{
    width: '50%'
  }
}))

const onSubmit =async (values,actions) => {
  console.log(values);
  console.log(actions);
  //METER LO DE LA BD
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export const SlideSeguimiento=(props) =>{


  function createPost() {
    axios
      .post('/api/seguimiento/addSeguimiento', {
            fecha_seguimiento:values.fecha_seguimiento,
            descripcion_seguimiento:values.descripcion_seguimiento,
            estado:values.estado
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success('El seguimiento fue agregado correctamente', 'Exito');
        
      });
      
  }

  const {setValues,values,errors,touched,isSubmitting,handleBlur,handleChange, handleSubmit,} = useFormik({
    initialValues:{
      fecha_seguimiento:"",
      descripcion_seguimiento:"",
      estado:"",
    },
    onSubmit,
  });

  console.log(errors);

const styles = useStyles();

/*----------CREAR FORMULARIO----------- */

const [modal, setModal]=useState(false);

const abrirCerrarModal =()=>{
  
  setModal(!modal);
}
 
const body=(
  <div className={styles.modal}>
    
    <div className='gestores'>
      <div className='CBuscar'>
        <div className='wrapper2'>
        
          <form onSubmit={handleSubmit} autoComplete='off' className="formulario2">

            <div className="inputSeguimiento">
              <label className="lblSeg" htmlFor='fecha_seguimiento'>FECHA</label>
                <input
                  value={values.fecha_seguimiento}
                  onChange={handleChange}
                  id="fecha_seguimiento" 
                  type="date" 
                  placeholder='Ingresa Fecha de Seguimiento'
                  onBlur={handleBlur}
                  className={errors.fecha_seguimiento && touched.fecha_seguimiento ? "input-error" : ""}
              />  
              {errors.fecha_seguimiento && touched.fecha_seguimiento && <p className="error">{errors.fecha_seguimiento}</p> }
            </div>

            <div className="inputSeguimiento">
              <label className="lblSeg" htmlFor='descripcion_seguimiento'>DESCRIPCIÓN</label>
                <input
                  value={values.descripcion_seguimiento}
                  onChange={handleChange}
                  id="descripcion_seguimiento" 
                  type="text" 
                  placeholder='Ingresa Descripción'
                  onBlur={handleBlur}
                  className={errors.descripcion_seguimiento && touched.descripcion_seguimiento ? "input-error" : ""}
                />  
                {errors.descripcion_seguimiento && touched.descripcion_seguimiento && <p className="error">{errors.descripcion_seguimiento}</p> }
            </div>

            <div className="inputSeguimiento">
              <label className="lblSeg" htmlFor='estado'>ESTADO</label>
              
                <input
                  value={values.estado}
                  onChange={handleChange}
                  id="estado" 
                  type="text" 
                  placeholder='Ingresa Estado'
                  onBlur={handleBlur}
                  className={errors.estado && touched.estado ? "input-error" : ""}
                />  
              {errors.estado && touched.estado && <p className="error">{errors.estado}</p> }
            </div>

            <div className='btnB' >
                  <button onClick={createPost} disabled={isSubmitting} className='btn' type='submit'>AGREGAR SEGUIMIENTO</button>
                  <NotificationContainer/> 
            </div> 
          </form>
        </div>
      </div>
    </div>
  </div>
)

{/*-------------------------------------------------- */}


  const {abierto, tipo, estado, prioridad, registra, folio} = props
  const [seguimientos, setSeguimiento] = useState([])
  console.log(folio)
  const getData = async() => {
    const res = await axios.get('/api/seguimiento',{params:{folio:1}})
    setSeguimiento(res.data)
  }
  useEffect(() => {
      getData()
  }, [])


  

  return (
    <Menu right customBurgerIcon={false} isOpen={abierto}>
      <p className="menu-item">Tipo: {tipo} </p>
      <p className="menu-item">Estado: {estado}</p>
      <p className="menu-item">Prioridad: {prioridad}</p>
      <p className="menu-item">Registra: {registra}</p>
      <p className="menu-item">Gestor: {folio}</p>
      <table className='tseguimiento'>
       <thead>
        <tr>  
          <th>Fecha</th>
          <th>Seguimiento</th>
        </tr>
       </thead> 
       <tbody>
        {seguimientos.map(u => <tr key={u._id}><td>{u.fecha_seguimiento}</td><td>{u.descripcion_seguimiento}</td></tr>)}
       </tbody>
      </table>
      <button className='btn' onClick={()=>abrirCerrarModal()}>Agregar Seguimiento</button>
      <Modal
            open={modal}
            onClose={abrirCerrarModal}>
              {body}
          </Modal> 
    </Menu>
  );
}
export default SlideSeguimiento