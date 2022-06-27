import React, { useMemo, useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { COLUMNS } from "./ColumnsSeguimiento";
import "./TableSeguimiento.css";
import SlideSeguimiento from "../TableSeguimiento/SlideSeguimiento";
import axios from "axios";
import { GlobalFilter } from "./GlobalFilter";

/*----------CREAR EL FONDO DE LA PANTALLA----------- */

function TableSeguimiento() {
  const [isShown, setIsShown] = useState(false);
  const columns = useMemo(() => COLUMNS, []);
  const [gestion, setGestion] = useState([]);
  const [gestionR, setGestionR] = useState([]);
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
    state,
    setGlobalFilter,
    toggleHideColumn,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  var { globalFilter } = state;

  function handleClick(gestions) {
    setIsShown(!isShown);
    toggleHideColumn("tipo", !isShown);
    toggleHideColumn("estado", !isShown);
    toggleHideColumn("prioridad", !isShown);
    setGestionR(gestions);
    return isShown;
  }

  return (
    <>
      <div className="sidebar">
        <SlideSeguimiento abierto={isShown} gestion={gestionR} />
      </div>

      <div style={{ width: isShown ? "690px" : "" }} className="inpdiv">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <input
          placeholder={!isShown ? "Nombre" : gestionR.nombre_ciudadano}
          className="intbl3"
          readOnly
        />
      </div>
      <table
        style={{ width: isShown ? "110vh" : "" }}
        className="tseg"
        {...getTableProps()}
      >
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
              <tr
                {...row.getRowProps()}
                onClick={() => {
                  handleClick(row.original);
                }}
              >
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
}

export default TableSeguimiento;
