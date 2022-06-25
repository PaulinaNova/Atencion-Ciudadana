import React, {useMemo, useState, useEffect} from 'react'
import {useTable, useGlobalFilter} from 'react-table'
import {COLUMNS} from './Columns'
import './Table.css'
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { GlobalFilter } from './GlobalFilter'
import {Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FormInput from '../../elementos/FormInput';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useFormik} from 'formik';



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

  const onSubmit =async (values,actions) => {
  console.log(values);
  console.log(actions);
  //METER LO DE LA BD
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};


const BasicTable=()=>{
    const navigate = useNavigate()
    const styles = useStyles();
    const columns = useMemo(() => COLUMNS, [])
    const [ciudadano, setCiudadano] = useState([])
    const data = ciudadano
    
    const getData = async() => {
        const res = await axios.get('/api/ciudadano')
        setCiudadano(res.data)
    }
    useEffect(() => {
      getData()
    }, [])


    /*----------DECLARAR LOS VALORES DE LOS CAMPOS----------- */
    const {setValues,values,errors,touched,isSubmitting,handleBlur,handleChange, handleSubmit,} = useFormik({
      initialValues:{
  curp:"",
  vacio:"",
  nombre:"",
  ape_paterno:"",
  ape_materno:"",
  fecha_nacimiento:"",
  telefono:"",
  correo:"",
  codigo_Postal:"",
  municipio:"",
  localidad:"",
  colonia:"",
  calle:"",
  caracteristica:""
},
//validationSchema:basicSchema,
onSubmit,
});

console.log(errors);

/*----------CONSTANTES PARA ABRIL LA PANTALLA----------- */

const [modal, setModal]=useState(false);

const abrirCerrarModal =()=>{
  
  setModal(!modal);
}

    console.log(values);


    /*------------CREAR FORMULARIO INTERNO------------- */
    const body=(
        <div className={styles.modal}>
        <div>
    {/*-------------------------------------------------- */}

    <div className='gestores'>
    <div className='CBuscar'>
        <div className='wrapper'>
        
          <form onSubmit={handleSubmit} autoComplete='off' className="formulario">

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
  <div className="groupInput2">
    <label htmlFor='vacio1'></label>
  </div>
  <div className="groupInput2">
    <label htmlFor='vacio2'></label>
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
    <label htmlFor='fecha_nacimiento'>FECHA NACIMIENTO</label>
      <input
        value={values.fecha_nacimiento}
        onChange={handleChange}
        id="fecha_nacimiento" 
        type="date" 
        placeholder='Ingresa Fecha Nacimiento'
        onBlur={handleBlur}
        className={errors.fecha_nacimiento && touched.fecha_nacimiento ? "input-error" : ""}
      />  
    {errors.fecha_nacimiento && touched.fecha_nacimiento && <p className="error">{errors.fecha_nacimiento}</p> }
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
    <label htmlFor='caracteristica'>CARACTERISTICA</label>
      <input
        value={values.caracteristica}
        onChange={handleChange}
        id="caracteristica" 
        type="text" 
        placeholder='Ingresa caracteristica'
        onBlur={handleBlur}
        className={errors.caracteristica && touched.caracteristica ? "input-error" : ""}
        />  
      {errors.caracteristica && touched.caracteristica && <p className="error">{errors.caracteristica}</p> }
  </div>

          <div className='btnB' >
          <button disabled={isSubmitting} className='btn' type='submit'>AGREGAR CIUDADANO</button>
          <NotificationContainer/>
          <button className='btn' onClick={()=>abrirCerrarModal()}>CANCELAR</button>  
          </div> 

          </form>

        </div> 
      </div>
</div>
  </div>
  </div>
)
    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } =  useTable({
      columns,
      data
    }, useGlobalFilter)

  const {globalFilter} = state
  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    
    <table className='tbl' {...getTableProps()}>
         <thead>
             {headerGroups.map((headerGroup)=> (
                <tr {...headerGroup.getHeaderGroupProps}>  
                    {headerGroup.headers.map((column) => ( 
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th> 
                    ))}  
                    <th>Acciones</th>       
                </tr>
             ))}
         </thead>
         <tbody {...getTableBodyProps()}> 
         {rows.map((row) => {
                prepareRow(row)
                return ( 
                <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>      
                        })}     
                        <td>
                            <button className='btntbl' title='Modificar Ciudadano' onClick={()=>abrirCerrarModal()}><AiIcons.AiOutlineSetting/></button>
                            <button className='btntbl' title='Historial'><AiIcons.AiOutlineHistory /></button>
                            <button className='btntbl' onClick={()=>navigate("/gestions")}><IoIcons.IoIosAddCircleOutline /></button>
                            <Modal open={modal} onClose={abrirCerrarModal}>
                              {body}
                            </Modal>
                        </td>      
                    </tr>
                )     
            })}

         </tbody>
    </table>
    </>
  )
}

export default BasicTable