import React from 'react';
import { stack as Menu } from 'react-burger-menu';

export const SlideSeguimiento=(props) =>{
  const {abierto} = props
  return (
    <Menu right customBurgerIcon={false} isOpen={abierto}>
      <p className="menu-item">Tipo</p>
      <p className="menu-item">Estado</p>
      <p className="menu-item">Prioridad</p>
      <p className="menu-item">Registra</p>
      <p className="menu-item">Gestor</p>

      <table className='tseguimiento'>
       <thead>
        <tr>  
          <th>Fecha</th>
          <th>Seguimiento</th>
        </tr>
       </thead> 
       <tbody>
        <tr>
          <td>22/02/2022</td>
          <td>Se aceptaron documentos</td>
        </tr>
        <tr>
          <td>14/05/2021</td>
          <td>Se asignó presupuesto</td>
        </tr>
        <tr>
          <td>25/04/2022</td>
          <td>Se aprobó solicitud</td>
        </tr>
       </tbody>
      </table>
      <button className='btn'>Agregar seguimiento</button>
    </Menu>
  );
}
export default SlideSeguimiento