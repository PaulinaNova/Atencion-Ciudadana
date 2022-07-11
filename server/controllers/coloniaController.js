import Colonia from "../models/coloniaModel.js";
import asyncHandler from "express-async-handler";

//getGestor function to get all Gestor
export const getColonia = asyncHandler(async (req, res) => {
  const colonia = await Colonia.find({});
  res.json(colonia);
});