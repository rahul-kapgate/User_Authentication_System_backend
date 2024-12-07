import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/user.controllers.js";
import { validateRegisterUser } from "../middelware/user.validation.js";
import { validateRequest } from "../middelware/errorHandler.middelware.js";
import { authenticate } from "../middelware/authenticate.middelware.js";


const router = Router();

router.route("/register").post(validateRegisterUser, validateRequest ,registerUser)

router.route('/login').post(loginUser)

router.route("/logout").post(authenticate, logoutUser);

router.route("/resetpassword").post(resetPassword);

export default router