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

  const getData = async () => {
    const res = await axios.get("/api/gestions");
    setGestion(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (cadena === "Urgentes") {
    data = data.filter(function(entry) {
      return entry.prioridad === "ALTA";
    });
  } else if (cadena === "Vencidas") {
    data = data.filter(function(entry) {
      return entry.captura <= "2022-02-01";
    });
  } else if (cadena === "Pendientes") {
    data = data.filter(function(entry) {
      return entry.estado <= "Aceptado";
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
      <table className="tbl" {...getTableProps()}>
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
