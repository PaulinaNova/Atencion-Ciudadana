import * as yup from "yup";
const rfcRules = /^([A-Z]{4})([0-9]{6})(([A-Z]|[0-9]){3})$/;
const curpRules = /^([A-Z]{4})([0-9]{6})([A-Z]{6})([0-9]{2})$/;

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa correo valido")
    .required("Requerido"),
  telefono: yup
    .number()
    .max(10)
    .positive()
    .integer()
    .required("Requerido"),
  rfc: yup
    .string()
    .matches(rfcRules, { message: "HOLA102910980" })
    .required("Requerido"),
  curp: yup
    .string()
    .matches(curpRules, { message: "HOLA102910MHOLA91" })
    .required("Requerido"),
  codigo_Postal: yup
    .string()
    .max(5)
    .required("Requerido"),
});
