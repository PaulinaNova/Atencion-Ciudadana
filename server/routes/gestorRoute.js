import { getGestores, getGestorById, addGestor, updtGestor, dltGestor} from "../controllers/gestorController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all gestores
router.route('/').get(getGestores)

// express router method to create route for getting gestores by id
router.route('/:id').get(getGestorById)

// express router method to create route for creating gestores
router.route('/addGestor').post(addGestor)

// express router method to create route for updating gestores
router.route('/updtGestor/:id').put(updtGestor)

// express router method to create route for deleting gestores
router.route('/dltGestor/:id').delete(dltGestor)

export default router