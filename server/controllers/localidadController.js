import Localidad from "../models/localidadModel.js";
import asyncHandler from "express-async-handler";

//getGestor function to get all Gestor
export const getLocalidad = asyncHandler(async (req, res) => {
  const localidad = await Localidad.find({});
  res.json(localidad);
});