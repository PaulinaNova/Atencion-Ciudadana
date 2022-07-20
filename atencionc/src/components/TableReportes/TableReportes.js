import React, { useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "./ColumnsReportes";
import "./TableReportes.css";
import Select, { components } from "react-select";
import { GlobalFilter } from "./GlobalFilter";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import * as IoIcons from "react-icons/io";

export const TableReportes = (props) => {
  const { gestion } = props;
  const columns = useMemo(() => COLUMNS, []);
  const data = gestion;
  const [selectedValue, setSelectedValue] = useState([]);
  const options = [
    { value: "procedencia", label: "Procedencia" },
    { value: "prioridad", label: "Prioridad" },
    { value: "tipo", label: "Tipo" },
    { value: "dependencia", label: "Dependencia" },
    { value: "estado", label: "Estado" },
    { value: "evento", label: "Evento" },
    { value: "cant_benef", label: "Personas beneficiadas" },
    { value: "presupuesto", label: "Presupuesto" },
  ];
  const initialState = {
    hiddenColumns: [
      "procedencia",
      "prioridad",
      "tipo",
      "dependencia",
      "estado",
      "evento",
      "cant_benef",
      "presupuesto",
    ],
    pageSize: 7,
  };
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
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    toggleHideColumn,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  //toggleHideColumn("procedencia", true);
  const { globalFilter } = state;
  const { pageIndex } = state;

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 45,
      borderRadius: 20,
      backgroundColor: "rgba(128, 128, 128, 0.315)",
    }),
  };

  const onDropdownChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
    e.map((s) => toggleHideColumn(s.value, false));
  };

  const onClear = () => {
    selectedValue.map((s) => toggleHideColumn(s, true));
  };

  const ClearIndicator = (props) => {
    const clearValue = () => {
      props.clearValue();
      props.selectProps.onClear && props.selectProps.onClear();
    };

    const innerProps = {
      ...props.innerProps,
      onMouseDown: clearValue,
      onTouchEnd: clearValue,
    };

    return <components.ClearIndicator {...props} innerProps={innerProps} />;
  };

  return (
    <>
      <div className="filtrosReportes">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <Select
          onChange={onDropdownChange}
          styles={customStyles}
          isMulti
          components={{ ClearIndicator }}
          options={options}
          onClear={onClear}
          closeMenuOnSelect={false}
        ></Select>
      </div>
      <div className="table-container">
        <table id="table-to-xls" className="tblReportes" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>
                      {" "}
                      {column.canFilter ? column.render("Filter") : null}{" "}
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
      <div className="pagR">
        <p className="spanPagR">
          Pág.{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </p>
        <button
          className="btnPagR"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <IoIcons.IoMdArrowBack />
        </button>
        <button
          className="btnPagR"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <IoIcons.IoMdArrowForward />
        </button>
        <span className="spanPagR">
          Mostrar{" "}
          <input
            type={"number"}
            className={"inpMostrar"}
            defaultValue={7}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) : 7;
              setPageSize(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
      </div>
      <div className="btnReportes">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn"
          table="table-to-xls"
          filename="Reportes"
          sheet="reporte"
          buttonText="Generar Excel"
        />
        {/*<button className="btn">Generar PDF</button>*/}
      </div>
    </>
  );
};

export default TableReportes;
