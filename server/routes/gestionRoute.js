import { getGestions, getGestionById, addGestion } from "../controllers/gestionController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getGestions)

// express router method to create route for getting users by id
router.route('/:id').get(getGestionById)

// express router method to create route for creating gestiones
router.route('/addGestion').post(addGestion)

export default router