import React from "react";
import TblPendientes from "../TablePendientes/TblPendientes";

function Pendientes() {
  return (
    <div className="pendientes">
      <div className="CPendientes">
        <div className="urgentes">
          <h3>Urgentes</h3>
          <TblPendientes cadena={"Urgentes"} />
        </div>
        <div className="vencidas">
          <h3>Pendientes</h3>
          <TblPendientes cadena={"Pendientes"} />
        </div>
        <div className="pendiente">
          <h3>Vencidas</h3>
          <TblPendientes cadena={"Vencidas"} />
        </div>
      </div>
    </div>
  );
}

export default Pendientes;
