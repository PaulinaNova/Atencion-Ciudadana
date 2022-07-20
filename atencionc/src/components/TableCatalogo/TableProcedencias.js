import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { COLUMNS } from "./ColumnsProcedencias";
import "./Catalogo.css";
import * as IoIcons from "react-icons/io";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import { useFormik } from "formik";
import * as AiIcons from "react-icons/ai";

/*----------CREAR EL FONDO DE LA PANTALLA----------- */

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 330,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textfield: {
    width: "100%",
  },
}));

export const TableProcedencias = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [procedencia, setProcedencia] = useState([]);
  const [campos, setCampos] = useState([]);
  const styles = useStyles();
  const data = procedencia;

  const getData = async () => {
    const resp = await axios.get("/api/procedencia/");
    setProcedencia(resp.data);
  };

  function updtPut() {
    axios
      .put("/api/procedencia/updtProcedencia/" + campos._id, {
        nombre_procedencia: values.procedencia,
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success(
          "La procedencia fue actualizada correctamente",
          "Exito"
        );
        setCampos(response.data);
      });
    setTimeout(function() {
      abrirCerrarModal();
    }, 2000);
    getData();
  }

  function dltEliminar() {
    axios
      .delete("/api/procedencia/dltProcedencia/" + campos._id)
      .then((response) => {
        setValues(response.data);
      });
    NotificationManager.success(
      "La procedencia fue eliminada correctamente",
      "Exito"
    );
    getData();
    setTimeout(function() {
      abrirCerrarModalDlt();
    }, 2000);
  }

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (values, actions) => {
    updtPut();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  /*----------DECLARAR LOS VALORES DE LOS CAMPOS----------- */
  const {
    values,
    setValues,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      procedencia: campos.nombre_procedencia,
    },
    enableReinitialize: true,
    onSubmit,
  });
  /*----------CONSTANTES PARA ABRIL LA PANTALLA----------- */

  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };
  /*-----------------------DELETE------------------------- */
  const [modalDlt, setModalDlt] = useState(false);

  const abrirCerrarModalDlt = () => {
    setModalDlt(!modalDlt);
  };

  /*------------CREAR FORMULARIO INTERNO------------- */
  const body = (
    <div className={styles.modal}>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="formularioModDep"
      >
        <div className="groupInput">
          <label htmlFor="procedencia">PROCEDENCIA</label>
          <input
            value={values.procedencia}
            onChange={handleChange}
            id="procedencia"
            type="text"
            onBlur={handleBlur}
            className={
              errors.procedencia && touched.procedencia ? "input-error" : ""
            }
          />
          {errors.procedencia && touched.procedencia && (
            <p className="error">{errors.procedencia}</p>
          )}
        </div>

        <button className="btn" type="submit" disabled={isSubmitting}>
          Modificar procedencia
        </button>
        <NotificationContainer />
        <button className="btn" onClick={() => abrirCerrarModal()}>
          Cancelar
        </button>
      </form>
    </div>
  );

  /*-------------------------DELETE-------------------------- */
  const bodyDlt = (
    <div className={styles.modal}>
      <h3>¿Está seguro que desea eliminar esta procedencia?</h3>
      <button className="btn" onClick={() => dltEliminar()}>
        Eliminar
      </button>
      <NotificationContainer />
      <button className="btn" onClick={() => abrirCerrarModalDlt()}>
        Cancelar
      </button>
    </div>
  );

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
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 7 },
    },
    useFilters,
    usePagination
  );

  const { pageIndex } = state;

  function handleClick(camposR) {
    setCampos(camposR);
  }

  function eliminar(idEliminar) {
    setCampos(idEliminar);
  }

  return (
    <>
      <div className="CatalogosContainer">
        <table className="tblCatalogos" {...getTableProps()}>
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
                <th>Acciones</th>
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
                  <td>
                    <button
                      className="btntbl"
                      title="Modificar procedencia"
                      onClick={() => {
                        handleClick(row.original);
                        abrirCerrarModal();
                      }}
                    >
                      <AiIcons.AiOutlineSetting />
                    </button>
                    <button
                      className="btntbl"
                      title="Eliminar procedencia"
                      onClick={() => {
                        eliminar(row.original);
                        abrirCerrarModalDlt();
                      }}
                    >
                      <AiIcons.AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal open={modal} onClose={abrirCerrarModal}>
          {body}
        </Modal>
        <Modal open={modalDlt} onClose={abrirCerrarModalDlt}>
          {bodyDlt}
        </Modal>
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
      </div>
    </>
  );
};

export default TableProcedencias;
