import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { COLUMNS } from "./ColumnsSeguimiento";
import "./TableSeguimiento.css";
import SlideSeguimiento from "../TableSeguimiento/SlideSeguimiento";
import axios from "axios";
import * as IoIcons from "react-icons/io";

/*----------CREAR EL FONDO DE LA PANTALLA----------- */

export const TableSeguimiento = (props) => {
  const { filtro, gestor } = props;
  const [isShown, setIsShown] = useState(false);
  const columns = useMemo(() => COLUMNS, []);
  const [gestion, setGestion] = useState([]);
  const [gestionR, setGestionR] = useState([]);
  const [gestionF, setGestionF] = useState([]);
  const [gestionG, setGestionG] = useState([]);

  var data = gestion;
  const getData = async () => {
    const res = await axios.get("/api/gestions");
    setGestion(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (filtro != null) {
    axios.get("/api/gestions/curp/" + filtro.curp).then((response) => {
      setGestionF(response.data);
    });
    data = gestionF;
  }
  if (gestor != null) {
    axios.get("/api/gestions/gestor/" + gestor).then((response) => {
      setGestionG(response.data);
    });
    data = gestionG;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
    toggleHideColumn,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 8 },
    },
    useFilters,
    usePagination
  );

  function handleClick(gestions) {
    setIsShown(!isShown);
    toggleHideColumn("tipo", !isShown);
    toggleHideColumn("estado", !isShown);
    toggleHideColumn("prioridad", !isShown);
    setGestionR(gestions);
    return isShown;
  }

  const {pageIndex} = state;

  return (
    <>
      <div className="sidebar">
        <SlideSeguimiento abierto={isShown} gestion={gestionR} />
      </div>

      <div style={{ width: isShown ? "75%" : "" }} className="inpdiv">
        <input
          placeholder={!isShown ? "Nombre" : gestionR.nombre_ciudadano}
          className="intbl3"
          readOnly
        />
      </div>
      <div className="divSegui" style={{ width: isShown ? "75%" : "" }}>
        <table className="tseg" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
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
      </div>
      <div className="pag">
        <p className="spanPag">
          Pág.{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </p>
        <button
          className="btnPag"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <IoIcons.IoMdArrowBack />
        </button>
        <button
          className="btnPag"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <IoIcons.IoMdArrowForward />
        </button>
      </div>
    </>
  );
};

export default TableSeguimiento;
