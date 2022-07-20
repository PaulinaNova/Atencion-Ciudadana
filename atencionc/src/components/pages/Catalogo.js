import React from "react";
import "../TableCatalogo/Catalogo.css";
import TableDependencias from "../TableCatalogo/TableDependencias";
import TableEventos from "../TableCatalogo/TableEventos";
import TableProcedencias from "../TableCatalogo/TableProcedencias";

function Catalogo() {
  return (
    <div className="catalogo">
      <div className="CCatalogo">
        <div className="dependencias">
          <h2 className="ctitulo">Dependencias</h2>
          <TableDependencias/>
        </div>
        <div className="procedencias">
          <h2 className="ctitulo">Procedencias</h2>
          <TableProcedencias/>
        </div>
        <div className="eventos">
          <h2 className="ctitulo">Eventos</h2>
          <TableEventos/>
        </div>
      </div>
    </div>
  );
}

export default Catalogo;
