import Procedencia from "../models/procedenciaModel.js";
import asyncHandler from "express-async-handler";

//getUsers function to get all Procedencia
export const getProcedencias = asyncHandler(async (req, res) => {
  const procedencias = await Procedencia.find({});
  res.json(procedencias);
});

//getUserById function to retrieve Procedencia by id
export const getProcedenciaById = asyncHandler(async (req, res) => {
  const procedencia = await Procedencia.findById(req.params.id);

  //if user id match param id send Procedencia else throw error
  if (procedencia) {
    res.json(procedencia);
  } else {
    res.status(404).json({ message: "Procedencia no encontrada" });
    res.status(404);
    throw new Error("Procedencia no encontrada");
  }
});

// To Add New Procedencia
export const addProcedencia = asyncHandler(async (req, res) => {
  const procedencia = await Procedencia.create(req.body);

  //if user id match param id send procedencia else throw error
  procedencia
    .save()
    .then(() => {
      res.json("Procedencia añadida");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      console.log("reg err");
    });
});

// To Update Procedencia
export const updtProcedencia = asyncHandler(async (req, res) => {
  const procedencia = await Procedencia.findByIdAndUpdate(req.params.id, req.body);
  //if user id match param id send Procedencia else throw error
  procedencia
    .save()
    .then(() => {
      res.json("Procedencia actualizada");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      console.log("reg err");
    });
});

// To Delete Procedencia
export const dltProcedencia = asyncHandler(async (req, res) => {
  await Procedencia.deleteOne({ _id: req.params.id }).then(function(err, docs) {
    if (err) {
      console.log(err);
    }
  });
});