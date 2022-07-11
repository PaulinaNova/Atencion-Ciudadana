import mongoose from "mongoose";

const coloniaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const Colonia = mongoose.model("Colonia", coloniaSchema);

export default Colonia;