import {
  getSeguimientos,
  getSeguimientoById,
  addSeguimiento,
} from "../controllers/seguimientoController.js";
import express from "express";
const router = express.Router();

// express router method to create route for getting all seguimientos
router.route("/").get(getSeguimientos);

// express router method to create route for getting seguimientos by id
router.route("/:id").get(getSeguimientoById);

// express router method to create route for creating seguimientos
router.route("/addSeguimiento").post(addSeguimiento);

export default router;
