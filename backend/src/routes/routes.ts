import { Router } from "express";
import passport from "passport";
import { userLocalSignUp, loginSuccess } from "../controllers/controllers.js"

const router = Router();

router.post('/signup', userLocalSignUp);
router.post('/login', passport.authenticate('local'), loginSuccess);
export default router;
