import React from "react";
import TableSeguimientoGestor from "../TableSeguimientoGestor/TableSeguimientoGestor";
import "../TableSeguimientoGestor/TableSeguimientoGestor";

export const SeguimientoGestor = () => {
  return (
    <div>
      <div className="seguimientos">
        <div className="tblsegui">
          <TableSeguimientoGestor />
        </div>
      </div>
    </div>
  );
};

export default SeguimientoGestor;
