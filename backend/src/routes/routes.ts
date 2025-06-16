import { Router } from "express";
import { userLocalSignUp, userLocalLogin } from "../controllers/controllers.js"

const router = Router();

router.post('/signup', userLocalSignUp);
router.post('/login', userLocalLogin);
export default router;
