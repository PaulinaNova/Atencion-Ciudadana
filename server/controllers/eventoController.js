import Evento from "../models/eventoModel.js";
import asyncHandler from "express-async-handler";

//getEvento function to get all Evento
export const getEvento = asyncHandler(async (req, res) => {
  const evento = await Evento.find({});
  res.json(evento);
});

// To Add New Evento
export const addEvento = asyncHandler(async (req, res) => {
  const evento = await Evento.create(req.body);
  //if user id match param id send evento else throw error
  evento
    .save()
    .then(() => {
      res.json("Evento añadida");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      console.log("reg err");
    });
});

// To Update Evento
export const updtEvento = asyncHandler(async (req, res) => {
  const evento = await Evento.findByIdAndUpdate(req.params.id, req.body);
  //if user id match param id send Evento else throw error
  evento
    .save()
    .then(() => {
      res.json("Evento actualizado");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      console.log("reg err");
    });
});

// To Delete Evento
export const dltEvento = asyncHandler(async (req, res) => {
  await Evento.deleteOne({ _id: req.params.id }).then(function(err, docs) {
    if (err) {
      console.log(err);
    }
  });
});