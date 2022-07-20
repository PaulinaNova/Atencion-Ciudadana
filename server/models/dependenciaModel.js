import mongoose from "mongoose";

const dependenciaSchema = mongoose.Schema(
  {
    nombre_dependencia: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const Dependencia = mongoose.model("Dependencia", dependenciaSchema);

export default Dependencia;
