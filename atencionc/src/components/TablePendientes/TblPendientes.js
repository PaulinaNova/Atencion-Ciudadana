import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./ColumnsPendientes";
import "../Table/Table.css";
import axios from "axios";

export const TblPendientes = (props) => {
  const { cadena } = props;
  const columns = useMemo(() => COLUMNS, []);
  const [gestion, setGestion] = useState([]);
  var data = gestion;
  const fecha = new Date();
  const hoy = fecha.getDate();
  const mesActual = fecha.getMonth() + 1;
  const añoActual = fecha.getFullYear();
  var fechaV
  if(mesActual< 10)
    fechaV = añoActual + "-0" + mesActual + "-" + hoy;
  else
    fechaV = añoActual + "-" + mesActual + "-" + hoy;

  const getData = async () => {
    const res = await axios.get("/api/gestions");
    setGestion(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (cadena === "Urgentes") {
    data = data.filter(function(entry) {
      return entry.prioridad === "ALTA" && entry.estado !== "CONCLUIDA";
    });
  } else if (cadena === "Vencidas") {
    data = data.filter(function(entry) {
      return entry.vencimiento < (fechaV) && entry.estado !== "CONCLUIDA";
    });
  } else if (cadena === "Pendientes") {
    data = data.filter(function(entry) {
      return entry.estado === "ACEPTADA" && entry.prioridad !== "ALTA";
    });
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
      <table className="tblPendientes" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TblPendientes;
