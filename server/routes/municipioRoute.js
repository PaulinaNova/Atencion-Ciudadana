import { getMunicipio} from "../controllers/municipioController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all gestores
router.route('/').get(getMunicipio);

export default router;