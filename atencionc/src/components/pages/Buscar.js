import React from 'react'
import BasicTable from '../Table/BasicTable'
/*import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";*/



function Buscar() {
  return (
    <div className='buscar'>
       <BasicTable/>
       <div className='btnbuscar'>      
        <button className='btn'>Agregar ciudadano</button>
       </div>
    </div>
  )
}

export default Buscar