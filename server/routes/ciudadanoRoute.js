import { getCiudadanos, getCiudadanoById, addCiudadano, updtCiudadano } from "../controllers/ciudadanoController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all ciudadanos
router.route('/').get(getCiudadanos)

// express router method to create route for getting ciudadanos by id
router.route('/:id').get(getCiudadanoById)

// express router method to create route for creating ciudadanos
router.route('/addCiudadano').post(addCiudadano)

// express router method to create route for creating ciudadanos
router.route("/updtCiudadano/:id").put(updtCiudadano);

export default router