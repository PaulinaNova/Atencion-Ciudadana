import { addEvento, dltEvento, getEvento, updtEvento} from "../controllers/eventoController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all eventos
router.route('/').get(getEvento);

// express router method to create route for create new eventos
router.route('/addEvento').post(addEvento);

// express router method to create route for update new eventos
router.route('/updtEvento/:id').put(updtEvento);

// express router method to create route for delete new eventos
router.route('/dltEvento/:id').delete(dltEvento);

export default router;