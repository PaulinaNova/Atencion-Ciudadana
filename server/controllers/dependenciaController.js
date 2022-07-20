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

// To Add New Dependencia
export const addDependencia = asyncHandler(async (req, res) => {
  const dependencia = await Dependencia.create(req.body);
  //if user id match param id send dependencia else throw error
  dependencia
    .save()
    .then(() => {
      res.json("Dependencia añadida");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      console.log("reg err");
    });
});

// To Update Dependencia
export const updtDependencia = asyncHandler(async (req, res) => {
  const dependencia = await Dependencia.findByIdAndUpdate(req.params.id, req.body);
  //if user id match param id send Gestor else throw error
  dependencia
    .save()
    .then(() => {
      res.json("Dependencia actualizada");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      console.log("reg err");
    });
});

// To Delete Dependencia
export const dltDependencia = asyncHandler(async (req, res) => {
  await Dependencia.deleteOne({ _id: req.params.id }).then(function(err, docs) {
    if (err) {
      console.log(err);
    }
  });
});