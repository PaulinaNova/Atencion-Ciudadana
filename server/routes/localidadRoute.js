import { getLocalidad} from "../controllers/localidadController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all gestores
router.route('/').get(getLocalidad);

export default router;