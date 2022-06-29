import mongoose from "mongoose";

const municipioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const Municipio = mongoose.model("Municipio", municipioSchema);

export default Municipio;
