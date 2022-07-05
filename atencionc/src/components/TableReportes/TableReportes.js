import React, { useMemo, useState, useEffect } from "react";
import { useTable,/* useGlobalFilter*/ } from "react-table";
import { COLUMNS } from "./ColumnsReportes";
import "./TableReportes.css";
//import { GlobalFilter } from "./GlobalFilter";
import axios from "axios";


const TableReportes = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [gestion, setGestion] = useState([]);
  const data = gestion;

  const getData = async () => {
    const res = await axios.get("/api/gestions");
    setGestion(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    /*state,
    setGlobalFilter,*/
  } = useTable(
    {
      columns,
      data,
    },
    //useGlobalFilter
  );

  //const { globalFilter } = state;
  

  return (
    <>
      <table className="tblReportes" {...getTableProps()}>
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

export default TableReportes;