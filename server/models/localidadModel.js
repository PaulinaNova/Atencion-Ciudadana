import mongoose from "mongoose";

const localidadSchema = mongoose.Schema(
  {
    clave: {
        type: String,
      },
    nombre: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const Localidad = mongoose.model("Localidad", localidadSchema);

export default Localidad;