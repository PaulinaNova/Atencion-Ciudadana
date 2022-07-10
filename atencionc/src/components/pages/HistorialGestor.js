import React from "react";
import TableAsignadas from "../TableAsignadas/TblAsignadas";
import "../TableAsignadas/TableAsignadas.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HistorialGestor() {
  const filtro = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <div className="asignadas">
        <h3>Historial de gestiones: {filtro.curp}</h3>
        <div className="CTblAsignada">
          <TableAsignadas cadena={filtro.curp} />
        </div>
        <div className="btnHistorialGestor">
          <button className="btn" onClick={() => navigate("/buscarGestor")}>Regresar</button>
        </div>
      </div>
    </div>
  );
}

export default HistorialGestor;
