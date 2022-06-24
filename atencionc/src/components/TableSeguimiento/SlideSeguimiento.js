import React, {useState, useEffect} from 'react'
import { slide as Menu } from 'react-burger-menu';
import axios from 'axios'

export const SlideSeguimiento=(props) =>{
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
      <button className='btn'>Agregar seguimiento</button>
    </Menu>
  );
}
export default SlideSeguimiento