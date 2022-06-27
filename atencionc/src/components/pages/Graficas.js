import React from "react";
import Chart from "../Charts/Chart";
import "./Graficas.css";

function Graficas() {
  return (
    <div className="graficas">
      <div className="filtros">
        <input type="date" className="inp" />
        <input type="date" className="inp" />
        <input placeholder="Presupuesto" className="inp" readOnly />
        <select id="framework" className="slc">
          <option value="1">SEP</option>
          <option value="2">Secretaria de Salud</option>
          <option value="3">Secretaria de Desarrollo Rural</option>
          <option value="4">Secretaria de Desarrollo Económico</option>
        </select>
      </div>
      <div className="chart-container">
        <div className="chart">
          <Chart />
        </div>
      </div>
      <div className="btngraficas">
        <button className="btn">Imprimir gráfica</button>
        <button className="btn">Generar gráfica</button>
      </div>
    </div>
  );
}

export default Graficas;
