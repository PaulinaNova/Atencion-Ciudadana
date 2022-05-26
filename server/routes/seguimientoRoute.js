import { getSeguimientos, getSeguimientoById } from "../controllers/seguimientoController.js";
import express from 'express'
const router = express.Router()
///NUEVO CAMBIOOOOOO X2


// express router method to create route for getting all users
router.route('/').get(getSeguimientos)

// express router method to create route for getting users by id
router.route('/:id').get(getSeguimientoById)

export default router