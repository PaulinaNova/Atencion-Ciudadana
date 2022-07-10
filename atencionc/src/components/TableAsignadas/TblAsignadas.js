import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./ColumnsAsignadas";
import "./TableAsignadas.css";
import axios from "axios";

export const TblAsignadas = (props) => {
  const { cadena, gestor } = props;
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

  if (cadena === "ASIGNADAS") {
    data = data.filter(function(entry) {
      return entry.estado === "ASIGNADA" && entry.gestor === gestor;
    });
  } else {
    data = data.filter(function(entry) {
      return entry.curp === cadena;
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
      <div className="CTblAsignada">
        <table className="tblAsignadas" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
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
      </div>
    </>
  );
};

export default TblAsignadas;
