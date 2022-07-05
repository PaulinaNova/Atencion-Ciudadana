import React from "react";
import TableReportes from "../TableReportes/TableReportes";
import "../TableSeguimiento/TableSeguimiento.css";

function Reportes() {
  return (
    <div className="reportes">
      <div className="filtrosReportes">
        <input placeholder="Buscar" className="inpPendientes" />
        <select id="framework" className="slcPendientes">
          <option value="1">Procedencia</option>
          <option value="2">Prioridad</option>
          <option value="3">Tipo</option>
          <option value="4">Dependencia</option>
          <option value="5">Estado</option>
        </select>
        <input type="date" className="inpPendientes" />
        <input type="date" className="inpPendientes" />
      </div>
      <div className="table-container">
        <TableReportes />
      </div>
    </div>
  );
}

export default Reportes;
