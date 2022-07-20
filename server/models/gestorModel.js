import mongoose from "mongoose";

const gestorSchema = mongoose.Schema(
  {
    rfc: {
      type: String,
      unique: true,
    },
    estado: {
      type: String,
    },
    dependencia: {
      type: String,
    },
    nombre: {
      type: String,
    },
    apellidoPaterno: {
      type: String,
    },
    apellidoMaterno: {
      type: String,
    },
    telefono: {
      type: String,
    },
    municipio: {
      type: String,
    },
    localidad: {
      type: String,
    },
    codigoPostal: {
      type: Number,
    },
    colonia: {
      type: String,
    },
    calle: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    userName: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: false,
  }
);

const Gestor = mongoose.model("Gestor", gestorSchema);

export default Gestor;
