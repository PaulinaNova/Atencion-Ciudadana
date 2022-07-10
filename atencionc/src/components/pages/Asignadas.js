import React from "react";
import TblAsignadas from "../TableAsignadas/TblAsignadas";

export const Asignadas = (props) =>{
  const {gestor} = props;
  return (
    <div className="asignadas">
        <div className="asignadasH">
          <h3>Gestiones Asignadas</h3>
          <TblAsignadas cadena={"ASIGNADAS"} gestor={gestor}/>
        </div>
    </div>
  );
}

export default Asignadas;
