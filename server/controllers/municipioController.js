import Municipio from "../models/municipioModel.js";
import asyncHandler from "express-async-handler";

//getGestor function to get all Gestor
export const getMunicipio = asyncHandler(async (req, res) => {
  const municipio = await Municipio.find({});
  res.json(municipio);
});

