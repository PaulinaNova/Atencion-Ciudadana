import mongoose from "mongoose";

const dependenciaSchema = mongoose.Schema(
  {
    nombre_dependencia: {
      type: String,
    },
    nombre_encargado: {
      type: String,
    },
    contacto_encargado: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const Dependencia = mongoose.model("Dependencia", dependenciaSchema);

export default Dependencia;
