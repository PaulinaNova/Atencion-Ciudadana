import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 caracteres, 1 mayuscula, 1minuscula, 1 digito
const rfcRules = /^([A-Z]{4})([0-9]{6})(([A-Z]|[0-9]){3})$/;
const curpRules = /^([A-Z]{4})([0-9]{6})([A-Z]{6})([0-9]{2})$/;

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa correo valido")
    .required("Requerido"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message: "1 mayuscula, 1 minuscula, 1 digito, Minimo 5 caracteres",
    })
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
