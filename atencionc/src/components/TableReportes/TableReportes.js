import React, { useMemo, useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { COLUMNS } from "./ColumnsReportes";
import "./TableReportes.css";
import Select from "react-select";
import { GlobalFilter } from "./GlobalFilter";
import axios from "axios";
import { useFormik } from "formik";

const TableReportes = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [gestion, setGestion] = useState([]);
  var data = gestion;
  const { values, handleChange, handleBlur } = useFormik({
    initialValues: {
      filtro: "",
      fechaI: "2022-01-01",
      fechaF: "2022-12-31",
    },
    enableReinitialize: true,
  });

  const getData = async () => {
    const res = await axios.get(
      "/api/gestions/fechas/" + values.fechaI + "/" + values.fechaF
    );
    setGestion(res.data);
    console.log(values.fechaF);
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  const options = [
    { value: "procedencia", label: "Procedencia" },
    { value: "prioridad", label: "Prioridad" },
    { value: "tipo", label: "Tipo" },
    { value: "dependencia", label: "Dependencia" },
    { value: "estado", label: "Estado" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 45,
      borderRadius: 20,
      backgroundColor: "rgba(128, 128, 128, 0.315)",
    }),
  };

  const onDropdownChange = ({ value }) => {
    //console.log(value);
  };

  return (
    <>
      <form autoComplete="off">
        <div className="filtrosReportes">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <Select
            onChange={onDropdownChange}
            styles={customStyles}
            isMulti
            options={options}
            closeMenuOnSelect={false}
            onBlur={handleBlur}
          ></Select>
          <input
            type="date"
            onChange={handleChange}
            id="fechaI"
            value={values.fechaI}
            onBlur={handleBlur}
            className="inpPendientes"
          />
          <input
            type="date"
            onChange={handleChange}
            id="fechaF"
            value={values.fechaF}
            onBlur={handleBlur}
            className="inpPendientes"
          />
        </div>
      </form>
      <div className="table-container">
        <table className="tblReportes" {...getTableProps()}>
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

export default TableReportes;
