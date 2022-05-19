import { getGestions, getGestionById } from "../controllers/gestionController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getGestions)

// express router method to create route for getting users by id
router.route('/:id').get(getGestionById)

export default router