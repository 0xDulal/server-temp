import express  from "express";
import { registerController, loginController } from '../controllers/authController.js'

//Routing Objects

const router = express.Router();

//main routing
//Register POST-Method
router.post('/register', registerController);

//Login POST-Method
router.post('/login', loginController);


//exporting 
export default router;