import { getGestores, getGestorById, addGestor } from "../controllers/gestorController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all gestores
router.route('/').get(getGestores)

// express router method to create route for getting gestores by id
router.route('/:id').get(getGestorById)

// express router method to create route for creating gestores
router.route('/addGestor').post(addGestor)

export default router