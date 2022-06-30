import { getGestions, getGestionById, getGestionByCurp, addGestion, updtGestion } from "../controllers/gestionController.js";
import express from "express";
const router = express.Router();

// express router method to create route for getting all gestiones
router.route("/").get(getGestions);

// express router method to create route for getting gestiones by id
router.route('/:id').get(getGestionById)

// express router method to create route for getting gestiones by CURP
router.route('/curp/:curp').get(getGestionByCurp)

// express router method to create route for creating gestiones
router.route("/addGestion").post(addGestion);

// express router method to create route for creating gestiones
router.route("/updtGestion/:folio").put(updtGestion);

export default router;
