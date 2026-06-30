import { Router } from "express";
import { googleSignUp, login, logout, resetPassword, sendOTP, signUp, verifyOTP } from "../controller/auth.controller.js";

const authRouter = Router()

authRouter.route("/signup").post(signUp)
authRouter.route("/login" ).post(login)
authRouter.route("/logout").get(logout)
authRouter.route("/sendotp").post(sendOTP)
authRouter.route("/verifyotp").post(verifyOTP)
authRouter.route("/resetpassword").post(resetPassword)
authRouter.route('/googlesignup').post(googleSignUp)

export default authRouter