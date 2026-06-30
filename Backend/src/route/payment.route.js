import { Router } from "express";
import { RazorpayOrder, verifyPayment } from "../controller/order.controller.js";

const paymentRouter = Router()

paymentRouter.route('/razorpay-order').post(RazorpayOrder )
paymentRouter.route('/verify-payment').post(verifyPayment)

export default paymentRouter