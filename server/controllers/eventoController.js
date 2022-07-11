import Evento from "../models/eventoModel.js";
import asyncHandler from "express-async-handler";

//getEvento function to get all Evento
export const getEvento = asyncHandler(async (req, res) => {
  const evento = await Evento.find({});
  res.json(evento);
});