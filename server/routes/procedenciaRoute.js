import { getProcedencias, getProcedenciaById } from "../controllers/procedenciaController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all Procedencias
router.route('/').get(getProcedencias)

// express router method to create route for getting Procedencias by id
router.route('/:id').get(getProcedenciaById)

export default router