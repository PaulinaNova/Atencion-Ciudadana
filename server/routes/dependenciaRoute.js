import { getDependencias, getDependenciaById, addDependencia, updtDependencia, dltDependencia } from "../controllers/dependenciaController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all Dependencias
router.route('/').get(getDependencias)

// express router method to create route for getting Dependencias by id
router.route('/:id').get(getDependenciaById)

// express router method to create route for create Dependencias by id
router.route('/addDependencia').post(addDependencia)

// express router method to create route for update Dependencias by id
router.route('/updtDependencia/:id').put(updtDependencia)

// express router method to create route for delete Dependencias by id
router.route('/dltDependencia/:id').delete(dltDependencia)

export default router