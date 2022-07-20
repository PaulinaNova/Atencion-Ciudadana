import mongoose from "mongoose";

const procedenciaSchema = mongoose.Schema(
  {
    nombre_procedencia: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const Procedencia = mongoose.model("Procedencia", procedenciaSchema);

export default Procedencia;
