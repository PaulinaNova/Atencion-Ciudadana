import React from "react";
import TableSeguimiento from "../TableSeguimiento/TableSeguimiento";
import "../TableSeguimiento/TableSeguimiento.css";
import { useParams } from "react-router-dom";

function Historial() {
  const filtro  = useParams();
  return (
    <div>
      <div className="seguimientos">
        <div className="tblsegui">
          <TableSeguimiento filtro={filtro} />
        </div>
      </div>
    </div>
  );
}

export default Historial;
