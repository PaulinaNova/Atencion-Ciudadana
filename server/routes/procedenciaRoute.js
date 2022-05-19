import { getProcedencias, getProcedenciaById } from "../controllers/procedenciaController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getProcedencias)

// express router method to create route for getting users by id
router.route('/:id').get(getProcedenciaById)

export default router