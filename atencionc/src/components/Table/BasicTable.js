import React, { useMemo, useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { COLUMNS } from "./Columns";
import "./Table.css";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { GlobalFilter } from "./GlobalFilter";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useFormik } from "formik";

/*----------CREAR EL FONDO DE LA PANTALLA----------- */

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 1000,
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

const BasicTable = () => {
  const navigate = useNavigate();
  const styles = useStyles();
  const columns = useMemo(() => COLUMNS, []);
  const [ciudadano, setCiudadano] = useState([]);
  const [campos, setCampos] = useState([]);
  const data = ciudadano;

  const getData = async () => {
    const res = await axios.get("/api/ciudadano");
    setCiudadano(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  function llenarCampos(camposR) {
    setCampos(camposR);
    return camposR;
  }

  function updtPut() {
    axios
      .put("/api/ciudadano/updtCiudadano/"+campos._id, {
        curp: values.curp,
        nombre: values.nombre,
        apellidoPaterno: values.apellidoPaterno,
        apellidoMaterno: values.apellidoMaterno,
        fechaNacimiento: values.fechaNacimiento,
        telefono: values.telefono,
        email: values.email,
        codigoPostal: values.codigoPostal,
        municipio: values.municipio,
        localidad: values.localidad,
        colonia: values.colonia,
        calle: values.calle,
        caracteristica: values.caracteristica,
      })
      .then((response) => {
        setValues(response.data);
        NotificationManager.success(
          "El ciudadano fue actualizado correctamente",
          "Exito"
        );
      });
  }

  const onSubmit = async (values, actions) => {
    //METER LO DE LA BD
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
      curp: campos.curp,
      vacio: "",
      nombre: campos.nombre,
      ape_paterno: campos.apellidoPaterno,
      ape_materno: campos.apellidoMaterno,
      fecha_nacimiento: campos.fechaNacimiento,
      telefono: campos.telefono,
      email: campos.email,
      codigo_Postal: campos.codigoPostal,
      municipio: campos.municipio,
      localidad: campos.localidad,
      colonia: campos.colonia,
      calle: campos.calle,
      caracteristica: campos.caracteristica,
    },
    //validationSchema:basicSchema,
    onSubmit,
  });
  /*----------CONSTANTES PARA ABRIL LA PANTALLA----------- */

  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  /*------------CREAR FORMULARIO INTERNO------------- */
  const body = (
    <div className={styles.modal}>
      <div>
        {/*-------------------------------------------------- */}

        <div className="gestores">
          <div className="CBuscar">
            <div className="wrapper">
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="formulario"
              >
                <div className="groupInput">
                  <label htmlFor="curp">CURP</label>
                  <input
                    value={campos.curp}
                    onChange={handleChange}
                    id="curp"
                    type="text"
                    placeholder="Ingresa curp"
                    onBlur={handleBlur}
                    className={errors.curp && touched.curp ? "input-error" : ""}
                  />
                  {errors.curp && touched.curp && (
                    <p className="error">{errors.curp}</p>
                  )}
                </div>
                <div className="groupInput2">
                  <label htmlFor="vacio1"></label>
                </div>
                <div className="groupInput2">
                  <label htmlFor="vacio2"></label>
                </div>

                <div className="groupInput">
                  <label htmlFor="nombre">NOMBRE(S)</label>
                  <input
                    value={campos.nombre}
                    onChange={handleChange}
                    id="nombre"
                    type="text"
                    placeholder="Ingresa nombre(s)"
                    onBlur={handleBlur}
                    className={
                      errors.nombre && touched.nombre ? "input-error" : ""
                    }
                  />
                  {errors.nombre && touched.nombre && (
                    <p className="error">{errors.nombre}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="ape_paterno">APELLIDO PATERNO</label>
                  <input
                    value={campos.apellidoPaterno}
                    onChange={handleChange}
                    id="ape_paterno"
                    type="text"
                    placeholder="Ingresa Apellido Paterno"
                    onBlur={handleBlur}
                    className={
                      errors.ape_paterno && touched.ape_paterno
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.ape_paterno && touched.ape_paterno && (
                    <p className="error">{errors.ape_paterno}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="ape_materno">APELLIDO MATERNO</label>
                  <input
                    value={campos.apellidoMaterno}
                    onChange={handleChange}
                    id="ape_materno"
                    type="text"
                    placeholder="Ingresa Apellido Materno"
                    onBlur={handleBlur}
                    className={
                      errors.ape_materno && touched.ape_materno
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.ape_materno && touched.ape_materno && (
                    <p className="error">{errors.ape_materno}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="fechaNacimiento">FECHA NACIMIENTO</label>
                  <input
                    value={campos.fechaNacimiento}
                    onChange={handleChange}
                    id="fecha_nacimiento"
                    type="date"
                    placeholder="Ingresa Fecha Nacimiento"
                    onBlur={handleBlur}
                    className={
                      errors.fecha_nacimiento && touched.fecha_nacimiento
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.fecha_nacimiento && touched.fecha_nacimiento && (
                    <p className="error">{errors.fecha_nacimiento}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="telefono">TELEFONO</label>
                  <input
                    value={campos.telefono}
                    onChange={handleChange}
                    id="telefono"
                    type="number"
                    placeholder="Ingresa no. telefono"
                    onBlur={handleBlur}
                    className={
                      errors.telefono && touched.telefono ? "input-error" : ""
                    }
                  />
                  {errors.telefono && touched.telefono && (
                    <p className="error">{errors.telefono}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="email">CORREO ELECTRONICO</label>
                  <input
                    value={campos.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="Ingresa correo"
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "input-error" : ""
                    }
                  />
                  {errors.email && touched.email && (
                    <p className="error">{errors.email}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="codigoPostal">CODIGO POSTAL</label>
                  <input
                    value={campos.codigoPostal}
                    onChange={handleChange}
                    id="codigo_Postal"
                    type="number"
                    placeholder="Ingresa código postal"
                    onBlur={handleBlur}
                    className={
                      errors.codigoPostal && touched.codigoPostal
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.codigoPostal && touched.codigoPostal && (
                    <p className="error">{errors.codigoPostal}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="municipio">MUNICIPIO</label>
                  <input
                    value={campos.municipio}
                    onChange={handleChange}
                    id="municipio"
                    type="text"
                    placeholder="Ingresa municipio"
                    onBlur={handleBlur}
                    className={
                      errors.municipio && touched.municipio ? "input-error" : ""
                    }
                  />
                  {errors.municipio && touched.municipio && (
                    <p className="error">{errors.municipio}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="localidad">LOCALIDAD</label>
                  <input
                    value={campos.localidad}
                    onChange={handleChange}
                    id="localidad"
                    type="text"
                    placeholder="Ingresa localidad"
                    onBlur={handleBlur}
                    className={
                      errors.localidad && touched.localidad ? "input-error" : ""
                    }
                  />
                  {errors.localidad && touched.localidad && (
                    <p className="error">{errors.localidad}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="colonia">COLONIA</label>
                  <input
                    value={campos.colonia}
                    onChange={handleChange}
                    id="colonia"
                    type="text"
                    placeholder="Ingresa colonia"
                    onBlur={handleBlur}
                    className={
                      errors.colonia && touched.colonia ? "input-error" : ""
                    }
                  />
                  {errors.colonia && touched.colonia && (
                    <p className="error">{errors.colonia}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="calle">CALLE</label>
                  <input
                    value={campos.calle}
                    onChange={handleChange}
                    id="calle"
                    type="text"
                    placeholder="Ingresa calle"
                    onBlur={handleBlur}
                    className={
                      errors.calle && touched.calle ? "input-error" : ""
                    }
                  />
                  {errors.calle && touched.calle && (
                    <p className="error">{errors.calle}</p>
                  )}
                </div>

                <div className="groupInput">
                  <label htmlFor="caracteristica">CARACTERISTICA</label>
                  <input
                    value={campos.caracteristica}
                    onChange={handleChange}
                    id="caracteristica"
                    type="text"
                    placeholder="Ingresa caracteristica"
                    onBlur={handleBlur}
                    className={
                      errors.caracteristica && touched.caracteristica
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.caracteristica && touched.caracteristica && (
                    <p className="error">{errors.caracteristica}</p>
                  )}
                </div>

                <div className="btnB">
                  <button className="btn" type="submit" disabled={isSubmitting}>
                    Modificar ciudadano
                  </button>
                  <NotificationContainer />
                  <button className="btn" onClick={() => abrirCerrarModal()}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <table className="tbl" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th>Acciones</th>
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
                  llenarCampos(row.original);
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <button
                    className="btntbl"
                    title="Modificar Ciudadano"
                    onClick={() => abrirCerrarModal()}
                  >
                    <AiIcons.AiOutlineSetting />
                  </button>
                  <button className="btntbl" title="Historial">
                    <AiIcons.AiOutlineHistory />
                  </button>
                  <button
                    className="btntbl"
                    onClick={() => navigate("/gestions")}
                  >
                    <IoIcons.IoIosAddCircleOutline />
                  </button>
                  <Modal open={modal} onClose={abrirCerrarModal}>
                    {body}
                  </Modal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BasicTable;
