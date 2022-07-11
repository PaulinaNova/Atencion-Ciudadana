import Gestor from "../models/gestorModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

//getGestor function to get all Gestor
export const getGestores = asyncHandler(async (req, res) => {
  const gestores = await Gestor.find({});
  res.json(gestores);
});

//getGestorById function to retrieve Gestor by id
export const getGestorById = asyncHandler(async (req, res) => {
  const gestor = await Gestor.findById(req.params.id);

  //if user id match param id send Gestor else throw error
  if (gestor) {
    res.json(gestor);
  } else {
    res.status(404).json({ message: "No se encontró este gestor" });
    res.status(404);
    throw new Error("No se encontró este gestor");
  }
});

// To Add New Gestor
export const addGestor = asyncHandler(async (req, res) => {
  // Hash password before saving to database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword
  const gestor = await Gestor.create(req.body);

  //if user id match param id send gestor else throw error
  gestor
    .save()
    .then(() => {
      res.json("Gestor añadido");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      console.log("reg err");
    });
});
