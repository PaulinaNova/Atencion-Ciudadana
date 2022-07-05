import React, { useState, useEffect } from "react";
import Chart from "../Charts/Chart";
import "./Graficas.css";
import { useFormik } from "formik";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";

function Graficas() {
  const [valores, setValores] = useState([]);
  const [dependencia, setDependencia] = useState([]);
  const getData = async () => {
    const res = await axios.get("/api/gestions/");
    setValores(res.data);
    const resp = await axios.get("/api/dependencia/");
    setDependencia(resp.data);
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }; 

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fecha_inicio: "2022-01-01",
      fecha_final: "2022-12-31",
      presupuestos: "",
      dependenciasN: "Todas las dependencias",
    },
    enableReinitialize: true,
    onSubmit,
  });
  var concluidasPresupuesto;
  var canceladas;
  var seguimiento;
  var concluidas;
  if (values.dependenciasN === "Todas las dependencias") {
    concluidasPresupuesto = valores.filter(
      (entry) => entry.estado === "CONCLUIDA"
    );
    canceladas = valores.filter(
      (entry) =>
        entry.fecha >= values.fecha_inicio &&
        entry.fecha <= values.fecha_final &&
        entry.estado === "CANCELADA"
    ).length;
    seguimiento = valores.filter(
      (entry) =>
        entry.fecha >= values.fecha_inicio &&
        entry.fecha <= values.fecha_final &&
        entry.estado === "SEGUIMIENTO"
    ).length;
    concluidas = valores.filter(
      (entry) =>
        entry.fecha >= values.fecha_inicio &&
        entry.fecha <= values.fecha_final &&
        entry.estado === "CONCLUIDA"
    ).length;
  } else {
    concluidasPresupuesto = valores.filter(
      (entry) =>
        entry.estado === "CONCLUIDA" &&
        entry.dependencia === values.dependenciasN
    );
    canceladas = valores.filter(
      (entry) =>
        entry.fecha >= values.fecha_inicio &&
        entry.fecha <= values.fecha_final &&
        entry.estado === "CANCELADA" &&
        entry.dependencia === values.dependenciasN
    ).length;
    seguimiento = valores.filter(
      (entry) =>
        entry.fecha >= values.fecha_inicio &&
        entry.fecha <= values.fecha_final &&
        entry.estado === "SEGUIMIENTO" &&
        entry.dependencia === values.dependenciasN
    ).length;
    concluidas = valores.filter(
      (entry) =>
        entry.fecha >= values.fecha_inicio &&
        entry.fecha <= values.fecha_final &&
        entry.estado === "CONCLUIDA" &&
        entry.dependencia === values.dependenciasN
    ).length;
  }
  const totalPresupuesto = concluidasPresupuesto.reduce(
    (prevValue, currentValue) => prevValue + currentValue.presupuesto,
    0
  );

  return (
    <div className="graficas">
      <div className="filtros">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="formularioChart"
        >
          <input
            value={values.fecha_inicio}
            onChange={handleChange}
            id="fecha_inicio"
            type="date"
            onBlur={handleBlur}
            className={
              errors.fecha_inicio && touched.fecha_inicio ? "input-error" : ""
            }
          />
          {errors.fecha_inicio && touched.fecha_inicio && (
            <p className="error">{errors.fecha_inicio}</p>
          )}
          <input
            value={values.fecha_final}
            onChange={handleChange}
            id="fecha_final"
            type="date"
            onBlur={handleBlur}
            className={
              errors.fecha_final && touched.fecha_final ? "input-error" : ""
            }
          />
          {errors.fecha_final && touched.fecha_final && (
            <p className="error">{errors.fecha_final}</p>
          )}
          <CurrencyInput
            id="presupuestos"
            decimalsLimit={2}
            prefix="$"
            value={totalPresupuesto}
            decimalSeparator="."
            groupSeparator=","
            readOnly
            className={
              errors.presupuestos && touched.presupuestos ? "input-error" : ""
            }
          />
          {errors.presupuestos && touched.presupuestos && (
            <p className="error">{errors.presupuestos}</p>
          )}

          <select
            id="dependenciasN"
            className="slc"
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option>Todas las dependencias</option>
            {dependencia.map((d) => (
              <option key={d._id}>{d.nombre_dependencia}</option>
            ))}
          </select>
        </form>
      </div>
      <div className="chart-container">
        <div className="chart">
          <Chart
            canceladas={canceladas}
            concluidas={concluidas}
            seguimiento={seguimiento}
          />
        </div>
      </div>
      <div className="btngraficas">
        <button className="btn">Imprimir gráfica</button>
      </div>
    </div>
  );
}

export default Graficas;