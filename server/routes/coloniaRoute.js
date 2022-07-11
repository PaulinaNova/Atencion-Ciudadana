import { getColonia} from "../controllers/coloniaController.js";
import express from 'express'
const router = express.Router()

// express router method to create route for getting all gestores
router.route('/').get(getColonia);

export default router;