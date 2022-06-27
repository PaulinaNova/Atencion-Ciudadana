import { getDependencias, getDependenciaById } from "../controllers/dependenciaController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all Dependencias
router.route('/').get(getDependencias)

// express router method to create route for getting Dependencias by id
router.route('/:id').get(getDependenciaById)

export default router