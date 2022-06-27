import Seguimiento from "../models/seguimientoModel.js";
import asyncHandler from "express-async-handler";

//getUsers function to get all Seguimiento
export const getSeguimientos = asyncHandler(async (req, res) => {
  const seguimientos = await Seguimiento.find({});
  res.json(seguimientos);
});

//getUserById function to retrieve Seguimiento by id
export const getSeguimientoById = asyncHandler(async (req, res) => {
  const seguimiento = await Seguimiento.findById(req.params.id);

  //if user id match param id send Seguimiento else throw error
  if (seguimiento) {
    res.json(seguimiento);
  } else {
    res.status(404).json({ message: "Seguimiento no encontrado" });
    res.status(404);
    throw new Error("Seguimiento no encontrado");
  }
});

// To Add New Seguimiento
export const addSeguimiento = asyncHandler(async (req, res) => {
  const seguimiento = await Seguimiento.create(req.body);
  //if user id match param id send Seguimiento else throw error
  seguimiento
    .save()
    .then(() => {
      res.json("Seguimiento añadido");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      console.log("reg err");
    });
});
