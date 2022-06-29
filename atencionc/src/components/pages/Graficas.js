import React, { useState, useEffect } from "react";
import Chart from "../Charts/Chart";
import "./Graficas.css";
import { useFormik } from "formik";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";

function Graficas() {
  const [valores, setValores] = useState([]);
  const getData = async () => {
    const res = await axios.get(
      "/api/gestions/grafica/inicio/" +
        values.fecha_inicio +
        "/final/" +
        values.fecha_final
    );
    setValores(res.data);
  };

  function generarGrafica() {
    getData();
  }

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
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fecha_inicio: "2022-01-01",
      fecha_final: "2022-12-31",
      presupuesto: "",
      dependencia: "",
    },
    enableReinitialize: true,
    onSubmit,
  });

  var concluidasPresupuesto = valores.filter(
    (entry) => entry.estado === "Concluida"
  );
  const totalPresupuesto = concluidasPresupuesto.reduce(
    (prevValue, currentValue) => prevValue + currentValue.presupuesto,
    0
  );
  var canceladas = valores.filter((entry) => entry.estado === "Cancelada")
    .length;
  var seguimiento = valores.filter((entry) => entry.estado === "Seguimiento")
    .length;
  var concluidas = valores.filter((entry) => entry.estado === "Concluida")
    .length;

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
              errors.presupuesto && touched.presupuesto ? "input-error" : ""
            }
          />
          {errors.presupuesto && touched.presupuesto && (
            <p className="error">{errors.presupuesto}</p>
          )}
          {/*<select id="framework" className="slc" value={values.dependencia}>
            <option value="1">SEP</option>
            <option value="2">Secretaria de Salud</option>
            <option value="3">Secretaria de Desarrollo Rural</option>
            <option value="4">Secretaria de Desarrollo Económico</option>
          </select>*/}
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
        <button
          className="btn"
          type="submit"
          onClick={() => generarGrafica()}
          disabled={isSubmitting}
        >
          Generar gráfica
        </button>
      </div>
    </div>
  );
}

export default Graficas;
