import {
  getProcedencias,
  getProcedenciaById,
  addProcedencia,
  updtProcedencia,
  dltProcedencia,
} from "../controllers/procedenciaController.js";
import express from "express";
const router = express.Router();

// express router method to create route for getting all Procedencias
router.route("/").get(getProcedencias);

// express router method to create route for getting Procedencias by id
router.route("/:id").get(getProcedenciaById);

// express router method to create route for creating Procedencias by id
router.route("/addProcedencia").post(addProcedencia);

// express router method to create route for updating Procedencias by id
router.route("/updtProcedencia/:id").put(updtProcedencia);

// express router method to create route for delete Procedencias by id
router.route("/dltProcedencia/:id").delete(dltProcedencia);

export default router;
