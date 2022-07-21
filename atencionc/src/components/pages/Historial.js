import React from "react";
import TableHistorial from "../TableHistorial/TableHistorial";
import "../TableHistorial/TableHistorial";
import { useParams } from "react-router-dom";

function Historial() {
  const filtro = useParams();
  return (
    <div>
      <div className="seguimientos">
        <div className="tblsegui">
          <TableHistorial filtro={filtro} />
        </div>
      </div>
    </div>
  );
}

export default Historial;
