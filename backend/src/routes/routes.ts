import { Router } from "express";
import passport from "passport";
import { userLocalSignUp, loginSuccess, changePassword } from "../controllers/controllers"


const router = Router();

router.post('/signup', userLocalSignUp);
router.post('/login', passport.authenticate('local'), loginSuccess);
router.post('/change-password', changePassword);

export default router;
