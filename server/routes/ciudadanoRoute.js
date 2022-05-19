import { getCiudadanos, getCiudadanoById } from "../controllers/ciudadanoController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getCiudadanos)

// express router method to create route for getting users by id
router.route('/:id').get(getCiudadanoById)

export default router