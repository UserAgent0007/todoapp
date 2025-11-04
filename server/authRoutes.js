import express from "express";
import { registerUser, login, authCheck, logOut } from "./controllers/authController.js";
import { authRequired, userPresent } from "./middleware/auth.js";

const router = express.Router()

router.post('/register', userPresent, registerUser);
router.post('/login', login);
router.get('/auth/check', authRequired, authCheck);
router.post('/log_out', logOut);

export default router;