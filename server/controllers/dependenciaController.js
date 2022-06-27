import Dependencia from "../models/dependenciaModel.js";
import asyncHandler from "express-async-handler";

//getUsers function to get all Dependencias
export const getDependencias = asyncHandler(async (req, res) => {
  const dependencias = await Dependencia.find({});
  res.json(dependencias);
});

//getUserById function to retrieve Dependencias by id
export const getDependenciaById = asyncHandler(async (req, res) => {
  const dependencia = await Dependencia.findById(req.params.id);

  //if user id match param id send Dependencias else throw error
  if (dependencia) {
    res.json(dependencia);
  } else {
    res.status(404).json({ message: "Dependencia no encontrada" });
    res.status(404);
    throw new Error("Dependencia no encontrada");
  }
});
