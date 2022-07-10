import React, { useState, useEffect } from "react";
import Chart from "../Charts/Chart";
import "./Graficas.css";
import { useFormik } from "formik";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  const div2PDF = (e) => {
    const but = e.target;
    but.style.display = "none";
    let input = window.document.getElementsByClassName("chart")[0];

    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "pt");
      pdf.text("Gráfica de gestiones en el periodo de " + values.fecha_inicio +" al "+values.fecha_final, 200, 15);
      pdf.text("Dependencia: "+values.dependenciasN, 35, 50);
      pdf.text("Presupuesto: $" + totalPresupuesto.toFixed(3)+" pesos", 35, 70);
      pdf.text("Gestiones concluidas: " + concluidas, 35, 90);
      pdf.text("Gestiones en seguimiento: " + seguimiento, 35, 110);
      pdf.text("Gestiones canceladas: " + canceladas, 35, 130);
      pdf.addImage(
        img,
        "png",
        220,
        150,
        400,
        400
      );
      pdf.save("Grafica.pdf");
      but.style.display = "block";
    });
  };

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
        <button className="btn" onClick={(e) => div2PDF(e)}>
          Descargar PDF
        </button>
      </div>
    </div>
  );
}

export default Graficas;
