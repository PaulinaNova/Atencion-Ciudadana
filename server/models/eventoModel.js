import mongoose from "mongoose";

const eventoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const Evento = mongoose.model("Evento", eventoSchema);

export default Evento;
