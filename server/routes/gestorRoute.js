import { getGestores, getGestorById } from "../controllers/gestorController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getGestores)

// express router method to create route for getting users by id
router.route('/:id').get(getGestorById)

export default router