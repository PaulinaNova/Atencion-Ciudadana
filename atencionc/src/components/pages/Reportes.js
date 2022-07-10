import React, { useState, useEffect } from "react";
import TableReportes from "../TableReportes/TableReportes";
import "../TableSeguimiento/TableSeguimiento.css";
import { useFormik } from "formik";
import axios from "axios";

function Reportes() {
  const [gestion, setGestion] = useState([]);
  var data = gestion;
  const getData = async () => {
    const res = await axios.get("/api/gestions");
    setGestion(res.data);
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { values, handleChange, handleBlur } = useFormik({
    initialValues: {
      fechaI: "2022-01-01",
      fechaF: "2022-12-31",
    },
    enableReinitialize: true,
  });

  data = data.filter(
    (entry) => entry.fecha >= values.fechaI && entry.fecha <= values.fechaF
  );

  return (
    <div className="reportes">
      <div className="filtrosReportes2">
        <input
          type="date"
          onChange={handleChange}
          id="fechaI"
          value={values.fechaI}
          onBlur={handleBlur}
          className="inpReportes"
        />
        <input
          type="date"
          id="fechaF"
          onChange={handleChange}
          value={values.fechaF}
          onBlur={handleBlur}
          className="inpReportes"
        />
      </div>
      <TableReportes gestion={data} />
    </div>
  );
}

export default Reportes;
