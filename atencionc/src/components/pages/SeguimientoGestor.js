import React from "react";
import TableSeguimiento from "../TableSeguimiento/TableSeguimiento";
import "../TableSeguimiento/TableSeguimiento.css";

export const SeguimientoGestor = (props) =>{
  const { gestor } = props;
  return (
    <div>
      <div className="seguimientos">
        <div className="tblsegui">
          <TableSeguimiento gestor={gestor}/>
        </div>
      </div>
    </div>
  );
}

export default SeguimientoGestor;
