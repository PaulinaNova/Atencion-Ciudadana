import mongoose from "mongoose";

const dependenciaSchema = mongoose.Schema(
  {
    nombre_dependencia: {
      type: Number,
      unique: true,
    },
    nombre_encargado: {
      type: String,
    },
    contacto_encargado: {
      type: Date,
    },
  },
  {
    timestamps: false,
  }
);

const Dependencia = mongoose.model("Dependencia", dependenciaSchema);

export default Dependencia;
