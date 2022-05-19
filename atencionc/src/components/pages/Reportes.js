import React from 'react'
import TblPendientes from '../TablePendientes/TblPendientes'
import './Graficas.css'

function Reportes() {
  return (
    <div className='reportes'>
      <div className='filtros'>
        <input placeholder='Buscar' className='inp'/>
        <select id="framework" className='slc'>
            <option value="1">Procedencia</option>
            <option value="2">Prioridad</option>
            <option value="3">Tipo</option>
            <option value="4">Dependencia</option>
            <option value="5">Estado</option>
            <option value="6">Localidad</option>
            <option value="7">Municipio</option>
        </select>
        <input type="date" className='inp'/>
        <input type="date" className='inp'/>
      </div>
      <div className='chart-container'>
        <TblPendientes/>
      </div>
    </div>
  )
}

export default Reportes