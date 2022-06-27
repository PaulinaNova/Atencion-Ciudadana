import mongoose from "mongoose";

const procedenciaSchema = mongoose.Schema(
  {
    nombre_procedencia: {
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

const Procedencia = mongoose.model("Procedencia", procedenciaSchema);

export default Procedencia;
