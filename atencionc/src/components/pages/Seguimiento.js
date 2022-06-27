import React from "react";
import TableSeguimiento from "../TableSeguimiento/TableSeguimiento";
import "../TableSeguimiento/TableSeguimiento.css";

function Seguimiento() {
  return (
    <div>
      <div className="seguimientos">
        <div className="tblsegui">
          <TableSeguimiento />
        </div>
      </div>
    </div>
  );
}

export default Seguimiento;
