import { getEvento} from "../controllers/eventoController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all eventos
router.route('/').get(getEvento);

export default router;